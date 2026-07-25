"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Radio } from "lucide-react";
import { useCurrency } from "@/providers/CurrencyProvider";
import type { RecentSale } from "@/lib/skins/queries";

const VISIBLE = 8;

function agoLabel(sec: number) {
  if (sec < 60) return `${sec}s ago`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m ago`;
  return `${Math.floor(sec / 3600)}h ago`;
}

/**
 * Terminal-style sales feed. Seeds from server data, then cycles the queue
 * client-side on an interval so rows keep streaming in without extra fetches.
 */
export function LiveMarketTerminal({ initial }: { initial: RecentSale[] }) {
  const [rows, setRows] = useState<RecentSale[]>(() => initial.slice(0, VISIBLE));
  const queue = useRef<RecentSale[]>(initial.slice(VISIBLE));
  const counter = useRef(0);

  useEffect(() => {
    if (initial.length <= VISIBLE) return;
    const id = window.setInterval(() => {
      setRows((prev) => {
        const next = queue.current.shift();
        if (!next) return prev;
        const recycled = prev[prev.length - 1];
        queue.current.push({ ...recycled, id: `${recycled.id}-r${++counter.current}`, soldAgoSec: 3 });
        return [{ ...next, soldAgoSec: Math.min(next.soldAgoSec, 8) }, ...prev.slice(0, VISIBLE - 1)];
      });
    }, 3400);
    return () => window.clearInterval(id);
  }, [initial.length]);

  const { symbol } = useCurrency();

  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]">
      <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-2.5">
        <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
          <span className="live-dot" aria-hidden />
          <Radio size={12} /> Live market terminal
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-text-tertiary)]">
          recent sales
        </span>
      </div>
      <ul className="divide-y divide-[color:var(--color-border)]/60">
        {rows.map((s) => (
          <li key={s.id} className="animate-terminalRowIn">
            <Link
              href={`/skin/${s.skinId}`}
              className="flex items-center gap-3 px-4 py-2 transition-colors hover:bg-[color:var(--color-bg-tertiary)]"
            >
              <span
                className="relative flex h-9 w-12 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-sm)] bg-[color:var(--color-bg)]"
                style={{ boxShadow: `inset 0 -2px 0 0 ${s.rarityColor}` }}
              >
                {s.imageUrl && (
                  <Image src={s.imageUrl} alt="" fill sizes="48px" className="object-contain p-0.5" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-mono text-[12px] font-semibold text-[color:var(--color-text)]">
                  {s.name}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.1em] text-[color:var(--color-text-tertiary)]">
                  {s.exterior}
                  {s.float != null && ` · float ${s.float.toFixed(4)}`}
                </span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block font-mono text-[12.5px] font-bold tabular-nums text-[color:var(--color-primary)]">
                  {symbol}
                  {s.price.toFixed(2)}
                </span>
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.1em] text-[color:var(--color-text-tertiary)]">
                  {agoLabel(s.soldAgoSec)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
