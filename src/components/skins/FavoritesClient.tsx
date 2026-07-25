"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { CatalogItem, CatalogResult } from "@/lib/skins/queries";
import { useFavorites } from "@/providers/FavoritesProvider";
import { SkinCard, SkinCardSkeleton } from "./SkinCard";

export function FavoritesClient({ locale }: { locale: string }) {
  const { ids, ready } = useFavorites();
  const [items, setItems] = useState<CatalogItem[] | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (ids.length === 0) {
      setItems([]);
      return;
    }
    const ac = new AbortController();
    fetch(`/api/skins?skinIds=${ids.join(",")}&perPage=96&sort=price_asc`, {
      signal: ac.signal,
    })
      .then((res) => res.json() as Promise<CatalogResult>)
      .then((json) => {
        // one card per skin — cheapest listing wins (already sorted asc)
        const seen = new Set<string>();
        const unique = (json.items ?? []).filter((it) => {
          if (seen.has(it.skinId)) return false;
          seen.add(it.skinId);
          return true;
        });
        setItems(unique);
      })
      .catch((err) => {
        if ((err as Error).name !== "AbortError") setItems([]);
      });
    return () => ac.abort();
  }, [ids, ready]);

  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-danger)]/40 bg-[color:var(--color-danger)]/10">
          <Heart className="h-4 w-4 text-[color:var(--color-danger)]" />
        </span>
        <div>
          <h1 className="font-display text-xl font-bold uppercase tracking-wide">Favorites</h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            {ready ? `${ids.length} saved skin${ids.length === 1 ? "" : "s"}` : "Loading…"}
          </p>
        </div>
      </div>

      {items == null ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkinCardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-[var(--radius-xl)] border border-dashed border-[color:var(--color-border)] py-24 text-center">
          <Heart className="h-8 w-8 text-[color:var(--color-text-tertiary)]" />
          <div className="font-display text-sm font-bold uppercase tracking-wide">
            Nothing saved yet
          </div>
          <p className="max-w-sm text-sm text-[color:var(--color-text-secondary)]">
            Tap the heart on any skin card to keep it here for later.
          </p>
          <Link
            href="/catalog"
            className="mt-2 rounded-[var(--radius-md)] bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110"
          >
            Browse catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {items.map((it) => (
            <SkinCard key={it.listingId} item={it} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
