import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { creditEur, WalletError } from "@/lib/wallet";
import { activeTopupGateway } from "@/lib/payments/topup-gateway";
import { isCurrency, toEur, type Currency } from "@/lib/rates";

export const runtime = "nodejs";

// Minimum top-up is 10 in the chosen currency (product decision).
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 100_000;

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { code: "unauthenticated", error: "Sign in to top up." },
      { status: 401 },
    );
  }

  let body: { amount?: number; currency?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ code: "bad_request", error: "Invalid body" }, { status: 400 });
  }

  const amount = Number(body.amount);
  const currency: Currency = isCurrency(body.currency) ? body.currency : "EUR";

  if (!Number.isFinite(amount) || amount < MIN_AMOUNT) {
    return NextResponse.json(
      { code: "amount_too_low", error: `Minimum top-up is ${MIN_AMOUNT} ${currency}.` },
      { status: 400 },
    );
  }
  if (amount > MAX_AMOUNT) {
    return NextResponse.json(
      { code: "amount_too_high", error: "Amount exceeds the allowed limit." },
      { status: 400 },
    );
  }

  // Extract client IP and host
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host") || process.env.NEXT_PUBLIC_SITE_URL || "localhost:3500";
  const proto = req.headers.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = (process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL || `${proto}://${host}`).replace(/\/$/, "");
  const clientIp = req.headers.get("cf-connecting-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";

  const defaultAddress = user.addresses?.[0];
  const customerName = user.name || user.firstName || user.steamAccount?.personaName || "Customer";

  try {
    const intent = await activeTopupGateway.createIntent({
      userId: user.id,
      amount,
      currency,
      customer: {
        referenceId: user.id,
        email: user.email || `${user.steamAccount?.steamId64 || user.id}@conskins.com`,
        name: customerName,
        firstName: user.firstName || customerName,
        lastName: user.lastName || "",
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
        : undefined,
      returnUrl: `${baseUrl}/account/wallet?status=return`,
      webhookUrl: `${baseUrl}/api/webhooks/transfermit`,
    });

    // Real gateway path (Transfermit): return redirectUrl for checkout / 3DSecure
    if (intent.kind === "redirect") {
      return NextResponse.json({ ok: true, redirectUrl: intent.url, providerRef: intent.providerRef });
    }

    // Stub gateway path: charge is settled immediately
    const amountEur = await toEur(amount, currency);
    const result = await creditEur({
      userId: user.id,
      amountEur,
      provider: intent.provider,
      providerRef: intent.providerRef,
      sourceAmount: amount,
      sourceCurrency: currency,
      description: `Top-up ${amount} ${currency}`,
    });

    return NextResponse.json({
      ok: true,
      balanceEur: Number(result.transaction.balanceAfter),
      creditedEur: amountEur,
    });
  } catch (err) {
    console.error("[Wallet Topup] Error processing intent:", err);
    if (err instanceof WalletError) {
      return NextResponse.json({ code: err.code, error: err.message }, { status: 400 });
    }
    const message = err instanceof Error ? err.message : "Could not complete top-up. Try again.";
    return NextResponse.json(
      { code: "error", error: message },
      { status: 500 },
    );
  }
}
