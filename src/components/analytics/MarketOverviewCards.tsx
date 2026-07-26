import { Activity, Layers, Percent, TrendingUp } from "lucide-react";
import type { MarketStats } from "@/lib/skins/queries";
import { SkinPriceCountUp } from "@/components/shared/SkinPrice";

const CARDS = [
  {
    icon: Layers,
    label: "Items listed",
    value: (s: MarketStats) => s.totalListings.toLocaleString(),
  },
  {
    icon: TrendingUp,
    label: "Unique skins",
    value: (s: MarketStats) => s.totalSkins.toLocaleString(),
  },
  {
    icon: Percent,
    label: "Avg discount",
    value: (s: MarketStats) => `${s.avgDiscountPct.toFixed(1)}%`,
  },
  {
    icon: Activity,
    label: "Market value",
    value: (s: MarketStats) => <SkinPriceCountUp usd={s.marketValue} decimals={0} />,
  },
];

export function MarketOverviewCards({ stats }: { stats: MarketStats }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map(({ icon: Icon, label, value }) => (
        <div
          key={label}
          className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5"
        >
          <div className="flex items-center gap-2 text-[color:var(--color-accent)]">
            <Icon size={16} />
            <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
              {label}
            </span>
          </div>
          <div className="tnum mt-2 font-display text-2xl font-extrabold text-[color:var(--color-text)]">
            {value(stats)}
          </div>
        </div>
      ))}
    </div>
  );
}
