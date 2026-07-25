"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import type { PricePoint } from "@/lib/skins/pricing";
import { PriceChart } from "../skins/PriceChart";

interface Suggestion {
  id: string;
  name: string;
  weapon: string;
  rarityColor: string;
  imageUrl: string | null;
  lowestPrice: number | null;
}

interface FeaturedSkin {
  id: string;
  name: string;
  weapon: string;
}

export function FeaturedSkinChart({
  initial,
  initialHistory,
}: {
  initial: FeaturedSkin;
  initialHistory: PricePoint[];
}) {
  const [current, setCurrent] = useState(initial);
  const [history, setHistory] = useState(initialHistory);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }
    const ac = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/skins/suggest?q=${encodeURIComponent(q)}`, { signal: ac.signal })
        .then((r) => r.json())
        .then((json) => setSuggestions(json.suggestions ?? []))
        .catch(() => {});
    }, 250);
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [query]);

  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, []);

  const select = async (s: Suggestion) => {
    setOpen(false);
    setQuery("");
    try {
      const res = await fetch(`/api/skins/history?skinId=${s.id}`);
      const json = await res.json();
      if (json.history) {
        setCurrent({ id: s.id, name: s.name, weapon: s.weapon });
        setHistory(json.history);
      }
    } catch {
      // keep current chart on failure
    }
  };

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
            Featured chart
          </div>
          <h2 className="font-display text-xl font-bold text-[color:var(--color-text)]">
            {current.name}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div ref={boxRef} className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--color-text-tertiary)]" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              placeholder="Chart another skin…"
              className="w-56 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-2 pl-8 pr-3 text-[13px] outline-none placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-primary)]/60"
            />
            {open && suggestions.length > 0 && (
              <div className="glass absolute right-0 top-full z-20 mt-1.5 w-72 overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] shadow-[var(--shadow-lg)]">
                {suggestions.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => select(s)}
                    className="flex w-full items-center gap-2.5 px-3 py-2 text-left transition-colors hover:bg-[color:var(--color-bg-tertiary)]/60"
                  >
                    {s.imageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={s.imageUrl} alt="" className="h-7 w-10 shrink-0 object-contain" />
                    )}
                    <span className="min-w-0 flex-1 truncate text-[13px]">{s.name}</span>
                    {s.lowestPrice != null && (
                      <span className="tnum shrink-0 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                        ${s.lowestPrice.toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Link
            href={`/skin/${current.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-semibold text-[color:var(--color-accent)] hover:underline"
          >
            View skin <ArrowRight size={14} />
          </Link>
        </div>
      </div>
      <PriceChart history={history} />
    </section>
  );
}
