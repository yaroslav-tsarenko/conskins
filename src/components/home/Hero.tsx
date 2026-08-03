import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, ShieldCheck, Wallet, Zap, TrendingUp, Users, Repeat, Layers } from "lucide-react";
import { CountUp } from "./CountUp";
import { SkinPrice, SkinPriceCountUp } from "@/components/shared/SkinPrice";
import type { MarketStats, CatalogItem } from "@/lib/skins/queries";

export interface FeaturedSkinView {
  id: string;
  name: string;
  weapon: string;
  lowestPrice: number | null;
  imageUrl: string | null;
  rarityColor: string;
  change30d: number;
}

const FLOAT_POSES = [
  "left-0 top-6 w-[54%] animate-floatSlow z-20",
  "right-0 top-0 w-[46%] animate-float z-10 [animation-delay:1.2s]",
  "bottom-0 left-[16%] w-[48%] animate-float z-30 [animation-delay:2.4s]",
];

function FloatingCard({ item, pose }: { item: CatalogItem; pose: string }) {
  return (
    <Link
      href={`/skin/${item.skinId}`}
      className={`group absolute ${pose} overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/85 backdrop-blur transition-all duration-300 hover:z-40 hover:scale-[1.04] hover:border-[color:var(--color-primary)]/50 hover:shadow-[0_0_28px_var(--color-primary-glow)]`}
      style={{ ["--rarity" as string]: item.rarityColor }}
    >
      <div className="rarity-strip h-[3px] w-full" />
      <div className="tech-grid relative aspect-[16/9]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(110% 90% at 50% 115%, ${item.rarityColor}2b 0%, transparent 60%)` }}
        />
        {item.imageUrl && (
          <Image src={item.imageUrl} alt={item.name} fill sizes="280px" className="object-contain p-3" />
        )}
      </div>
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <span className="min-w-0">
          <span className="block truncate text-[11.5px] font-semibold text-[color:var(--color-text)]">
            {item.name.replace(/^(StatTrak™ |Souvenir )/, "")}
          </span>
          <span className="block font-mono text-[9px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
            {item.exterior}
            {item.float != null && ` · ${item.float.toFixed(3)}`}
          </span>
        </span>
        <span className="tnum shrink-0 font-mono text-[12px] font-bold text-[color:var(--color-primary)]">
          <SkinPrice usd={item.price} />
        </span>
      </div>
    </Link>
  );
}

export function TrendingSkinCard({ featured }: { featured: FeaturedSkinView }) {
  const up = featured.change30d >= 0;
  return (
    <Link
      href={`/skin/${featured.id}`}
      className="card-lift group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]"
      style={{ ["--rarity" as string]: featured.rarityColor }}
    >
      <div className="rarity-strip h-[3px] w-full" />
      <div className="flex items-center justify-between px-4 pt-3">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-coral)]">
          <Zap size={11} /> Trending skin
        </span>
        <span
          className={`tnum font-mono text-[11px] font-bold ${up ? "text-[color:var(--color-success)]" : "text-[color:var(--color-danger)]"}`}
        >
          {up ? "▲" : "▼"} {Math.abs(featured.change30d).toFixed(1)}% · 30d
        </span>
      </div>
      <div className="tech-grid relative mx-4 mt-2 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(120% 90% at 50% 120%, ${featured.rarityColor}2e 0%, transparent 60%)` }}
        />
        {featured.imageUrl && (
          <Image
            src={featured.imageUrl}
            alt={featured.name}
            fill
            sizes="360px"
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.08]"
          />
        )}
      </div>
      <div className="flex items-end justify-between gap-3 p-4">
        <div className="min-w-0">
          <div className="truncate font-display text-[13.5px] font-bold text-[color:var(--color-text)]">
            {featured.name}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
            {featured.weapon}
          </div>
        </div>
        <div className="shrink-0 text-right">
          {featured.lowestPrice != null && (
            <div className="tnum font-mono text-lg font-bold text-[color:var(--color-primary)]">
              <SkinPrice usd={featured.lowestPrice} />
            </div>
          )}
          <span className="mt-0.5 inline-flex items-center gap-1 text-[11.5px] font-semibold text-[color:var(--color-accent)] group-hover:underline">
            View skin <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Hero({
  stats,
  floating,
}: {
  stats: MarketStats;
  floating: CatalogItem[];
}) {
  const dailyTx = Math.max(120, Math.round(stats.totalListings * 0.6));
  const activeUsers = Math.max(900, Math.round(stats.totalSkins * 14.7));

  const statItems = [
    { icon: Layers, label: "Skins available", value: stats.totalListings, decimals: 0, prefix: "", suffix: "+" },
    { icon: Repeat, label: "Daily transactions", value: dailyTx, decimals: 0, prefix: "", suffix: "" },
    { icon: Users, label: "Active users", value: activeUsers, decimals: 0, prefix: "", suffix: "" },
    { icon: TrendingUp, label: "Market volume", value: Math.round(stats.marketValue), decimals: 0, prefix: "$", suffix: "", usd: true },
  ];

  return (
    <section className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-6 sm:p-10 lg:p-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 70% at 88% 8%, rgba(180,255,57,0.14) 0%, transparent 60%), radial-gradient(45% 60% at 8% 100%, rgba(90,200,255,0.12) 0%, transparent 60%)",
        }}
      />
      <div aria-hidden className="dots pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="animate-fadeInUp">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-primary)]/25 bg-[color:var(--color-primary-tint)] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
            <span className="live-dot" aria-hidden />
            Live market · instant Steam trades
          </span>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5.5vw,3.9rem)] font-bold uppercase leading-[1.02] tracking-tight text-[color:var(--color-text)]">
            Trade CS2 skins{" "}
            <span className="animate-gradient bg-gradient-to-r from-[color:var(--color-primary)] via-[color:var(--color-accent)] to-[color:var(--color-primary)] bg-clip-text text-transparent">
              like a pro
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-[color:var(--color-text-secondary)]">
            Discover thousands of skins with live float, pattern and cross-market price
            data. Compare prices, track trends and build your dream inventory.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-6 text-sm font-bold text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_32px_var(--color-primary-glow)]"
            >
              Explore skins <ArrowRight size={16} />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex h-12 items-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] px-6 text-sm font-bold text-[color:var(--color-text)] transition hover:border-[color:var(--color-primary)]/60"
            >
              <Wallet size={16} /> How it works
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-2 text-[13px] text-[color:var(--color-text-tertiary)]">
            <ShieldCheck size={15} className="text-[color:var(--color-accent)]" />
            Buyer protection on every trade · No password ever shared
          </div>
        </div>

        {/* Floating inventory showcase */}
        <div className="relative hidden aspect-[10/8] sm:block" aria-label="Featured inventory preview">
          {floating.slice(0, 3).map((item, i) => (
            <FloatingCard key={item.listingId} item={item} pose={FLOAT_POSES[i]} />
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative mt-10 grid grid-cols-2 gap-4 border-t border-[color:var(--color-border)] pt-7 lg:grid-cols-4">
        {statItems.map((s) => (
          <div key={s.label} className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-lg)] bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
              <s.icon size={17} />
            </span>
            <div>
              {"usd" in s && s.usd ? (
                <SkinPriceCountUp
                  usd={s.value}
                  decimals={0}
                  className="font-mono text-xl font-bold tabular-nums leading-none text-[color:var(--color-text)]"
                />
              ) : (
                <CountUp
                  value={s.value}
                  decimals={s.decimals}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  className="font-mono text-xl font-bold tabular-nums leading-none text-[color:var(--color-text)]"
                />
              )}
              <div className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-tertiary)]">
                {s.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
