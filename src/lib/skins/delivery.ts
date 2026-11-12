// Pluggable trade-delivery layer. In production this drives SIH
// (https://docs.sih.app) to buy the item and dispatch a Steam trade offer. When
// SIH is not configured we fall back to a deterministic stub so the buy flow is
// fully exercisable in dev without provider credentials. Callers only ever touch
// `activeDeliveryProvider` and never need to know which one is active.

import { prisma } from "@/lib/prisma";
import { isCurrency, toEur, type Currency } from "@/lib/rates";
import { refundEur } from "@/lib/wallet";
import {
  createOrder,
  getOrder,
  isSihConfigured,
  mapSihStatus,
  type SihOrderSender,
  type SihOrderStatus,
} from "@/lib/skins/sih";

export type PurchaseStatus = "pending" | "trade_sent" | "completed" | "failed";

export interface DeliveryRequest {
  purchaseId: string;
  tradeUrl: string;
  marketHashName: string;
  // Buyer Steam identity + the amount to spend — required by real providers.
  steamId64: string;
  tradeToken: string;
  amount: number;
}

export interface TradeDeliveryProvider {
  name: string;
  // Kick off delivery for a purchase. Implementations should transition the
  // purchase status over its lifecycle (pending → trade_sent → completed/failed).
  deliver(req: DeliveryRequest): Promise<void>;
}

async function setStatus(purchaseId: string, status: PurchaseStatus) {
  await prisma.skinPurchase
    .update({ where: { id: purchaseId }, data: { status } })
    .catch(() => {});
}

// Simulates a Steam bot: sends the offer shortly after purchase, then marks it
// completed as if the buyer accepted. Timers are fire-and-forget in dev.
//
// In production it refuses instead of simulating. Without SIH credentials no
// trade offer is ever dispatched, and reporting such a purchase as "delivered"
// is how a buyer ends up paying for a skin that never arrives — so the purchase
// fails loudly, the listing goes back on sale and a balance payer is refunded.
class StubDeliveryProvider implements TradeDeliveryProvider {
  name = "stub";

  async deliver(req: DeliveryRequest): Promise<void> {
    if (process.env.NODE_ENV === "production") {
      console.error(
        `[Delivery] No fulfilment provider configured (SIH_API_KEY missing) — failing purchase ${req.purchaseId}`,
      );
      await prisma.skinPurchase
        .update({
          where: { id: req.purchaseId },
          data: {
            status: "failed",
            providerError:
              "Skin delivery is temporarily unavailable. You have not been charged for an undelivered skin.",
          },
        })
        .catch(() => {});
      await releaseListingForPurchase(req.purchaseId);
      await refundBalanceForFailedPurchase(
        req.purchaseId,
        "fulfilment provider not configured",
      );
      return;
    }

    setTimeout(() => {
      void setStatus(req.purchaseId, "trade_sent");
      setTimeout(() => void setStatus(req.purchaseId, "completed"), 6000);
    }, 1500);
  }
}

// Real fulfilment via SIH. Places the order with our purchase id as `customId`
// so webhook/polling reconciliation is idempotent, records the provider order
// id, and reflects the initial provider status. Ongoing status transitions are
// driven by the SIH webhook and the reconcile poller below.
class SihDeliveryProvider implements TradeDeliveryProvider {
  name = "sih";

  async deliver(req: DeliveryRequest): Promise<void> {
    const result = await createOrder({
      steamId: req.steamId64,
      token: req.tradeToken,
      item: req.marketHashName,
      amount: req.amount,
      customId: req.purchaseId,
    });

    if (!result.success) {
      await prisma.skinPurchase
        .update({
          where: { id: req.purchaseId },
          data: { status: "failed", provider: "sih", providerError: result.error ?? "SIH order failed" },
        })
        .catch(() => {});
      // Release the listing so a failed buy doesn't leave it stuck as sold, and
      // give a balance payer their money back.
      await releaseListingForPurchase(req.purchaseId);
      await refundBalanceForFailedPurchase(
        req.purchaseId,
        result.error ?? "provider rejected the order",
      );
      return;
    }

    await prisma.skinPurchase
      .update({
        where: { id: req.purchaseId },
        data: {
          provider: "sih",
          providerOrderId: result.id != null ? String(result.id) : null,
          providerStatus: "created",
          providerError: null,
        },
      })
      .catch(() => {});
  }
}

