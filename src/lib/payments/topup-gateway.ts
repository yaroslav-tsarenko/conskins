import { prisma } from "@/lib/prisma";
import { getOrCreateWallet } from "@/lib/wallet";
import { TransfermitAPI } from "@/lib/payments/transfermit";

export type TopupIntent = {
  userId: string;
  // Amount + currency the user chose to pay (pre-conversion to EUR).
  amount: number;
  currency: string;
  customer?: {
    referenceId?: string;
    email?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    ip?: string;
  };
  billingAddress?: {
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    countryCode?: string;
    postalCode?: string;
    state?: string;
  };
  returnUrl?: string;
  webhookUrl?: string;
};

export type TopupResult =
  // Stub: charge is already settled, caller should credit the wallet now.
  | { kind: "settled"; providerRef: string; provider: string }
  // Real gateway: redirect the user to complete payment; webhook settles later.
  | { kind: "redirect"; url: string; providerRef: string; provider: string };

export interface TopupGateway {
  name: string;
  createIntent(intent: TopupIntent): Promise<TopupResult>;
}

// Transfermit payment gateway integration
export class TransfermitTopupGateway implements TopupGateway {
  name = "transfermit";
  private api: TransfermitAPI;

  constructor() {
    this.api = new TransfermitAPI();
  }

  async createIntent(intent: TopupIntent): Promise<TopupResult> {
    const wallet = await getOrCreateWallet(intent.userId);
    const currentBalance = Number(wallet.balance);

    // 1. Create a pending WalletTransaction to track this topup
    const tx = await prisma.walletTransaction.create({
      data: {
        walletId: wallet.id,
        userId: intent.userId,
        type: "TOPUP",
        status: "PENDING",
        amount: 0,
        balanceAfter: currentBalance,
        sourceAmount: intent.amount,
        sourceCurrency: intent.currency,
        provider: this.name,
        description: `Top-up ${intent.amount} ${intent.currency} (Transfermit)`,
      },
    });

    const referenceId = `topup_${tx.id}`;

    const baseUrl = (
      process.env.APP_URL ||
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3500"
    ).replace(/\/$/, "");

    const returnUrl =
      intent.returnUrl ||
      `${baseUrl}/account/wallet?status=return&ref=${referenceId}`;

    const webhookUrl =
      intent.webhookUrl ||
      `${baseUrl}/api/webhooks/transfermit`;

    // 2. Request Transfermit API to create a DEPOSIT payment
    const res = await this.api.createPayment({
      amount: intent.amount,
      currency: intent.currency,
      referenceId,
      description: `Wallet Top-up ${intent.amount} ${intent.currency}`,
      customer: {
        referenceId: intent.customer?.referenceId || intent.userId,
        email: intent.customer?.email || `${intent.userId}@conskins.com`,
        firstName: intent.customer?.firstName || intent.customer?.name || "Customer",
        lastName: intent.customer?.lastName || "Customer",
        phone: intent.customer?.phone || undefined,
        ip: intent.customer?.ip || "127.0.0.1",
      },
      billingAddress: {
        addressLine1: intent.billingAddress?.addressLine1 || "Dept 6790, 196 High Road",
        addressLine2: intent.billingAddress?.addressLine2 || undefined,
        city: intent.billingAddress?.city || "London",
        countryCode: intent.billingAddress?.countryCode || "GB",
        postalCode: intent.billingAddress?.postalCode || "N22 8HH",
        state: intent.billingAddress?.state || undefined,
      },
      returnUrl: `${returnUrl}&pmt=${encodeURIComponent(referenceId)}`,
      webhookUrl,
    });

    const rawRes = res as Record<string, unknown>;
    const resResult = (res?.result || rawRes?.result || {}) as Record<string, unknown>;
    const paymentId = (resResult.id || rawRes.id || tx.id) as string;

    const redirectUrl =
      (resResult.redirectUrl as string) ||
      (resResult.url as string) ||
      (rawRes.redirectUrl as string) ||
      (rawRes.url as string);

    if (!redirectUrl) {
      console.error("[Transfermit Topup] Failed to get redirectUrl from response:", JSON.stringify(res));
      await prisma.walletTransaction.update({
        where: { id: tx.id },
        data: {
          status: "FAILED",
          description: `No redirectUrl returned: ${res?.message || res?.error || "Unknown response"}`,
        },
      });
      throw new Error(
        res?.message ||
        res?.error ||
        "Transfermit did not return a redirectUrl. Please check your Transfermit credentials and settings."
      );
    }

    // 3. Update the pending transaction with the Transfermit payment ID
    await prisma.walletTransaction.update({
      where: { id: tx.id },
      data: { providerRef: paymentId },
    });

    return {
      kind: "redirect",
      url: redirectUrl,
      providerRef: paymentId,
      provider: this.name,
    };
  }
}

// Directly export TransfermitTopupGateway as the active topup gateway
export const activeTopupGateway: TopupGateway = new TransfermitTopupGateway();
