"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import {
  EXTERIORS,
  RARITY_TIERS,
  MAX_LISTING_PRICE_USD,
  type ExteriorCode,
} from "@/lib/skins/shared";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { FilterGroup, ChipButton, Toggle, TextFilterInput } from "./filterPrimitives";
import type { Facets, FiltersState, PatchFilters } from "./types";
import { useCurrency } from "@/providers/CurrencyProvider";

const RARITIES = Object.entries(RARITY_TIERS)
  .sort((a, b) => a[1].order - b[1].order)
  .map(([name, meta]) => ({ name, color: meta.color }));

const PRICE_CAP = MAX_LISTING_PRICE_USD;

// Wear-band gradient for the float track (FN→BS canonical wear colors).
const WEAR_TRACK =
  "linear-gradient(to right, #3DDC97 0%, #3DDC97 7%, #84cc16 7%, #84cc16 15%, #eab308 15%, #eab308 38%, #f97316 38%, #f97316 45%, #FF4D6D 45%, #FF4D6D 100%)";

function toggleIn<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function ExteriorFilter({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  return (
    <FilterGroup title="Exterior">
      <div className="flex flex-wrap gap-1.5">
        {EXTERIORS.map((e) => (
          <ChipButton
            key={e.code}
            active={filters.exteriors.includes(e.code)}
            onClick={() =>
              patch({ exteriors: toggleIn(filters.exteriors, e.code) as ExteriorCode[] })
            }
          >
            {e.short}
          </ChipButton>
        ))}
      </div>
    </FilterGroup>
  );
}

export function FloatRangeSlider({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  const lo = filters.floatMin === "" ? 0 : Number(filters.floatMin);
  const hi = filters.floatMax === "" ? 1 : Number(filters.floatMax);
  return (
    <FilterGroup title="Float range">
      <RangeSlider
        min={0}
        max={1}
        step={0.001}
        value={[lo, hi]}
        onChange={([a, b]) =>
          patch({
            floatMin: a <= 0 ? "" : String(a),
            floatMax: b >= 1 ? "" : String(b),
          })
        }
        trackBackground={WEAR_TRACK}
        formatValue={(v) => v.toFixed(3)}
        ariaLabel="Float"
      />
    </FilterGroup>
  );
}

export function PriceRangeSlider({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  // Listing prices are stored in USD, so the filter state (priceMin/priceMax)
  // is always kept in USD and sent to the API unchanged. The UI, however,
  // displays and accepts values in the currency selected in the header — we
  // convert on the way in and out so the slider/inputs track that currency.
  const { currency, symbol, rates } = useCurrency();

  const usdToDisplay = (usd: number) => (usd * rates[currency]) / rates.USD;
  const displayToUsd = (disp: number) => (disp * rates.USD) / rates[currency];

  // Round the cap to a clean number in the display currency.
  const capDisplay = useMemo(
    () => Math.max(1, Math.round(usdToDisplay(PRICE_CAP))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currency, rates],
  );

  const loDisplay =
    filters.priceMin === "" ? 0 : Math.min(capDisplay, Math.round(usdToDisplay(Number(filters.priceMin))));
  const hiDisplay =
    filters.priceMax === "" ? capDisplay : Math.min(capDisplay, Math.round(usdToDisplay(Number(filters.priceMax))));

  // Local input state in the display currency (keeps typing smooth without
  // round-trip rounding), re-synced whenever the stored USD value or the
  // selected currency changes.
  const [minInput, setMinInput] = useState(filters.priceMin === "" ? "" : String(loDisplay));
  const [maxInput, setMaxInput] = useState(filters.priceMax === "" ? "" : String(hiDisplay));

  useEffect(() => {
    setMinInput(filters.priceMin === "" ? "" : String(Math.round(usdToDisplay(Number(filters.priceMin)))));
    setMaxInput(filters.priceMax === "" ? "" : String(Math.round(usdToDisplay(Number(filters.priceMax)))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, rates, filters.priceMin, filters.priceMax]);

  const commitMin = (raw: string) => {
    setMinInput(raw);
    if (raw === "") return patch({ priceMin: "" });
    const disp = Number(raw);
    if (!Number.isFinite(disp) || disp <= 0) return patch({ priceMin: "" });
    patch({ priceMin: String(Math.round(displayToUsd(disp) * 100) / 100) });
  };

  const commitMax = (raw: string) => {
    setMaxInput(raw);
    if (raw === "") return patch({ priceMax: "" });
    const disp = Number(raw);
    if (!Number.isFinite(disp) || disp <= 0) return patch({ priceMax: "" });
    patch({ priceMax: String(Math.round(displayToUsd(disp) * 100) / 100) });
  };

  return (
    <FilterGroup title={`Price (${currency})`}>
      <RangeSlider
        min={0}
        max={capDisplay}
        step={Math.max(1, Math.round(capDisplay / 600))}
        value={[loDisplay, hiDisplay]}
        onChange={([a, b]) =>
          patch({
            priceMin: a <= 0 ? "" : String(Math.round(displayToUsd(a) * 100) / 100),
            priceMax: b >= capDisplay ? "" : String(Math.round(displayToUsd(b) * 100) / 100),
          })
        }
        formatValue={(v) => (v >= capDisplay ? `${symbol}${capDisplay}+` : `${symbol}${v}`)}
        ariaLabel="Price"
      />
      <div className="mt-1 flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          placeholder="Min"
          value={minInput}
          onChange={(e) => commitMin(e.target.value)}
          className="tnum w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-2 py-1.5 font-mono text-[13px] outline-none focus:border-[color:var(--color-primary)]/60"
        />
        <span className="text-[color:var(--color-text-tertiary)]">–</span>
        <input
          type="number"
          inputMode="decimal"
          placeholder="Max"
          value={maxInput}
          onChange={(e) => commitMax(e.target.value)}
          className="tnum w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-2 py-1.5 font-mono text-[13px] outline-none focus:border-[color:var(--color-primary)]/60"
        />
      </div>
    </FilterGroup>
  );
}

export function RarityFilter({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  return (
    <FilterGroup title="Rarity">
      <div className="flex flex-col gap-1">
        {RARITIES.map((r) => {
          const active = filters.rarities.includes(r.name);
          return (
            <button
              key={r.name}
              type="button"
              onClick={() => patch({ rarities: toggleIn(filters.rarities, r.name) })}
              className={[
                "flex items-center gap-2.5 rounded-[var(--radius-md)] px-2 py-1.5 text-left text-[13px] transition-colors",
                active
                  ? "bg-[color:var(--color-bg-tertiary)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-tertiary)]/60",
              ].join(" ")}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-[3px] transition-shadow"
                style={{
                  background: r.color,
                  boxShadow: active ? `0 0 8px ${r.color}` : undefined,
                  opacity: active ? 1 : 0.65,
                }}
              />
              {r.name}
            </button>
          );
        })}
      </div>
    </FilterGroup>
  );
}

export function ToggleFilters({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  return (
    <FilterGroup title="Special">
      <div className="flex flex-col gap-2.5">
        <Toggle label="StatTrak™" checked={filters.statTrak} onChange={(v) => patch({ statTrak: v })} />
        <Toggle label="Souvenir" checked={filters.souvenir} onChange={(v) => patch({ souvenir: v })} />
        <Toggle
          label="With stickers"
          checked={filters.hasStickers}
          onChange={(v) => patch({ hasStickers: v })}
        />
      </div>
    </FilterGroup>
  );
}

export function PatternSearch({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  return (
    <FilterGroup title="Pattern">
      <TextFilterInput
        value={filters.pattern}
        onChange={(v) => patch({ pattern: v })}
        placeholder="e.g. Fade, Doppler…"
      />
    </FilterGroup>
  );
}

export function StickerSearch({ filters, patch }: { filters: FiltersState; patch: PatchFilters }) {
  return (
    <FilterGroup title="Sticker">
      <TextFilterInput
        value={filters.sticker}
        onChange={(v) => patch({ sticker: v })}
        placeholder="Sticker name…"
      />
    </FilterGroup>
  );
}

export function CollectionFilter({
  facets,
  filters,
  patch,
}: {
  facets: Facets;
  filters: FiltersState;
  patch: PatchFilters;
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? facets.collections.filter((c) => c.toLowerCase().includes(q))
      : facets.collections;
    return expanded || q ? filtered : filtered.slice(0, 8);
  }, [facets.collections, query, expanded]);

  if (facets.collections.length === 0) return null;

  return (
    <FilterGroup title="Collection">
      <TextFilterInput value={query} onChange={setQuery} placeholder="Filter collections…" />
      <div className="mt-2 flex max-h-52 flex-col gap-0.5 overflow-y-auto">
        {list.map((c) => {
          const active = filters.collections.includes(c);
          return (
            <button
              key={c}
              type="button"
              onClick={() => patch({ collections: toggleIn(filters.collections, c) })}
              className={[
                "truncate rounded-[var(--radius-sm)] px-2 py-1.5 text-left text-[12.5px] transition-colors",
                active
                  ? "bg-[color:var(--color-primary-tint)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-tertiary)]/60",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>
      {!query && facets.collections.length > 8 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-1.5 inline-flex items-center gap-1 text-[12px] font-semibold text-[color:var(--color-accent)] hover:underline"
        >
          {expanded ? "Show less" : `Show all ${facets.collections.length}`}
          <ChevronDown size={12} className={expanded ? "rotate-180" : ""} />
        </button>
      )}
    </FilterGroup>
  );
}

export function WeaponFilter({
  facets,
  filters,
  patch,
}: {
  facets: Facets;
  filters: FiltersState;
  patch: PatchFilters;
}) {
  const weaponsByCategory = useMemo(() => {
    const map = new Map<string, string[]>();
    for (const { weapon, category } of facets.weapons) {
      if (!map.has(category)) map.set(category, []);
      map.get(category)!.push(weapon);
    }
    return [...map.entries()];
  }, [facets.weapons]);

  return (
    <FilterGroup title="Weapon">
      <div className="flex flex-col gap-3">
        {weaponsByCategory.map(([category, ws]) => (
          <div key={category}>
            <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
              {category}
            </div>
            <div className="flex flex-wrap gap-1">
              {ws.map((w) => (
                <ChipButton
                  key={w}
                  small
                  active={filters.weapons.includes(w)}
                  onClick={() => patch({ weapons: toggleIn(filters.weapons, w) })}
                >
                  {w}
                </ChipButton>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FilterGroup>
  );
}

export function FilterSidebar({
  facets,
  filters,
  patch,
}: {
  facets: Facets;
  filters: FiltersState;
  patch: PatchFilters;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--color-text-tertiary)]" />
        <input
          value={filters.search}
          onChange={(e) => patch({ search: e.target.value })}
          placeholder="Search skins…"
          className="w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-2 pl-9 pr-3 text-sm text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-primary)]/60"
        />
      </div>

      <ExteriorFilter filters={filters} patch={patch} />
      <FloatRangeSlider filters={filters} patch={patch} />
      <PriceRangeSlider filters={filters} patch={patch} />
      <RarityFilter filters={filters} patch={patch} />
      <ToggleFilters filters={filters} patch={patch} />
      <PatternSearch filters={filters} patch={patch} />
      <StickerSearch filters={filters} patch={patch} />
      {/* category */}
      {facets.categories.length > 0 && (
        <FilterGroup title="Category">
          <div className="flex flex-wrap gap-1.5">
            {facets.categories.map((c) => (
              <ChipButton
                key={c}
                active={filters.categories.includes(c)}
                onClick={() => patch({ categories: toggleIn(filters.categories, c) })}
              >
                {c}
              </ChipButton>
            ))}
          </div>
        </FilterGroup>
      )}
      <CollectionFilter facets={facets} filters={filters} patch={patch} />
      <WeaponFilter facets={facets} filters={filters} patch={patch} />
    </div>
  );
}
