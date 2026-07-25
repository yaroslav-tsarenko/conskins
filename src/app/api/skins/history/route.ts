import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildPriceHistory } from "@/lib/skins/pricing";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const skinId = url.searchParams.get("skinId");
  if (!skinId) {
    return NextResponse.json({ error: "skinId is required" }, { status: 400 });
  }
  try {
    const skin = await prisma.skin.findUnique({
      where: { id: skinId },
      select: { id: true, externalId: true, name: true, weapon: true, lowestPrice: true },
    });
    if (!skin) {
      return NextResponse.json({ error: "Skin not found" }, { status: 404 });
    }
    const history = buildPriceHistory(skin.externalId, Number(skin.lowestPrice ?? 1), 365);
    return NextResponse.json(
      { skin: { id: skin.id, name: skin.name, weapon: skin.weapon }, history },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } },
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load history" },
      { status: 500 },
    );
  }
}
