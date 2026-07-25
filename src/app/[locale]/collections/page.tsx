import type { Metadata } from "next";
import { Link } from "@/i18n/routing";
import { ArrowRight, FolderOpen, Sparkles } from "lucide-react";
import { getCollections } from "@/lib/skins/queries";
import { brand } from "@/lib/brand";

export const revalidate = 300;

export const metadata: Metadata = {
  title: `Collections — ${brand.displayName}`,
  description: "Browse CS2 skins by collection: from Ancient to Dust 2, every tradable case and map drop.",
};

const CURATED = [
  {
    title: "Factory New under $50",
    description: "Pristine floats without the collector price tag.",
    href: "/catalog?exterior=FN&priceMax=50",
  },
  {
    title: "StatTrak™ rifles",
    description: "Kill counters on AKs, M4s and AWPs.",
    href: "/catalog?category=Rifles&stattrak=1",
  },
  {
    title: "Best discounts vs Steam",
    description: "The widest gaps against Steam market pricing.",
    href: "/catalog?sort=discount",
  },
  {
    title: "Knives from the vault",
    description: "Every blade currently listed, cheapest first.",
    href: "/catalog?category=Knives&sort=price_asc",
  },
];

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent-tint)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
          <FolderOpen size={12} /> Collections
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-[color:var(--color-text)]">
          Browse by collection
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-[color:var(--color-text-secondary)]">
          Every case and map drop with live listings — plus curated picks from our traders.
        </p>
      </div>

      {/* curated picks */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CURATED.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className="group rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 transition hover:border-[color:var(--color-primary)]/50 hover:shadow-[var(--shadow-glow-volt)]"
          >
            <Sparkles size={16} className="text-[color:var(--color-primary)]" />
            <div className="mt-3 font-display text-[15px] font-bold text-[color:var(--color-text)]">
              {c.title}
            </div>
            <p className="mt-1 text-[13px] text-[color:var(--color-text-secondary)]">
              {c.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[color:var(--color-accent)]">
              Explore <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      {/* all collections */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <Link
            key={c.collection}
            href={`/catalog?collection=${encodeURIComponent(c.collection)}`}
            className="group relative flex items-center gap-4 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4 transition hover:border-[color:var(--color-border-hover)]"
            style={{ ["--rarity" as string]: c.hero?.rarityColor ?? "var(--color-border)" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: `radial-gradient(80% 120% at 100% 50%, ${c.hero?.rarityColor ?? "#5AC8FF"}1f 0%, transparent 60%)`,
              }}
            />
            <div className="tech-grid relative h-20 w-28 shrink-0 overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
              {c.hero?.imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={c.hero.imageUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-contain p-2 transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </div>
            <div className="relative min-w-0 flex-1">
              <div className="truncate font-display text-[15px] font-bold text-[color:var(--color-text)]">
                {c.collection}
              </div>
              <div className="mt-1 text-[12.5px] text-[color:var(--color-text-secondary)]">
                {c.count} skin{c.count === 1 ? "" : "s"}
                {c.fromPrice != null && (
                  <>
                    {" · "}
                    <span className="tnum font-mono">from ${c.fromPrice.toFixed(2)}</span>
                  </>
                )}
              </div>
            </div>
            <ArrowRight
              size={16}
              className="relative shrink-0 text-[color:var(--color-text-tertiary)] transition-transform group-hover:translate-x-0.5 group-hover:text-[color:var(--color-accent)]"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
