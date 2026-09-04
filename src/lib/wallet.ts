import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// All wallet money is stored and moved in EUR. Callers that deal in another
// currency must convert via src/lib/rates.ts before entering here.

export type WalletSummary = {
  balanceEur: number;
  currency: string;
};

const toNumber = (d: Prisma.Decimal | number | string) => Number(d);

export async function getOrCreateWallet(userId: string) {
  const existing = await prisma.wallet.findUnique({ where: { userId } });
  if (existing) return existing;
  // upsert guards the race where two requests create a wallet at once.
  return prisma.wallet.upsert({
    where: { userId },
    create: { userId },
    update: {},
  });
}

export async function getBalanceEur(userId: string): Promise<number> {
  const wallet = await prisma.wallet.findUnique({
    where: { userId },
    select: { balance: true },
  });
  return wallet ? toNumber(wallet.balance) : 0;
}

type LedgerInput = {
  userId: string;
  type: "TOPUP" | "PURCHASE" | "REFUND" | "ADJUSTMENT";
  // Signed EUR delta: credit > 0, debit < 0.
  amountEur: number;
  description?: string;
  provider?: string;
  providerRef?: string;
  sourceAmount?: number;
  sourceCurrency?: string;
};

// Apply a signed EUR delta to the balance and append a ledger line, atomically.
// If `providerRef` is supplied and already recorded, the existing transaction
// is returned unchanged so payment webhooks are safe to replay.
export async function applyLedger(input: LedgerInput) {
  return prisma.$transaction(async (tx) => {
    if (input.providerRef) {
      const existing = await tx.walletTransaction.findUnique({
        where: { providerRef: input.providerRef },
      });
      if (existing) {
        if (existing.status === "COMPLETED") {
          return { transaction: existing, replayed: true as const };
        }

        // Complete the pending transaction
        const wallet = await tx.wallet.upsert({
          where: { userId: input.userId },
          create: { userId: input.userId },
          update: {},
        });
        const current = toNumber(wallet.balance);
        const next = Math.round((current + input.amountEur) * 100) / 100;
        const updatedWallet = await tx.wallet.update({
          where: { id: wallet.id },
          data: { balance: next },
        });
        const updatedTx = await tx.walletTransaction.update({
          where: { id: existing.id },
          data: {
            status: "COMPLETED",
            amount: input.amountEur,
            balanceAfter: next,
            description: input.description ?? existing.description,
            sourceAmount: input.sourceAmount ?? existing.sourceAmount,
            sourceCurrency: input.sourceCurrency ?? existing.sourceCurrency,
          },
        });
        return { transaction: updatedTx, wallet: updatedWallet, replayed: false as const };
      }
    }

    const wallet = await tx.wallet.upsert({
      where: { userId: input.userId },
      create: { userId: input.userId },
      update: {},
    });

    const current = toNumber(wallet.balance);
    const next = Math.round((current + input.amountEur) * 100) / 100;
    if (next < 0) {
      throw new WalletError("insufficient_funds", "Insufficient wallet balance.");
    }

    const updated = await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: next },
    });

    const transaction = await tx.walletTransaction.create({
      data: {
        walletId: wallet.id,
        userId: input.userId,
        type: input.type,
        status: "COMPLETED",
        amount: input.amountEur,
        balanceAfter: next,
        description: input.description,
        provider: input.provider,
        providerRef: input.providerRef,
        sourceAmount: input.sourceAmount,
        sourceCurrency: input.sourceCurrency,
      },
    });

    return { transaction, wallet: updated, replayed: false as const };
  });
}

export async function markTopupFailed(providerRef: string, description?: string) {
  const existing = await prisma.walletTransaction.findUnique({
    where: { providerRef },
  });
  if (!existing || existing.status === "COMPLETED") return null;
  return prisma.walletTransaction.update({
    where: { id: existing.id },
    data: {
      status: "FAILED",
      description: description ?? existing.description,
    },
  });
}

export function creditEur(
  input: Omit<LedgerInput, "type" | "amountEur"> & { amountEur: number },
) {
  return applyLedger({ ...input, type: "TOPUP", amountEur: Math.abs(input.amountEur) });
}

export function debitEur(
  input: Omit<LedgerInput, "type" | "amountEur"> & { amountEur: number },
) {
  return applyLedger({ ...input, type: "PURCHASE", amountEur: -Math.abs(input.amountEur) });
}

export function refundEur(
  input: Omit<LedgerInput, "type" | "amountEur"> & { amountEur: number },
) {
  return applyLedger({ ...input, type: "REFUND", amountEur: Math.abs(input.amountEur) });
}

export class WalletError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = "WalletError";
  }
}
