"use client";

import { useCallback, useEffect, useState } from "react";
import { Wallet, Plus, Check, Loader2, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useCurrency } from "@/providers/CurrencyProvider";
import { useAuth } from "@/providers/AuthProvider";

const MIN_AMOUNT = 10;
const PACKS = [10, 25, 50, 100, 250];

type Tx = {
  id: string;
  type: "TOPUP" | "PURCHASE" | "REFUND" | "ADJUSTMENT";
  status: string;
  amountEur: number;
  balanceAfterEur: number;
  sourceAmount: number | null;
  sourceCurrency: string | null;
  description: string | null;
  createdAt: string;
};

const TYPE_LABELS: Record<Tx["type"], string> = {
  TOPUP: "Top-up",
  PURCHASE: "Purchase",
  REFUND: "Refund",
  ADJUSTMENT: "Adjustment",
};

export default function WalletPage() {
  const { currency, symbol, convert } = useCurrency();
  const { refresh } = useAuth();

  const [balanceEur, setBalanceEur] = useState(0);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<number | "custom">(PACKS[1]);
  const [custom, setCustom] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const fmt = useCallback(
    (value: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value),
    [currency],
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/wallet");
      const data = await res.json();
      if (res.ok) {
        setBalanceEur(Number(data.balanceEur) || 0);
        setTransactions(Array.isArray(data.transactions) ? data.transactions : []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const amount = selected === "custom" ? Number(custom) : selected;
  const amountValid = Number.isFinite(amount) && amount >= MIN_AMOUNT;

  const topUp = async () => {
    if (!amountValid) {
      setError(`Minimum top-up is ${symbol}${MIN_AMOUNT}.`);
      return;
    }
    setSubmitting(true);
    setError(null);
    setJustAdded(false);
    try {
      const res = await fetch("/api/wallet/topup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Could not complete top-up.");
        return;
      }
      // Real gateway would return a redirectUrl; the stub settles instantly.
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      setJustAdded(true);
      setCustom("");
      await Promise.all([load(), refresh()]);
    } catch {
      setError("Network error, please retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
          <Wallet size={20} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-[color:var(--color-text)]">Wallet</h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Top up your balance to buy skins in a click.
          </p>
        </div>
      </div>

      {/* Balance card */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-gradient-to-br from-[color:var(--color-primary-tint)] to-[color:var(--color-bg-elevated)] p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--color-text-secondary)]">
          Current balance
        </p>
        <p className="mt-1 font-display text-4xl font-bold tabular-nums text-[color:var(--color-text)]">
          {loading ? "—" : fmt(convert(balanceEur))}
        </p>
      </div>

      {/* Top-up */}
      <div className="mt-6 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-6">
        <h2 className="font-display text-lg font-bold text-[color:var(--color-text)]">Add funds</h2>
        <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
          Choose a pack or enter any amount (min {symbol}
          {MIN_AMOUNT}). Charged in {currency}.
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
          {PACKS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setSelected(p);
                setError(null);
              }}
              className={`rounded-xl border px-3 py-3 text-center font-mono text-sm font-bold tabular-nums transition-colors ${
                selected === p
                  ? "border-[color:var(--color-primary)] bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]"
                  : "border-[color:var(--color-border)] bg-[color:var(--color-bg)] text-[color:var(--color-text)] hover:border-[color:var(--color-primary)]/50"
              }`}
            >
              {symbol}
              {p}
            </button>
          ))}
        </div>

        <div className="mt-3">
          <label className="mb-1.5 block text-xs font-semibold text-[color:var(--color-text-secondary)]">
            Custom amount
          </label>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-[color:var(--color-text-tertiary)]">
                {symbol}
              </span>
              <input
                type="number"
                min={MIN_AMOUNT}
                step="1"
                inputMode="decimal"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setSelected("custom");
                  setError(null);
                }}
                onFocus={() => setSelected("custom")}
                placeholder={String(MIN_AMOUNT)}
                className="w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] py-3 pl-7 pr-3 font-mono text-sm text-[color:var(--color-text)] outline-none focus:border-[color:var(--color-primary)]"
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-3 text-sm text-[color:var(--color-danger)]">{error}</p>
        )}
        {justAdded && !error && (
          <p className="mt-3 flex items-center gap-1.5 text-sm text-[color:var(--color-success)]">
            <Check size={15} /> Balance topped up.
          </p>
        )}

        <button
          type="button"
          onClick={topUp}
          disabled={submitting || !amountValid}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[color:var(--color-primary)] px-5 py-3 text-sm font-bold text-[color:var(--color-primary-fg)] shadow-[var(--shadow-glow-volt)] transition hover:brightness-110 disabled:opacity-50"
        >
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus size={16} />}
          {amountValid ? `Add ${symbol}${amount}` : `Add funds`}
        </button>
      </div>

      {/* History */}
      <div className="mt-6">
        <h2 className="mb-3 font-display text-lg font-bold text-[color:var(--color-text)]">History</h2>
        {loading ? (
          <p className="text-sm text-[color:var(--color-text-tertiary)]">Loading…</p>
        ) : transactions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-8 text-center">
            <p className="text-sm text-[color:var(--color-text-secondary)]">No transactions yet.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {transactions.map((t) => {
              const credit = t.amountEur >= 0;
              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        credit
                          ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]"
                          : "bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]"
                      }`}
                    >
                      {credit ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[color:var(--color-text)]">
                        {t.description ?? TYPE_LABELS[t.type]}
                      </div>
                      <div className="font-mono text-[11px] text-[color:var(--color-text-tertiary)]">
                        {new Date(t.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-sm font-bold tabular-nums ${
                      credit ? "text-[color:var(--color-success)]" : "text-[color:var(--color-text)]"
                    }`}
                  >
                    {credit ? "+" : "−"}
                    {fmt(convert(Math.abs(t.amountEur)))}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
