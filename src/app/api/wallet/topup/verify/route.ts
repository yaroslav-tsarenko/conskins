import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { applyLedger, getOrCreateWallet, markTopupFailed } from "@/lib/wallet";
import { TransfermitAPI } from "@/lib/payments/transfermit";
import { isCurrency, toEur, type Currency } from "@/lib/rates";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const pmt = searchParams.get("pmt")?.trim();
  const ref = searchParams.get("ref")?.trim();

  if (!pmt && !ref) {
    return NextResponse.json({ error: "Missing pmt or ref parameter" }, { status: 400 });
  }

  const txId = ref?.startsWith("topup_") ? ref.replace("topup_", "") : ref;

  const tx = await prisma.walletTransaction.findFirst({
    where: {
      userId: user.id,
      OR: [
        ...(pmt ? [{ providerRef: pmt }] : []),
        ...(txId ? [{ id: txId }] : []),
      ],
    },
  });

  if (!tx) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }

  const wallet = await getOrCreateWallet(user.id);

  if (tx.status === "COMPLETED") {
    return NextResponse.json({
      status: "COMPLETED",
      balanceEur: Number(wallet.balance),
    });
  }

  if (tx.status === "FAILED") {
    return NextResponse.json({
      status: "FAILED",
      balanceEur: Number(wallet.balance),
    });
  }

  // If still PENDING, verify status with Transfermit API directly
  const paymentId = pmt || tx.providerRef;
  const transfermit = new TransfermitAPI();

  if (paymentId && transfermit.isConfigured()) {
    try {
      const response = await transfermit.getPaymentStatus(paymentId);
      const state = response?.result?.state;

      if (state === "COMPLETED") {
        const amount = Number(response.result?.amount ?? tx.sourceAmount);
        const rawCurrency = response.result?.currency || tx.sourceCurrency || "EUR";
        const currency: Currency = isCurrency(rawCurrency) ? rawCurrency : "EUR";
        const amountEur = await toEur(amount, currency);

        const result = await applyLedger({
          userId: user.id,
          type: "TOPUP",
          amountEur,
          provider: "transfermit",
          providerRef: paymentId,
          sourceAmount: amount,
          sourceCurrency: currency,
          description: `Top-up ${amount} ${currency} (Transfermit)`,
        });

        const balanceEur = result.wallet ? Number(result.wallet.balance) : Number(wallet.balance);
        return NextResponse.json({
          status: "COMPLETED",
          balanceEur,
          creditedEur: amountEur,
        });
      }

      if (state === "DECLINED" || state === "ERROR" || state === "CANCELLED") {
        await markTopupFailed(paymentId, `Payment ${state.toLowerCase()}`);
        return NextResponse.json({
          status: "FAILED",
          balanceEur: Number(wallet.balance),
        });
      }

      return NextResponse.json({
        status: "PENDING",
        balanceEur: Number(wallet.balance),
      });
    } catch (err) {
      console.warn("[Verify Topup] Error querying Transfermit API:", err);
    }
  }

  return NextResponse.json({
    status: tx.status,
    balanceEur: Number(wallet.balance),
  });
}