async function releaseListingForPurchase(purchaseId: string) {
  const purchase = await prisma.skinPurchase
    .findUnique({ where: { id: purchaseId }, select: { listingId: true } })
    .catch(() => null);
  if (purchase?.listingId) {
    await prisma.skinListing
      .updateMany({ where: { id: purchase.listingId }, data: { status: "available" } })
      .catch(() => {});
  }
}

// A purchase paid from the site balance was debited the moment it was placed,
// so a fulfilment failure has to put the money back — otherwise the buyer is
// left with neither the skin nor the balance. Keyed by purchase id, so a
// webhook and the poller both landing on the same failure refund once.
async function refundBalanceForFailedPurchase(purchaseId: string, reason: string) {
  const purchase = await prisma.skinPurchase
    .findUnique({
      where: { id: purchaseId },
      select: {
        id: true,
        userId: true,
        price: true,
        currency: true,
        paidWith: true,
      },
    })
    .catch(() => null);

  if (!purchase || purchase.paidWith !== "balance") return;

  const currency: Currency = isCurrency(purchase.currency) ? purchase.currency : "USD";
  try {
    const amountEur = await toEur(Number(purchase.price), currency);
    await refundEur({
      userId: purchase.userId,
      amountEur,
      description: `Refund: skin delivery failed (${reason})`,
      provider: "sih",
      providerRef: `refund_purchase_${purchase.id}`,
      sourceAmount: Number(purchase.price),
      sourceCurrency: currency,
    });
  } catch (err) {
    console.error(`[Refund] Failed to refund purchase ${purchase.id}:`, err);
  }
}

// Apply a raw SIH status to a purchase (by our id or the provider order id).
// Shared by the webhook handler and the reconcile poller so both stay in sync.
export async function applyProviderStatus(params: {
  purchaseId?: string;
  providerOrderId?: string;
  rawStatus: SihOrderStatus | string;
  error?: string | null;
  // Trade offer SIH reports alongside the status, once it has dispatched one.
  sender?: SihOrderSender | null;
}): Promise<boolean> {
  const where = params.purchaseId
    ? { id: params.purchaseId }
    : params.providerOrderId
      ? { providerOrderId: params.providerOrderId }
      : null;
  if (!where) return false;

  const mapped = mapSihStatus(params.rawStatus);
  const purchase = await prisma.skinPurchase.findFirst({ where, select: { id: true, listingId: true } }).catch(() => null);
  if (!purchase) return false;

  const offerId =
    params.sender?.offerId != null ? String(params.sender.offerId) : null;

  await prisma.skinPurchase
    .update({
      where: { id: purchase.id },
      data: {
        status: mapped,
        providerStatus: String(params.rawStatus),
        providerError: params.error ?? null,
        // Keep an offer we already know about if this update omits it.
        ...(offerId ? { tradeOfferId: offerId } : {}),
        ...(params.sender?.nickname
          ? { tradeOfferSender: params.sender.nickname }
          : {}),
      },
    })
    .catch(() => {});

  // A failed/penalized order means the buyer never receives the skin — free the
  // listing so it can be sold again.
  if (mapped === "failed") {
    await prisma.skinListing
      .updateMany({ where: { id: purchase.listingId }, data: { status: "available" } })
      .catch(() => {});
    await refundBalanceForFailedPurchase(
      purchase.id,
      params.error ?? String(params.rawStatus),
    );
  }
  return true;
}

