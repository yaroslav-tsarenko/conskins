"use client";

import type { CatalogItem } from "@/lib/skins/queries";
import { SkinCard, SkinCardSkeleton } from "../SkinCard";

export function CatalogGrid({
  items,
  loading,
  locale,
  hasMore,
  onLoadMore,
  onClearAll,
}: {
  items: CatalogItem[];
  loading: boolean;
  locale: string;
  hasMore: boolean;
  onLoadMore: () => void;
  onClearAll: () => void;
}) {
  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {items.map((it) => (
          <SkinCard key={it.listingId} item={it} locale={locale} />
        ))}
        {loading &&
          items.length === 0 &&
          Array.from({ length: 12 }).map((_, i) => <SkinCardSkeleton key={i} />)}
      </div>

      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-24 text-center">
          <div className="font-display text-sm font-bold uppercase tracking-wide text-[color:var(--color-text)]">
            No skins match these filters
          </div>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Try loosening the float or price range, or reset everything.
          </p>
          <button
            type="button"
            onClick={onClearAll}
            className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-2 text-sm font-medium transition hover:border-[color:var(--color-primary)]/60"
          >
            Reset filters
          </button>
        </div>
      )}

      {hasMore && items.length > 0 && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={onLoadMore}
            disabled={loading}
            className="rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-6 py-2.5 text-sm font-semibold transition hover:border-[color:var(--color-primary)]/60 hover:shadow-[var(--shadow-glow-volt)] disabled:opacity-50"
          >
            {loading ? "Loading…" : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}
