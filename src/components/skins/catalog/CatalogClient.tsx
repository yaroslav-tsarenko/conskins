"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { CatalogItem, CatalogResult } from "@/lib/skins/queries";
import { FilterSidebar } from "./FilterSidebar";
import { ActiveFilterChips } from "./ActiveFilterChips";
import { SortBar } from "./SortBar";
import { CatalogGrid } from "./CatalogGrid";
import { MobileFiltersDrawer } from "./MobileFiltersDrawer";
import {
  DEFAULT_FILTERS,
  countActiveFilters,
  filtersFromParams,
  filtersToQueryString,
  type Facets,
  type FiltersState,
} from "./types";

function useDebounced<T>(value: T, delay = 350): T {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export function CatalogClient({ facets, locale }: { facets: Facets; locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [filters, setFilters] = useState<FiltersState>(() => filtersFromParams(params));
  const [mobileOpen, setMobileOpen] = useState(false);

  const [data, setData] = useState<CatalogResult | null>(null);
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const patch = useCallback((p: Partial<FiltersState>) => {
    setFilters((prev) => ({ ...prev, ...p }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters((prev) => ({ ...DEFAULT_FILTERS, sort: prev.sort }));
  }, []);

  // Debounce the full serialized query — covers text inputs and slider drags alike.
  const queryString = useDebounced(
    useMemo(() => filtersToQueryString(filters), [filters]),
  );

  // Keep URL shareable.
  useEffect(() => {
    router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, { scroll: false });
    setPage(1);
  }, [queryString, pathname, router]);

  const abortRef = useRef<AbortController | null>(null);
  const fetchPage = useCallback(
    async (pageNum: number, append: boolean) => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      setLoading(true);
      try {
        const p = new URLSearchParams(queryString);
        p.set("page", String(pageNum));
        const res = await fetch(`/api/skins?${p.toString()}`, { signal: ac.signal });
        const json = (await res.json()) as CatalogResult;
        setData(json);
        setItems((prev) => (append ? [...prev, ...json.items] : json.items));
        setLoading(false);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error(err);
          setLoading(false);
        }
      }
    },
    [queryString],
  );

  useEffect(() => {
    fetchPage(1, false);
  }, [fetchPage]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next, true);
  };

  const activeCount = countActiveFilters(filters);

  return (
    <div className="mx-auto flex w-full max-w-[var(--max-width)] gap-6 px-4 py-6">
      {/* desktop sidebar — sticky below the header with its own scroll */}
      <aside className="hidden w-[268px] shrink-0 lg:block">
        <div className="sticky top-[84px] flex max-h-[calc(100dvh-104px)] flex-col rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
          <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-3">
            <span className="font-display text-sm font-bold uppercase tracking-wide">Filters</span>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-xs font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                Clear ({activeCount})
              </button>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">
            <FilterSidebar facets={facets} filters={filters} patch={patch} />
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="min-w-0 flex-1">
        <SortBar
          total={data?.total ?? null}
          loading={loading}
          sort={filters.sort}
          onSortChange={(v) => patch({ sort: v })}
          activeCount={activeCount}
          onOpenFilters={() => setMobileOpen(true)}
        />
        <ActiveFilterChips filters={filters} patch={patch} onClearAll={clearAll} />
        <CatalogGrid
          items={items}
          loading={loading}
          locale={locale}
          hasMore={data != null && page < data.totalPages}
          onLoadMore={loadMore}
          onClearAll={clearAll}
        />
      </div>

      <MobileFiltersDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        total={data?.total ?? null}
        activeCount={activeCount}
        onClearAll={clearAll}
        facets={facets}
        filters={filters}
        patch={patch}
      />
    </div>
  );
}
