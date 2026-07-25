import { Zap, ShieldCheck, Layers, Percent, Repeat } from "lucide-react";
import { CountUp } from "./CountUp";
import type { MarketStats } from "@/lib/skins/queries";

export function BenefitsRow({ stats }: { stats: MarketStats }) {
  const items = [
    {
      icon: Zap,
      title: "Fast transactions",
      stat: { value: 5, prefix: "< ", suffix: " min", decimals: 0 },
      text: "From checkout to your Steam inventory.",
    },
    {
      icon: Repeat,
      title: "Instant trading",
      stat: { value: 24, prefix: "", suffix: "/7", decimals: 0 },
      text: "Automated trade offers, day and night.",
    },
    {
      icon: Layers,
      title: "Skins listed",
      stat: { value: stats.totalListings, prefix: "", suffix: "+", decimals: 0 },
      text: "Every listing with verified float & pattern.",
    },
    {
      icon: Percent,
      title: "Low fees",
      stat: { value: stats.avgDiscountPct, prefix: "−", suffix: "% vs Steam", decimals: 1 },
      text: "Average discount across the market.",
    },
    {
      icon: ShieldCheck,
      title: "Secure marketplace",
      stat: { value: 100, prefix: "", suffix: "%", decimals: 0 },
      text: "Buyer protection on every single trade.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {items.map((b) => (
        <div
          key={b.title}
          className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 transition-all hover:border-[color:var(--color-primary)]/40 hover:shadow-[0_0_24px_var(--color-primary-glow)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: "radial-gradient(80% 80% at 50% 0%, rgba(180,255,57,0.08) 0%, transparent 65%)" }}
          />
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
            <b.icon size={16} />
          </span>
          <CountUp
            value={b.stat.value}
            prefix={b.stat.prefix}
            suffix={b.stat.suffix}
            decimals={b.stat.decimals}
            className="relative mt-3 block font-mono text-[19px] font-bold tabular-nums leading-none text-[color:var(--color-text)]"
          />
          <div className="relative mt-1.5 font-display text-[12.5px] font-bold uppercase tracking-wide text-[color:var(--color-text)]">
            {b.title}
          </div>
          <p className="relative mt-1 text-[12px] leading-snug text-[color:var(--color-text-tertiary)]">{b.text}</p>
        </div>
      ))}
    </div>
  );
}
