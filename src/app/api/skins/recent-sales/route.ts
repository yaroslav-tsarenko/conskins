import { NextRequest, NextResponse } from "next/server";
import { getRecentSales } from "@/lib/skins/queries";

export async function GET(request: NextRequest) {
  try {
    const limitParam = Number(request.nextUrl.searchParams.get("limit"));
    const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : 20;
    const sales = await getRecentSales(limit);
    return NextResponse.json(
      { sales },
      { headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120" } },
    );
  } catch (error) {
    console.error("Recent sales error:", error);
    return NextResponse.json({ error: "Failed to load recent sales" }, { status: 500 });
  }
}
