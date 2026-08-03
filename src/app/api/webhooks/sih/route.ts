import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { applyProviderStatus } from "@/lib/skins/delivery";

export const runtime = "nodejs";

// SIH order-status callback. SIH posts a JSON body describing an order whose
// status changed; we map it onto the matching SkinPurchase. The payload shape is
// parsed defensively (id/customId + status) so minor provider field differences
// don't break fulfilment. When SIH_WEBHOOK_SECRET is set we verify an
// HMAC-SHA256 signature over the raw body, mirroring the Transfermit webhook.
export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const secret = process.env.SIH_WEBHOOK_SECRET;

    if (secret && secret.trim() !== "" && secret !== "your-sih-webhook-secret") {
      const signature =
        request.headers.get("signature") ||
        request.headers.get("x-signature") ||
        request.headers.get("x-sih-signature") ||
        "";
      if (!signature) {
        console.error("[SIH Webhook] Missing signature header");
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
      }
      const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
      const a = Buffer.from(signature);
      const b = Buffer.from(expected);
      if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
        console.error("[SIH Webhook] Signature verification failed");
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
      }
    }

    let payload: Record<string, unknown>;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    // SIH may wrap the order under `order`/`data`, or send it flat.
    const order = (payload.order ?? payload.data ?? payload) as Record<string, unknown>;

    const customId = typeof order.customId === "string" ? order.customId : undefined;
    const providerOrderId =
      order.id != null ? String(order.id as string | number) : undefined;
    const rawStatus = typeof order.status === "string" ? order.status : undefined;
    const error =
      typeof order.error === "string" ? order.error : null;

    if (!rawStatus || (!customId && !providerOrderId)) {
      console.error("[SIH Webhook] Missing status or order identifier", order);
      return NextResponse.json({ error: "Missing order identifier or status" }, { status: 400 });
    }

    const applied = await applyProviderStatus({
      purchaseId: customId,
      providerOrderId,
      rawStatus,
      error,
    });

    if (!applied) {
      console.warn(`[SIH Webhook] No purchase matched (customId=${customId}, id=${providerOrderId})`);
      // 200 so SIH doesn't retry indefinitely on an unknown/stale order.
      return NextResponse.json({ ok: true, matched: false });
    }

    return NextResponse.json({ ok: true, matched: true });
  } catch (err) {
    console.error("[SIH Webhook] Internal handler error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
