"use client";

import { useRef, useState } from "react";
import { Heart, Scale } from "lucide-react";
import { useFavorites } from "@/providers/FavoritesProvider";
import { useCompare } from "@/providers/CompareProvider";

export function SkinShowcase({
  skinId,
  name,
  imageUrl,
  rarityColor,
  isStatTrak,
  isSouvenir,
}: {
  skinId: string;
  name: string;
  imageUrl: string | null;
  rarityColor: string;
  isStatTrak: boolean;
  isSouvenir: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const { ready, isFavorite, toggle: toggleFavorite } = useFavorites();
  const { isSelected, toggle: toggleCompare } = useCompare();

  const fav = ready && isFavorite(skinId);
  const comparing = ready && isSelected(skinId);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
      className="tech-grid group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)]"
      style={{ ["--rarity" as string]: rarityColor, perspective: "900px" }}
    >
      <div className="rarity-strip absolute inset-x-0 top-0 z-10 h-[3px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(120% 80% at 50% 120%, ${rarityColor}33 0%, transparent 60%)`,
        }}
      />
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 h-full w-full object-contain p-8 transition-transform duration-150 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x || tilt.y ? 1.04 : 1})`,
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-[color:var(--color-text-tertiary)]">
          no image
        </div>
      )}

      <div className="absolute left-3 top-3 z-10 flex flex-wrap gap-1">
        {isStatTrak && (
          <span className="rounded bg-[color:var(--color-warning)] px-1.5 py-0.5 text-[10px] font-bold uppercase text-black">
            StatTrak™
          </span>
        )}
        {isSouvenir && (
          <span className="rounded bg-[color:var(--color-teal)] px-1.5 py-0.5 text-[10px] font-bold uppercase text-black">
            Souvenir
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 z-10 flex gap-1.5">
        <button
          type="button"
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
          onClick={() => toggleFavorite(skinId)}
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition",
            fav
              ? "border-[color:var(--color-danger)]/60 bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]"
              : "border-[color:var(--color-border)] bg-[#0D0F13]/70 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-danger)]",
          ].join(" ")}
        >
          <Heart className="h-4 w-4" fill={fav ? "currentColor" : "none"} />
        </button>
        <button
          type="button"
          aria-label={comparing ? "Remove from compare" : "Add to compare"}
          onClick={() => toggleCompare({ id: skinId, name, imageUrl, rarityColor })}
          className={[
            "flex h-8 w-8 items-center justify-center rounded-full border backdrop-blur-sm transition",
            comparing
              ? "border-[color:var(--color-accent)]/60 bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]"
              : "border-[color:var(--color-border)] bg-[#0D0F13]/70 text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-accent)]",
          ].join(" ")}
        >
          <Scale className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
