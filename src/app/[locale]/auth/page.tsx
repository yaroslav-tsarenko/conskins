import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { brand } from "@/lib/brand";
import { ConSkinsLogo } from "@/components/layout/ConSkinsLogo";
import { ShieldCheck, TrendingUp, Zap, Mail, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `Sign in — ${brand.displayName}`,
};

const PERKS = [
  { icon: TrendingUp, text: "Full price history & market analytics" },
  { icon: Zap, text: "Instant trades via your Steam account" },
  { icon: ShieldCheck, text: "Buyer protection on every purchase" },
];

export default async function AuthPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { locale } = await params;
  const { next, error } = await searchParams;

  const user = await getSessionUser();
  if (user) redirect(next && next.startsWith("/") ? next : `/${locale}/account`);

  const nextParam = next ? `?next=${encodeURIComponent(next)}` : "";

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-4 py-12">
      <div className="w-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <ConSkinsLogo size={24} layout="stacked" />
          <h1 className="mt-5 font-display text-2xl font-bold text-[color:var(--color-text)]">
            Sign in to {brand.displayName}
          </h1>
          <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
            Sign in with email to browse the market — link Steam later, right before you buy.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-[color:var(--color-danger)] bg-[color:var(--color-danger)]/10 px-3 py-2 text-center text-sm text-[color:var(--color-danger)]">
            Something went wrong. Please sign in and try again.
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Link
            href={`/${locale}/auth/login${nextParam}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-5 py-3 text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110"
          >
            <Mail className="h-4 w-4" />
            Continue with Email
          </Link>
        </div>

        <p className="mt-4 text-center text-sm text-[color:var(--color-text-secondary)]">
          New here?{" "}
          <Link
            href={`/${locale}/auth/register${nextParam}`}
            className="inline-flex items-center gap-1 font-semibold text-[color:var(--color-accent)] hover:opacity-80"
          >
            Create an account <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </p>

        <div className="my-6 h-px bg-[color:var(--color-border)]" />

        <ul className="flex flex-col gap-2">
          {PERKS.map((p) => (
            <li key={p.text} className="flex items-center gap-2 text-sm text-[color:var(--color-text-secondary)]">
              <p.icon className="h-4 w-4 shrink-0 text-[color:var(--color-accent)]" />
              {p.text}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-center text-xs text-[color:var(--color-text-tertiary)]">
          We never see your Steam password. Auth is handled by Steam OpenID.{" "}
          <Link href={`/${locale}/policies/privacy`} className="underline hover:text-[color:var(--color-text)]">
            Privacy
          </Link>
        </p>
      </div>
    </div>
  );
}
