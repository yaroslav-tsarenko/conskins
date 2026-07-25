import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import type { CatalogItem } from "@/lib/skins/queries";

export type StoryThemeId = "knives" | "red" | "luxury" | "budget";

const THEMES: {
  id: StoryThemeId;
  title: string;
  tagline: string;
  href: string;
  accent: string;
}[] = [
  {
    id: "knives",
    title: "The Knife Collection",
    tagline: "The ultimate flex. Karambits, Butterflies, Bayonets.",
    href: "/catalog?category=Knife&sort=price_desc",
    accent: "#FF5C38",
  },
  {
    id: "red",
    title: "Red Inventory",
    tagline: "Crimson Webs, Redlines, Fire Serpents — full send.",
    href: "/catalog?q=red&sort=price_desc",
    accent: "#FF4D6D",
  },
  {
    id: "luxury",
    title: "Luxury Tier",
    tagline: "Dragon Lores and Howls. For collectors only.",
    href: "/catalog?sort=price_desc",
    accent: "#B4FF39",
  },
  {
    id: "budget",
    title: "Budget Beast",
    tagline: "Full loadout under $50. Look rich, spend smart.",
    href: "/catalog?priceMax=50&sort=discount",
    accent: "#5AC8FF",
  },
];

export function CollectionsStory({
  heroes,
}: {
  heroes: Partial<Record<StoryThemeId, CatalogItem>>;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {THEMES.map((t) => {
        const hero = heroes[t.id];
        return (
          <Link
            key={t.id}
            href={t.href}
            className="group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-6 transition-all hover:border-[color:var(--color-primary)]/40 hover:shadow-[0_0_36px_var(--color-primary-glow)] sm:min-h-[280px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 transition-opacity duration-500"
              style={{
                background: `radial-gradient(90% 90% at 80% 20%, ${t.accent}24 0%, transparent 60%)`,
              }}
            />
            <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-50" />
            {hero?.imageUrl && (
              <div className="absolute -right-6 -top-2 h-[65%] w-[62%] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110">
                <Image
                  src={hero.imageUrl}
                  alt={hero.name}
                  fill
                  sizes="380px"
                  className="object-contain drop-shadow-[0_20px_36px_rgba(0,0,0,0.55)]"
                />
              </div>
            )}
            <div className="relative max-w-[70%]">
              <span
                className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: t.accent }}
              >
                Curated drop
              </span>
              <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-tight text-[color:var(--color-text)] sm:text-2xl">
                {t.title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--color-text-secondary)]">
                {t.tagline}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[color:var(--color-primary)]">
                Explore drop
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
