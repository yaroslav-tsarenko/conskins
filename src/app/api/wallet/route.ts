import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/wallet";

export const runtime = "nodejs";

// Balance + recent ledger history for the signed-in user. Amounts are EUR.
export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ code: "unauthenticated", error: "Sign in." }, { status: 401 });
  }

  const wallet = await getOrCreateWallet(user.id);
  const transactions = await prisma.walletTransaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      type: true,
      status: true,
      amount: true,
      balanceAfter: true,
      sourceAmount: true,
      sourceCurrency: true,
      description: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    balanceEur: Number(wallet.balance),
    currency: wallet.currency,
    transactions: transactions.map((t) => ({
      id: t.id,
      type: t.type,
      status: t.status,
      amountEur: Number(t.amount),
      balanceAfterEur: Number(t.balanceAfter),
      sourceAmount: t.sourceAmount != null ? Number(t.sourceAmount) : null,
      sourceCurrency: t.sourceCurrency,
      description: t.description,
      createdAt: t.createdAt,
    })),
  });
}
