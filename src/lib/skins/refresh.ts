// On-demand price refresh for a single skin. Called lazily from the client when
// a user views a skin page (no cron). Reads the briefly-cached SIH catalog and
// syncs this skin's listings to the current market price/steam/image, recomputes
// the skin's lowestPrice, and returns the fresh per-listing prices.

import { prisma } from "@/lib/prisma";
import { getCachedItems, isSihConfigured } from "./sih";
import { round2 } from "./shared";

export interface RefreshedListing {
  id: string;
  price: number;
  steamPrice: number | null;
  discountPct: number | null;
  imageUrl: string | null;
}

export interface RefreshResult {
  refreshed: boolean;
  lowestPrice: number | null;
  listings: RefreshedListing[];
}

export async function refreshSkinPrices(skinId: string): Promise<RefreshResult> {
  const empty: RefreshResult = { refreshed: false, lowestPrice: null, listings: [] };
  if (!isSihConfigured()) return empty;

  const listings = await prisma.skinListing.findMany({
    where: { skinId, status: "available", market: "sih" },
    select: { id: true, marketHashName: true, price: true, steamPrice: true, imageUrl: true },
  });
  if (listings.length === 0) return empty;

  const items = await getCachedItems();

  const updates: RefreshedListing[] = [];
  for (const l of listings) {
    const item = items[l.marketHashName];
    if (!item || typeof item.price !== "number" || item.price <= 0) {
      // No live quote — keep the stored values so the UI stays consistent.
      updates.push({
        id: l.id,
        price: Number(l.price),
        steamPrice: l.steamPrice != null ? Number(l.steamPrice) : null,
        discountPct: null,
        imageUrl: l.imageUrl,
      });
      continue;
    }
    const price = round2(item.price);
    const steamPrice = typeof item.steam === "number" ? round2(item.steam) : null;
    const discountPct =
      steamPrice && steamPrice > price
        ? round2(((steamPrice - price) / steamPrice) * 100)
        : null;
    const imageUrl = item.image ?? l.imageUrl;
    updates.push({ id: l.id, price, steamPrice, discountPct, imageUrl });

    const changed =
      Number(l.price) !== price ||
      (l.steamPrice != null ? Number(l.steamPrice) : null) !== steamPrice ||
      l.imageUrl !== imageUrl;
    if (changed) {
      await prisma.skinListing.update({
        where: { id: l.id },
        data: { price, steamPrice, discountPct, imageUrl },
      });
    }
  }

  const lowestPrice = updates.length ? Math.min(...updates.map((u) => u.price)) : null;
  if (lowestPrice != null) {
    await prisma.skin.update({ where: { id: skinId }, data: { lowestPrice } });
  }

  return { refreshed: true, lowestPrice, listings: updates };
}
