"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { openCookieSettings } from "@/components/shared/CookieConsent/CookieConsent";
import {
  ArrowRight,
  Mail,
  ShieldCheck,
  Zap,
  Repeat,
  Globe,
  Loader2,
  Check,
} from "lucide-react";
import { ConSkinsLogo } from "../ConSkinsLogo";
import { brand, brandLegalLine } from "@/lib/brand";
import { useCurrency } from "@/providers/CurrencyProvider";

interface Group {
  key: string;
  title: string;
  items: Array<{ href: string; label: string }>;
}

const groups: Group[] = [
  {
    key: "shop",
    title: "Shop",
    items: [
      { href: "/catalog", label: "All skins" },
      { href: "/catalog?category=Knives", label: "Knives" },
      { href: "/catalog?category=Gloves", label: "Gloves" },
      { href: "/catalog?sort=discount", label: "Price drops" },
      { href: "/collections", label: "Collections" },
    ],
  },
  {
    key: "tools",
    title: "Tools",
    items: [
      { href: "/analytics", label: "Market analytics" },
      { href: "/loadout", label: "Loadout builder" },
      { href: "/#calculator", label: "Skin calculator" },
    ],
  },
  {
    key: "company",
    title: "Company",
    items: [
      { href: "/about", label: "About us" },
      { href: "/how-it-works", label: "How it works" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact us" },
      { href: "/policies/terms", label: "Terms of service" },
      { href: "/policies/privacy", label: "Privacy policy" },
    ],
  },
];

const trustBadges = [
  { icon: Zap, label: "Instant Steam delivery" },
  { icon: ShieldCheck, label: "Buyer protection" },
  { icon: Repeat, label: "Secure payments" },
];

const paymentLogos = [
  { src: "/payment/visa.svg", label: "Visa", w: 40, h: 26 },
  { src: "/payment/mastercard.svg", label: "Mastercard", w: 34, h: 26 },
  { src: "/payment/pci-dss.svg", label: "PCI DSS Compliant", w: 30, h: 30 },
];

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [discount, setDiscount] = useState<{ code: string; percent: number } | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error();
      if (data.discountCode) {
        setDiscount({ code: data.discountCode, percent: data.discountPercent ?? 0 });
      }
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-[var(--radius-lg)] border border-[color:var(--color-primary)]/30 bg-[color:var(--color-primary-tint)] p-3.5 text-[13px] text-[color:var(--color-text)]">
        <span className="inline-flex items-center gap-1.5 font-semibold text-[color:var(--color-primary)]">
          <Check size={14} /> You&apos;re in.
        </span>{" "}
        {discount ? (
          <>
            Your {discount.percent}% code:{" "}
            <code className="font-mono font-bold text-[color:var(--color-primary)]">
              {discount.code}
            </code>
          </>
        ) : (
          "Watch your inbox for market drops."
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-2">
      <div className="flex h-11 items-center overflow-hidden rounded-[var(--radius-lg)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] pl-3.5 pr-1 transition-colors focus-within:border-[color:var(--color-primary)]/60">
        <Mail size={14} className="shrink-0 text-[color:var(--color-text-tertiary)]" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email for newsletter"
          className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-tertiary)] focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[var(--radius-md)] bg-[color:var(--color-primary)] px-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_18px_var(--color-primary-glow)] disabled:opacity-60"
        >
          {status === "loading" ? <Loader2 size={13} className="animate-spin" /> : "Join"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-[12px] text-[color:var(--color-danger)]">
          Something went wrong — try again.
        </p>
      )}
    </form>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const { currency, symbol } = useCurrency();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)]" role="contentinfo">
      {/* ── Brand + navigation tier ─────────────────────────────── */}
      <div className="mx-auto grid max-w-[var(--max-width)] gap-x-10 gap-y-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.3fr_repeat(3,1fr)] lg:px-8">
        {/* Brand block */}
        <div className="flex flex-col gap-5">
          <Link href="/" aria-label={brand.displayName}>
            <ConSkinsLogo size={19} />
          </Link>
          <p className="max-w-sm text-[13.5px] leading-relaxed text-[color:var(--color-text-secondary)]">
            {brand.tagline} Browse thousands of skins with live float, pattern and
            cross-market price data, then trade instantly through your Steam account.
          </p>

          <div className="flex flex-wrap gap-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-tertiary)] px-2.5 py-1.5 text-[11.5px] text-[color:var(--color-text-secondary)]"
              >
                <Icon size={12} className="shrink-0 text-[color:var(--color-accent)]" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-1">
            <p className="mb-2 font-mono text-[10.5px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
              Market drops &amp; price alerts
            </p>
            <NewsletterForm />
          </div>
        </div>

        {/* Link columns */}
        {groups.map((group) => (
          <div key={group.key}>
            <h3 className="pb-4 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-text-tertiary)]">
              {group.title}
            </h3>
            <ul className="grid gap-y-2.5">
              {group.items.map((it) => (
                <li key={it.label}>
                  <Link
                    href={it.href}
                    className="text-[13.5px] text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-primary)]"
                  >
                    {it.label}
                  </Link>
                </li>
              ))}
              {group.key === "company" && (
                <li>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="text-left text-[13.5px] text-[color:var(--color-text-secondary)] transition-colors hover:text-[color:var(--color-primary)]"
                  >
                    Cookie preferences
                  </button>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* ── CTA strip ───────────────────────────────────────────── */}
      <div className="border-t border-[color:var(--color-border)]">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <p className="font-display text-[17px] font-bold uppercase tracking-wide text-[color:var(--color-text)]">
            Ready to trade <span className="text-[color:var(--color-primary)]">smarter</span>?
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-5 py-2.5 text-[13px] font-bold text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_24px_var(--color-primary-glow)]"
          >
            Browse the market <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* ── Legal bar ───────────────────────────────────────────── */}
      <div className="border-t border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
        <div className="mx-auto flex max-w-[var(--max-width)] flex-col gap-4 px-4 py-6 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
          <div className="flex flex-col gap-1.5 text-[12px] text-[color:var(--color-text-tertiary)]">
            <p>{t("copyright", { year: currentYear, storeName: brand.displayName })}</p>
            <p className="max-w-xl text-[11.5px] leading-relaxed">{brand.disclaimer}</p>
            <p className="text-[11.5px]">{brandLegalLine}</p>
            <a
              href={brand.contact.emailHref}
              className="inline-flex w-fit items-center gap-1.5 text-[11.5px] transition-colors hover:text-[color:var(--color-primary)]"
            >
              <Mail size={11} /> {brand.contact.email}
            </a>
          </div>

          <div className="flex shrink-0 flex-col gap-3 md:items-end">
            <div
              className="flex items-center gap-2.5"
              aria-label="Accepted payment methods and security compliance"
            >
              {paymentLogos.map(({ src, label, w, h }) => (
                <span
                  key={label}
                  title={label}
                  className="inline-flex h-9 w-14 items-center justify-center rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-white p-1.5"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={label}
                    width={w}
                    height={h}
                    loading="lazy"
                    className="block max-h-full max-w-full object-contain"
                  />
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--color-text-secondary)]">
              <Globe size={11} className="text-[color:var(--color-primary)]" />
              <span>
                {currency} {symbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
