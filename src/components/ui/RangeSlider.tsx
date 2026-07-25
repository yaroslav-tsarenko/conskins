"use client";

import React, { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface RangeSliderProps {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  /** Track background — defaults to a graphite bar; pass e.g. var(--gradient-wear) for float. */
  trackBackground?: string;
  formatValue?: (v: number) => string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Dual-thumb range slider (price / float filters). Pointer-driven — no native
 * <input type=range> stacking issues, works with touch.
 */
export function RangeSlider({
  min,
  max,
  step = 1,
  value,
  onChange,
  trackBackground,
  formatValue,
  className,
  ariaLabel = "range",
}: RangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [lo, hi] = value;
  const span = max - min || 1;
  const loPct = ((lo - min) / span) * 100;
  const hiPct = ((hi - min) / span) * 100;

  const snap = useCallback(
    (raw: number) => {
      const stepped = Math.round((raw - min) / step) * step + min;
      const decimals = step < 1 ? String(step).split(".")[1]?.length ?? 0 : 0;
      return Math.min(max, Math.max(min, Number(stepped.toFixed(decimals))));
    },
    [min, max, step],
  );

  const startDrag = (thumb: "lo" | "hi") => (e: React.PointerEvent) => {
    e.preventDefault();
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();

    const move = (ev: PointerEvent) => {
      const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
      const raw = snap(min + ratio * span);
      if (thumb === "lo") onChange([Math.min(raw, hi), hi]);
      else onChange([lo, Math.max(raw, lo)]);
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    move(e.nativeEvent);
  };

  const handleKey = (thumb: "lo" | "hi") => (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowUp" ? step : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -step : 0;
    if (!delta) return;
    e.preventDefault();
    if (thumb === "lo") onChange([snap(Math.min(lo + delta, hi)), hi]);
    else onChange([lo, snap(Math.max(hi + delta, lo))]);
  };

  const thumbCls =
    "absolute top-1/2 h-[18px] w-[18px] -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-2 border-[color:var(--color-primary)] bg-[color:var(--color-bg)] shadow-[0_2px_8px_rgba(0,0,0,0.4)] transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)]/40";

  return (
    <div className={twMerge("relative py-2.5 select-none touch-none", className)}>
      <div
        ref={trackRef}
        className="relative h-1.5 rounded-full bg-[color:var(--color-bg-tertiary)]"
        style={trackBackground ? { background: trackBackground } : undefined}
      >
        {!trackBackground && (
          <div
            className="absolute h-full rounded-full bg-[color:var(--color-primary)]/70"
            style={{ left: `${loPct}%`, width: `${hiPct - loPct}%` }}
          />
        )}
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${ariaLabel} minimum`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={lo}
          aria-valuetext={formatValue?.(lo)}
          className={thumbCls}
          style={{ left: `${loPct}%` }}
          onPointerDown={startDrag("lo")}
          onKeyDown={handleKey("lo")}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label={`${ariaLabel} maximum`}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={hi}
          aria-valuetext={formatValue?.(hi)}
          className={thumbCls}
          style={{ left: `${hiPct}%` }}
          onPointerDown={startDrag("hi")}
          onKeyDown={handleKey("hi")}
        />
      </div>
      {formatValue && (
        <div className="mt-2 flex justify-between font-mono text-[11px] tnum text-[color:var(--color-text-secondary)]">
          <span>{formatValue(lo)}</span>
          <span>{formatValue(hi)}</span>
        </div>
      )}
    </div>
  );
}
