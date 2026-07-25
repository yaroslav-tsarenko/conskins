import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { JsonLd } from "@/components/shared/SEO/JsonLd";
import {
  getMarketStats,
  queryCatalog,
  getRecentListings,
  getRarityBreakdown,
  getCategoryShowcase,
  getCollections,
  getRecentSales,
  type CatalogItem,
} from "@/lib/skins/queries";
import { buildPriceHistory } from "@/lib/skins/pricing";
import { Link } from "@/i18n/routing";
import { Hero, TrendingSkinCard, type FeaturedSkinView } from "@/components/home/Hero";
import { BenefitsRow } from "@/components/home/BenefitsRow";
import { LiveMarketTerminal } from "@/components/home/LiveMarketTerminal";
import { FeaturedTabs } from "@/components/home/FeaturedTabs";
import { CategorySlider } from "@/components/home/CategorySlider";
import { PriceCompareTool } from "@/components/home/PriceCompareTool";
import { SkinFinder } from "@/components/home/SkinFinder";
import { MarketPulseWidgets, type PulseEntry } from "@/components/home/MarketPulseWidgets";
import { CollectionsStory } from "@/components/home/CollectionsStory";
import { CollectionsShowcase } from "@/components/home/CollectionsShowcase";
import { LoadoutTeaser } from "@/components/home/LoadoutTeaser";
import { NewsSection } from "@/components/home/NewsSection";
import { SellerToolsSection } from "@/components/home/SellerToolsSection";
import { MarketTicker } from "@/components/home/MarketTicker";
import { RarityExplorer } from "@/components/home/RarityExplorer";
import { WearSlider } from "@/components/home/WearSlider";
import { MarketOverviewCards } from "@/components/analytics/MarketOverviewCards";
import { brand } from "@/lib/brand";
import {
  ArrowRight,
  Compass,
  Diamond,
  Flame,
  Layers,
  LayoutGrid,
  Newspaper,
  Radio,
  Scale,
  Activity,
} from "lucide-react";

export const revalidate = 60;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: `${brand.displayName} — ${brand.tagline}`,
    description: brand.description,
    alternates: { canonical: `/${locale}` },
    openGraph: { url: `/${locale}` },
  };
}

async function getFeaturedSkin() {
  const dragon = await prisma.skin.findFirst({
    where: { name: { contains: "Dragon Lore", mode: "insensitive" }, listingCount: { gt: 0 } },
    orderBy: { lowestPrice: "desc" },
    select: { id: true, externalId: true, name: true, weapon: true, lowestPrice: true, imageUrl: true, rarityColor: true },
  });
  if (dragon) return dragon;
  return prisma.skin.findFirst({
    where: { listingCount: { gt: 0 } },
    orderBy: { lowestPrice: "desc" },
    select: { id: true, externalId: true, name: true, weapon: true, lowestPrice: true, imageUrl: true, rarityColor: true },
  });
}

