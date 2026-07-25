"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowRight, ChevronLeft, ChevronRight, Flame, Gem, Sparkles, Tag } from "lucide-react";
import { SkinCard, SkinCardSkeleton } from "@/components/skins/SkinCard";
import type { CatalogItem } from "@/lib/skins/queries";

interface TabDef {
  id: string;
  label: string;
  Icon: React.ElementType;
  query: string;
  href: string;
}

const TABS: TabDef[] = [
  { id: "trending", label: "Trending", Icon: Flame, query: "sort=discount", href: "/catalog?sort=discount" },
  { id: "new", label: "New arrivals", Icon: Sparkles, query: "sort=newest", href: "/catalog?sort=newest" },
  { id: "deals", label: "Best deals", Icon: Tag, query: "sort=price_asc&priceMax=50", href: "/catalog?sort=price_asc&priceMax=50" },
  { id: "rare", label: "Rare items", Icon: Gem, query: "sort=price_desc&rarity=Covert%2CContraband", href: "/catalog?rarity=Covert%2CContraband&sort=price_desc" },
];

const PER_TAB = 10;

export function FeaturedTabs({ initial, locale }: { initial: CatalogItem[]; locale: string }) {
  const [active, setActive] = useState(TABS[0].id);
  const [cache, setCache] = useState<Record<string, CatalogItem[]>>({ [TABS[0].id]: initial });
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (cache[active]) return;
    const tab = TABS.find((t) => t.id === active);
    if (!tab) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;
    setLoading(true);
    fetch(`/api/skins?${tab.query}&perPage=${PER_TAB}`, { signal: ac.signal })
      .then((r) => r.json())
      .then((json) => {
        setCache((prev) => ({ ...prev, [active]: json.items ?? [] }));
        setLoading(false);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setLoading(false);
      });
  }, [active, cache]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 640, behavior: "smooth" });
  };

  const items = cache[active];
  const activeTab = TABS.find((t) => t.id === active) ?? TABS[0];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-1">
          {TABS.map((t) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                aria-pressed={on}
                className={[
                  "inline-flex h-9 items-center gap-1.5 rounded-[var(--radius-md)] px-3.5 text-[13px] font-semibold transition-colors",
                  on
                    ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)]"
                    : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)]",
                ].join(" ")}
              >
                <t.Icon size={14} /> {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll left"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-text)]"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll right"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-text)]"
          >
            <ChevronRight size={16} />
          </button>
          <Link
            href={activeTab.href}
            className="ml-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-accent)] hover:underline"
          >
            See all <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-none -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2"
      >
        {(loading || !items ? Array.from({ length: 5 }) : items).map((it, i) =>
          loading || !items ? (
            <div key={i} className="w-[210px] shrink-0 snap-start sm:w-[230px]">
              <SkinCardSkeleton />
            </div>
          ) : (
            <div key={(it as CatalogItem).listingId} className="w-[210px] shrink-0 snap-start sm:w-[230px]">
              <SkinCard item={it as CatalogItem} locale={locale} />
            </div>
          ),
        )}
      </div>
    </div>
  );
}
