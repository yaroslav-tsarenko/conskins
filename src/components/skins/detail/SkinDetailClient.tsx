"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { exteriorMeta } from "@/lib/skins/shared";
import type { SkinPageData } from "@/lib/skins/queries";
import type { MarketQuote, PricePoint } from "@/lib/skins/pricing";
import { PriceChart } from "../PriceChart";
import { TradeSetupModal, type PurchaseState } from "../TradeSetupModal";
import { formatUSD } from "../SkinCard";
import { SkinShowcase } from "./SkinShowcase";
import { FloatVisualizer } from "./FloatVisualizer";
import { PatternInfo } from "./PatternInfo";
import { StickerRow } from "./StickerRow";
import { ListingsTable } from "./ListingsTable";
import { MarketComparison } from "./MarketComparison";

export function SkinDetailClient({
  skin,
  history,
  markets,
  locale,
  locked,
  initialListingId,
  purchaseState,
}: {
  skin: SkinPageData;
  history: PricePoint[];
  markets: MarketQuote[];
  locale: string;
  locked: boolean;
  initialListingId?: string;
  purchaseState: PurchaseState;
}) {
  const [selectedId, setSelectedId] = useState(
    (initialListingId && skin.listings.some((l) => l.id === initialListingId)
      ? initialListingId
      : skin.listings[0]?.id) ?? "",
  );
  const [buyOpen, setBuyOpen] = useState(false);
  const selected = useMemo(
    () => skin.listings.find((l) => l.id === selectedId) ?? skin.listings[0],
    [skin.listings, selectedId],
  );

  const ext = selected ? exteriorMeta(selected.exterior) : null;
  const displayName = skin.name.replace(/^(StatTrak™ |Souvenir )/, "");
  const finish = displayName.split(" | ").slice(1).join(" | ") || displayName;

  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-6">
      <nav className="mb-4 flex items-center gap-1.5 text-xs text-[color:var(--color-text-tertiary)]">
        <Link href={`/${locale}`} className="hover:text-[color:var(--color-text)]">
          Home
        </Link>
        <span>/</span>
        <Link href={`/${locale}/catalog`} className="hover:text-[color:var(--color-text)]">
          Catalog
        </Link>
        <span>/</span>
        <Link
          href={`/${locale}/catalog?weapon=${encodeURIComponent(skin.weapon)}`}
          className="hover:text-[color:var(--color-text)]"
        >
          {skin.weapon}
        </Link>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* left: showcase + wear/pattern */}
        <div className="flex flex-col gap-4">
          <SkinShowcase
            skinId={skin.id}
            name={skin.name}
            imageUrl={selected?.imageUrl ?? skin.imageUrl}
            rarityColor={skin.rarityColor}
            isStatTrak={selected?.isStatTrak ?? false}
            isSouvenir={selected?.isSouvenir ?? false}
          />

          <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
                Wear · {ext?.label ?? "—"}
              </span>
              {selected?.float != null && (
                <span className="tnum font-mono text-sm font-bold text-[color:var(--color-text)]">
                  {selected.float.toFixed(6)}
                </span>
              )}
            </div>
            <FloatVisualizer
              float={selected?.float ?? null}
              exterior={selected?.exterior ?? "NA"}
              minFloat={skin.minFloat}
              maxFloat={skin.maxFloat}
            />
            <div className="mt-4 border-t border-[color:var(--color-border)] pt-3">
              <PatternInfo
                pattern={skin.pattern}
                paintSeed={selected?.paintSeed ?? null}
                phase={selected?.phase ?? null}
                rarity={skin.rarity}
                rarityColor={skin.rarityColor}
              />
            </div>
            {selected?.stickers != null && (
              <div className="mt-4 border-t border-[color:var(--color-border)] pt-3">
                <StickerRow stickers={selected.stickers} />
              </div>
            )}
            {selected?.inspectLink && (
              <a
                href={selected.inspectLink}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-accent)] hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" /> Inspect in-game
              </a>
            )}
          </div>
        </div>

        {/* right: title, price, buy, offers */}
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
              {skin.weapon}
            </span>
            <h1 className="mt-1 font-display text-2xl font-bold leading-tight text-[color:var(--color-text)] sm:text-3xl">
              {finish}
            </h1>
            {skin.collection && (
              <Link
                href={`/${locale}/catalog?collection=${encodeURIComponent(skin.collection)}`}
                className="mt-1 inline-block text-sm text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)]"
              >
                {skin.collection}
              </Link>
            )}
          </div>

          <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <div className="tnum font-display text-3xl font-bold text-[color:var(--color-text)]">
                  {selected ? formatUSD(selected.price) : "—"}
                </div>
                {selected?.steamPrice != null &&
                  selected.discountPct != null &&
                  selected.discountPct > 0 && (
                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="tnum text-sm text-[color:var(--color-text-tertiary)] line-through">
                        {formatUSD(selected.steamPrice)}
                      </span>
                      <span className="tnum rounded bg-[color:var(--color-success)] px-1.5 py-0.5 text-[11px] font-bold text-black">
                        −{Math.round(selected.discountPct)}%
                      </span>
                    </div>
                  )}
              </div>
              <button
                type="button"
                onClick={() => setBuyOpen(true)}
                className="rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-6 py-3 text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110"
              >
                Buy now
              </button>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-[color:var(--color-text-tertiary)]">
              <ShieldCheck className="h-3.5 w-3.5 text-[color:var(--color-success)]" />
              Instant Steam trade · buyer protection
            </p>
          </div>

          <ListingsTable
            listings={skin.listings}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </div>

      {/* analytics section (gated) */}
      <div className="relative mt-8">
        <div className={locked ? "pointer-events-none select-none blur-md" : ""}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
            <PriceChart history={history} />
            <MarketComparison markets={markets} />
          </div>
        </div>

        {locked && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="glass max-w-sm rounded-[var(--radius-xl)] border border-[color:var(--color-border)] p-6 text-center">
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-primary-tint)]">
                <Lock className="h-5 w-5 text-[color:var(--color-primary)]" />
              </div>
              <h3 className="font-display text-lg font-bold text-[color:var(--color-text)]">
                Unlock full analytics
              </h3>
              <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
                Sign in to view price history, float breakdown and cross-market prices.
              </p>
              <Link
                href={`/${locale}/auth`}
                className="mt-4 inline-flex items-center gap-1.5 rounded-[var(--radius-md)] bg-[color:var(--color-primary)] px-5 py-2.5 text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)]"
              >
                <Sparkles className="h-4 w-4" /> Sign in free
              </Link>
            </div>
          </div>
        )}
      </div>

      {selected && (
        <TradeSetupModal
          open={buyOpen}
          onClose={() => setBuyOpen(false)}
          initialState={purchaseState}
          locale={locale}
          skinName={displayName}
          price={formatUSD(selected.price)}
          priceValue={selected.price}
          listingId={selected.id}
          next={`/${locale}/skin/${skin.id}?listing=${selected.id}`}
        />
      )}
    </div>
  );
}
