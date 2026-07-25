"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";

const SORTS = [
  { value: "price_asc", label: "Price: low → high" },
  { value: "price_desc", label: "Price: high → low" },
  { value: "float_asc", label: "Float: low → high" },
  { value: "float_desc", label: "Float: high → low" },
  { value: "discount", label: "Best discount" },
  { value: "newest", label: "Newest" },
];

export function SortBar({
  total,
  loading,
  sort,
  onSortChange,
  activeCount,
  onOpenFilters,
}: {
  total: number | null;
  loading: boolean;
  sort: string;
  onSortChange: (v: string) => void;
  activeCount: number;
  onOpenFilters: () => void;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenFilters}
          className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-3 py-2 text-sm font-medium lg:hidden"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
          {activeCount > 0 && (
            <span className="tnum rounded-full bg-[color:var(--color-primary)] px-1.5 text-xs font-bold text-[color:var(--color-primary-fg)]">
              {activeCount}
            </span>
          )}
        </button>
        <span className="tnum font-mono text-[13px] text-[color:var(--color-text-secondary)]">
          {total != null ? (
            <>
              <span className="font-semibold text-[color:var(--color-text)]">
                {total.toLocaleString()}
              </span>{" "}
              offers
            </>
          ) : loading ? (
            "Loading…"
          ) : (
            "…"
          )}
        </span>
      </div>

      <div className="relative">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] py-2 pl-3 pr-8 text-sm outline-none transition focus:border-[color:var(--color-primary)]/60"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-text-tertiary)]" />
      </div>
    </div>
  );
}
