import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight, Swords } from "lucide-react";
import { CountUp } from "./CountUp";
import type { CatalogItem } from "@/lib/skins/queries";

const SLOT_LABELS = ["Knife", "Gloves", "Rifle", "Pistol"];

export function LoadoutTeaser({ slots }: { slots: (CatalogItem | undefined)[] }) {
  const total = slots.reduce((sum, s) => sum + (s?.price ?? 0), 0);

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 70% at 10% 0%, rgba(180,255,57,0.1) 0%, transparent 60%), radial-gradient(40% 60% at 95% 100%, rgba(90,200,255,0.08) 0%, transparent 60%)",
        }}
      />
      <div className="relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
            <Swords size={13} /> Loadout builder
          </span>
          <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-[color:var(--color-text)] sm:text-3xl">
            Build your dream loadout
          </h3>
          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-[color:var(--color-text-secondary)]">
            Pick a knife, gloves, rifle and pistol — see the total cost live and buy
            the whole setup in one go.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <Link
              href="/loadout"
              className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-5 text-[13px] font-bold text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_28px_var(--color-primary-glow)]"
            >
              Start building <ArrowRight size={14} />
            </Link>
            {total > 0 && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-text-tertiary)]">
                  This setup
                </div>
                <CountUp
                  value={total}
                  decimals={2}
                  prefix="$"
                  suffix=""
                  className="font-mono text-lg font-bold tabular-nums text-[color:var(--color-primary)]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SLOT_LABELS.map((label, i) => {
            const item = slots[i];
            return (
              <div
                key={label}
                className="group relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-3 transition-all hover:border-[color:var(--color-primary)]/40"
                style={item ? { ["--rarity" as string]: item.rarityColor } : undefined}
              >
                {item && <div className="rarity-strip absolute inset-x-0 top-0 h-[2px]" />}
                <div className="font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
                  {label}
                </div>
                <div className="relative mt-2 aspect-[4/3]">
                  {item?.imageUrl && (
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      sizes="160px"
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                </div>
                {item && (
                  <div className="tnum mt-2 font-mono text-[11.5px] font-bold text-[color:var(--color-primary)]">
                    ${item.price.toFixed(2)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
