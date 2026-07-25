"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

interface TooltipProps {
  content: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
  children: React.ReactNode;
}

/**
 * Lightweight CSS tooltip — hover/focus reveal, no portal.
 * For rich content keep it short; long text wraps at 240px.
 */
export function Tooltip({ content, side = "top", className, children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      <span
        role="tooltip"
        className={twMerge(
          clsx(
            "pointer-events-none absolute left-1/2 z-50 w-max max-w-[240px] -translate-x-1/2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-tertiary)] px-2.5 py-1.5 text-[11.5px] leading-snug text-[color:var(--color-text)] shadow-[var(--shadow-lg)] transition-all duration-150",
            side === "top" ? "bottom-full mb-2" : "top-full mt-2",
            open
              ? "visible opacity-100 translate-y-0"
              : clsx("invisible opacity-0", side === "top" ? "translate-y-1" : "-translate-y-1"),
          ),
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}
