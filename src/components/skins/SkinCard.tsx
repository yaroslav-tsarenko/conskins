"use client";

import Link from "next/link";
import { Heart, Scale } from "lucide-react";
import { exteriorMeta } from "@/lib/skins/shared";
import type { CatalogItem } from "@/lib/skins/queries";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useCompare } from "@/providers/CompareProvider";
import { useSkinPrice } from "@/components/shared/SkinPrice";

export function SkinCard({ item, locale = "en" }: { item: CatalogItem; locale?: string }) {
  const fmt = useSkinPrice();
  const ext = exteriorMeta(item.exterior);
  const href = `/${locale}/skin/${item.skinId}?listing=${item.listingId}`;
  const { ready, isFavorite, toggle: toggleFavorite } = useFavorites();
  const { isSelected, toggle: toggleCompare } = useCompare();

  const fav = ready && isFavorite(item.skinId);
  const comparing = ready && isSelected(item.skinId);

  const shortName =
    item.name.replace(/^(StatTrak™ |Souvenir )/, "").split(" | ").slice(1).join(" | ") ||
    item.name;

  return (
    <Link
      href={href}
      className="card-lift group relative flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] transition-shadow hover:shadow-[0_0_24px_-8px_var(--rarity)]"
      style={{ ["--rarity" as string]: item.rarityColor }}
    >
      {/* rarity strip */}
      <div className="rarity-strip h-[3px] w-full" />

      {/* image */}
      <div className="tech-grid relative aspect-[4/3] overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(120% 80% at 50% 120%, ${item.rarityColor}2e 0%, transparent 60%)`,
          }}
        />
        {item.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.imageUrl}
            alt={item.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-4 transition-transform duration-300 ease-out group-hover:scale-[1.08] group-hover:-rotate-1"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[color:var(--color-text-tertiary)]">
            no image
          </div>
        )}

        {/* badges */}
        <div className="absolute left-2 top-2 flex flex-wrap gap-1">
          {item.isStatTrak && (
            <span className="rounded bg-[color:var(--color-warning)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
              ST™
            </span>
          )}
          {item.isSouvenir && (
            <span className="rounded bg-[color:var(--color-teal)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black">
              Souvenir
            </span>
          )}
          {item.discountPct != null && item.discountPct > 0 && (
            <span className="tnum rounded bg-[color:var(--color-success)] px-1.5 py-0.5 text-[10px] font-bold text-black">
              −{Math.round(item.discountPct)}%
            </span>
          )}
        </div>

        {/* quick actions */}
        <div className="absolute right-2 top-2 flex flex-col gap-1.5">
          <button
            type="button"
            aria-label={fav ? "Remove from favorites" : "Add to favorites"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(item.skinId);
            }}
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition",
              fav
                ? "border-[color:var(--color-danger)]/60 bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)] opacity-100"
                : "border-[color:var(--color-border)] bg-[#0D0F13]/70 text-[color:var(--color-text-secondary)] opacity-0 hover:text-[color:var(--color-danger)] group-hover:opacity-100",
            ].join(" ")}
          >
            <Heart className="h-3.5 w-3.5" fill={fav ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            aria-label={comparing ? "Remove from compare" : "Add to compare"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleCompare({
                id: item.skinId,
                name: item.name,
                imageUrl: item.imageUrl,
                rarityColor: item.rarityColor,
              });
            }}
            className={[
              "flex h-7 w-7 items-center justify-center rounded-full border backdrop-blur-sm transition",
              comparing
                ? "border-[color:var(--color-accent)]/60 bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)] opacity-100"
                : "border-[color:var(--color-border)] bg-[#0D0F13]/70 text-[color:var(--color-text-secondary)] opacity-0 hover:text-[color:var(--color-accent)] group-hover:opacity-100",
            ].join(" ")}
          >
            <Scale className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* quick view on hover */}
        <div className="absolute inset-x-2 bottom-2 translate-y-3 opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="block rounded-[var(--radius-md)] bg-[color:var(--color-primary)] py-1.5 text-center text-xs font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)]">
            View listing
          </span>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[11px] font-medium uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
            {item.weapon}
          </span>
          {ext && (
            <span
              className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold"
              style={{ color: item.rarityColor, background: `${item.rarityColor}1a` }}
            >
              {ext.short}
            </span>
          )}
        </div>

        <h3 className="line-clamp-2 min-h-[2.4em] text-sm font-semibold leading-tight text-[color:var(--color-text)]">
          {shortName}
        </h3>

        {/* mini wear bar */}
        {item.float != null && (
          <>
            <div className="relative mt-0.5 h-1 w-full rounded-full">
              <div className="wear-bar absolute inset-0 rounded-full opacity-70" />
              <span
                className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/40 bg-white"
                style={{ left: `${Math.max(0, Math.min(1, item.float)) * 100}%` }}
              />
            </div>
            <span className="tnum font-mono text-[10px] text-[color:var(--color-text-tertiary)]">
              float {item.float.toFixed(4)}
            </span>
          </>
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="tnum font-mono text-base font-bold text-[color:var(--color-text)]">
              {fmt(item.price)}
            </span>
            {item.steamPrice != null && item.discountPct != null && item.discountPct > 0 && (
              <span className="tnum text-[11px] text-[color:var(--color-text-tertiary)] line-through">
                {fmt(item.steamPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function SkinCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]">
      <div className="h-[3px] w-full bg-[color:var(--color-bg-tertiary)]" />
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-4 w-1/2 rounded" />
      </div>
    </div>
  );
}
