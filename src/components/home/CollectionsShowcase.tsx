import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Layers } from "lucide-react";
import { SkinPrice } from "@/components/shared/SkinPrice";
import type { CollectionSummary } from "@/lib/skins/queries";

export function CollectionsShowcase({ collections }: { collections: CollectionSummary[] }) {
  if (collections.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {collections.map((c) => (
        <Link
          key={c.collection}
          href={`/catalog?collection=${encodeURIComponent(c.collection)}`}
          className="group relative flex items-center gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-4 transition-all hover:border-[color:var(--color-accent)]/50"
        >
          <span
            className="relative flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] bg-[color:var(--color-bg)]"
            style={{ boxShadow: `inset 0 -2px 0 0 ${c.hero?.rarityColor ?? "var(--color-border)"}` }}
          >
            {c.hero?.imageUrl ? (
              <Image src={c.hero.imageUrl} alt="" fill sizes="80px" className="object-contain p-1.5" />
            ) : (
              <Layers size={20} className="text-[color:var(--color-text-tertiary)]" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-semibold text-[color:var(--color-text)] transition-colors group-hover:text-[color:var(--color-accent)]">
              {c.collection}
            </span>
            <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
              {c.count.toLocaleString()} skins
              {c.fromPrice != null && (
                <>
                  {" · from "}
                  <SkinPrice usd={c.fromPrice} />
                </>
              )}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
