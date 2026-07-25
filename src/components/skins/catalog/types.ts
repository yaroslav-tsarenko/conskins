import type { ExteriorCode } from "@/lib/skins/shared";

export interface Facets {
  weapons: { weapon: string; category: string }[];
  categories: string[];
  collections: string[];
}

export interface FiltersState {
  search: string;
  categories: string[];
  weapons: string[];
  rarities: string[];
  exteriors: ExteriorCode[];
  collections: string[];
  pattern: string;
  sticker: string;
  hasStickers: boolean;
  statTrak: boolean;
  souvenir: boolean;
  priceMin: string;
  priceMax: string;
  floatMin: string;
  floatMax: string;
  sort: string;
}

export const DEFAULT_FILTERS: FiltersState = {
  search: "",
  categories: [],
  weapons: [],
  rarities: [],
  exteriors: [],
  collections: [],
  pattern: "",
  sticker: "",
  hasStickers: false,
  statTrak: false,
  souvenir: false,
  priceMin: "",
  priceMax: "",
  floatMin: "",
  floatMax: "",
  sort: "price_asc",
};

export type PatchFilters = (patch: Partial<FiltersState>) => void;

export function csv(v: string | null): string[] {
  if (!v) return [];
  return v.split(",").map((s) => s.trim()).filter(Boolean);
}

export function filtersFromParams(params: URLSearchParams): FiltersState {
  return {
    search: params.get("q") ?? "",
    categories: csv(params.get("category")),
    weapons: csv(params.get("weapon")),
    rarities: csv(params.get("rarity")),
    exteriors: csv(params.get("exterior")) as ExteriorCode[],
    collections: csv(params.get("collection")),
    pattern: params.get("pattern") ?? "",
    sticker: params.get("sticker") ?? "",
    hasStickers: params.get("hasStickers") === "1",
    statTrak: params.get("stattrak") === "1",
    souvenir: params.get("souvenir") === "1",
    priceMin: params.get("priceMin") ?? "",
    priceMax: params.get("priceMax") ?? "",
    floatMin: params.get("floatMin") ?? "",
    floatMax: params.get("floatMax") ?? "",
    sort: params.get("sort") ?? "price_asc",
  };
}

export function filtersToQueryString(f: FiltersState): string {
  const p = new URLSearchParams();
  if (f.search) p.set("q", f.search);
  if (f.categories.length) p.set("category", f.categories.join(","));
  if (f.weapons.length) p.set("weapon", f.weapons.join(","));
  if (f.rarities.length) p.set("rarity", f.rarities.join(","));
  if (f.exteriors.length) p.set("exterior", f.exteriors.join(","));
  if (f.collections.length) p.set("collection", f.collections.join(","));
  if (f.pattern) p.set("pattern", f.pattern);
  if (f.sticker) p.set("sticker", f.sticker);
  if (f.hasStickers) p.set("hasStickers", "1");
  if (f.statTrak) p.set("stattrak", "1");
  if (f.souvenir) p.set("souvenir", "1");
  if (f.priceMin) p.set("priceMin", f.priceMin);
  if (f.priceMax) p.set("priceMax", f.priceMax);
  if (f.floatMin) p.set("floatMin", f.floatMin);
  if (f.floatMax) p.set("floatMax", f.floatMax);
  if (f.sort) p.set("sort", f.sort);
  return p.toString();
}

export function countActiveFilters(f: FiltersState): number {
  return (
    f.categories.length +
    f.weapons.length +
    f.rarities.length +
    f.exteriors.length +
    f.collections.length +
    (f.search ? 1 : 0) +
    (f.pattern ? 1 : 0) +
    (f.sticker ? 1 : 0) +
    (f.hasStickers ? 1 : 0) +
    (f.statTrak ? 1 : 0) +
    (f.souvenir ? 1 : 0) +
    (f.priceMin ? 1 : 0) +
    (f.priceMax ? 1 : 0) +
    (f.floatMin ? 1 : 0) +
    (f.floatMax ? 1 : 0)
  );
}
