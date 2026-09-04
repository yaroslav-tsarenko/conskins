"use client";

import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Wallet, Plus, Check, Loader2, ArrowDownLeft, ArrowUpRight, AlertCircle, Clock } from "lucide-react";
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

function WalletContent() {
  const { currency, symbol, convert } = useCurrency();
  const { refresh } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [balanceEur, setBalanceEur] = useState(0);
  const [transactions, setTransactions] = useState<Tx[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<number | "custom">(PACKS[1]);
  const [custom, setCustom] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const [returnBanner, setReturnBanner] = useState<{
    type: "success" | "pending" | "error";
    message: string;
  } | null>(null);

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

  // Handle return from Transfermit payment gateway
  useEffect(() => {
    const status = searchParams.get("status");
    const pmt = searchParams.get("pmt");
    const ref = searchParams.get("ref");

    if (status === "return" && (pmt || ref)) {
      queueMicrotask(() => {
        setReturnBanner({
          type: "pending",
          message: "Verifying payment with Transfermit...",
        });
      });

      const params = new URLSearchParams();
      if (pmt) params.set("pmt", pmt);
      if (ref) params.set("ref", ref);

      fetch(`/api/wallet/topup/verify?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "COMPLETED") {
            setReturnBanner({
              type: "success",
              message: "Payment completed successfully! Your wallet balance has been updated.",
            });
            load();
            refresh();
          } else if (data.status === "FAILED") {
            setReturnBanner({
              type: "error",
              message: "Payment was cancelled or declined.",
            });
            load();
          } else {
            setReturnBanner({
              type: "pending",
              message: "Payment is being processed by Transfermit. Funds will appear shortly.",
            });
            load();
          }
        })
        .catch(() => {
          setReturnBanner({
            type: "pending",
            message: "Payment verification in progress. Please refresh in a few moments.",
          });
          load();
        });

      // Clear search params cleanly without reloading
      router.replace("/account/wallet");
    }
  }, [searchParams, router, load, refresh]);

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
      // Transfermit real gateway returns a redirectUrl
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }
      // Stub gateway settles instantly
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

      {/* Return status banner */}
      {returnBanner && (
        <div
          className={`mt-6 flex items-center gap-3 rounded-2xl border p-4 text-sm font-medium ${
            returnBanner.type === "success"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : returnBanner.type === "error"
              ? "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
              : "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
          }`}
        >
          {returnBanner.type === "success" && <Check size={18} className="shrink-0" />}
          {returnBanner.type === "error" && <AlertCircle size={18} className="shrink-0" />}
          {returnBanner.type === "pending" && <Clock size={18} className="shrink-0 animate-spin" />}
          <span className="flex-1">{returnBanner.message}</span>
          <button
            type="button"
            onClick={() => setReturnBanner(null)}
            className="text-xs font-semibold opacity-70 hover:opacity-100"
          >
            Dismiss
          </button>
        </div>
      )}

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
          {MIN_AMOUNT}). Charged via Transfermit in {currency}.
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
              const isPending = t.status === "PENDING";
              const isFailed = t.status === "FAILED";

              return (
                <li
                  key={t.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isPending
                          ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                          : isFailed
                          ? "bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]"
                          : credit
                          ? "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]"
                          : "bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]"
                      }`}
                    >
                      {isPending ? (
                        <Clock size={16} />
                      ) : credit ? (
                        <ArrowDownLeft size={16} />
                      ) : (
                        <ArrowUpRight size={16} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 truncate text-sm font-semibold text-[color:var(--color-text)]">
                        <span className="truncate">{t.description ?? TYPE_LABELS[t.type]}</span>
                        {isPending && (
                          <span className="rounded bg-amber-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                            Pending
                          </span>
                        )}
                        {isFailed && (
                          <span className="rounded bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-400">
                            Failed
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-[color:var(--color-text-tertiary)]">
                        {new Date(t.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 font-mono text-sm font-bold tabular-nums ${
                      isPending
                        ? "text-amber-600 dark:text-amber-400"
                        : isFailed
                        ? "text-[color:var(--color-text-tertiary)] line-through"
                        : credit
                        ? "text-[color:var(--color-success)]"
                        : "text-[color:var(--color-text)]"
                    }`}
                  >
                    {isPending ? "" : credit ? "+" : "−"}
                    {fmt(convert(Math.abs(t.sourceAmount ? t.sourceAmount : t.amountEur)))}
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

export default function WalletPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-[color:var(--color-text-tertiary)]">Loading wallet…</div>}>
      <WalletContent />
    </Suspense>
  );
}
