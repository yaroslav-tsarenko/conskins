"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { SkinPrice, useSkinPrice } from "@/components/shared/SkinPrice";
import { ArrowRight, Scale, Search, X } from "lucide-react";
import type { CatalogItem } from "@/lib/skins/queries";

interface Suggestion {
  id: string;
  name: string;
  weapon: string;
  category: string;
  rarityColor: string;
  imageUrl: string | null;
  lowestPrice: number | null;
}

interface CompareData {
  item: CatalogItem;
  offers: number;
  change30d: number | null;
}

function SkinPicker({
  label,
  data,
  onSelect,
  onClear,
}: {
  label: string;
  data: CompareData | null;
  onSelect: (s: Suggestion) => void;
  onClear: () => void;
}) {
  const [q, setQ] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (q.trim().length < 2) return;
    const t = setTimeout(() => {
      abortRef.current?.abort();
      const ac = new AbortController();
      abortRef.current = ac;
      fetch(`/api/skins/suggest?q=${encodeURIComponent(q.trim())}`, { signal: ac.signal })
        .then((r) => r.json())
        .then((json) => setSuggestions(json.suggestions ?? []))
        .catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [q]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  if (data) {
    const it = data.item;
    return (
      <div
        className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]"
        style={{ ["--rarity" as string]: it.rarityColor }}
      >
        <div className="rarity-strip h-[3px] w-full" />
        <button
          type="button"
          onClick={onClear}
          aria-label={`Clear skin ${label}`}
          className="absolute right-2 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/80 text-[color:var(--color-text-secondary)] backdrop-blur transition hover:text-[color:var(--color-danger)]"
        >
          <X size={13} />
        </button>
        <div className="tech-grid relative aspect-[16/8]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: `radial-gradient(110% 90% at 50% 115%, ${it.rarityColor}2b 0%, transparent 60%)` }}
          />
          {it.imageUrl && (
            <Image src={it.imageUrl} alt={it.name} fill sizes="320px" className="object-contain p-3" />
          )}
        </div>
        <div className="px-4 pb-3">
          <div className="truncate text-[13px] font-semibold text-[color:var(--color-text)]">{it.name}</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
            {it.weapon} · {it.exterior}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={boxRef} className="relative">
      <div className="flex aspect-[16/8] flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]/50 px-4">
        <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--color-primary-tint)] font-mono text-sm font-bold text-[color:var(--color-primary)]">
          {label}
        </span>
        <div className="relative w-full max-w-[260px]">
          <Search
            size={14}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--color-text-tertiary)]"
          />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              if (e.target.value.trim().length < 2) setSuggestions([]);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search a skin…"
            className="h-10 w-full rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-9 pr-3 text-[13px] text-[color:var(--color-text)] outline-none transition placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-primary)]/60"
          />
        </div>
      </div>
      {open && suggestions.length > 0 && (
        <ul className="absolute inset-x-4 top-[70%] z-20 max-h-64 overflow-y-auto rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] py-1 shadow-xl">
          {suggestions.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(s);
                  setQ("");
                  setSuggestions([]);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-[color:var(--color-bg-secondary)]"
              >
                {s.imageUrl && (
                  <span className="relative h-8 w-12 shrink-0">
                    <Image src={s.imageUrl} alt="" fill sizes="48px" className="object-contain" />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[12.5px] font-semibold text-[color:var(--color-text)]">
                    {s.name}
                  </span>
                  <span className="block font-mono text-[9.5px] uppercase tracking-[0.1em] text-[color:var(--color-text-tertiary)]">
                    {s.category}
                  </span>
                </span>
                {s.lowestPrice != null && (
                  <span className="tnum shrink-0 font-mono text-[11.5px] font-bold text-[color:var(--color-primary)]">
                    <SkinPrice usd={s.lowestPrice} />
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

type MetricRow = {
  label: string;
  a: string;
  b: string;
  winner: 0 | 1 | -1;
};

function buildRows(a: CompareData, b: CompareData, fmt: (usd: number) => string): MetricRow[] {
  const trend = (d: CompareData) =>
    d.change30d == null ? "—" : `${d.change30d >= 0 ? "▲" : "▼"} ${Math.abs(d.change30d).toFixed(1)}%`;
  return [
    {
      label: "Lowest price",
      a: fmt(a.item.price),
      b: fmt(b.item.price),
      winner: a.item.price === b.item.price ? -1 : a.item.price < b.item.price ? 0 : 1,
    },
    {
      label: "Best float",
      a: a.item.float != null ? a.item.float.toFixed(4) : "—",
      b: b.item.float != null ? b.item.float.toFixed(4) : "—",
      winner:
        a.item.float == null || b.item.float == null || a.item.float === b.item.float
          ? -1
          : a.item.float < b.item.float
            ? 0
            : 1,
    },
    {
      label: "Rarity",
      a: a.item.rarity,
      b: b.item.rarity,
      winner: -1,
    },
    {
      label: "Active offers",
      a: String(a.offers),
      b: String(b.offers),
      winner: a.offers === b.offers ? -1 : a.offers > b.offers ? 0 : 1,
    },
    {
      label: "30d trend",
      a: trend(a),
      b: trend(b),
      winner:
        a.change30d == null || b.change30d == null || a.change30d === b.change30d
          ? -1
          : a.change30d > b.change30d
            ? 0
            : 1,
    },
    {
      label: "vs Steam",
      a: (a.item.discountPct ?? 0) > 0 ? `−${a.item.discountPct!.toFixed(1)}%` : "—",
      b: (b.item.discountPct ?? 0) > 0 ? `−${b.item.discountPct!.toFixed(1)}%` : "—",
      winner:
        (a.item.discountPct ?? 0) === (b.item.discountPct ?? 0)
          ? -1
          : (a.item.discountPct ?? 0) > (b.item.discountPct ?? 0)
            ? 0
            : 1,
    },
  ];
}

async function loadCompareData(skinId: string): Promise<CompareData | null> {
  const [listRes, histRes] = await Promise.all([
    fetch(`/api/skins?skinIds=${skinId}&perPage=1`).then((r) => r.json()),
    fetch(`/api/skins/history?skinId=${skinId}&days=30`).then((r) => r.json()),
  ]);
  const item: CatalogItem | undefined = listRes.items?.[0];
  if (!item) return null;
  const history: { price: number }[] = histRes.history ?? [];
  let change30d: number | null = null;
  if (history.length > 1) {
    const first = history[0].price;
    const last = history[history.length - 1].price;
    if (first > 0) change30d = ((last - first) / first) * 100;
  }
  return { item, offers: listRes.total ?? 0, change30d };
}

export function PriceCompareTool() {
  const fmtPrice = useSkinPrice();
  const [a, setA] = useState<CompareData | null>(null);
  const [b, setB] = useState<CompareData | null>(null);
  const [loading, setLoading] = useState<"A" | "B" | null>(null);

  const pick = (slot: "A" | "B") => (s: Suggestion) => {
    setLoading(slot);
    loadCompareData(s.id)
      .then((data) => {
        if (data) (slot === "A" ? setA : setB)(data);
      })
      .finally(() => setLoading(null));
  };

  const rows = a && b ? buildRows(a, b, fmtPrice) : null;

  return (
    <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 sm:p-7">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start">
        <SkinPicker label="A" data={a} onSelect={pick("A")} onClear={() => setA(null)} />
        <div className="hidden h-full items-center sm:flex">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text-secondary)]">
            {loading ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[color:var(--color-primary)] border-t-transparent" />
            ) : (
              <Scale size={17} />
            )}
          </span>
        </div>
        <SkinPicker label="B" data={b} onSelect={pick("B")} onClear={() => setB(null)} />
      </div>

      {rows ? (
        <div className="mt-6 overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)]">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 py-2.5 text-[13px] ${i % 2 === 0 ? "bg-[color:var(--color-bg-secondary)]/60" : ""}`}
            >
              <span
                className={`tnum text-left font-mono font-semibold ${r.winner === 0 ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-text)]"}`}
              >
                {r.a}
              </span>
              <span className="text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-text-tertiary)]">
                {r.label}
              </span>
              <span
                className={`tnum text-right font-mono font-semibold ${r.winner === 1 ? "text-[color:var(--color-primary)]" : "text-[color:var(--color-text)]"}`}
              >
                {r.b}
              </span>
            </div>
          ))}
          <div className="grid grid-cols-2 border-t border-[color:var(--color-border)]">
            <Link
              href={`/skin/${a!.item.skinId}`}
              className="inline-flex items-center justify-center gap-1.5 py-3 text-[12.5px] font-semibold text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
            >
              View skin A <ArrowRight size={13} />
            </Link>
            <Link
              href={`/skin/${b!.item.skinId}`}
              className="inline-flex items-center justify-center gap-1.5 border-l border-[color:var(--color-border)] py-3 text-[12.5px] font-semibold text-[color:var(--color-accent)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
            >
              View skin B <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      ) : (
        <p className="mt-5 text-center text-[12.5px] text-[color:var(--color-text-tertiary)]">
          Pick two skins to compare price, float, rarity, liquidity and 30-day trend side by side.
        </p>
      )}
    </div>
  );
}
