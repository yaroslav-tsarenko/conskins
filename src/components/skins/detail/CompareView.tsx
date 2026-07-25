"use client";

import { X } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { SkinPageData } from "@/lib/skins/queries";
import type { PricePoint } from "@/lib/skins/pricing";
import { formatUSD } from "../SkinCard";

interface CompareSide {
  skin: SkinPageData;
  history: PricePoint[];
}

function change30d(history: PricePoint[]): number {
  const data = history.slice(-30);
  if (data.length < 2) return 0;
  const first = data[0].price;
  return first > 0 ? ((data[data.length - 1].price - first) / first) * 100 : 0;
}

export function CompareView({ a, b }: { a: CompareSide; b: CompareSide }) {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-6">
      <div className="mb-6 flex items-center justify-between gap-3">
        <h1 className="font-display text-xl font-bold uppercase tracking-wide">
          Compare skins
        </h1>
        <Link
          href={`/skin/${a.skin.id}`}
          className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[color:var(--color-border)] px-3 py-1.5 text-sm text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-border-hover)] hover:text-[color:var(--color-text)]"
        >
          <X className="h-3.5 w-3.5" /> Exit compare
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[a, b].map(({ skin, history }) => {
          const best = skin.listings[0];
          const chg = change30d(history);
          const up = chg >= 0;
          return (
            <div
              key={skin.id}
              className="flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]"
              style={{ ["--rarity" as string]: skin.rarityColor }}
            >
              <div className="rarity-strip h-[3px] w-full" />
              <div className="tech-grid relative aspect-[4/3]">
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(120% 80% at 50% 120%, ${skin.rarityColor}2e 0%, transparent 60%)`,
                  }}
                />
                {skin.imageUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={skin.imageUrl}
                    alt={skin.name}
                    className="absolute inset-0 h-full w-full object-contain p-8"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-4 p-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
                    {skin.weapon}
                  </span>
                  <h2 className="mt-0.5 font-display text-lg font-bold leading-tight">
                    {skin.name.replace(/^(StatTrak™ |Souvenir )/, "")}
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                  <Row label="Best price" value={best ? formatUSD(best.price) : "—"} strong />
                  <Row
                    label="30d change"
                    value={`${up ? "▲" : "▼"} ${Math.abs(chg).toFixed(1)}%`}
                    color={up ? "var(--color-success)" : "var(--color-danger)"}
                  />
                  <Row label="Rarity" value={skin.rarity} color={skin.rarityColor} />
                  <Row label="Collection" value={skin.collection ?? "—"} />
                  <Row
                    label="Best float"
                    value={best?.float != null ? best.float.toFixed(4) : "—"}
                    mono
                  />
                  <Row
                    label="Float range"
                    value={
                      skin.minFloat != null || skin.maxFloat != null
                        ? `${(skin.minFloat ?? 0).toFixed(2)}–${(skin.maxFloat ?? 1).toFixed(2)}`
                        : "—"
                    }
                    mono
                  />
                  <Row label="Offers" value={String(skin.listings.length)} mono />
                  <Row
                    label="Steam price"
                    value={best?.steamPrice != null ? formatUSD(best.steamPrice) : "—"}
                    mono
                  />
                </div>
                <Link
                  href={`/skin/${skin.id}`}
                  className="mt-auto rounded-[var(--radius-md)] bg-[color:var(--color-primary)] py-2.5 text-center text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110"
                >
                  View listing
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  color,
  strong,
  mono,
}: {
  label: string;
  value: string;
  color?: string;
  strong?: boolean;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        {label}
      </div>
      <div
        className={[
          "truncate text-sm",
          strong ? "tnum font-mono text-base font-bold" : "font-semibold",
          mono ? "tnum font-mono" : "",
        ].join(" ")}
        style={{ color: color ?? "var(--color-text)" }}
      >
        {value}
      </div>
    </div>
  );
}
