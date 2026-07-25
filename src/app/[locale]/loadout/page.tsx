import type { Metadata } from "next";
import { Swords } from "lucide-react";
import { LoadoutBuilder } from "@/components/loadout/LoadoutBuilder";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Loadout builder — ${brand.displayName}`,
  description:
    "Build your dream CS2 loadout: pick a knife, gloves and weapons for both sides and see the total price live.",
};

export default function LoadoutPage() {
  return (
    <div className="mx-auto w-full max-w-[var(--max-width)] px-4 py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[color:var(--color-accent-tint)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
          <Swords size={12} /> Loadout builder
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-[color:var(--color-text)]">
          Build your dream loadout
        </h1>
        <p className="mt-2 max-w-2xl text-[15px] text-[color:var(--color-text-secondary)]">
          Fill every slot for both sides with live listings and track the total cost as you go.
          Your loadout is saved locally — come back any time.
        </p>
      </div>
      <LoadoutBuilder />
    </div>
  );
}
