import { NextResponse } from "next/server";
import { buildSteamAuthUrl, getBaseUrl } from "@/lib/steam";
import { getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const next = url.searchParams.get("next") || "";
  const locale = url.searchParams.get("locale") || "en";

  // Steam is a linking mechanism only — it never creates or signs into an
  // account on its own. Registration/login always happens with email. If no
  // one is signed in, send them through the normal email auth flow first.
  const user = await getSessionUser();
  if (!user) {
    const authUrl = new URL(`${getBaseUrl()}/${locale}/auth`);
    if (next) authUrl.searchParams.set("next", next);
    return NextResponse.redirect(authUrl.toString());
  }

  const callback = new URL(`${getBaseUrl()}/api/auth/steam/callback`);
  callback.searchParams.set("locale", locale);
  if (next) callback.searchParams.set("next", next);
  callback.searchParams.set("link", "1");

  return NextResponse.redirect(buildSteamAuthUrl(callback.toString()));
}
