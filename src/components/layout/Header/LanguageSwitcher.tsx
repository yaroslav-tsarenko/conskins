"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { usePathname, useRouter, type Locale } from "@/i18n/routing";
import { localeNames, routing } from "@/i18n/routing";

export function LanguageSwitcher({ direction = "down" }: { direction?: "down" | "up" }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectLocale = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(`${pathname}${window.location.search}`, { locale: next });
      router.refresh();
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${localeNames[locale]}`}
        className="inline-flex items-center gap-1 rounded-full px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-primary-tint)] hover:text-[color:var(--color-primary)]"
      >
        <Globe size={12} aria-hidden />
        <span>{locale}</span>
      </button>
      {open && (
        <div
          role="listbox"
          className={`absolute right-0 z-50 min-w-[132px] overflow-hidden rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] shadow-lg ${
            direction === "up" ? "bottom-full mb-1.5" : "top-full mt-1.5"
          }`}
        >
          {routing.locales.map((code) => (
            <button
              key={code}
              role="option"
              aria-selected={code === locale}
              onClick={() => selectLocale(code)}
              className={`block w-full px-3 py-2 text-left text-[13px] font-medium transition-colors ${
                code === locale
                  ? "bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]"
                  : "text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-secondary)]"
              }`}
            >
              {localeNames[code]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
