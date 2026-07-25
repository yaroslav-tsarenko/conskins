"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";

export interface TabItem<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

interface TabsProps<T extends string = string> {
  items: TabItem<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}

/**
 * Segmented tabs — graphite track with a volt-tinted active segment.
 * Controlled component: pass `value` + `onChange`.
 */
export function Tabs<T extends string = string>({
  items,
  value,
  onChange,
  size = "md",
  className,
}: TabsProps<T>) {
  return (
    <div
      role="tablist"
      className={twMerge(
        "inline-flex items-center gap-1 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-1",
        className,
      )}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.value)}
            className={clsx(
              "inline-flex items-center gap-1.5 rounded-[var(--radius-md)] font-medium transition-colors duration-150",
              size === "sm" ? "h-7 px-2.5 text-xs" : "h-8 px-3.5 text-[13px]",
              active
                ? "bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]"
                : "text-[color:var(--color-text-secondary)] hover:text-[color:var(--color-text)]",
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
