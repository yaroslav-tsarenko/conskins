import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { seededRng, round2, MAX_LISTING_PRICE_USD, type ExteriorCode } from "./shared";

export interface CatalogFilters {
  search?: string;
  weapons?: string[];
  categories?: string[];
  rarities?: string[];
  exteriors?: ExteriorCode[];
  collections?: string[];
  pattern?: string;
  sticker?: string;
  hasStickers?: boolean;
  skinIds?: string[];
  priceMin?: number;
  priceMax?: number;
  floatMin?: number;
  floatMax?: number;
  statTrak?: boolean;
  souvenir?: boolean;
  sort?: string;
  page?: number;
  perPage?: number;
}

export interface CatalogItem {
  listingId: string;
  skinId: string;
  name: string;
  weapon: string;
  category: string;
  rarity: string;
  rarityColor: string;
  exterior: ExteriorCode;
  float: number | null;
  paintSeed: number | null;
  price: number;
  steamPrice: number | null;
  discountPct: number | null;
  isStatTrak: boolean;
  isSouvenir: boolean;
  imageUrl: string | null;
}

export interface CatalogResult {
  items: CatalogItem[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

const SORT_MAP: Record<string, Prisma.SkinListingOrderByWithRelationInput[]> = {
  price_asc: [{ price: "asc" }],
  price_desc: [{ price: "desc" }],
  float_asc: [{ float: "asc" }],
  float_desc: [{ float: "desc" }],
  discount: [{ discountPct: "desc" }],
  newest: [{ createdAt: "desc" }],
};

export function buildListingWhere(f: CatalogFilters): Prisma.SkinListingWhereInput {
  const skin: Prisma.SkinWhereInput = {};
  if (f.search) skin.name = { contains: f.search, mode: "insensitive" };
  if (f.weapons?.length) skin.weapon = { in: f.weapons };
  if (f.categories?.length) skin.category = { in: f.categories };
  if (f.rarities?.length) skin.rarity = { in: f.rarities };
  if (f.collections?.length) skin.collection = { in: f.collections };
  if (f.pattern) skin.pattern = { contains: f.pattern, mode: "insensitive" };
  if (f.skinIds?.length) skin.id = { in: f.skinIds };

  const where: Prisma.SkinListingWhereInput = {
    status: "available",
  };
  if (Object.keys(skin).length) where.skin = skin;
  if (f.exteriors?.length) where.exterior = { in: f.exteriors };
  if (f.statTrak) where.isStatTrak = true;
  if (f.souvenir) where.isSouvenir = true;
  if (f.hasStickers) {
    where.AND = [
      { NOT: { stickers: { equals: Prisma.DbNull } } },
      { NOT: { stickers: { equals: [] } } },
    ];
  }

  // Never surface a listing above the platform price ceiling, whatever the DB holds.
  const priceMax =
    f.priceMax != null ? Math.min(f.priceMax, MAX_LISTING_PRICE_USD) : MAX_LISTING_PRICE_USD;
  where.price = { lte: priceMax };
  if (f.priceMin != null) where.price.gte = f.priceMin;
  if (f.floatMin != null || f.floatMax != null) {
    where.float = {};
    if (f.floatMin != null) where.float.gte = f.floatMin;
    if (f.floatMax != null) where.float.lte = f.floatMax;
  }
  return where;
}

export async function queryCatalog(f: CatalogFilters): Promise<CatalogResult> {
  const page = Math.max(1, f.page ?? 1);
  const perPage = Math.min(96, Math.max(12, f.perPage ?? 48));
  const where = buildListingWhere(f);
  const orderBy = SORT_MAP[f.sort ?? "price_asc"] ?? SORT_MAP.price_asc;

  // Sticker-name search: Prisma's Json filters can't do a fuzzy match inside
  // an arbitrary array shape, so pre-select matching listing ids via raw SQL.
  const sticker = f.sticker?.trim();
  if (sticker) {
    const rows = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM "SkinListing"
      WHERE status = 'available'
        AND stickers IS NOT NULL
        AND stickers::text ILIKE ${`%${sticker}%`}
      LIMIT 2000
    `;
    where.id = { in: rows.map((r) => r.id) };
  }

  const [rows, total] = await Promise.all([
    prisma.skinListing.findMany({
      where,
      orderBy,
      skip: (page - 1) * perPage,
      take: perPage,
      select: {
        id: true,
        skinId: true,
        exterior: true,
        float: true,
        paintSeed: true,
        price: true,
        steamPrice: true,
        discountPct: true,
        isStatTrak: true,
        isSouvenir: true,
        imageUrl: true,
        skin: {
          select: {
            name: true,
            weapon: true,
            category: true,
            rarity: true,
            rarityColor: true,
            imageUrl: true,
          },
        },
      },
    }),
    prisma.skinListing.count({ where }),
  ]);

  const items: CatalogItem[] = rows.map((r) => ({
    listingId: r.id,
    skinId: r.skinId,
    name: r.skin.name,
    weapon: r.skin.weapon,
    category: r.skin.category,
    rarity: r.skin.rarity,
    rarityColor: r.skin.rarityColor,
    exterior: r.exterior as ExteriorCode,
    float: r.float,
    paintSeed: r.paintSeed,
    price: Number(r.price),
    steamPrice: r.steamPrice != null ? Number(r.steamPrice) : null,
    discountPct: r.discountPct,
    isStatTrak: r.isStatTrak,
    isSouvenir: r.isSouvenir,
    imageUrl: r.imageUrl ?? r.skin.imageUrl,
  }));

  return {
    items,
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

// Distinct facet values for building the filter sidebar.
export async function getCatalogFacets() {
  const [weapons, categories, collections] = await Promise.all([
    prisma.skin.findMany({
      distinct: ["weapon"],
      select: { weapon: true, category: true },
      orderBy: { weapon: "asc" },
    }),
    prisma.skin.findMany({
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
    prisma.skin.findMany({
      distinct: ["collection"],
      where: { collection: { not: null } },
      select: { collection: true },
      orderBy: { collection: "asc" },
    }),
  ]);
  return {
    weapons: weapons.map((w) => ({ weapon: w.weapon, category: w.category })),
    categories: categories.map((c) => c.category),
    collections: collections
      .map((c) => c.collection)
      .filter((c): c is string => c != null),
  };
}

export interface MarketStats {
  totalListings: number;
  totalSkins: number;
  avgDiscountPct: number;
  marketValue: number;
}

// Aggregate marketplace figures for the homepage stats strip & analytics page.
export async function getMarketStats(): Promise<MarketStats> {
  const priceCeiling = { lte: MAX_LISTING_PRICE_USD };
  const [totalListings, totalSkins, agg, discountAgg] = await Promise.all([
    prisma.skinListing.count({ where: { status: "available", price: priceCeiling } }),
    prisma.skin.count(),
    prisma.skinListing.aggregate({
      where: { status: "available", price: priceCeiling },
      _sum: { price: true },
    }),
    prisma.skinListing.aggregate({
      where: { status: "available", discountPct: { gt: 0 }, price: priceCeiling },
      _avg: { discountPct: true },
    }),
  ]);
  return {
    totalListings,
    totalSkins,
    avgDiscountPct: discountAgg._avg.discountPct ?? 0,
    marketValue: Number(agg._sum.price ?? 0),
  };
}

export interface SkinSuggestion {
  id: string;
  name: string;
  weapon: string;
  category: string;
  rarityColor: string;
  imageUrl: string | null;
  lowestPrice: number | null;
}

// Prefix/substring search over skin names for the header autocomplete.
export async function getSkinSuggestions(query: string, limit = 8): Promise<SkinSuggestion[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const rows = await prisma.skin.findMany({
    where: {
      name: { contains: q, mode: "insensitive" },
      listingCount: { gt: 0 },
      lowestPrice: { lte: MAX_LISTING_PRICE_USD },
    },
    orderBy: [{ listingCount: "desc" }, { lowestPrice: "asc" }],
    take: Math.min(12, Math.max(1, limit)),
    select: {
      id: true,
      name: true,
      weapon: true,
      category: true,
      rarityColor: true,
      imageUrl: true,
      lowestPrice: true,
    },
  });
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    weapon: r.weapon,
    category: r.category,
    rarityColor: r.rarityColor,
    imageUrl: r.imageUrl,
    lowestPrice: r.lowestPrice != null ? Number(r.lowestPrice) : null,
  }));
}

// Full skin detail + its listings for the item page.
export async function getSkinDetail(skinId: string) {
  const skin = await prisma.skin.findUnique({
    where: { id: skinId },
    include: {
      listings: {
        where: { status: "available", price: { lte: MAX_LISTING_PRICE_USD } },
        orderBy: { price: "asc" },
      },
    },
  });
  return skin;
}

export interface SkinListingView {
  id: string;
  exterior: ExteriorCode;
  float: number | null;
  paintSeed: number | null;
  phase: string | null;
  isStatTrak: boolean;
  isSouvenir: boolean;
  stickers: unknown;
  inspectLink: string | null;
  imageUrl: string | null;
  price: number;
  steamPrice: number | null;
  discountPct: number | null;
  market: string;
}

export interface SkinPageData {
  id: string;
  externalId: string;
  name: string;
  weapon: string;
  category: string;
  rarity: string;
  rarityColor: string;
  collection: string | null;
  pattern: string | null;
  minFloat: number | null;
  maxFloat: number | null;
  imageUrl: string | null;
  isKnife: boolean;
  isGloves: boolean;
  lowestPrice: number | null;
  listings: SkinListingView[];
}

// Clean, client-serializable view of a skin + its listings.
export async function getSkinPageData(skinId: string): Promise<SkinPageData | null> {
  const skin = await getSkinDetail(skinId);
  if (!skin) return null;

  return {
    id: skin.id,
    externalId: skin.externalId,
    name: skin.name,
    weapon: skin.weapon,
    category: skin.category,
    rarity: skin.rarity,
    rarityColor: skin.rarityColor,
    collection: skin.collection,
    pattern: skin.pattern,
    minFloat: skin.minFloat,
    maxFloat: skin.maxFloat,
    imageUrl: skin.imageUrl,
    isKnife: skin.isKnife,
    isGloves: skin.isGloves,
    lowestPrice: skin.lowestPrice != null ? Number(skin.lowestPrice) : null,
    listings: skin.listings.map((l) => ({
      id: l.id,
      exterior: l.exterior as ExteriorCode,
      float: l.float,
      paintSeed: l.paintSeed,
      phase: l.phase,
      isStatTrak: l.isStatTrak,
      isSouvenir: l.isSouvenir,
      stickers: l.stickers,
      inspectLink: l.inspectLink,
      imageUrl: l.imageUrl ?? skin.imageUrl,
      price: Number(l.price),
      steamPrice: l.steamPrice != null ? Number(l.steamPrice) : null,
      discountPct: l.discountPct,
      market: l.market,
    })),
  };
}

export interface TickerListing {
  id: string;
  skinId: string;
  name: string;
  weapon: string;
  price: number;
  discountPct: number | null;
  rarityColor: string;
  imageUrl: string | null;
}

// Newest available listings — powers the live market ticker on the homepage.
export async function getRecentListings(limit = 18): Promise<TickerListing[]> {
  const rows = await prisma.skinListing.findMany({
    where: { status: "available", price: { lte: MAX_LISTING_PRICE_USD } },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      price: true,
      discountPct: true,
      imageUrl: true,
      skin: { select: { id: true, name: true, weapon: true, rarityColor: true, imageUrl: true } },
    },
  });
  return rows.map((r) => ({
    id: r.id,
    skinId: r.skin.id,
    name: r.skin.name,
    weapon: r.skin.weapon,
    price: Number(r.price),
    discountPct: r.discountPct,
    rarityColor: r.skin.rarityColor,
    imageUrl: r.imageUrl ?? r.skin.imageUrl,
  }));
}

export interface RarityBucket {
  rarity: string;
  count: number;
  fromPrice: number | null;
}

// Real distribution of tradable skins across rarity tiers — powers the
// interactive rarity explorer. Grouped on Skin so counts reflect unique skins
// that currently have at least one listing.
export async function getRarityBreakdown(): Promise<RarityBucket[]> {
  const rows = await prisma.skin.groupBy({
    by: ["rarity"],
    where: { listingCount: { gt: 0 }, lowestPrice: { lte: MAX_LISTING_PRICE_USD } },
    _count: { _all: true },
    _min: { lowestPrice: true },
  });
  return rows.map((r) => ({
    rarity: r.rarity,
    count: r._count._all,
    fromPrice: r._min.lowestPrice != null ? Number(r._min.lowestPrice) : null,
  }));
}

export interface CategoryShowcaseEntry {
  category: string;
  count: number;
  fromPrice: number | null;
  hero: {
    skinId: string;
    name: string;
    imageUrl: string | null;
    rarityColor: string;
  } | null;
}

// Per-category counts + a hero skin — powers the homepage category explorer.
export async function getCategoryShowcase(): Promise<CategoryShowcaseEntry[]> {
  const groups = await prisma.skin.groupBy({
    by: ["category"],
    where: { listingCount: { gt: 0 }, lowestPrice: { lte: MAX_LISTING_PRICE_USD } },
    _count: { _all: true },
    _min: { lowestPrice: true },
  });

  const heroes = await Promise.all(
    groups.map((g) =>
      prisma.skin.findFirst({
        where: {
          category: g.category,
          listingCount: { gt: 0 },
          imageUrl: { not: null },
          lowestPrice: { lte: MAX_LISTING_PRICE_USD },
        },
        orderBy: { lowestPrice: "desc" },
        select: { id: true, name: true, imageUrl: true, rarityColor: true },
      }),
    ),
  );

  return groups.map((g, i) => ({
    category: g.category,
    count: g._count._all,
    fromPrice: g._min.lowestPrice != null ? Number(g._min.lowestPrice) : null,
    hero: heroes[i]
      ? {
          skinId: heroes[i]!.id,
          name: heroes[i]!.name,
          imageUrl: heroes[i]!.imageUrl,
          rarityColor: heroes[i]!.rarityColor,
        }
      : null,
  }));
}

export interface CollectionSummary {
  collection: string;
  count: number;
  fromPrice: number | null;
  hero: {
    skinId: string;
    name: string;
    imageUrl: string | null;
    rarityColor: string;
  } | null;
}

// Collections with tradable skins — powers /collections and the homepage showcase.
export async function getCollections(limit?: number): Promise<CollectionSummary[]> {
  const groups = await prisma.skin.groupBy({
    by: ["collection"],
    where: {
      collection: { not: null },
      listingCount: { gt: 0 },
      lowestPrice: { lte: MAX_LISTING_PRICE_USD },
    },
    _count: { _all: true },
    _min: { lowestPrice: true },
    orderBy: { _count: { collection: "desc" } },
    ...(limit ? { take: limit } : {}),
  });

  const heroes = await Promise.all(
    groups.map((g) =>
      prisma.skin.findFirst({
        where: {
          collection: g.collection,
          listingCount: { gt: 0 },
          imageUrl: { not: null },
          lowestPrice: { lte: MAX_LISTING_PRICE_USD },
        },
        orderBy: { lowestPrice: "desc" },
        select: { id: true, name: true, imageUrl: true, rarityColor: true },
      }),
    ),
  );

  return groups
    .filter((g) => g.collection != null)
    .map((g, i) => ({
      collection: g.collection as string,
      count: g._count._all,
      fromPrice: g._min.lowestPrice != null ? Number(g._min.lowestPrice) : null,
      hero: heroes[i]
        ? {
            skinId: heroes[i]!.id,
            name: heroes[i]!.name,
            imageUrl: heroes[i]!.imageUrl,
            rarityColor: heroes[i]!.rarityColor,
          }
        : null,
    }));
}

export interface RecentSale {
  id: string;
  skinId: string;
  name: string;
  weapon: string;
  exterior: string;
  float: number | null;
  price: number;
  rarityColor: string;
  imageUrl: string | null;
  soldAgoSec: number;
  synthetic: boolean;
}

// Recent sales feed for the live market terminal. Real SkinPurchase rows are
// merged with deterministic synthetic sales (seededRng keyed by listing id) so
// the terminal always has motion even on a quiet market.
export async function getRecentSales(limit = 20): Promise<RecentSale[]> {
  const take = Math.min(40, Math.max(5, limit));

  const [purchases, pool] = await Promise.all([
    prisma.skinPurchase.findMany({
      where: { status: { in: ["completed", "trade_sent"] } },
      orderBy: { createdAt: "desc" },
      take,
      select: {
        id: true,
        price: true,
        createdAt: true,
        listing: {
          select: {
            exterior: true,
            float: true,
            imageUrl: true,
            skin: {
              select: { id: true, name: true, weapon: true, rarityColor: true, imageUrl: true },
            },
          },
        },
      },
    }),
    prisma.skinListing.findMany({
      where: { status: "available", price: { lte: MAX_LISTING_PRICE_USD } },
      orderBy: { discountPct: "desc" },
      take: take * 2,
      select: {
        id: true,
        exterior: true,
        float: true,
        price: true,
        imageUrl: true,
        skin: {
          select: { id: true, name: true, weapon: true, rarityColor: true, imageUrl: true },
        },
      },
    }),
  ]);

  const now = Date.now();
  const real: RecentSale[] = purchases.map((p) => ({
    id: p.id,
    skinId: p.listing.skin.id,
    name: p.listing.skin.name,
    weapon: p.listing.skin.weapon,
    exterior: p.listing.exterior,
    float: p.listing.float,
    price: Number(p.price),
    rarityColor: p.listing.skin.rarityColor,
    imageUrl: p.listing.imageUrl ?? p.listing.skin.imageUrl,
    soldAgoSec: Math.max(1, Math.floor((now - p.createdAt.getTime()) / 1000)),
    synthetic: false,
  }));

  // Rotate the synthetic window every 5 minutes so the feed feels alive but
  // stays deterministic within a revalidation period.
  const bucket = Math.floor(now / 300_000);
  const synthetic: RecentSale[] = pool
    .map((l) => {
      const rng = seededRng(`${l.id}:${bucket}`);
      return { l, r: rng() };
    })
    .sort((a, b) => a.r - b.r)
    .slice(0, Math.max(0, take - real.length))
    .map(({ l, r }) => ({
      id: `syn-${l.id}`,
      skinId: l.skin.id,
      name: l.skin.name,
      weapon: l.skin.weapon,
      exterior: l.exterior,
      float: l.float,
      price: round2(Number(l.price) * (0.97 + r * 0.05)),
      rarityColor: l.skin.rarityColor,
      imageUrl: l.imageUrl ?? l.skin.imageUrl,
      soldAgoSec: Math.floor(5 + r * 280),
      synthetic: true,
    }));

  return [...real, ...synthetic]
    .sort((a, b) => a.soldAgoSec - b.soldAgoSec)
    .slice(0, take);
}
