import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type BadgeTone =
  | "volt"
  | "ice"
  | "ember"
  | "success"
  | "danger"
  | "neutral"
  | "rarity";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** hex/token for tone="rarity" — sets text + tinted bg from the rarity color */
  rarityColor?: string;
  mono?: boolean;
}

/**
 * ConSkins Badge — compact technical label (exterior, StatTrak, discount).
 * Squared corners + mono option distinguish it from the pill-shaped Chip.
 */
export function Badge({
  tone = "neutral",
  rarityColor,
  mono = false,
  className,
  style,
  children,
  ...rest
}: BadgeProps) {
  const tones: Record<Exclude<BadgeTone, "rarity">, string> = {
    volt: "bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)] border-[color:var(--color-primary)]/25",
    ice: "bg-[color:var(--color-accent-tint)] text-[color:var(--color-accent)] border-[color:var(--color-accent)]/25",
    ember:
      "bg-[color:var(--color-coral-tint)] text-[color:var(--color-coral)] border-[color:var(--color-coral)]/25",
    success:
      "bg-[color:var(--color-success-light)] text-[color:var(--color-success)] border-[color:var(--color-success)]/25",
    danger:
      "bg-[color:var(--color-danger-light)] text-[color:var(--color-danger)] border-[color:var(--color-danger)]/25",
    neutral:
      "bg-[color:var(--color-bg-tertiary)] text-[color:var(--color-text-secondary)] border-[color:var(--color-border)]",
  };

  const rarityStyle: React.CSSProperties | undefined =
    tone === "rarity" && rarityColor
      ? {
          color: rarityColor,
          backgroundColor: `color-mix(in srgb, ${rarityColor} 14%, transparent)`,
          borderColor: `color-mix(in srgb, ${rarityColor} 30%, transparent)`,
        }
      : undefined;

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center gap-1 rounded-[var(--radius-sm)] border px-1.5 py-0.5 text-[11px] font-medium leading-none",
          mono && "font-mono tracking-wide uppercase",
          tone !== "rarity" && tones[tone],
          className,
        ),
      )}
      style={{ ...rarityStyle, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}
