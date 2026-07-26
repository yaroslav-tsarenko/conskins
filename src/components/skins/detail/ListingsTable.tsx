"use client";

import { exteriorMeta } from "@/lib/skins/shared";
import type { SkinListingView } from "@/lib/skins/queries";
import { useSkinPrice } from "@/components/shared/SkinPrice";

export function ListingsTable({
  listings,
  selectedId,
  onSelect,
}: {
  listings: SkinListingView[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const fmt = useSkinPrice();
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        Available offers ({listings.length})
      </div>
      <div className="flex max-h-72 flex-col gap-1.5 overflow-y-auto pr-1">
        {listings.map((l, i) => {
          const ext = exteriorMeta(l.exterior);
          const active = l.id === selectedId;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelect(l.id)}
              className={`flex items-center justify-between gap-3 rounded-[var(--radius-md)] border px-3 py-2 text-left transition ${
                active
                  ? "border-[color:var(--color-primary)]/70 bg-[color:var(--color-primary-tint)]"
                  : "border-[color:var(--color-border)] hover:border-[color:var(--color-border-hover)]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="shrink-0 rounded bg-[color:var(--color-bg)] px-1.5 py-0.5 text-[10px] font-semibold text-[color:var(--color-text-secondary)]">
                  {ext?.short ?? "—"}
                </span>
                {l.float != null && (
                  <span className="tnum truncate font-mono text-xs text-[color:var(--color-text-secondary)]">
                    {l.float.toFixed(4)}
                  </span>
                )}
                {l.isStatTrak && (
                  <span className="text-[10px] font-bold text-[color:var(--color-warning)]">ST</span>
                )}
                {l.isSouvenir && (
                  <span className="text-[10px] font-bold text-[color:var(--color-teal)]">SV</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {i === 0 && (
                  <span className="rounded bg-[color:var(--color-success)] px-1.5 py-0.5 text-[10px] font-bold text-black">
                    BEST
                  </span>
                )}
                <span className="tnum font-mono text-sm font-bold text-[color:var(--color-text)]">
                  {fmt(l.price)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
