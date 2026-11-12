import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { reconcilePurchaseFromProvider } from "@/lib/skins/delivery";
import { tradeOfferUrl } from "@/lib/skins/sih";

export const runtime = "nodejs";

// Owner-scoped status endpoint. Reconciles the purchase against SIH on demand
// (polling fallback since SIH does not publicly document webhooks) and returns
// the current status so the buyer's "My Trades" view can self-update.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const purchase = await prisma.skinPurchase.findFirst({
    where: { id, userId: user.id },
    select: { id: true, status: true },
  });
  if (!purchase) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const reconciled = await reconcilePurchaseFromProvider(purchase.id);

  // Re-read after reconciliation: that is when the trade offer id lands, and
  // the buyer's "My Trades" row needs it to link straight to the offer.
  const fresh = await prisma.skinPurchase.findUnique({
    where: { id: purchase.id },
    select: { status: true, tradeOfferId: true, tradeOfferSender: true, providerError: true },
  });

  const status = reconciled ?? fresh?.status ?? purchase.status;
  return NextResponse.json({
    id: purchase.id,
    status,
    tradeOfferUrl: tradeOfferUrl(fresh?.tradeOfferId ?? null),
    tradeOfferSender: fresh?.tradeOfferSender ?? null,
    error: fresh?.providerError ?? null,
    open: status === "pending" || status === "trade_sent",
  });
}
