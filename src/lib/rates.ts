// Server-side currency rates. Mirrors CurrencyProvider / /api/exchange-rates:
// base is EUR, and rates map EUR → {USD, GBP}. The wallet stores balances in
// EUR, so top-ups priced in another currency are converted here before they
// touch the ledger.

export type Currency = "EUR" | "USD" | "GBP";

export const CURRENCIES: Currency[] = ["EUR", "USD", "GBP"];

const FALLBACK_RATES: Record<Currency, number> = { EUR: 1, USD: 1.08, GBP: 0.85 };

let cached: { rates: Record<Currency, number>; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

export function isCurrency(value: unknown): value is Currency {
  return typeof value === "string" && (CURRENCIES as string[]).includes(value);
}

export async function getRates(): Promise<Record<Currency, number>> {
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.rates;
  }
  try {
    const res = await fetch(
      "https://api.frankfurter.dev/v1/latest?base=EUR&symbols=USD,GBP",
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error("rates fetch failed");
    const data = await res.json();
    const usd = Number(data.rates.USD);
    const gbp = Number(data.rates.GBP);
    if (Number.isFinite(usd) && usd > 0 && Number.isFinite(gbp) && gbp > 0) {
      cached = { rates: { EUR: 1, USD: usd, GBP: gbp }, timestamp: Date.now() };
      return cached.rates;
    }
    throw new Error("invalid rates payload");
  } catch {
    return FALLBACK_RATES;
  }
}

const round2 = (n: number) => Math.round(n * 100) / 100;

// Convert an amount expressed in `from` into EUR (the wallet base currency).
export async function toEur(amount: number, from: Currency): Promise<number> {
  if (from === "EUR") return round2(amount);
  const rates = await getRates();
  return round2(amount / rates[from]);
}

// Convert an EUR amount into the target display currency.
export async function fromEur(amountEur: number, to: Currency): Promise<number> {
  if (to === "EUR") return round2(amountEur);
  const rates = await getRates();
  return round2(amountEur * rates[to]);
}
