import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUser } from "@/lib/auth";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { name?: string; phone?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data: { name?: string; phone?: string | null; email?: string } = {};

  if (typeof body.name === "string") data.name = body.name.trim();
  if (typeof body.phone === "string") data.phone = body.phone.trim() || null;

  // Email can only be *set* on an account that doesn't have one yet (a Steam-only
  // signup completing registration). Accounts with an email can't change it here.
  if (typeof body.email === "string" && body.email.trim() && body.email.trim() !== user.email) {
    if (user.email) {
      return NextResponse.json({ error: "Email is already set." }, { status: 400 });
    }
    const email = body.email.trim().toLowerCase();
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }
    const taken = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (taken) {
      return NextResponse.json({ error: "Email already registered." }, { status: 409 });
    }
    data.email = email;
  }

  await prisma.user.update({ where: { id: user.id }, data });

  return NextResponse.json({ ok: true });
}
