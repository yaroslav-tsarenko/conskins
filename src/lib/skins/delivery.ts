// Pluggable trade-delivery layer. In production this drives SIH
// (https://docs.sih.app) to buy the item and dispatch a Steam trade offer. When
// SIH is not configured we fall back to a deterministic stub so the buy flow is
// fully exercisable in dev without provider credentials. Callers only ever touch
// `activeDeliveryProvider` and never need to know which one is active.

import { prisma } from "@/lib/prisma";
import {
  createOrder,
  getOrder,
  isSihConfigured,
  mapSihStatus,
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
class StubDeliveryProvider implements TradeDeliveryProvider {
  name = "stub";

  async deliver(req: DeliveryRequest): Promise<void> {
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
      // Release the listing so a failed buy doesn't leave it stuck as sold.
      await releaseListingForPurchase(req.purchaseId);
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

// Apply a raw SIH status to a purchase (by our id or the provider order id).
// Shared by the webhook handler and the reconcile poller so both stay in sync.
export async function applyProviderStatus(params: {
  purchaseId?: string;
  providerOrderId?: string;
  rawStatus: SihOrderStatus | string;
  error?: string | null;
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

  await prisma.skinPurchase
    .update({
      where: { id: purchase.id },
      data: {
        status: mapped,
        providerStatus: String(params.rawStatus),
        providerError: params.error ?? null,
      },
    })
    .catch(() => {});

  // A failed/penalized order means the buyer never receives the skin — free the
  // listing so it can be sold again.
  if (mapped === "failed") {
    await prisma.skinListing
      .updateMany({ where: { id: purchase.listingId }, data: { status: "available" } })
      .catch(() => {});
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
  });
  return mapSihStatus(order.status);
}

export const activeDeliveryProvider: TradeDeliveryProvider = isSihConfigured()
  ? new SihDeliveryProvider()
  : new StubDeliveryProvider();

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

// Stubbed wallet balance. No wallet model exists yet, so we grant a large
// simulated balance — enough for the golden path — while keeping the
// insufficient-funds branch reachable for very high-value items.
export const STUB_WALLET_BALANCE = 1_000_000;

export function getWalletBalance(): number {
  return STUB_WALLET_BALANCE;
}
