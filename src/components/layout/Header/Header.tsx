"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { ConSkinsLogo } from "../ConSkinsLogo";
import { MegaMenu } from "./MegaMenu";
import { SearchBar } from "./SearchBar";
import { HeaderActions } from "./HeaderActions";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Collapse the header on scroll with a small hysteresis gap.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled((prev) => (prev ? y > 2 : y > 8));
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-40 w-full border-b transition-all duration-300",
          scrolled
            ? "glass border-[color:var(--color-border)] shadow-[0_10px_30px_-20px_rgba(0,0,0,0.6)]"
            : "border-transparent bg-[color:var(--color-bg)]",
        ].join(" ")}
        role="banner"
      >
        <div
          className={[
            "mx-auto flex max-w-[var(--max-width)] items-center gap-3 px-4 transition-[padding] duration-300 sm:px-6 lg:px-8",
            scrolled ? "py-2.5" : "py-3.5",
          ].join(" ")}
        >
          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-[color:var(--color-text)] hover:bg-[color:var(--color-bg-secondary)] xl:hidden"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link href="/" aria-label="ConSkins — home" className="shrink-0">
            <ConSkinsLogo size={scrolled ? 16 : 18} />
          </Link>

          {/* Mega menu — desktop */}
          <MegaMenu />

          {/* Search — desktop */}
          <div className="hidden min-w-0 flex-1 lg:block">
            <SearchBar variant="desktop" />
          </div>

          {/* Right cluster */}
          <div className="ml-auto lg:ml-0">
            <HeaderActions />
          </div>
        </div>

        {/* Search — mobile row */}
        <div className="border-t border-[color:var(--color-border)] px-4 py-2 lg:hidden">
          <SearchBar variant="mobile" />
        </div>
      </header>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
