"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Scale, X } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useCompare } from "@/providers/CompareProvider";

export function CompareTray() {
  const { items, ready, remove, clear } = useCompare();

  return (
    <AnimatePresence>
      {ready && items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 300 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="glass flex w-full max-w-xl items-center gap-3 rounded-[var(--radius-xl)] border border-[color:var(--color-border)] p-3 shadow-[var(--shadow-lg)]">
            <Scale className="hidden h-4 w-4 shrink-0 text-[color:var(--color-accent)] sm:block" />
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="relative flex min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-1.5"
                  style={{ ["--rarity" as string]: it.rarityColor ?? "var(--color-border)" }}
                >
                  {it.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={it.imageUrl} alt="" className="h-8 w-11 shrink-0 object-contain" />
                  )}
                  <span className="truncate text-[12px] font-medium">{it.name}</span>
                  <button
                    type="button"
                    aria-label={`Remove ${it.name} from compare`}
                    onClick={() => remove(it.id)}
                    className="ml-auto shrink-0 text-[color:var(--color-text-tertiary)] hover:text-[color:var(--color-danger)]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
              {items.length === 1 && (
                <div className="flex min-w-0 flex-1 items-center justify-center rounded-[var(--radius-md)] border border-dashed border-[color:var(--color-border)] p-2 text-[11px] text-[color:var(--color-text-tertiary)]">
                  Pick one more skin
                </div>
              )}
            </div>
            {items.length === 2 ? (
              <Link
                href={`/skin/${items[0].id}?compare=${items[1].id}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] bg-[color:var(--color-primary)] px-3.5 py-2 text-[13px] font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110"
              >
                Compare <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={clear}
                className="shrink-0 text-[12px] text-[color:var(--color-text-tertiary)] hover:text-[color:var(--color-text)]"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
