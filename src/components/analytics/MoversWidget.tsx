import { Link } from "@/i18n/routing";
import { SkinPrice } from "@/components/shared/SkinPrice";

export interface MoverEntry {
  id: string;
  name: string;
  weapon: string;
  imageUrl: string | null;
  rarityColor: string;
  value: string;
  priceUsd?: number;
  delta?: string;
  deltaTone?: "up" | "down" | "neutral";
}

const TONE: Record<NonNullable<MoverEntry["deltaTone"]>, string> = {
  up: "text-[color:var(--color-success)]",
  down: "text-[color:var(--color-danger)]",
  neutral: "text-[color:var(--color-text-tertiary)]",
};

export function MoversWidget({ title, entries }: { title: string; entries: MoverEntry[] }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-4">
      <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        {title}
      </div>
      <div className="flex flex-col gap-1">
        {entries.map((e, i) => (
          <Link
            key={e.id}
            href={`/skin/${e.id}`}
            className="flex items-center gap-3 rounded-[var(--radius-md)] px-2 py-1.5 transition-colors hover:bg-[color:var(--color-bg-tertiary)]/60"
          >
            <span className="tnum w-4 shrink-0 font-mono text-[11px] text-[color:var(--color-text-tertiary)]">
              {i + 1}
            </span>
            {e.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={e.imageUrl} alt="" className="h-8 w-11 shrink-0 object-contain" />
            )}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[13px] font-medium text-[color:var(--color-text)]">
                {e.name.replace(/^(StatTrak™ |Souvenir )/, "")}
              </div>
              <div className="truncate text-[11px] text-[color:var(--color-text-tertiary)]">
                {e.weapon}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <div className="tnum font-mono text-[13px] font-bold text-[color:var(--color-text)]">
                {e.priceUsd != null ? <SkinPrice usd={e.priceUsd} /> : e.value}
              </div>
              {e.delta && (
                <div className={`tnum font-mono text-[11px] font-semibold ${TONE[e.deltaTone ?? "neutral"]}`}>
                  {e.delta}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
