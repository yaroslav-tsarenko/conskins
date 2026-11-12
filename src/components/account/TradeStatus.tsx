"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";

const POLL_MS = 5_000;
// Stop after ~15 minutes; by then the trade is either done or stuck, and
// reopening the page starts a fresh watch.
const MAX_POLLS = Math.round((15 * 60_000) / POLL_MS);

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[color:var(--color-warning)]/15 text-[color:var(--color-warning)]",
  trade_sent: "bg-[color:var(--color-accent)]/15 text-[color:var(--color-accent)]",
  completed: "bg-[color:var(--color-success)]/15 text-[color:var(--color-success)]",
  failed: "bg-[color:var(--color-danger)]/15 text-[color:var(--color-danger)]",
};

const STATUS_LABELS: Record<string, string> = {
  pending: "Processing",
  trade_sent: "Trade offer sent",
  completed: "Delivered",
  failed: "Failed",
};

function isOpen(status: string): boolean {
  return status === "pending" || status === "trade_sent";
}

/**
 * Live delivery status for one purchase. Polls the owner-scoped status endpoint
 * (which reconciles against the fulfilment provider) so the badge and the Steam
 * trade offer link appear as soon as the skin is on its way — the page used to
 * show whatever was true at render time and only caught up on a reload.
 */
export function TradeStatus({
  purchaseId,
  initialStatus,
  initialTradeOfferUrl,
}: {
  purchaseId: string;
  initialStatus: string;
  initialTradeOfferUrl: string | null;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [offerUrl, setOfferUrl] = useState(initialTradeOfferUrl);

  useEffect(() => {
    if (!isOpen(status)) return;

    let cancelled = false;
    let polls = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const tick = () => {
      fetch(`/api/skins/purchase/${purchaseId}/status`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (cancelled || !data) return;
          if (typeof data.status === "string") setStatus(data.status);
          if (typeof data.tradeOfferUrl === "string") setOfferUrl(data.tradeOfferUrl);
        })
        .catch(() => {
          // Transient failure — the next tick tries again.
        })
        .finally(() => {
          if (cancelled) return;
          polls += 1;
          if (polls < MAX_POLLS) timer = setTimeout(tick, POLL_MS);
        });
    };

    timer = setTimeout(tick, POLL_MS);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [purchaseId, status]);

  return (
    <div className="flex shrink-0 flex-col items-end gap-1">
      <span
        className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] ${
          STATUS_STYLES[status] ?? STATUS_STYLES.pending
        }`}
      >
        {STATUS_LABELS[status] ?? status.replace("_", " ")}
      </span>
      {offerUrl && status !== "failed" && (
        <a
          href={offerUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-[color:var(--color-accent)] hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          {status === "completed" ? "View trade offer" : "Accept trade offer"}
        </a>
      )}
    </div>
  );
}
