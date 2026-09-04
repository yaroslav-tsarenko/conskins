import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { applyLedger, markTopupFailed } from "@/lib/wallet";
import { isCurrency, toEur, type Currency } from "@/lib/rates";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const webhookSecret = process.env.TRANSFERMIT_WEBHOOK_SECRET;
    const rawBody = await request.text();

    if (webhookSecret && webhookSecret !== "your_webhook_secret_here" && webhookSecret.trim() !== "") {
      const signature = request.headers.get("signature") || request.headers.get("Signature");
      if (!signature) {
        console.error("[Transfermit Webhook] Missing signature header");
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
      }

      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(rawBody)
        .digest("hex");

      const signatureBuffer = Buffer.from(signature);
      const expectedSignatureBuffer = Buffer.from(expectedSignature);

      if (
        signatureBuffer.length !== expectedSignatureBuffer.length ||
        !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
      ) {
        console.error("[Transfermit Webhook] Signature verification failed");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(rawBody);
    console.log("[Transfermit Webhook] Received webhook event:", payload);

    const { id: paymentId, state: paymentState, referenceId, paymentType } = payload;

    if (!referenceId && !paymentId) {
      console.error("[Transfermit Webhook] Missing referenceId and paymentId in payload");
      return NextResponse.json({ error: "Missing identifier" }, { status: 400 });
    }

    // Check if this is a wallet top-up payment
    const isTopup = referenceId?.startsWith("topup_");

    if (isTopup) {
      const txId = referenceId.replace("topup_", "");
      const tx = await prisma.walletTransaction.findFirst({
        where: {
          OR: [
            { id: txId },
            ...(paymentId ? [{ providerRef: paymentId }] : []),
          ],
        },
      });

      if (!tx) {
        console.error(`[Transfermit Webhook] WalletTransaction not found for referenceId=${referenceId}, paymentId=${paymentId}`);
        return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
      }

      if (paymentState === "COMPLETED") {
        const amountToCredit = Number(payload.amount ?? tx.sourceAmount);
        const rawCurrency = payload.currency || tx.sourceCurrency || "EUR";
        const currency: Currency = isCurrency(rawCurrency) ? rawCurrency : "EUR";
        const amountEur = await toEur(amountToCredit, currency);

        await applyLedger({
          userId: tx.userId,
          type: "TOPUP",
          amountEur,
          provider: "transfermit",
          providerRef: paymentId || tx.providerRef || tx.id,
          sourceAmount: amountToCredit,
          sourceCurrency: currency,
          description: `Top-up ${amountToCredit} ${currency} (Transfermit)`,
        });

        console.log(`[Transfermit Webhook] Wallet top-up completed for user ${tx.userId}, amount: ${amountToCredit} ${currency}`);
      } else if (
        paymentState === "DECLINED" ||
        paymentState === "ERROR" ||
        paymentState === "CANCELLED"
      ) {
        await markTopupFailed(paymentId || tx.providerRef || tx.id, `Payment ${paymentState.toLowerCase()}`);
        console.log(`[Transfermit Webhook] Wallet top-up marked failed for user ${tx.userId} (state: ${paymentState})`);
      } else {
        console.log(`[Transfermit Webhook] Wallet top-up state: ${paymentState}`);
      }

      return NextResponse.json({ ok: true });
    }

    // Standard Store Order payment handling
    const order = await prisma.order.findUnique({
      where: { id: referenceId },
    });

    if (!order) {
      console.error(`[Transfermit Webhook] Order not found for id: ${referenceId}`);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (paymentType === "REFUND") {
      if (paymentState === "COMPLETED") {
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "REFUNDED",
            paymentStatus: "REFUNDED",
          },
        });
        console.log(`[Transfermit Webhook] Order ${order.id} refunded successfully`);
      }
      return NextResponse.json({ ok: true });
    }

    // Process deposit/payment updates for order
    switch (paymentState) {
      case "COMPLETED":
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "CONFIRMED",
            paymentStatus: "PAID",
            paymentId: paymentId,
          },
        });
        console.log(`[Transfermit Webhook] Order ${order.id} paid successfully`);
        break;

      case "DECLINED":
      case "ERROR":
      case "CANCELLED":
        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: "CANCELLED",
            paymentStatus: "FAILED",
            paymentId: paymentId,
          },
        });
        console.log(`[Transfermit Webhook] Order ${order.id} marked failed (state: ${paymentState})`);
        break;

      case "PENDING":
      default:
        await prisma.order.update({
          where: { id: order.id },
          data: {
            paymentStatus: "PENDING",
            paymentId: paymentId,
          },
        });
        console.log(`[Transfermit Webhook] Order ${order.id} payment pending`);
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[Transfermit Webhook] Internal handler error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
