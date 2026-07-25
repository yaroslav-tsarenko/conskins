"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface VolumePoint {
  date: string;
  volume: number;
}

export function VolumeChart({ data }: { data: VolumePoint[] }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
      <div className="mb-4 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        Trade volume · 30 days
      </div>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
            <CartesianGrid stroke="var(--color-border)" strokeOpacity={0.3} vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              minTickGap={40}
              tickFormatter={(v: string) => v.slice(5)}
            />
            <YAxis
              tick={{ fill: "var(--color-text-tertiary)", fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={44}
            />
            <Tooltip
              cursor={{ fill: "var(--color-bg-tertiary)", opacity: 0.5 }}
              contentStyle={{
                background: "var(--color-bg)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
              labelStyle={{ color: "var(--color-text-secondary)" }}
              formatter={(value) => [Number(value).toLocaleString(), "Trades"]}
            />
            <Bar dataKey="volume" fill="var(--color-primary)" radius={[3, 3, 0, 0]} opacity={0.85} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
