import React from "react";
import { twMerge } from "tailwind-merge";
import { CountUp } from "@/components/home/CountUp";

interface StatProps {
  value: number;
  label: React.ReactNode;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

/** Mono tabular counter with an eyebrow-style label — hero/analytics stats. */
export function Stat({ value, label, prefix, suffix, decimals = 0, className }: StatProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <span className="font-mono text-[length:var(--text-stat,2rem)] font-semibold tnum leading-none text-[color:var(--color-text)]">
        <CountUp value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
        {label}
      </span>
    </div>
  );
}
