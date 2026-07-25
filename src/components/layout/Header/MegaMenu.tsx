"use client";

import { useState, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Swords,
  Hand,
  Crosshair,
  Target,
  Package,
  Layers,
  LayoutGrid,
  Flame,
  TrendingDown,
  Sparkles,
  Calculator,
  Shirt,
  LineChart,
} from "lucide-react";

export interface MegaMenuLink {
  href: string;
  key: string;
  Icon: React.ElementType;
  accent?: "volt" | "ice" | "ember";
}

export interface MegaMenuGroup {
  id: string;
  columns: 1 | 2;
  links: MegaMenuLink[];
}

/** Shared nav model — MegaMenu (desktop) and MobileNav both consume this.
 *  Labels/descriptions live in messages under `megaMenu.*`. */
export const MEGA_MENU: MegaMenuGroup[] = [
  {
    id: "browse",
    columns: 2,
    links: [
      { href: "/catalog", key: "allSkins", Icon: LayoutGrid, accent: "volt" },
      { href: "/catalog?category=Knives", key: "knives", Icon: Swords },
      { href: "/catalog?category=Gloves", key: "gloves", Icon: Hand },
      { href: "/catalog?category=Rifles", key: "rifles", Icon: Crosshair },
      { href: "/catalog?category=Pistols", key: "pistols", Icon: Target },
      { href: "/catalog?category=Heavy", key: "heavy", Icon: Package },
      { href: "/collections", key: "collections", Icon: Layers, accent: "ice" },
    ],
  },
  {
    id: "market",
    columns: 1,
    links: [
      { href: "/catalog?sort=discount", key: "trending", Icon: Flame, accent: "ember" },
      { href: "/catalog?sort=discount", key: "priceDrops", Icon: TrendingDown, accent: "ember" },
      { href: "/catalog?sort=newest", key: "newListings", Icon: Sparkles, accent: "ice" },
    ],
  },
  {
    id: "tools",
    columns: 1,
    links: [
      { href: "/#calculator", key: "calculator", Icon: Calculator },
      { href: "/loadout", key: "loadout", Icon: Shirt, accent: "volt" },
      { href: "/analytics", key: "analytics", Icon: LineChart, accent: "ice" },
    ],
  },
];

const ACCENTS: Record<NonNullable<MegaMenuLink["accent"]> | "default", string> = {
  volt: "bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]",
  ice: "bg-[color:var(--color-accent-tint)] text-[color:var(--color-accent)]",
  ember: "bg-[color:var(--color-coral-tint)] text-[color:var(--color-coral)]",
  default: "bg-[color:var(--color-bg-tertiary)] text-[color:var(--color-text-secondary)]",
};

export function MegaMenu() {
  const t = useTranslations("megaMenu");
  const [openId, setOpenId] = useState<string | null>(null);
  const closeTimer = useRef<number | null>(null);

  const open = useCallback((id: string) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setOpenId(id);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenId(null), 120);
  }, []);

  return (
    <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
      {MEGA_MENU.map((group) => {
        const isOpen = openId === group.id;
        return (
          <div
            key={group.id}
            className="relative"
            onMouseEnter={() => open(group.id)}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={isOpen}
              onClick={() => (isOpen ? setOpenId(null) : open(group.id))}
              className={[
                "inline-flex h-10 items-center gap-1.5 rounded-[var(--radius-md)] px-3.5 text-[13.5px] font-semibold transition-colors",
                isOpen
                  ? "bg-[color:var(--color-bg-tertiary)] text-[color:var(--color-text)]"
                  : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)]",
              ].join(" ")}
            >
              {t(`groups.${group.id}`)}
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[color:var(--color-primary)]" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.985 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  role="menu"
                  className={[
                    "absolute left-0 top-full z-50 mt-2 origin-top rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] glass p-2 shadow-[var(--shadow-xl)]",
                    group.columns === 2 ? "grid w-[540px] grid-cols-2 gap-0.5" : "w-[300px]",
                  ].join(" ")}
                >
                  {group.links.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setOpenId(null)}
                      className="group/link flex items-start gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 transition-colors hover:bg-[color:var(--color-bg-tertiary)]"
                    >
                      <span
                        className={[
                          "mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] transition-colors",
                          ACCENTS[link.accent ?? "default"],
                        ].join(" ")}
                      >
                        <link.Icon size={15} strokeWidth={2} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-semibold text-[color:var(--color-text)] transition-colors group-hover/link:text-[color:var(--color-primary)]">
                          {t(`links.${link.key}.label`)}
                        </span>
                        <span className="block truncate text-[11.5px] text-[color:var(--color-text-tertiary)]">
                          {t(`links.${link.key}.description`)}
                        </span>
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
