import { NextResponse } from "next/server";
import { refreshSkinPrices } from "@/lib/skins/refresh";

export const runtime = "nodejs";

// Lazy, on-demand price refresh triggered from the skin page (no cron). Reads
// the briefly-cached SIH catalog, syncs this skin's listings to the live price
// and returns the fresh per-listing prices so the client can update in place.
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const result = await refreshSkinPrices(id);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 },
    );
  }
}
