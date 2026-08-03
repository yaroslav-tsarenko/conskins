import { Link } from "@/i18n/routing";
import { ArrowRight, BarChart3, BookOpen, Wallet } from "lucide-react";

const POSTS = [
  {
    icon: BookOpen,
    tag: "Guide",
    accent: "var(--color-accent)",
    title: "How trading works on ConSkins",
    text: "Floats, patterns, trade locks and instant Steam delivery — everything you need before your first trade.",
    href: "/how-it-works",
    cta: "Read the guide",
  },
  {
    icon: Wallet,
    tag: "Balance",
    accent: "var(--color-primary)",
    title: "Top up and buy in one click",
    text: "Load your ConSkins balance once, then check out instantly — funds are only captured on a confirmed trade.",
    href: "/how-it-works",
    cta: "See how it works",
  },
  {
    icon: BarChart3,
    tag: "Market",
    accent: "var(--color-coral)",
    title: "Read the market like a trader",
    text: "Price history, volume and trend widgets — spot rising skins before everyone else does.",
    href: "/analytics",
    cta: "Open analytics",
  },
];

export function NewsSection() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {POSTS.map((p) => (
        <Link
          key={p.href}
          href={p.href}
          className="group flex flex-col rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-5 transition-all hover:border-[color:var(--color-primary)]/40 hover:shadow-[0_0_24px_var(--color-primary-glow)]"
        >
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-bg-secondary)]"
              style={{ color: `color-mix(in srgb, ${p.accent} 100%, transparent)` }}
            >
              <p.icon size={16} />
            </span>
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: `color-mix(in srgb, ${p.accent} 100%, transparent)` }}
            >
              {p.tag}
            </span>
          </div>
          <h3 className="mt-4 font-display text-[15px] font-bold uppercase leading-snug tracking-tight text-[color:var(--color-text)]">
            {p.title}
          </h3>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[color:var(--color-text-tertiary)]">
            {p.text}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-bold text-[color:var(--color-accent)]">
            {p.cta}
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      ))}
    </div>
  );
}
