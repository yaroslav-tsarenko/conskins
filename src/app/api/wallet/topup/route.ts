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

  // Charge the (currently stubbed) gateway, then convert to EUR and credit.
  const intent = await activeTopupGateway.createIntent({ userId: user.id, amount, currency });

  // Real gateway path: hand the checkout URL back to the client. The wallet is
  // credited later from the provider webhook, not here.
  if (intent.kind === "redirect") {
    return NextResponse.json({ ok: true, redirectUrl: intent.url });
  }

  const amountEur = await toEur(amount, currency);
  try {
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
    if (err instanceof WalletError) {
      return NextResponse.json({ code: err.code, error: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { code: "error", error: "Could not complete top-up. Try again." },
      { status: 500 },
    );
  }
}
