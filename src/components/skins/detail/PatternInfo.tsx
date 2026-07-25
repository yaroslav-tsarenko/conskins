"use client";

export function PatternInfo({
  pattern,
  paintSeed,
  phase,
  rarity,
  rarityColor,
}: {
  pattern: string | null;
  paintSeed: number | null;
  phase: string | null;
  rarity: string;
  rarityColor: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Meta label="Pattern" value={pattern ?? "—"} />
      <Meta label="Paint seed" value={paintSeed != null ? String(paintSeed) : "—"} mono />
      <Meta label="Phase" value={phase ?? "—"} />
      <Meta label="Rarity" value={rarity} color={rarityColor} />
    </div>
  );
}

function Meta({
  label,
  value,
  color,
  mono,
}: {
  label: string;
  value: string;
  color?: string;
  mono?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        {label}
      </div>
      <div
        className={`truncate text-sm font-semibold ${mono ? "tnum font-mono" : ""}`}
        style={{ color: color ?? "var(--color-text)" }}
      >
        {value}
      </div>
    </div>
  );
}
