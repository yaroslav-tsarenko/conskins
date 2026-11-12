import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { computeFees } from "@/lib/skins/delivery";
import { getBalanceEur } from "@/lib/wallet";
import { fromEur, isCurrency, toEur, type Currency } from "@/lib/rates";

export const runtime = "nodejs";

// What it costs to buy one listing right now, and whether the signed-in buyer's
// site balance covers it. The purchase route re-checks this server-side; this
// endpoint exists so the checkout step can show the real balance and block a
// balance payment that cannot go through, instead of letting the buyer submit
// and fail. Wallet money is EUR; listings are priced in their own currency, so
// both sides are reported.
export async function GET(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json(
      { code: "unauthenticated", error: "Sign in to buy." },
      { status: 401 },
    );
  }

  const listingId = new URL(req.url).searchParams.get("listingId")?.trim();
  if (!listingId) {
    return NextResponse.json(
      { code: "bad_request", error: "Missing listing." },
      { status: 400 },
    );
  }

  const listing = await prisma.skinListing.findUnique({
    where: { id: listingId },
    select: { id: true, price: true, currency: true, status: true },
  });
  if (!listing) {
    return NextResponse.json(
      { code: "not_found", error: "This offer no longer exists." },
      { status: 404 },
    );
  }

  const currency: Currency = isCurrency(listing.currency)
    ? listing.currency
    : "USD";
  const fees = computeFees(Number(listing.price));
  const totalEur = await toEur(fees.total, currency);
  const balanceEur = await getBalanceEur(user.id);
  const shortfallEur = Math.max(0, Math.round((totalEur - balanceEur) * 100) / 100);

  return NextResponse.json({
    ok: true,
    listingId: listing.id,
    available: listing.status === "available",
    currency,
    fees,
    totalEur,
    balanceEur,
    // Same numbers in the listing's currency, so the UI can show one scale.
    balance: await fromEur(balanceEur, currency),
    shortfall: await fromEur(shortfallEur, currency),
    shortfallEur,
    sufficient: shortfallEur <= 0,
  });
}
