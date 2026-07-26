"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Modal } from "@/components/ui/Modal";
import { CountUp } from "@/components/home/CountUp";
import type { CatalogItem, CatalogResult } from "@/lib/skins/queries";
import { useSkinPrice } from "@/components/shared/SkinPrice";
import { useCurrency } from "@/providers/CurrencyProvider";

const STORAGE_KEY = "conskins:loadout:v1";

type Side = "t" | "ct";

interface SlotDef {
  key: string;
  label: string;
  category: string;
}

const SLOTS: SlotDef[] = [
  { key: "knife", label: "Knife", category: "Knives" },
  { key: "gloves", label: "Gloves", category: "Gloves" },
  { key: "rifle", label: "Rifle", category: "Rifles" },
  { key: "pistol", label: "Pistol", category: "Pistols" },
  { key: "smg", label: "SMG", category: "SMGs" },
  { key: "heavy", label: "Heavy", category: "Heavy" },
];

interface SlotItem {
  listingId: string;
  skinId: string;
  name: string;
  imageUrl: string | null;
  rarityColor: string;
  price: number;
  exterior: string;
  float: number | null;
}

type Loadout = Record<Side, Record<string, SlotItem | undefined>>;

const EMPTY: Loadout = { t: {}, ct: {} };

function loadStored(): Loadout {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "t" in parsed && "ct" in parsed) {
      return parsed as Loadout;
    }
  } catch {
    // corrupted storage — start fresh
  }
  return EMPTY;
}

