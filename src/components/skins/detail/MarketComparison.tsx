"use client";

import type { MarketQuote } from "@/lib/skins/pricing";
import { useSkinPrice } from "@/components/shared/SkinPrice";

export function MarketComparison({ markets }: { markets: MarketQuote[] }) {
  const fmt = useSkinPrice();
  const bestPrice = markets.length ? markets[0].price : null;

  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        Cross-market comparison
      </div>
      <div className="flex flex-col gap-1.5">
        {markets.map((m) => {
          const isBest = m.price === bestPrice;
          const isUs = m.market === "ConSkins";
          return (
            <div
              key={m.market}
              className={`flex items-center justify-between rounded-[var(--radius-md)] border px-3 py-2 text-sm ${
                isUs
                  ? "border-[color:var(--color-primary)]/70 bg-[color:var(--color-primary-tint)]"
                  : "border-[color:var(--color-border)]"
              }`}
            >
              <span className="flex items-center gap-2 font-medium text-[color:var(--color-text)]">
                {m.market}
                {isBest && (
                  <span className="rounded bg-[color:var(--color-success)] px-1.5 py-0.5 text-[10px] font-bold text-black">
                    BEST
                  </span>
                )}
              </span>
              <span className="tnum font-mono font-semibold text-[color:var(--color-text)]">
                {fmt(m.price)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
