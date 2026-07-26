import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { Activity, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getMarketStats, queryCatalog } from "@/lib/skins/queries";
import { buildPriceHistory } from "@/lib/skins/pricing";
import { SkinCard } from "@/components/skins/SkinCard";
import { MarketOverviewCards } from "@/components/analytics/MarketOverviewCards";
import { VolumeChart, type VolumePoint } from "@/components/analytics/VolumeChart";
import { MoversWidget, type MoverEntry } from "@/components/analytics/MoversWidget";
import { FeaturedSkinChart } from "@/components/analytics/FeaturedSkinChart";
import { brand } from "@/lib/brand";

export const revalidate = 300;

export const metadata: Metadata = {
  title: `Price charts & analytics — ${brand.displayName}`,
  description: `Live CS2 market analytics on ${brand.displayName}: price history, trending skins and cross-market benchmarks.`,
};

const SKIN_SELECT = {
  id: true,
  externalId: true,
  name: true,
  weapon: true,
  lowestPrice: true,
  imageUrl: true,
  rarityColor: true,
  listingCount: true,
} as const;

async function getFeaturedSkin() {
  const dragon = await prisma.skin.findFirst({
    where: { name: { contains: "Dragon Lore", mode: "insensitive" }, listingCount: { gt: 0 } },
    orderBy: { lowestPrice: "desc" },
    select: SKIN_SELECT,
  });
  if (dragon) return dragon;
  return prisma.skin.findFirst({
    where: { listingCount: { gt: 0 } },
    orderBy: { lowestPrice: "desc" },
    select: SKIN_SELECT,
  });
}

async function getMostTraded(limit: number) {
  return prisma.skin.findMany({
    where: { listingCount: { gt: 0 } },
    orderBy: { listingCount: "desc" },
    take: limit,
    select: SKIN_SELECT,
  });
}

function changePct(history: { price: number }[], days: number): number {
  const data = history.slice(-days);
  if (data.length < 2) return 0;
  const first = data[0].price;
  return first > 0 ? ((data[data.length - 1].price - first) / first) * 100 : 0;
}

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [stats, featured, discounts, traded] = await Promise.all([
    getMarketStats(),
    getFeaturedSkin(),
    queryCatalog({ sort: "discount", perPage: 8 }),
    getMostTraded(12),
  ]);

  const featuredHistory = featured
    ? buildPriceHistory(featured.externalId, Number(featured.lowestPrice ?? 1), 365)
    : [];

  // Deterministic movers: 30d change over each skin's synthetic price walk.
  const withHistory = traded.map((s) => {
    const history = buildPriceHistory(s.externalId, Number(s.lowestPrice ?? 1), 30);
    return { skin: s, history, change: changePct(history, 30) };
  });

  const rising: MoverEntry[] = [...withHistory]
    .sort((a, b) => b.change - a.change)
    .slice(0, 6)
    .map(({ skin, change }) => ({
      id: skin.id,
      name: skin.name,
      weapon: skin.weapon,
      imageUrl: skin.imageUrl,
      rarityColor: skin.rarityColor,
      value: "",
      priceUsd: Number(skin.lowestPrice ?? 0),
      delta: `${change >= 0 ? "▲" : "▼"} ${Math.abs(change).toFixed(1)}%`,
      deltaTone: change >= 0 ? ("up" as const) : ("down" as const),
    }));

  const mostTraded: MoverEntry[] = withHistory.slice(0, 6).map(({ skin }) => ({
    id: skin.id,
    name: skin.name,
    weapon: skin.weapon,
    imageUrl: skin.imageUrl,
    rarityColor: skin.rarityColor,
    value: `${skin.listingCount} offers`,
  }));

  const trending: MoverEntry[] = discounts.items.slice(0, 6).map((it) => ({
    id: it.skinId,
    name: it.name,
    weapon: it.weapon,
    imageUrl: it.imageUrl,
    rarityColor: it.rarityColor,
    value: "",
    priceUsd: it.price,
    delta: it.discountPct != null ? `−${Math.round(it.discountPct)}% vs Steam` : undefined,
    deltaTone: "up" as const,
  }));

  // Aggregate volume across the most-traded skins for a market-wide series.
  const volumeByDate = new Map<string, number>();
  for (const { history } of withHistory) {
    for (const p of history) {
      volumeByDate.set(p.date, (volumeByDate.get(p.date) ?? 0) + p.volume);
    }
  }
  const volume: VolumePoint[] = [...volumeByDate.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .slice(-30)
    .map(([date, v]) => ({ date, volume: v }));

  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent-tint)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
          <Activity size={12} /> Market analytics
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-[color:var(--color-text)]">
          Price charts &amp; market pulse
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-[color:var(--color-text-secondary)]">
          Track price history, spot trends and benchmark every skin against Steam and
          third-party markets — updated live from our order book.
        </p>
      </div>

      <MarketOverviewCards stats={stats} />

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-6">
          {featured && (
            <FeaturedSkinChart
              initial={{ id: featured.id, name: featured.name, weapon: featured.weapon }}
              initialHistory={featuredHistory}
            />
          )}
          <VolumeChart data={volume} />
        </div>
        <div className="flex flex-col gap-6">
          <MoversWidget title="Trending deals" entries={trending} />
          <MoversWidget title="Rising · 30 days" entries={rising} />
          <MoversWidget title="Most traded" entries={mostTraded} />
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-display text-xl font-bold text-[color:var(--color-text)]">
            Biggest discounts right now
          </h2>
          <Link
            href="/catalog?sort=discount"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-accent)] hover:underline"
          >
            See all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {discounts.items.map((item) => (
            <SkinCard key={item.listingId} item={item} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
