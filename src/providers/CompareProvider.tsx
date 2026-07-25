"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "conskins:compare:v1";
const MAX_ITEMS = 2;

export interface CompareItem {
  id: string;
  name: string;
  imageUrl: string | null;
  rarityColor: string | null;
}

interface CompareContextValue {
  items: CompareItem[];
  ready: boolean;
  isSelected: (skinId: string) => boolean;
  /** returns false when the tray is full and the item wasn't added */
  toggle: (item: CompareItem) => boolean;
  remove: (skinId: string) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CompareItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed.slice(0, MAX_ITEMS));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: CompareItem[]) => {
    setItems(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage blocked — keep in-memory state
    }
  }, []);

  const isSelected = useCallback(
    (skinId: string) => items.some((i) => i.id === skinId),
    [items],
  );

  const toggle = useCallback(
    (item: CompareItem) => {
      if (items.some((i) => i.id === item.id)) {
        persist(items.filter((i) => i.id !== item.id));
        return true;
      }
      if (items.length >= MAX_ITEMS) return false;
      persist([...items, item]);
      return true;
    },
    [items, persist],
  );

  const remove = useCallback(
    (skinId: string) => persist(items.filter((i) => i.id !== skinId)),
    [items, persist],
  );

  const clear = useCallback(() => persist([]), [persist]);

  return (
    <CompareContext.Provider value={{ items, ready, isSelected, toggle, remove, clear }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