// Pull the latest status for a purchase straight from SIH and apply it. Used as
// a polling fallback (SIH does not publicly document webhooks) and to let the
// buyer's "My Trades" view self-heal on demand.
export async function reconcilePurchaseFromProvider(purchaseId: string): Promise<PurchaseStatus | null> {
  if (!isSihConfigured()) return null;
  const purchase = await prisma.skinPurchase
    .findUnique({ where: { id: purchaseId }, select: { id: true, providerOrderId: true, status: true } })
    .catch(() => null);
  if (!purchase) return null;
  // Terminal states never change again.
  if (purchase.status === "completed" || purchase.status === "failed") {
    return purchase.status as PurchaseStatus;
  }

  const order = await getOrder({
    id: purchase.providerOrderId ?? undefined,
    customId: purchase.id,
  });
  if (!order) return purchase.status as PurchaseStatus;

  await applyProviderStatus({
    purchaseId: purchase.id,
    rawStatus: order.status,
    error: order.error ?? null,
    sender: order.sender ?? null,
  });
  return mapSihStatus(order.status);
}

export const activeDeliveryProvider: TradeDeliveryProvider = isSihConfigured()
  ? new SihDeliveryProvider()
  : new StubDeliveryProvider();

// Reconcile pending skin purchases that were created via Transfermit
export async function reconcileSkinPayment(purchaseId: string): Promise<boolean> {
  const purchase = await prisma.skinPurchase.findUnique({
    where: { id: purchaseId },
    include: {
      listing: true,
      user: {
        include: { steamAccount: true },
      },
    },
  });

  if (!purchase || purchase.provider !== "transfermit" || !purchase.providerOrderId) {
    return false;
  }

  if (purchase.status === "completed" || purchase.status === "failed" || purchase.status === "trade_sent") {
    return true;
  }

  const { TransfermitAPI } = await import("@/lib/payments/transfermit");
  const transfermit = new TransfermitAPI();
  if (!transfermit.isConfigured()) return false;

  try {
    const statusRes = await transfermit.getPaymentStatus(purchase.providerOrderId);
    const rawResult = (statusRes.result || statusRes) as Record<string, unknown>;
    const paymentState = (rawResult.state as string) || "";

    if (paymentState === "COMPLETED") {
      await prisma.skinListing.updateMany({
        where: { id: purchase.listingId },
        data: { status: "sold" },
      });

      await prisma.skinPurchase.update({
        where: { id: purchase.id },
        data: { providerStatus: "paid" },
      });

      const steam = purchase.user.steamAccount;
      if (steam?.tradeUrl) {
        void activeDeliveryProvider.deliver({
          purchaseId: purchase.id,
          tradeUrl: purchase.tradeUrl || steam.tradeUrl,
          marketHashName: purchase.listing.marketHashName,
          steamId64: steam.steamId64,
          tradeToken: steam.tradeToken ?? "",
          amount: Number(purchase.price),
        });
      }
      return true;
    } else if (
      paymentState === "DECLINED" ||
      paymentState === "ERROR" ||
      paymentState === "CANCELLED"
    ) {
      await prisma.skinPurchase.update({
        where: { id: purchase.id },
        data: {
          status: "failed",
          providerStatus: paymentState.toLowerCase(),
          providerError: `Payment ${paymentState.toLowerCase()}`,
        },
      });

      await prisma.skinListing.updateMany({
        where: { id: purchase.listingId },
        data: { status: "available" },
      });
      return false;
    }
  } catch (err) {
    console.error(`[Reconcile Skin Payment] Failed for ${purchaseId}:`, err);
  }

  return false;
}

// ── Fee model ────────────────────────────────────────────────────────────
// Buyers pay the listed price; buyer protection is included at no extra cost.
// Keeping this in one place makes it trivial to introduce a real fee later.
export interface FeeBreakdown {
  itemPrice: number;
  serviceFee: number;
  total: number;
}

export function computeFees(itemPrice: number): FeeBreakdown {
  const serviceFee = 0;
  return {
    itemPrice: round2(itemPrice),
    serviceFee: round2(serviceFee),
    total: round2(itemPrice + serviceFee),
  };
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
