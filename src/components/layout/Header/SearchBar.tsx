"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCurrency } from "@/providers/CurrencyProvider";

interface SkinSuggestion {
  id: string;
  name: string;
  weapon: string;
  category: string;
  rarityColor: string;
  imageUrl: string | null;
  lowestPrice: number | null;
}

function useDismiss(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
  return ref;
}

interface SearchBarProps {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}

/**
 * Live skin search with keyboard-navigable suggestions.
 * Debounced against /api/skins/suggest; Enter falls through to /catalog?q=…
 */
export function SearchBar({ variant, onNavigate }: SearchBarProps) {
  const router = useRouter();
  const { symbol, convertFrom } = useCurrency();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SkinSuggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => {
      fetch(`/api/skins/suggest?q=${encodeURIComponent(q)}`, { signal: ctrl.signal })
        .then((r) => (r.ok ? r.json() : { suggestions: [] }))
        .then((data) => setSuggestions(Array.isArray(data.suggestions) ? data.suggestions : []))
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 180);
    return () => {
      ctrl.abort();
      window.clearTimeout(timer);
    };
  }, [query]);

  const close = useCallback(() => {
    setOpen(false);
    setHighlight(-1);
  }, []);

  const rootRef = useDismiss(close);

  const submitSearch = (q: string) => {
    const term = q.trim();
    if (!term) return;
    close();
    onNavigate?.();
    router.push(`/catalog?q=${encodeURIComponent(term)}`);
  };

  const goToSkin = (id: string) => {
    close();
    setQuery("");
    onNavigate?.();
    router.push(`/skin/${id}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      if (highlight >= 0 && suggestions[highlight]) {
        e.preventDefault();
        goToSkin(suggestions[highlight].id);
      }
    }
  };

  return (
    <div ref={rootRef} className="relative min-w-0 flex-1">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitSearch(query);
        }}
        className={[
          "flex items-center overflow-hidden rounded-[var(--radius-lg)] border bg-[color:var(--color-bg-secondary)] transition-all",
          variant === "desktop" ? "h-10 pl-3.5 pr-1" : "h-10 pl-3.5 pr-1",
          open && query.trim().length >= 2
            ? "border-[color:var(--color-primary)]/60 shadow-[0_0_0_3px_var(--color-primary-tint)]"
            : "border-[color:var(--color-border)] hover:border-[color:var(--color-border-hover)]",
        ].join(" ")}
      >
        <Search size={15} className="shrink-0 text-[color:var(--color-text-tertiary)]" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={
            variant === "desktop"
              ? "Search — AWP Dragon Lore, ★ Karambit…"
              : "Search skins"
          }
          aria-label="Search skins"
          className="min-w-0 flex-1 bg-transparent px-2.5 text-[13.5px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none"
        />
        <kbd className="mr-1 hidden shrink-0 rounded-[var(--radius-sm)] border border-[color:var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-text-tertiary)] lg:inline-block">
          /
        </kbd>
      </form>

      <AnimatePresence>
        {open && query.trim().length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] glass p-1.5 shadow-[var(--shadow-xl)]"
            role="listbox"
          >
            {loading && suggestions.length === 0 ? (
              <div className="flex items-center justify-center gap-2 px-3 py-6 text-sm text-[color:var(--color-text-tertiary)]">
                <Loader2 size={15} className="animate-spin" /> Searching skins…
              </div>
            ) : suggestions.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-[color:var(--color-text-tertiary)]">
                No skins match “{query.trim()}”.
              </div>
            ) : (
              <>
                {suggestions.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    role="option"
                    aria-selected={i === highlight}
                    onMouseEnter={() => setHighlight(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      goToSkin(s.id);
                    }}
                    className={[
                      "flex w-full items-center gap-3 rounded-[var(--radius-lg)] px-2.5 py-2 text-left transition-colors",
                      i === highlight
                        ? "bg-[color:var(--color-primary-tint)]"
                        : "hover:bg-[color:var(--color-bg-tertiary)]",
                    ].join(" ")}
                  >
                    <span
                      className="relative flex h-10 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[color:var(--color-bg-secondary)]"
                      style={{ boxShadow: `inset 0 -2px 0 0 ${s.rarityColor}` }}
                    >
                      {s.imageUrl && (
                        <Image src={s.imageUrl} alt="" fill sizes="56px" className="object-contain p-1" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-[color:var(--color-text)]">
                        {s.name}
                      </span>
                      <span className="block truncate font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
                        {s.weapon}
                      </span>
                    </span>
                    {s.lowestPrice != null && (
                      <span className="shrink-0 font-mono text-[12px] font-bold tabular-nums text-[color:var(--color-primary)]">
                        {symbol}
                        {convertFrom(s.lowestPrice, "USD").toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
                <button
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    submitSearch(query);
                  }}
                  className="mt-1 flex w-full items-center justify-between rounded-[var(--radius-lg)] px-3 py-2 text-[12px] font-semibold text-[color:var(--color-primary)] transition-colors hover:bg-[color:var(--color-primary-tint)]"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <Search size={13} /> See all results for “{query.trim()}”
                  </span>
                  <ArrowRight size={13} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
