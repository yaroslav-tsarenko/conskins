"use client";

import { useState, useEffect, useRef } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import {
  ChevronDown,
  Wallet,
  LogOut,
  User as UserIcon,
  Repeat,
  Link2,
  Shield,
  Heart,
  Plus,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useFavorites } from "@/providers/FavoritesProvider";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { ThemeToggle } from "./ThemeToggle";

const ACCOUNT_LINKS = [
  { href: "/account", icon: UserIcon, label: "Profile" },
  { href: "/account/wallet", icon: Wallet, label: "Wallet" },
  { href: "/account/trades", icon: Repeat, label: "My Trades" },
  { href: "/account/trade-url", icon: Link2, label: "Trade URL settings" },
];

function useDismiss(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [onClose]);
  return ref;
}

export function HeaderActions() {
  const pathname = usePathname();
  const { user, role, signOut } = useAuth();
  const { symbol, convert } = useCurrency();
  const { count, ready } = useFavorites();

  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useDismiss(() => setAccountOpen(false));

  const authHref = `/auth?next=${encodeURIComponent(pathname || "/")}`;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const displayName = user?.steam?.personaName || user?.name || user?.email || "Trader";
  const avatar = user?.steam?.avatarFull || user?.steam?.avatar || null;

  return (
    <div className="flex items-center gap-1.5">
      {/* Theme toggle */}
      <div className="hidden items-center rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-1 text-[color:var(--color-text-secondary)] md:flex">
        <ThemeToggle />
      </div>

      {/* Currency */}
      <div className="hidden items-center gap-0.5 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] px-1 py-1 md:flex">
        <CurrencySwitcher />
      </div>

      {/* Favorites */}
      <Link
        href="/favorites"
        aria-label="Favorites"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] text-[color:var(--color-text-secondary)] transition-colors hover:border-[color:var(--color-primary)]/50 hover:text-[color:var(--color-primary)]"
      >
        <Heart size={16} />
        {ready && count > 0 && (
          <span className="absolute -right-1 -top-1 inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1 font-mono text-[10px] font-bold tabular-nums text-[color:var(--color-primary-fg)]">
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>

      {/* Balance */}
      {user && (
        <Link
          href="/account/wallet"
          className="group hidden h-10 items-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] px-3 text-[color:var(--color-text)] transition-colors hover:border-[color:var(--color-accent)]/60 sm:inline-flex"
          aria-label="Wallet balance"
        >
          <Wallet size={15} className="text-[color:var(--color-accent)]" />
          <span className="font-mono text-[12.5px] font-bold tabular-nums">
            {symbol}
            {convert(user.walletBalanceEur ?? 0).toFixed(2)}
          </span>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)] transition-colors group-hover:bg-[color:var(--color-accent)]/25">
            <Plus size={13} />
          </span>
        </Link>
      )}

      {/* Auth zone */}
      {!user ? (
        <Link
          href={authHref}
          className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-4 text-[13px] font-bold text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_24px_var(--color-primary-glow)]"
        >
          <UserIcon size={15} />
          Sign in
        </Link>
      ) : (
        <div
          ref={accountRef}
          className="relative"
          onMouseEnter={() => setAccountOpen(true)}
          onMouseLeave={() => setAccountOpen(false)}
        >
          <button
            type="button"
            onClick={() => setAccountOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            className="inline-flex h-10 items-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] py-1 pl-1 pr-2.5 transition-colors hover:border-[color:var(--color-primary)]/50"
          >
            <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
              {avatar ? (
                <Image src={avatar} alt="" fill sizes="32px" className="object-cover" />
              ) : (
                <UserIcon size={16} />
              )}
            </span>
            <span className="hidden max-w-[110px] truncate text-[13px] font-semibold text-[color:var(--color-text)] xl:inline">
              {displayName}
            </span>
            <ChevronDown size={13} className="hidden text-[color:var(--color-text-tertiary)] xl:inline" />
          </button>
          <AnimatePresence>
            {accountOpen && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.15 }}
                role="menu"
                className="absolute right-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border)] glass p-2 shadow-[var(--shadow-xl)]"
              >
                <div className="mb-2 flex items-center gap-3 rounded-[var(--radius-lg)] bg-[color:var(--color-bg-secondary)] p-3">
                  <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
                    {avatar ? (
                      <Image src={avatar} alt="" fill sizes="40px" className="object-cover" />
                    ) : (
                      <UserIcon size={18} />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-[color:var(--color-text)]">
                      {displayName}
                    </span>
                    <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
                      {user.steam?.tradeUrlVerified ? "Trade ready" : "Trade URL needed"}
                    </span>
                  </span>
                </div>
                {ACCOUNT_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-[13px] font-medium text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-primary-tint)] hover:text-[color:var(--color-primary)]"
                  >
                    <item.icon size={15} className="text-[color:var(--color-primary)]" />
                    {item.label}
                  </Link>
                ))}
                {isAdmin && (
                  <NextLink
                    href="/admin"
                    role="menuitem"
                    onClick={() => setAccountOpen(false)}
                    className="flex items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-[13px] font-medium text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-primary-tint)] hover:text-[color:var(--color-primary)]"
                  >
                    <Shield size={15} className="text-[color:var(--color-primary)]" />
                    Admin panel
                  </NextLink>
                )}
                <div className="my-1.5 h-px bg-[color:var(--color-border)]" />
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false);
                    signOut();
                  }}
                  role="menuitem"
                  className="flex w-full items-center gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 text-[13px] font-medium text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-danger)]/10 hover:text-[color:var(--color-danger)]"
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
