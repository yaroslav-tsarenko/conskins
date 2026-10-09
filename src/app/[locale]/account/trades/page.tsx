import { Link } from "@/i18n/routing";
import { SkinPrice } from "@/components/shared/SkinPrice";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { reconcilePurchaseFromProvider, reconcileSkinPayment } from "@/lib/skins/delivery";
import { tradeOfferUrl } from "@/lib/skins/sih";
import { TradeStatus } from "@/components/account/TradeStatus";
import { Repeat, ArrowRight } from "lucide-react";

export default async function TradesPage() {
  const user = await getSessionUser();

  const purchases = user
    ? await prisma.skinPurchase.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 50,
        include: {
          listing: {
            select: {
              imageUrl: true,
              marketHashName: true,
              skin: { select: { id: true, name: true, imageUrl: true, rarityColor: true } },
            },
          },
        },
      }).catch(() => [])
    : [];

  // Self-heal non-terminal purchases against the payment & fulfilment providers so the
  // buyer sees the latest Steam delivery status on load.
  const openPurchases = purchases.filter(
    (p) => p.status === "pending" || p.status === "trade_sent",
  );
  if (openPurchases.length > 0) {
    await Promise.all(
      openPurchases.map(async (p) => {
        if (p.provider === "transfermit" && p.status === "pending") {
          await reconcileSkinPayment(p.id);
        }
      }),
    );

    const updated = await Promise.all(
      openPurchases.map(async (p) => [p.id, await reconcilePurchaseFromProvider(p.id)] as const),
    );
    const latest = new Map(updated.filter(([, s]) => s != null).map(([id, s]) => [id, s!]));
    for (const p of purchases) {
      const s = latest.get(p.id);
      if (s) p.status = s;
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-primary-tint)] text-[color:var(--color-primary)]">
          <Repeat size={20} />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-[color:var(--color-text)]">
            My Trades
          </h1>
          <p className="text-sm text-[color:var(--color-text-secondary)]">
            Every purchase and its Steam delivery status.
          </p>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] p-10 text-center">
          <p className="text-[15px] font-semibold text-[color:var(--color-text)]">
            No trades yet
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-text-secondary)]">
            Buy your first skin and it will appear here with live delivery status.
          </p>
          <Link
            href="/catalog"
            className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-[color:var(--color-primary)] px-6 text-sm font-bold text-[color:var(--color-primary-fg)] transition hover:brightness-110"
          >
            Browse skins <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <ul className="mt-6 space-y-2">
          {purchases.map((p) => {
            const skin = p.listing?.skin;
            const image = p.listing?.imageUrl ?? skin?.imageUrl ?? null;
            const name = skin?.name ?? p.listing?.marketHashName ?? `Order #${p.id.slice(0, 8)}`;
            // The item details link to the skin page; the status block stays
            // outside that link so its trade-offer link isn't nested in it.
            const details = (
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg)]"
                  style={skin ? { boxShadow: `inset 0 -2px 0 0 ${skin.rarityColor}` } : undefined}
                >
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt={name} className="h-full w-full object-contain p-1" />
                  ) : (
                    <Repeat size={16} className="text-[color:var(--color-text-tertiary)]" />
                  )}
                </span>
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-[color:var(--color-text)]">
                    {name}
                  </div>
                  <div className="font-mono text-[11px] text-[color:var(--color-text-tertiary)]">
                    {new Date(p.createdAt).toLocaleDateString()} · #{p.id.slice(0, 8)}
                  </div>
                </div>
              </div>
            );
            return (
              <li
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elevated)] px-4 py-3 transition-colors hover:border-[color:var(--color-primary)]"
              >
                {skin ? (
                  <Link href={`/skin/${skin.id}`} className="flex min-w-0 flex-1">
                    {details}
                  </Link>
                ) : (
                  details
                )}
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-mono text-sm font-bold tabular-nums text-[color:var(--color-text)]">
                    <SkinPrice usd={Number(p.price)} />
                  </span>
                  <TradeStatus
                    purchaseId={p.id}
                    initialStatus={p.status}
                    initialTradeOfferUrl={tradeOfferUrl(p.tradeOfferId)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
