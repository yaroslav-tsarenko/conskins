"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FilterSidebar } from "./FilterSidebar";
import type { Facets, FiltersState, PatchFilters } from "./types";

export function MobileFiltersDrawer({
  open,
  onClose,
  total,
  activeCount,
  onClearAll,
  facets,
  filters,
  patch,
}: {
  open: boolean;
  onClose: () => void;
  total: number | null;
  activeCount: number;
  onClearAll: () => void;
  facets: Facets;
  filters: FiltersState;
  patch: PatchFilters;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#05060A]/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="glass absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-[var(--radius-xl)] border-t border-[color:var(--color-border)]"
          >
            <div className="mx-auto mt-2.5 h-1 w-10 shrink-0 rounded-full bg-[color:var(--color-border-hover)]" />
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-display text-sm font-bold uppercase tracking-wide">
                Filters
              </span>
              <div className="flex items-center gap-4">
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={onClearAll}
                    className="text-xs font-semibold text-[color:var(--color-accent)] hover:underline"
                  >
                    Clear ({activeCount})
                  </button>
                )}
                <button type="button" onClick={onClose} aria-label="Close filters">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-4">
              <FilterSidebar facets={facets} filters={filters} patch={patch} />
            </div>
            <div className="border-t border-[color:var(--color-border)] p-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-[var(--radius-md)] bg-[color:var(--color-primary)] py-2.5 text-sm font-bold text-[color:var(--color-primary-fg)] transition hover:brightness-110"
              >
                Show {total != null ? total.toLocaleString() : ""} offers
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
