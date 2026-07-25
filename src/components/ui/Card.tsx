import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

type CardSurface = "1" | "2" | "glass";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  interactive?: boolean;
  as?: React.ElementType;
}

/**
 * ConSkins Card — graphite surface levels:
 *   surface "1" = elevated card (default), "2" = inner panel, "glass" = frosted.
 * `interactive` adds the lift + border-glow hover treatment.
 */
export function Card({
  surface = "1",
  interactive = false,
  as: Component = "div",
  className,
  children,
  ...rest
}: CardProps) {
  const surfaces: Record<CardSurface, string> = {
    "1": "bg-[color:var(--color-bg-elevated)] border border-[color:var(--color-border)]",
    "2": "bg-[color:var(--color-bg-tertiary)] border border-[color:var(--color-hairline)]",
    glass: "glass",
  };

  return (
    <Component
      className={twMerge(
        clsx(
          "rounded-[var(--radius-xl)]",
          surfaces[surface],
          interactive &&
            "card-lift cursor-pointer hover:border-[color:var(--color-border-hover)]",
          className,
        ),
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
