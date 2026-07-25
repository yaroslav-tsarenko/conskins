"use client";

import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  LogOut,
  User as UserIcon,
  Repeat,
  Link2,
  Shield,
  Heart,
} from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";
import { useFavorites } from "@/providers/FavoritesProvider";
import { ConSkinsLogo } from "../ConSkinsLogo";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MEGA_MENU } from "./MegaMenu";
import { SearchBar } from "./SearchBar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const t = useTranslations("megaMenu");
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const { user, role, signOut } = useAuth();
  const { count, ready } = useFavorites();

  const authHref = `/auth?next=${encodeURIComponent(pathname || "/")}`;
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-[#05060A]/70 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed inset-y-0 left-0 z-50 flex w-[90%] max-w-sm flex-col border-r border-[color:var(--color-border)] bg-[color:var(--color-bg)] xl:hidden"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--color-border)] px-4 py-4">
              <Link href="/" onClick={onClose} aria-label="ConSkins — home">
                <ConSkinsLogo size={17} />
              </Link>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-text-secondary)] hover:bg-[color:var(--color-bg-secondary)] hover:text-[color:var(--color-text)]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="border-b border-[color:var(--color-border)] px-4 py-3">
              <SearchBar variant="mobile" onNavigate={onClose} />
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-3" aria-label="Mobile">
              {MEGA_MENU.map((group) => (
                <div key={group.id} className="mb-3">
                  <div className="px-3 pb-1.5 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
                    {t(`groups.${group.id}`)}
                  </div>
                  {group.links.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                    >
                      <link.Icon size={16} className="text-[color:var(--color-primary)]" />
                      {t(`links.${link.key}.label`)}
                    </Link>
                  ))}
                </div>
              ))}

              <div className="mb-3">
                <Link
                  href="/favorites"
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 text-[14px] font-semibold text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                >
                  <Heart size={16} className="text-[color:var(--color-primary)]" />
                  {tNav("favorites")}
                  {ready && count > 0 && (
                    <span className="ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[color:var(--color-primary)] px-1.5 font-mono text-[10px] font-bold tabular-nums text-[color:var(--color-primary-fg)]">
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </Link>
              </div>

              {user && (
                <>
                  <div className="my-2 h-px bg-[color:var(--color-border)]" />
                  <div className="px-3 pb-1.5 pt-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
                    {tNav("account")}
                  </div>
                  {[
                    { href: "/account", icon: UserIcon, label: tNav("profile") },
                    { href: "/account/trades", icon: Repeat, label: tNav("myTrades") },
                    { href: "/account/trade-url", icon: Link2, label: tNav("tradeUrl") },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 text-[14px] font-medium text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                    >
                      <item.icon size={16} className="text-[color:var(--color-primary)]" />
                      {item.label}
                    </Link>
                  ))}
                  {isAdmin && (
                    <NextLink
                      href="/admin"
                      onClick={onClose}
                      className="flex items-center gap-3 rounded-[var(--radius-lg)] px-3 py-2.5 text-[14px] font-medium text-[color:var(--color-text)] transition-colors hover:bg-[color:var(--color-bg-secondary)]"
                    >
                      <Shield size={16} className="text-[color:var(--color-primary)]" />
                      {tNav("admin")}
                    </NextLink>
                  )}
                </>
              )}
            </nav>

            <div className="border-t border-[color:var(--color-border)] px-4 py-4">
              <div className="mb-3 flex items-center gap-1 self-start rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] px-1.5 py-1">
                <CurrencySwitcher />
                <span className="h-4 w-px bg-[color:var(--color-border)]" />
                <LanguageSwitcher />
              </div>
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    signOut();
                  }}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] border border-[color:var(--color-border)] text-sm font-semibold text-[color:var(--color-text)] transition-colors hover:border-[color:var(--color-danger)]/50 hover:text-[color:var(--color-danger)]"
                >
                  <LogOut size={16} /> {tNav("logout")}
                </button>
              ) : (
                <Link
                  href={authHref}
                  onClick={onClose}
                  className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] text-sm font-bold text-[color:var(--color-primary-fg)]"
                >
                  <UserIcon size={16} /> {tNav("login")}
                </Link>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
