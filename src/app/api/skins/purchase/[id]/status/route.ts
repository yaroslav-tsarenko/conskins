import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { reconcilePurchaseFromProvider } from "@/lib/skins/delivery";

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
  return NextResponse.json({ id: purchase.id, status: reconciled ?? purchase.status });
}
