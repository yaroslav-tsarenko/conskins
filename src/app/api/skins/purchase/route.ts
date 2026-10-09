import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import {
  activeDeliveryProvider,
  computeFees,
} from "@/lib/skins/delivery";
import { TransfermitAPI } from "@/lib/payments/transfermit";
import { getBalanceEur, applyLedger } from "@/lib/wallet";
import { isCurrency, toEur, type Currency } from "@/lib/rates";

export const runtime = "nodejs";

// Buy a specific listing. Supports:
// 1. "direct" (default): creates a Transfermit payment link without debiting wallet balance.
// 2. "balance": checks and debits the user's wallet balance, triggering immediate Steam delivery.
export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { code: "unauthenticated", error: "Sign in to buy." },
      { status: 401 },
    );
  }

  const steam = user.steamAccount;
  if (!steam) {
    return NextResponse.json(
      { code: "no_steam", error: "Link your Steam account first." },
      { status: 400 },
    );
  }
  if (!steam.tradeUrlVerified || !steam.tradeUrl) {
    return NextResponse.json(
      { code: "no_trade_url", error: "Add your Steam trade URL to receive the item." },
      { status: 400 },
    );
  }

  let body: { listingId?: string; paymentMethod?: "direct" | "balance" };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "bad_request", error: "Invalid body" }, { status: 400 });
  }
  const listingId = body.listingId?.trim();
  if (!listingId) {
    return NextResponse.json(
      { code: "bad_request", error: "Missing listing." },
      { status: 400 },
    );
  }

  const listing = await prisma.skinListing.findUnique({
    where: { id: listingId },
    select: {
      id: true,
      price: true,
      currency: true,
      status: true,
      marketHashName: true,
      skin: { select: { name: true } },
    },
  });
  if (!listing) {
    return NextResponse.json(
      { code: "not_found", error: "This offer no longer exists." },
      { status: 404 },
    );
  }
  if (listing.status !== "available") {
    return NextResponse.json(
      { code: "sold", error: "This skin was just sold. Pick another offer." },
      { status: 409 },
    );
  }

  const price = Number(listing.price);
  const fees = computeFees(price);
  const paymentMethod = body.paymentMethod === "balance" ? "balance" : "direct";

  // ── Balance payment path ──────────────────────────────────────────
  if (paymentMethod === "balance") {
    const rawCurrency = listing.currency;
    const currency: Currency = isCurrency(rawCurrency) ? rawCurrency : "USD";
    const priceEur = await toEur(fees.total, currency);
    const balanceEur = await getBalanceEur(user.id);

    if (balanceEur < priceEur) {
      return NextResponse.json(
        {
          code: "insufficient_balance",
          error: "Insufficient balance. Top up your wallet to complete this purchase.",
        },
        { status: 402 },
      );
    }

    const claimed = await prisma.skinListing.updateMany({
      where: { id: listingId, status: "available" },
      data: { status: "sold" },
    });
    if (claimed.count === 0) {
      return NextResponse.json(
        { code: "sold", error: "This skin was just sold. Pick another offer." },
        { status: 409 },
      );
    }

    let purchase;
    try {
      purchase = await prisma.skinPurchase.create({
        data: {
          listingId: listing.id,
          userId: user.id,
          price: listing.price,
          currency: listing.currency,
          status: "pending",
          tradeUrl: steam.tradeUrl,
          provider: "balance",
        },
        select: { id: true, status: true, createdAt: true },
      });

      await applyLedger({
        userId: user.id,
        type: "PURCHASE",
        amountEur: -priceEur,
        description: `Skin purchase: ${listing.marketHashName}`,
        sourceAmount: fees.total,
        sourceCurrency: listing.currency,
      });
    } catch {
      await prisma.skinListing
        .updateMany({ where: { id: listingId }, data: { status: "available" } })
        .catch(() => {});
      return NextResponse.json(
        { code: "error", error: "Could not complete the purchase. Try again." },
        { status: 500 },
      );
    }

    // Immediately deliver since balance has been deducted
    void activeDeliveryProvider.deliver({
      purchaseId: purchase.id,
      tradeUrl: steam.tradeUrl,
      marketHashName: listing.marketHashName,
      steamId64: steam.steamId64,
      tradeToken: steam.tradeToken ?? "",
      amount: fees.total,
    });

    return NextResponse.json({
      ok: true,
      purchase: {
        id: purchase.id,
        status: purchase.status,
        skinName: listing.skin.name,
        fees,
        currency: listing.currency,
      },
    });
  }

  // ── Direct Transfermit payment path (no balance deduction) ────────
  const claimed = await prisma.skinListing.updateMany({
    where: { id: listingId, status: "available" },
    data: { status: "reserved" },
  });
  if (claimed.count === 0) {
    return NextResponse.json(
      { code: "sold", error: "This skin was just sold. Pick another offer." },
      { status: 409 },
    );
  }

  let purchase;
  try {
    purchase = await prisma.skinPurchase.create({
      data: {
        listingId: listing.id,
        userId: user.id,
        price: listing.price,
        currency: listing.currency,
        status: "pending",
        tradeUrl: steam.tradeUrl,
        provider: "transfermit",
      },
      select: { id: true, status: true, createdAt: true },
    });
  } catch {
    await prisma.skinListing
      .updateMany({ where: { id: listingId }, data: { status: "available" } })
      .catch(() => {});
    return NextResponse.json(
      { code: "error", error: "Could not record the purchase. Try again." },
      { status: 500 },
    );
  }

  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "localhost:3500";
  const proto =
    req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = (
    process.env.APP_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    `${proto}://${host}`
  ).replace(/\/$/, "");
  const clientIp =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";

  const defaultAddress = user.addresses?.[0];
  const customerName = user.name || user.firstName || steam.personaName || "Customer";
  const nameParts = customerName.trim().split(/\s+/);
  const firstName = user.firstName || nameParts[0] || "Customer";
  const lastName = user.lastName || nameParts.slice(1).join(" ") || "Customer";

  const referenceId = `skin_purchase_${purchase.id}`;
  const returnUrl = `${baseUrl}/account/trades?status=return&purchaseId=${purchase.id}&ref=${referenceId}`;
  const webhookUrl = `${baseUrl}/api/webhooks/transfermit`;

  const transfermit = new TransfermitAPI();
  try {
    const paymentRes = await transfermit.createPayment({
      amount: fees.total,
      currency: listing.currency,
      referenceId,
      description: `Purchase: ${listing.marketHashName}`,
      customer: {
        referenceId: user.id,
        email: user.email || `${steam.steamId64 || user.id}@conskins.com`,
        firstName,
        lastName,
        phone: user.phone || defaultAddress?.phone || undefined,
        ip: clientIp,
      },
      billingAddress: defaultAddress
        ? {
            addressLine1: defaultAddress.address1,
            addressLine2: defaultAddress.address2 || undefined,
            city: defaultAddress.city,
            countryCode: defaultAddress.country,
            postalCode: defaultAddress.postalCode,
            state: defaultAddress.province || undefined,
          }
        : {
            addressLine1: "Digital Goods",
            city: "London",
            countryCode: "GB",
            postalCode: "00000",
          },
      returnUrl,
      webhookUrl,
    });

    const rawRes = paymentRes as Record<string, unknown>;
    const resResult = (paymentRes?.result || rawRes?.result || {}) as Record<string, unknown>;
    const paymentId = (resResult.id || rawRes.id) as string | undefined;

    const redirectUrl =
      (resResult.redirectUrl as string) ||
      (resResult.url as string) ||
      (rawRes.redirectUrl as string) ||
      (rawRes.url as string);

    if (!redirectUrl) {
      throw new Error(
        paymentRes?.message ||
        paymentRes?.error ||
        "Payment gateway did not return a checkout URL"
      );
    }

    if (paymentId) {
      await prisma.skinPurchase
        .update({
          where: { id: purchase.id },
          data: { providerOrderId: paymentId },
        })
        .catch(() => {});
    }

    return NextResponse.json({
      ok: true,
      redirectUrl,
      purchase: {
        id: purchase.id,
        status: purchase.status,
        skinName: listing.skin.name,
        fees,
        currency: listing.currency,
      },
    });
  } catch (err: unknown) {
    console.error("[Skin Purchase] Transfermit creation failed:", err);
    await prisma.skinListing
      .updateMany({ where: { id: listingId }, data: { status: "available" } })
      .catch(() => {});
    await prisma.skinPurchase
      .update({
        where: { id: purchase.id },
        data: {
          status: "failed",
          providerError: err instanceof Error ? err.message : "Payment failed",
        },
      })
      .catch(() => {});

    return NextResponse.json(
      {
        code: "payment_failed",
        error: err instanceof Error ? err.message : "Could not initialize payment gateway.",
      },
      { status: 502 },
    );
  }
}
