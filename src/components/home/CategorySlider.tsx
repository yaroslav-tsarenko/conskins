"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { SkinPrice } from "@/components/shared/SkinPrice";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { CategoryShowcaseEntry } from "@/lib/skins/queries";

const ORDER = ["Knife", "Gloves", "Rifle", "Pistol", "SMG", "Heavy", "Equipment"];

export function CategorySlider({ entries }: { entries: CategoryShowcaseEntry[] }) {
  const router = useRouter();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ down: false, startX: 0, startScroll: 0, moved: false });
  const [dragging, setDragging] = useState(false);

  const rank = (c: string) => {
    const i = ORDER.indexOf(c);
    return i === -1 ? 999 : i;
  };
  const sorted = [...entries].sort((a, b) => rank(a.category) - rank(b.category));

  const scrollBy = (dir: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: dir * 620, behavior: "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = scrollerRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(dx) > 6) {
      drag.current.moved = true;
      setDragging(true);
      el.setPointerCapture(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    drag.current.down = false;
    // затримка, щоб click після drag не спрацював як навігація
    requestAnimationFrame(() => setDragging(false));
  };

  const go = (category: string) => {
    if (drag.current.moved) return;
    router.push(`/catalog?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -right-1 -top-14 hidden items-center gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll categories left"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-text)]"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll categories right"
          className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] transition hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-text)]"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <div
        ref={scrollerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={[
          "scrollbar-none -mx-1 flex gap-4 overflow-x-auto px-1 pb-2",
          dragging ? "cursor-grabbing select-none snap-none" : "cursor-grab snap-x snap-mandatory",
        ].join(" ")}
      >
        {sorted.map((e) => (
          <button
            key={e.category}
            type="button"
            onClick={() => go(e.category)}
            className="group relative block h-[300px] w-[260px] shrink-0 snap-start overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] text-left transition-all hover:border-[color:var(--color-primary)]/50 hover:shadow-[0_0_32px_var(--color-primary-glow)] sm:h-[320px] sm:w-[300px]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background: `radial-gradient(110% 85% at 50% 100%, ${e.hero?.rarityColor ?? "#B4FF39"}26 0%, transparent 62%)`,
              }}
            />
            <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-60" />

            {e.hero?.imageUrl && (
              <div className="absolute inset-x-6 bottom-16 top-16">
                <Image
                  src={e.hero.imageUrl}
                  alt={e.hero.name}
                  fill
                  sizes="300px"
                  draggable={false}
                  className="object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            )}

            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <div>
                <div className="font-display text-[15px] font-bold uppercase tracking-wide text-[color:var(--color-text)]">
                  {e.category}
                </div>
                <div className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.12em] text-[color:var(--color-text-tertiary)]">
                  {e.count.toLocaleString()} skins
                </div>
              </div>
              {e.fromPrice != null && (
                <span className="tnum rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-bg)]/70 px-2.5 py-1 font-mono text-[11px] font-bold text-[color:var(--color-primary)] backdrop-blur">
                  from <SkinPrice usd={e.fromPrice} />
                </span>
              )}
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[color:var(--color-bg)]/90 to-transparent p-4 pt-8">
              <span className="inline-flex translate-y-1 items-center gap-1.5 text-[12.5px] font-semibold text-[color:var(--color-primary)] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                Browse {e.category.toLowerCase()} <ArrowRight size={13} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-text-tertiary)] transition-opacity duration-300 group-hover:opacity-0">
                Drag to explore
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
