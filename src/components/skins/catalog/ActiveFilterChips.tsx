"use client";

import { X } from "lucide-react";
import { EXTERIORS } from "@/lib/skins/shared";
import type { FiltersState, PatchFilters } from "./types";

interface Chip {
  key: string;
  label: string;
  remove: Partial<FiltersState>;
}

function buildChips(f: FiltersState): Chip[] {
  const chips: Chip[] = [];
  if (f.search) chips.push({ key: "q", label: `“${f.search}”`, remove: { search: "" } });
  for (const c of f.categories)
    chips.push({ key: `cat:${c}`, label: c, remove: { categories: f.categories.filter((v) => v !== c) } });
  for (const w of f.weapons)
    chips.push({ key: `w:${w}`, label: w, remove: { weapons: f.weapons.filter((v) => v !== w) } });
  for (const r of f.rarities)
    chips.push({ key: `r:${r}`, label: r, remove: { rarities: f.rarities.filter((v) => v !== r) } });
  for (const e of f.exteriors) {
    const meta = EXTERIORS.find((x) => x.code === e);
    chips.push({
      key: `e:${e}`,
      label: meta?.short ?? e,
      remove: { exteriors: f.exteriors.filter((v) => v !== e) },
    });
  }
  for (const c of f.collections)
    chips.push({ key: `col:${c}`, label: c, remove: { collections: f.collections.filter((v) => v !== c) } });
  if (f.pattern) chips.push({ key: "pattern", label: `Pattern: ${f.pattern}`, remove: { pattern: "" } });
  if (f.sticker) chips.push({ key: "sticker", label: `Sticker: ${f.sticker}`, remove: { sticker: "" } });
  if (f.hasStickers) chips.push({ key: "hasStickers", label: "With stickers", remove: { hasStickers: false } });
  if (f.statTrak) chips.push({ key: "st", label: "StatTrak™", remove: { statTrak: false } });
  if (f.souvenir) chips.push({ key: "sv", label: "Souvenir", remove: { souvenir: false } });
  if (f.priceMin) chips.push({ key: "pmin", label: `≥ $${f.priceMin}`, remove: { priceMin: "" } });
  if (f.priceMax) chips.push({ key: "pmax", label: `≤ $${f.priceMax}`, remove: { priceMax: "" } });
  if (f.floatMin) chips.push({ key: "fmin", label: `Float ≥ ${f.floatMin}`, remove: { floatMin: "" } });
  if (f.floatMax) chips.push({ key: "fmax", label: `Float ≤ ${f.floatMax}`, remove: { floatMax: "" } });
  return chips;
}

export function ActiveFilterChips({
  filters,
  patch,
  onClearAll,
}: {
  filters: FiltersState;
  patch: PatchFilters;
  onClearAll: () => void;
}) {
  const chips = buildChips(filters);
  if (chips.length === 0) return null;

  return (
    <div className="mb-4 flex flex-wrap items-center gap-1.5">
      {chips.map((c) => (
        <button
          key={c.key}
          type="button"
          onClick={() => patch(c.remove)}
          className="group inline-flex items-center gap-1 rounded-full border border-[color:var(--color-primary)]/40 bg-[color:var(--color-primary-tint)] py-1 pl-2.5 pr-1.5 text-[12px] font-medium text-[color:var(--color-text)] transition hover:border-[color:var(--color-danger)]/60"
        >
          {c.label}
          <X className="h-3 w-3 text-[color:var(--color-text-tertiary)] transition group-hover:text-[color:var(--color-danger)]" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 text-[12px] font-semibold text-[color:var(--color-accent)] hover:underline"
      >
        Clear all
      </button>
    </div>
  );
}
