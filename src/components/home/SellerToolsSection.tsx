import { Link } from "@/i18n/routing";
import { ArrowRight, Wallet, LineChart, Timer, ShieldCheck } from "lucide-react";

const FEATURES = [
  { icon: Timer, title: "List in seconds", text: "Connect Steam, pick items, set a price — your listing goes live instantly." },
  { icon: LineChart, title: "Smart pricing", text: "Live cross-market data and price history help you price to sell, not to sit." },
  { icon: Wallet, title: "Instant payout", text: "Sell for balance and spend it on the market, or cash out when you're ready." },
  { icon: ShieldCheck, title: "Protected trades", text: "Escrowed Steam trades with buyer and seller protection on every deal." },
];

export function SellerToolsSection() {
  return (
    <section className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] p-6 sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 70% at 100% 0%, rgba(90,200,255,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
            For sellers
          </div>
          <h2 className="mt-2 font-display text-[clamp(1.5rem,3.5vw,2.375rem)] font-bold uppercase leading-tight tracking-tight text-[color:var(--color-text)]">
            Turn your inventory into <span className="text-[color:var(--color-primary)]">liquidity</span>
          </h2>
          <p className="mt-3 max-w-md text-[14.5px] leading-relaxed text-[color:var(--color-text-secondary)]">
            Everything you need to sell CS2 skins at the right price — market data,
            instant listings and protected Steam trades.
          </p>
          <Link
            href="/sell"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-[var(--radius-lg)] bg-[color:var(--color-primary)] px-5 text-sm font-bold text-[color:var(--color-primary-fg)] transition hover:shadow-[0_0_28px_var(--color-primary-glow)]"
          >
            Start selling <ArrowRight size={15} />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] p-4"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[color:var(--color-accent-tint)] text-[color:var(--color-accent)]">
                <f.icon size={16} />
              </span>
              <div className="mt-3 text-[13.5px] font-bold text-[color:var(--color-text)]">{f.title}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-[color:var(--color-text-secondary)]">
                {f.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