export function LoadoutBuilder() {
  const fmt = useSkinPrice();
  const { symbol, convertFrom } = useCurrency();
  const [side, setSide] = useState<Side>("t");
  const [loadout, setLoadout] = useState<Loadout>(EMPTY);
  const [ready, setReady] = useState(false);
  const [pickerSlot, setPickerSlot] = useState<SlotDef | null>(null);

  useEffect(() => {
    setLoadout(loadStored());
    setReady(true);
  }, []);

  const persist = useCallback((next: Loadout) => {
    setLoadout(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage blocked — keep in-memory state
    }
  }, []);

  const setSlot = (slotKey: string, item: SlotItem | undefined) => {
    persist({ ...loadout, [side]: { ...loadout[side], [slotKey]: item } });
  };

  const current = loadout[side];
  const totals = useMemo(() => {
    const items = Object.values(loadout.t)
      .concat(Object.values(loadout.ct))
      .filter((i): i is SlotItem => i != null);
    return {
      count: items.length,
      value: items.reduce((s, i) => s + i.price, 0),
      sideValue: Object.values(current)
        .filter((i): i is SlotItem => i != null)
        .reduce((s, i) => s + i.price, 0),
    };
  }, [loadout, current]);

  return (
    <div className="flex flex-col gap-6">
      {/* side tabs + summary */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-1 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-1">
          {(
            [
              { key: "t", label: "Terrorists" },
              { key: "ct", label: "Counter-Terrorists" },
            ] as const
          ).map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setSide(s.key)}
              className={`rounded-[var(--radius-md)] px-4 py-2 text-sm font-bold transition ${
                side === s.key
                  ? "bg-[color:var(--color-primary)] text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)]"
                  : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)]"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
              Total value
            </div>
            <div className="tnum font-display text-xl font-extrabold text-[color:var(--color-primary)]">
              {ready ? (
                <CountUp value={convertFrom(totals.value, "USD")} decimals={2} prefix={symbol} duration={600} />
              ) : (
                "—"
              )}
            </div>
          </div>
          {totals.count > 0 && (
            <button
              type="button"
              onClick={() => persist(EMPTY)}
              className="inline-flex items-center gap-1.5 text-[12px] text-[color:var(--color-text-tertiary)] transition hover:text-[color:var(--color-danger)]"
            >
              <Trash2 size={13} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* slots */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {SLOTS.map((slot) => {
          const item = ready ? current[slot.key] : undefined;
          return (
            <div
              key={slot.key}
              className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]"
              style={item ? { ["--rarity" as string]: item.rarityColor } : undefined}
            >
              {item && <div className="rarity-strip h-[3px] w-full" />}
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
                    {slot.label}
                  </span>
                  {item && (
                    <button
                      type="button"
                      aria-label={`Remove ${slot.label}`}
                      onClick={() => setSlot(slot.key, undefined)}
                      className="text-[color:var(--color-text-tertiary)] transition hover:text-[color:var(--color-danger)]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {item ? (
                  <button
                    type="button"
                    onClick={() => setPickerSlot(slot)}
                    className="group block w-full text-left"
                  >
                    <div className="tech-grid relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
                      <div
                        className="pointer-events-none absolute inset-0 opacity-60"
                        style={{
                          background: `radial-gradient(120% 80% at 50% 120%, ${item.rarityColor}2e 0%, transparent 60%)`,
                        }}
                      />
                      {item.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="absolute inset-0 h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="mt-2 truncate text-[13px] font-semibold text-[color:var(--color-text)]">
                      {item.name.replace(/^(StatTrak™ |Souvenir )/, "")}
                    </div>
                    <div className="tnum mt-0.5 font-mono text-[12px] text-[color:var(--color-text-secondary)]">
                      {fmt(item.price)}
                      {item.float != null && ` · ${item.float.toFixed(4)}`}
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPickerSlot(slot)}
                    className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] text-[color:var(--color-text-tertiary)] transition hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-primary)]"
                  >
                    <Plus size={20} />
                    <span className="text-[12px] font-semibold">Pick a {slot.label.toLowerCase()}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[12.5px] text-[color:var(--color-text-tertiary)]">
        Your loadout is saved on this device. Prices update live from the{" "}
        <Link href="/catalog" className="text-[color:var(--color-accent)] hover:underline">
          catalog
        </Link>
        .
      </p>

      <SlotPickerModal
        slot={pickerSlot}
        onClose={() => setPickerSlot(null)}
        onPick={(item) => {
          if (pickerSlot) setSlot(pickerSlot.key, item);
          setPickerSlot(null);
        }}
      />
    </div>
  );
}

function SlotPickerModal({
  slot,
  onClose,
  onPick,
}: {
  slot: SlotDef | null;
  onClose: () => void;
  onPick: (item: SlotItem) => void;
}) {
  const fmt = useSkinPrice();
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!slot) return;
    setQuery("");
  }, [slot]);

  useEffect(() => {
    if (!slot) return;
    const ac = new AbortController();
    setLoading(true);
    const t = setTimeout(() => {
      const p = new URLSearchParams({ category: slot.category, perPage: "24", sort: "price_asc" });
      if (query.trim()) p.set("q", query.trim());
      fetch(`/api/skins?${p.toString()}`, { signal: ac.signal })
        .then((r) => r.json() as Promise<CatalogResult>)
        .then((json) => {
          setItems(json.items ?? []);
          setLoading(false);
        })
        .catch((err) => {
          if ((err as Error).name !== "AbortError") setLoading(false);
        });
    }, 250);
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [slot, query]);

  return (
    <Modal open={slot != null} onClose={onClose} title={slot ? `Pick a ${slot.label.toLowerCase()}` : ""} size="lg">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Search ${slot?.category.toLowerCase() ?? ""}…`}
        className="mb-4 w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2 text-sm outline-none placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-primary)]/60"
      />
      <div className="grid max-h-[50dvh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
        {loading && items.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[4/3] rounded-[var(--radius-md)]" />
            ))
          : items.map((it) => (
              <button
                key={it.listingId}
                type="button"
                onClick={() =>
                  onPick({
                    listingId: it.listingId,
                    skinId: it.skinId,
                    name: it.name,
                    imageUrl: it.imageUrl,
                    rarityColor: it.rarityColor,
                    price: it.price,
                    exterior: it.exterior,
                    float: it.float,
                  })
                }
                className="group rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-2 text-left transition hover:border-[color:var(--color-primary)]/60"
                style={{ ["--rarity" as string]: it.rarityColor }}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      background: `radial-gradient(120% 80% at 50% 120%, ${it.rarityColor}2e 0%, transparent 60%)`,
                    }}
                  />
                  {it.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.imageUrl}
                      alt={it.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-contain p-2 transition-transform group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="mt-1.5 truncate text-[12px] font-medium text-[color:var(--color-text)]">
                  {it.name.replace(/^(StatTrak™ |Souvenir )/, "")}
                </div>
                <div className="tnum font-mono text-[11px] text-[color:var(--color-text-secondary)]">
                  {fmt(it.price)}
                </div>
              </button>
            ))}
        {!loading && items.length === 0 && (
          <div className="col-span-full py-10 text-center text-sm text-[color:var(--color-text-secondary)]">
            Nothing found. Try another search.
          </div>
        )}
      </div>
    </Modal>
  );
}
