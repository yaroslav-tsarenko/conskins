"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft, ArrowRight, Compass, RotateCcw, Sparkles } from "lucide-react";
import { SkinCard, SkinCardSkeleton } from "@/components/skins/SkinCard";
import type { CatalogItem } from "@/lib/skins/queries";

const BUDGETS = [
  { id: "under25", label: "Under $25", hint: "Budget builds", priceMax: 25 },
  { id: "under100", label: "$25 – $100", hint: "Solid mid-tier", priceMin: 25, priceMax: 100 },
  { id: "under500", label: "$100 – $500", hint: "Premium picks", priceMin: 100, priceMax: 500 },
  { id: "noLimit", label: "$500+", hint: "Go all in", priceMin: 500 },
];

const CATEGORIES = [
  { id: "Rifle", label: "Rifles", hint: "AK, M4, AWP" },
  { id: "Pistol", label: "Pistols", hint: "Deagle, USP, Glock" },
  { id: "Knife", label: "Knives", hint: "The flex pieces" },
  { id: "Gloves", label: "Gloves", hint: "Complete the fit" },
  { id: "SMG", label: "SMGs", hint: "Eco-round style" },
  { id: "any", label: "Surprise me", hint: "All categories" },
];

const STYLES = [
  { id: "red", label: "Red heat", hint: "Crimson, ember, blood", q: "red" },
  { id: "blue", label: "Cool blue", hint: "Ice, ocean, neon", q: "blue" },
  { id: "gold", label: "Gold & luxe", hint: "Dragon, gold, ornate", q: "gold" },
  { id: "dark", label: "Blackout", hint: "Stealth, night ops", q: "black" },
  { id: "clean", label: "Best deals", hint: "Biggest discounts", q: null },
];

type StepId = 0 | 1 | 2 | 3;

export function SkinFinder({ locale }: { locale: string }) {
  const [step, setStep] = useState<StepId>(0);
  const [budget, setBudget] = useState<(typeof BUDGETS)[number] | null>(null);
  const [category, setCategory] = useState<(typeof CATEGORIES)[number] | null>(null);
  const [style, setStyle] = useState<(typeof STYLES)[number] | null>(null);
  const [results, setResults] = useState<CatalogItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const buildParams = (s: (typeof STYLES)[number], withQuery: boolean) => {
    const params = new URLSearchParams();
    if (budget?.priceMax) params.set("priceMax", String(budget.priceMax));
    if (budget?.priceMin) params.set("priceMin", String(budget.priceMin));
    if (category && category.id !== "any") params.set("category", category.id);
    if (withQuery && s.q) params.set("q", s.q);
    params.set("sort", s.q ? "price_desc" : "discount");
    return params;
  };

  const runSearch = async (s: (typeof STYLES)[number]) => {
    setStyle(s);
    setStep(3);
    setLoading(true);
    try {
      const params = buildParams(s, true);
      params.set("perPage", "8");
      let json = await fetch(`/api/skins?${params}`).then((r) => r.json());
      let items: CatalogItem[] = json.items ?? [];
      if (items.length < 4 && s.q) {
        const fallback = buildParams(s, false);
        fallback.set("perPage", "8");
        json = await fetch(`/api/skins?${fallback}`).then((r) => r.json());
        items = json.items ?? [];
      }
      setResults(items);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setBudget(null);
    setCategory(null);
    setStyle(null);
    setResults(null);
  };

  const catalogHref = style
    ? `/catalog?${buildParams(style, true).toString()}`
    : "/catalog";

  const steps = ["Budget", "Category", "Style", "Picks"];

  return (
    <div className="overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 sm:p-7">
      <div className="mb-6 flex items-center gap-2">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={[
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-bold transition-colors",
                i < step
                  ? "bg-[color:var(--color-primary)]/20 text-[color:var(--color-primary)]"
                  : i === step
                    ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-fg)]"
                    : "border border-[color:var(--color-border)] text-[color:var(--color-text-tertiary)]",
              ].join(" ")}
            >
              {i + 1}
            </span>
            <span
              className={`hidden font-mono text-[10px] font-semibold uppercase tracking-[0.14em] sm:block ${i <= step ? "text-[color:var(--color-text)]" : "text-[color:var(--color-text-tertiary)]"}`}
            >
              {label}
            </span>
            {i < steps.length - 1 && (
              <span
                className={`h-px flex-1 ${i < step ? "bg-[color:var(--color-primary)]/50" : "bg-[color:var(--color-border)]"}`}
              />
            )}
          </div>
        ))}
      </div>

      {step === 0 && (
        <StepGrid
          title="What's your budget?"
          options={BUDGETS}
          onPick={(o) => {
            setBudget(o);
            setStep(1);
          }}
        />
      )}
      {step === 1 && (
        <StepGrid
          title="What do you play with?"
          options={CATEGORIES}
          onPick={(o) => {
            setCategory(o);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <StepGrid title="Pick your vibe" options={STYLES} onPick={runSearch} />
      )}

      {step === 3 && (
        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-primary)]">
              <Sparkles size={13} /> Picked for you
              <span className="text-[color:var(--color-text-tertiary)]">
                · {budget?.label} · {category?.label} · {style?.label}
              </span>
            </span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-text)]"
            >
              <RotateCcw size={13} /> Start over
            </button>
          </div>
          {loading ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkinCardSkeleton key={i} />
              ))}
            </div>
          ) : results && results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {results.slice(0, 8).map((it) => (
                  <SkinCard key={it.listingId} item={it} locale={locale} />
                ))}
              </div>
              <div className="mt-5 text-center">
                <Link
                  href={catalogHref}
                  className="inline-flex h-11 items-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] px-6 text-[13px] font-bold text-[color:var(--color-text)] transition hover:border-[color:var(--color-primary)]/60"
                >
                  See all matches <ArrowRight size={14} />
                </Link>
              </div>
            </>
          ) : (
            <div className="py-10 text-center">
              <Compass size={28} className="mx-auto mb-3 text-[color:var(--color-text-tertiary)]" />
              <p className="text-[13.5px] text-[color:var(--color-text-secondary)]">
                Nothing matched that combo — try a different vibe or budget.
              </p>
            </div>
          )}
        </div>
      )}

      {step > 0 && step < 3 && (
        <button
          type="button"
          onClick={() => setStep((s) => (s - 1) as StepId)}
          className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-text)]"
        >
          <ArrowLeft size={13} /> Back
        </button>
      )}
    </div>
  );
}

function StepGrid<T extends { id: string; label: string; hint: string }>({
  title,
  options,
  onPick,
}: {
  title: string;
  options: readonly T[];
  onPick: (o: T) => void;
}) {
  return (
    <div>
      <h3 className="mb-4 font-display text-lg font-bold uppercase tracking-tight text-[color:var(--color-text)]">
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onPick(o)}
            className="group rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 text-left transition-all hover:border-[color:var(--color-primary)]/50 hover:shadow-[0_0_24px_var(--color-primary-glow)]"
          >
            <div className="text-[14px] font-bold text-[color:var(--color-text)] transition-colors group-hover:text-[color:var(--color-primary)]">
              {o.label}
            </div>
            <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[color:var(--color-text-tertiary)]">
              {o.hint}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