async function getPulseEntries(): Promise<PulseEntry[]> {
  const skins = await prisma.skin.findMany({
    where: { listingCount: { gt: 0 }, lowestPrice: { not: null } },
    orderBy: { listingCount: "desc" },
    take: 4,
    select: { id: true, externalId: true, name: true, lowestPrice: true },
  });
  return skins.map((s) => ({
    skinId: s.id,
    name: s.name,
    price: Number(s.lowestPrice),
    history: buildPriceHistory(s.externalId, Number(s.lowestPrice), 90),
  }));
}

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  href,
  cta,
}: {
  icon: React.ElementType;
  eyebrow: string;
  title: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-3">
      <div>
        <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
          <Icon size={13} /> {eyebrow}
        </div>
        <h2 className="mt-1.5 font-display text-[clamp(1.35rem,3vw,1.8rem)] font-bold uppercase tracking-tight text-[color:var(--color-text)]">
          {title}
        </h2>
      </div>
      {href && cta && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-primary)] hover:underline"
        >
          {cta} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const [
    stats,
    featured,
    deals,
    premium,
    recent,
    rarities,
    categories,
    collections,
    sales,
    pulse,
    knives,
    gloves,
    redSkins,
    budget,
  ] = await Promise.all([
    getMarketStats(),
    getFeaturedSkin(),
    queryCatalog({ sort: "discount", perPage: 12 }),
    queryCatalog({ sort: "price_desc", perPage: 12 }),
    getRecentListings(18),
    getRarityBreakdown(),
    getCategoryShowcase(),
    getCollections(4),
    getRecentSales(20),
    getPulseEntries(),
    queryCatalog({ categories: ["Knife"], sort: "price_desc", perPage: 12 }),
    queryCatalog({ categories: ["Gloves"], sort: "price_desc", perPage: 12 }),
    queryCatalog({ search: "red", sort: "price_desc", perPage: 12 }),
    queryCatalog({ priceMax: 50, sort: "discount", perPage: 12 }),
  ]);

  let featuredView: FeaturedSkinView | null = null;
  if (featured) {
    const price = featured.lowestPrice != null ? Number(featured.lowestPrice) : 0;
    const hist = buildPriceHistory(featured.externalId, price, 30);
    const change30d =
      hist.length > 1 && hist[0].price > 0
        ? ((hist[hist.length - 1].price - hist[0].price) / hist[0].price) * 100
        : 0;
    featuredView = {
      id: featured.id,
      name: featured.name,
      weapon: featured.weapon,
      lowestPrice: featured.lowestPrice != null ? price : null,
      imageUrl: featured.imageUrl,
      rarityColor: featured.rarityColor,
      change30d,
    };
  }

  const byCategory = (items: CatalogItem[], cat: string) =>
    items.find((i) => i.category === cat);
  const loadoutSlots = [
    knives.items[0],
    gloves.items[0],
    byCategory(deals.items, "Rifle") ?? byCategory(premium.items, "Rifle"),
    byCategory(deals.items, "Pistol") ?? byCategory(premium.items, "Pistol"),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: brand.displayName,
          legalName: brand.company.legalName,
          alternateName: [brand.domain],
          url: brand.url,
          sameAs: [brand.url],
          description: brand.description,
        }}
      />

      <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-8 sm:px-6 lg:px-8">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Hero stats={stats} floating={premium.items.slice(0, 3)} />

        {/* ── Live side modules: recent sales + trending skin ──── */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <SectionHeader icon={Activity} eyebrow="Ticker tape" title="Live market feed" />
            <LiveMarketTerminal initial={sales} />
          </div>
          {featuredView && (
            <div className="flex flex-col">
              <SectionHeader
                icon={Flame}
                eyebrow="Spotlight"
                title="Trending now"
                href="/catalog?sort=price_desc"
                cta="High tier"
              />
              <TrendingSkinCard featured={featuredView} />
            </div>
          )}
        </section>

        {/* ── Live ticker ──────────────────────────────────────── */}
        <section className="mt-10">
          <div className="mb-3 flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
            <Radio size={13} /> Live market · newest listings
          </div>
          <MarketTicker items={recent} />
        </section>

        {/* ── Benefits ─────────────────────────────────────────── */}
        <section className="mt-10">
          <BenefitsRow stats={stats} />
        </section>

        {/* ── Featured marketplace tabs ────────────────────────── */}
        <section className="mt-14">
          <SectionHeader icon={Flame} eyebrow="Featured marketplace" title="Handpicked for you" />
          <FeaturedTabs initial={deals.items.slice(0, 10)} locale={locale} />
        </section>

        {/* ── Category slider ──────────────────────────────────── */}
        <section className="mt-14">
          <SectionHeader
            icon={LayoutGrid}
            eyebrow="Browse the armory"
            title="Explore by category"
            href="/catalog"
            cta="Open catalog"
          />
          <CategorySlider entries={categories} />
        </section>

        {/* ── Compare + finder ─────────────────────────────────── */}
        <section className="mt-14 grid gap-6 xl:grid-cols-2">
          <div className="flex flex-col">
            <SectionHeader icon={Scale} eyebrow="Decision helper" title="Compare two skins" />
            <div className="flex-1">
              <PriceCompareTool />
            </div>
          </div>
          <div className="flex flex-col">
            <SectionHeader icon={Compass} eyebrow="Smart skin finder" title="Find your next skin" />
            <div className="flex-1">
              <SkinFinder locale={locale} />
            </div>
          </div>
        </section>

        {/* ── Market analytics preview ─────────────────────────── */}
        <section className="mt-14">
          <SectionHeader
            icon={Activity}
            eyebrow="Market pulse"
            title="Analytics at a glance"
            href="/analytics"
            cta="Open analytics"
          />
          <MarketOverviewCards stats={stats} />
          <div className="mt-4">
            <MarketPulseWidgets entries={pulse} />
          </div>
        </section>

        {/* ── Collections storytelling ─────────────────────────── */}
        <section className="mt-14">
          <SectionHeader
            icon={Layers}
            eyebrow="Curated sets"
            title="Shop the story"
            href="/collections"
            cta="All collections"
          />
          <CollectionsStory
            heroes={{
              knives: knives.items[0],
              red: redSkins.items[0],
              luxury: premium.items[0],
              budget: budget.items[0],
            }}
          />
          {collections.length > 0 && (
            <div className="mt-4">
              <CollectionsShowcase collections={collections} />
            </div>
          )}
        </section>

        {/* ── Loadout teaser ───────────────────────────────────── */}
        <section className="mt-14">
          <LoadoutTeaser slots={loadoutSlots} />
        </section>

        {/* ── Rarity explorer + skin calculator ────────────────── */}
        <section id="calculator" className="mt-14 grid scroll-mt-24 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch">
          <div className="flex flex-col">
            <SectionHeader
              icon={Diamond}
              eyebrow="Explore by tier"
              title="Rarity breakdown"
              href="/catalog"
              cta="Open catalog"
            />
            <RarityExplorer buckets={rarities} />
          </div>
          <div className="flex flex-col">
            <SectionHeader
              icon={Radio}
              eyebrow="Skin calculator"
              title="Wear & float"
              href="/faq"
              cta="Learn more"
            />
            <WearSlider />
          </div>
        </section>

        {/* ── News / guides ────────────────────────────────────── */}
        <section className="mt-14">
          <SectionHeader icon={Newspaper} eyebrow="From the desk" title="Guides & market reads" />
          <NewsSection />
        </section>

        {/* ── Seller tools ─────────────────────────────────────── */}
        <div className="mt-14">
          <SellerToolsSection />
        </div>
      </div>
    </>
  );
}
