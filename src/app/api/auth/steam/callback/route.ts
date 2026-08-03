import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";
import { verifySteamCallback, fetchSteamProfile, getBaseUrl } from "@/lib/steam";
import { mergeSteamOnlyUserInto } from "@/lib/user-merge";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = url.searchParams.get("locale") || "en";
  const next = url.searchParams.get("next") || `/${locale}/account`;
  const isLink = url.searchParams.get("link") === "1";
  const base = getBaseUrl();
  const dest = next.startsWith("/") ? `${base}${next}` : `${base}/${locale}/account`;

  try {
    const steamId64 = await verifySteamCallback(url.searchParams);
    if (!steamId64) {
      return NextResponse.redirect(`${base}/${locale}/auth?error=steam`);
    }

    const profile = await fetchSteamProfile(steamId64);
    const steamData = {
      personaName: profile.personaName,
      profileUrl: profile.profileUrl,
      avatar: profile.avatar,
      avatarFull: profile.avatarFull,
    };

    const existing = await prisma.steamAccount.findUnique({
      where: { steamId64 },
      select: { userId: true },
    });

    // ── Linking mode: attach this SteamID to the already signed-in user. ──
    if (isLink) {
      const current = await getSessionUser();
      if (!current) {
        return NextResponse.redirect(`${base}/${locale}/auth?error=steam`);
      }
      const sep = dest.includes("?") ? "&" : "?";

      // The account is already tied to a different SteamID — unlink first.
      if (current.steamAccount && current.steamAccount.steamId64 !== steamId64) {
        return NextResponse.redirect(`${dest}${sep}steam=already`);
      }

      if (existing && existing.userId !== current.id) {
        // This SteamID belongs to another account. If that account is a bare
        // Steam-only login (no email, no password), fold it into the current
        // account. Otherwise it's a real, separate account — refuse.
        const other = await prisma.user.findUnique({
          where: { id: existing.userId },
          select: { email: true, passwordHash: true },
        });
        const isSteamOnlyOrphan = other != null && !other.email && !other.passwordHash;
        if (!isSteamOnlyOrphan) {
          return NextResponse.redirect(`${dest}${sep}steam=taken`);
        }
        await mergeSteamOnlyUserInto(existing.userId, current.id);
        await prisma.steamAccount.update({ where: { steamId64 }, data: steamData });
      } else if (existing) {
        // Already linked to this same user — just refresh the profile.
        await prisma.steamAccount.update({ where: { steamId64 }, data: steamData });
      } else {
        await prisma.steamAccount.create({
          data: { userId: current.id, steamId64, ...steamData },
        });
      }

      await prisma.user.update({
        where: { id: current.id },
        data: {
          avatarUrl: profile.avatar ?? undefined,
          // Adopt the Steam nickname only when the account has none yet.
          name: current.name ?? profile.personaName ?? undefined,
        },
      });
      return NextResponse.redirect(`${dest}${sep}steam=linked`);
    }

    // Steam is link-only: it can no longer create or sign into an account by
    // itself. Reaching here without the link flag means there was no active
    // session, so send the user through the normal email auth flow.
    return NextResponse.redirect(`${base}/${locale}/auth?next=${encodeURIComponent(next)}`);
  } catch {
    return NextResponse.redirect(`${base}/${locale}/auth?error=steam`);
  }
}
