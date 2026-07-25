"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const STORAGE_KEY = "conskins:favorites:v1";

interface FavoritesContextValue {
  ids: string[];
  count: number;
  /** false until localStorage has been read — render counters only when ready */
  ready: boolean;
  isFavorite: (skinId: string) => boolean;
  toggle: (skinId: string) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setIds(parsed.filter((v) => typeof v === "string"));
      }
    } catch {
      // corrupted storage — start fresh
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // storage full/blocked — keep in-memory state
    }
  }, []);

  const isFavorite = useCallback((skinId: string) => ids.includes(skinId), [ids]);

  const toggle = useCallback(
    (skinId: string) => {
      persist(
        ids.includes(skinId) ? ids.filter((id) => id !== skinId) : [...ids, skinId],
      );
    },
    [ids, persist],
  );

  return (
    <FavoritesContext.Provider
      value={{ ids, count: ids.length, ready, isFavorite, toggle }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
