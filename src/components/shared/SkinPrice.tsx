"use client";

import { useCallback } from "react";
import { useCurrency } from "@/providers/CurrencyProvider";
import { CountUp } from "@/components/home/CountUp";

// Skin listing prices are stored in USD (see prisma SkinListing.currency),
// unlike shop products which are stored in EUR.
export function useSkinPrice() {
  const { currency, convertFrom } = useCurrency();
  return useCallback(
    (usd: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertFrom(usd, "USD")),
    [currency, convertFrom]
  );
}

export function SkinPrice({ usd, className }: { usd: number; className?: string }) {
  const fmt = useSkinPrice();
  return <span className={className}>{fmt(usd)}</span>;
}

export function SkinPriceCountUp({
  usd,
  decimals = 2,
  className,
}: {
  usd: number;
  decimals?: number;
  className?: string;
}) {
  const { symbol, convertFrom } = useCurrency();
  const value = convertFrom(usd, "USD");
  return (
    <CountUp
      value={decimals === 0 ? Math.round(value) : value}
      decimals={decimals}
      prefix={symbol}
      suffix=""
      className={className}
    />
  );
}
