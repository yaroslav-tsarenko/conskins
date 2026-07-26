import { Link } from "@/i18n/routing";
import { TrendingUp, TrendingDown } from "lucide-react";
import { SkinPrice } from "@/components/shared/SkinPrice";
import type { PricePoint } from "@/lib/skins/pricing";

export interface PulseEntry {
  skinId: string;
  name: string;
  price: number;
  history: PricePoint[];
}

function Sparkline({ points, up }: { points: PricePoint[]; up: boolean }) {
  if (points.length < 2) return null;
  const w = 120;
  const h = 32;
  const prices = points.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = max - min || 1;
  const d = prices
    .map((p, i) => {
      const x = (i / (prices.length - 1)) * w;
      const y = h - ((p - min) / span) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const color = up ? "var(--color-success)" : "var(--color-danger)";
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden className="shrink-0">
      <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

/** 30-day sparkline strip for a handful of market movers. */
export function MarketPulseWidgets({ entries }: { entries: PulseEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {entries.map((e) => {
        const recent = e.history.slice(-30);
        const first = recent[0]?.price ?? e.price;
        const changePct = first > 0 ? ((e.price - first) / first) * 100 : 0;
        const up = changePct >= 0;
        return (
          <Link
            key={e.skinId}
            href={`/skin/${e.skinId}`}
            className="group flex items-center justify-between gap-3 rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 transition-colors hover:border-[color:var(--color-accent)]/50"
          >
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-[color:var(--color-text)]">
                {e.name}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="font-mono text-[13px] font-bold tabular-nums text-[color:var(--color-text)]">
                  <SkinPrice usd={e.price} />
                </span>
                <span
                  className={[
                    "inline-flex items-center gap-0.5 font-mono text-[10.5px] font-bold tabular-nums",
                    up ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]",
                  ].join(" ")}
                >
                  {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                  {up ? "+" : ""}
                  {changePct.toFixed(1)}%
                </span>
              </div>
            </div>
            <Sparkline points={recent} up={up} />
          </Link>
        );
      })}
    </div>
  );
}
