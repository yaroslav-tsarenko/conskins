"use client";

interface StickerLike {
  name: string;
  imageUrl: string | null;
  wear: number | null;
}

// Sticker payloads come from an external importer as loosely-shaped Json.
function parseStickers(raw: unknown): StickerLike[] {
  if (!Array.isArray(raw)) return [];
  const out: StickerLike[] = [];
  for (const s of raw) {
    if (typeof s === "string") {
      out.push({ name: s, imageUrl: null, wear: null });
    } else if (s && typeof s === "object") {
      const o = s as Record<string, unknown>;
      const name = typeof o.name === "string" ? o.name : null;
      if (!name) continue;
      out.push({
        name,
        imageUrl:
          typeof o.imageUrl === "string"
            ? o.imageUrl
            : typeof o.image === "string"
              ? o.image
              : null,
        wear: typeof o.wear === "number" ? o.wear : null,
      });
    }
  }
  return out;
}

export function StickerRow({ stickers }: { stickers: unknown }) {
  const list = parseStickers(stickers);
  if (list.length === 0) return null;

  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-[color:var(--color-text-tertiary)]">
        Stickers
      </div>
      <div className="flex flex-wrap gap-2">
        {list.map((s, i) => (
          <div
            key={`${s.name}-${i}`}
            className="flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-2.5 py-1.5"
            title={s.name}
          >
            {s.imageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={s.imageUrl} alt="" className="h-6 w-6 object-contain" />
            )}
            <span className="max-w-40 truncate text-[12px] font-medium">{s.name}</span>
            {s.wear != null && (
              <span className="tnum font-mono text-[10px] text-[color:var(--color-text-tertiary)]">
                {Math.round(s.wear * 100)}%
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
