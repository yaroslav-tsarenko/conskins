"use client";

import { EXTERIORS, type ExteriorCode } from "@/lib/skins/shared";

export function FloatVisualizer({
  float,
  exterior,
  minFloat,
  maxFloat,
}: {
  float: number | null;
  exterior: ExteriorCode;
  minFloat: number | null;
  maxFloat: number | null;
}) {
  const marker = float == null ? null : Math.max(0, Math.min(1, float));
  const lo = minFloat != null ? Math.max(0, Math.min(1, minFloat)) : null;
  const hi = maxFloat != null ? Math.max(0, Math.min(1, maxFloat)) : null;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="wear-bar relative h-3 w-full rounded-full">
        {/* zones this skin can never roll */}
        {lo != null && lo > 0 && (
          <span
            className="absolute inset-y-0 left-0 rounded-l-full bg-[#05060A]/70"
            style={{ width: `${lo * 100}%` }}
          />
        )}
        {hi != null && hi < 1 && (
          <span
            className="absolute inset-y-0 right-0 rounded-r-full bg-[#05060A]/70"
            style={{ width: `${(1 - hi) * 100}%` }}
          />
        )}
        {/* exterior band separators */}
        {EXTERIORS.map((e) => (
          <span
            key={e.code}
            className="absolute top-0 h-full border-r border-black/30 last:border-r-0"
            style={{
              left: `${e.floatMin * 100}%`,
              width: `${(e.floatMax - e.floatMin) * 100}%`,
            }}
          />
        ))}
        {marker != null && (
          <span
            className="absolute top-1/2 h-5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/50 bg-white shadow"
            style={{ left: `${marker * 100}%` }}
          />
        )}
      </div>
      <div className="tnum flex justify-between font-mono text-[10px] text-[color:var(--color-text-tertiary)]">
        {EXTERIORS.map((e) => (
          <span
            key={e.code}
            className={exterior === e.code ? "font-bold text-[color:var(--color-text)]" : ""}
          >
            {e.short}
          </span>
        ))}
      </div>
      {(lo != null || hi != null) && (
        <div className="tnum font-mono text-[10px] text-[color:var(--color-text-tertiary)]">
          Possible range: {lo?.toFixed(2) ?? "0.00"} – {hi?.toFixed(2) ?? "1.00"}
        </div>
      )}
    </div>
  );
}
