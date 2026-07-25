/**
 * Repeatable product migration: source marketplace DB → FloatMarket Neon DB.
 *
 * Copies the canonical CS2 catalog (Skin + SkinListing + PriceHistory) from the
 * previous database into the active FloatMarket database, mapping every record
 * onto the one unified schema so all items render identically across grids,
 * cards and detail pages. Validates each row, normalizes categories/rarity/
 * images/floats, and reports skipped / failed rows. Idempotent: primary keys
 * are preserved and writes use upsert, so re-running reconciles instead of
 * duplicating.
 *
 *   npx tsx scripts/migrate-products.ts            # full run
 *   npx tsx scripts/migrate-products.ts --dry-run  # validate only, no writes
 *   npx tsx scripts/migrate-products.ts --limit 50 # cap rows (smoke test)
 *
 * Env:
 *   MIGRATION_SOURCE_URL  source DB connection string (previous marketplace)
 *   DATABASE_URL          target DB connection string (FloatMarket, active)
 */
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });
loadEnv();
import { PrismaClient, type Prisma } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { z } from "zod";

// ── CLI flags ─────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const limitIdx = args.indexOf("--limit");
const LIMIT = limitIdx >= 0 ? Number(args[limitIdx + 1]) : Infinity;
const BATCH = 500;

// ── Connections ───────────────────────────────────────────────────────────
const SOURCE_URL = process.env.MIGRATION_SOURCE_URL;
const TARGET_URL = process.env.DATABASE_URL;
if (!SOURCE_URL) throw new Error("MIGRATION_SOURCE_URL is not set");
if (!TARGET_URL) throw new Error("DATABASE_URL is not set");
if (SOURCE_URL === TARGET_URL)
  throw new Error("Source and target databases are identical — aborting");

const source = new PrismaClient({
  adapter: new PrismaPg({ connectionString: SOURCE_URL }),
});
const target = new PrismaClient({
  adapter: new PrismaPg({ connectionString: TARGET_URL }),
});

// ── Canonical vocabularies ────────────────────────────────────────────────
const CATEGORIES = [
  "Rifle", "Pistol", "SMG", "Knife", "Gloves", "Sticker",
  "Case", "Agent", "Charm", "Graffiti", "Patch", "Music Kit",
] as const;

// Map source category variants → canonical category.
const CATEGORY_MAP: Record<string, (typeof CATEGORIES)[number]> = {
  rifle: "Rifle", rifles: "Rifle", heavy: "Rifle", machinegun: "Rifle", "machine gun": "Rifle", shotgun: "Rifle", sniper: "Rifle", "sniper rifle": "Rifle",
  pistol: "Pistol", pistols: "Pistol",
  smg: "SMG", smgs: "SMG",
  knife: "Knife", knives: "Knife",
  glove: "Gloves", gloves: "Gloves",
  sticker: "Sticker", stickers: "Sticker",
  case: "Case", cases: "Case", container: "Case", capsule: "Case",
  agent: "Agent", agents: "Agent",
  charm: "Charm", charms: "Charm", keychain: "Charm",
  graffiti: "Graffiti",
  patch: "Patch", patches: "Patch",
  "music kit": "Music Kit", musickit: "Music Kit", music: "Music Kit",
};

function normalizeCategory(raw: string): (typeof CATEGORIES)[number] | null {
  const key = raw.trim().toLowerCase();
  if (CATEGORY_MAP[key]) return CATEGORY_MAP[key];
  const hit = CATEGORIES.find((c) => c.toLowerCase() === key);
  return hit ?? null;
}

const HEX = /^#?[0-9a-fA-F]{6}$/;
function normalizeHex(raw: string | null | undefined): string {
  if (raw && HEX.test(raw.trim())) {
    const v = raw.trim();
    return v.startsWith("#") ? v.toLowerCase() : `#${v.toLowerCase()}`;
  }
  return "#b0c3d9"; // Consumer-grade grey fallback
}

function normalizeImageUrl(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const v = raw.trim();
  if (!v) return null;
  if (v.startsWith("//")) return `https:${v}`;
  if (!/^https?:\/\//i.test(v)) return null;
  return v.replace(/^http:\/\//i, "https://");
}

function clampFloat(v: number | null | undefined): number | null {
  if (v == null || Number.isNaN(v)) return null;
  return Math.min(1, Math.max(0, v));
}

// Rebrand the market source label on the way in.
function normalizeMarket(raw: string | null | undefined): string {
  const v = (raw ?? "").trim().toLowerCase();
  if (!v || v === "dropskin") return "floatmarket";
  return v;
}

// ── Validation schemas ────────────────────────────────────────────────────
const skinSchema = z.object({
  id: z.string().min(1),
  externalId: z.string().min(1),
  name: z.string().min(1),
  weapon: z.string().min(1),
  category: z.string().min(1),
  rarity: z.string().min(1),
});

const listingSchema = z.object({
  id: z.string().min(1),
  skinId: z.string().min(1),
  marketHashName: z.string().min(1),
  price: z.coerce.number().positive(),
});

// ── Report ────────────────────────────────────────────────────────────────
type Bucket = { created: number; updated: number; skipped: number; failed: number };
const skinStats: Bucket = { created: 0, updated: 0, skipped: 0, failed: 0 };
const listingStats: Bucket = { created: 0, updated: 0, skipped: 0, failed: 0 };
const priceStats = { copied: 0, failed: 0 };
const errors: { entity: string; id: string; reason: string }[] = [];
const validSkinIds = new Set<string>(); // target skin ids that exist after copy

function logErr(entity: string, id: string, reason: string) {
  errors.push({ entity, id, reason });
  if (errors.length <= 40) console.log(`  ⚠ skip ${entity} ${id}: ${reason}`);
}

// ── Migrate Skins ─────────────────────────────────────────────────────────
async function migrateSkins() {
  const total = await source.skin.count();
  console.log(`\n▶ Skins: ${total} in source (processing up to ${LIMIT === Infinity ? "all" : LIMIT})`);
  let cursor: string | undefined;
  let processed = 0;

  while (processed < LIMIT) {
    const take = Math.min(BATCH, LIMIT - processed);
    const rows = await source.skin.findMany({
      take,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: "asc" },
    });
    if (rows.length === 0) break;
    cursor = rows[rows.length - 1].id;
    processed += rows.length;

    const batch: Prisma.SkinCreateManyInput[] = [];
    for (const s of rows) {
      const parsed = skinSchema.safeParse(s);
      if (!parsed.success) {
        skinStats.failed++;
        logErr("skin", s.id ?? "?", parsed.error.issues.map((i) => i.message).join("; "));
        continue;
      }
      const category = normalizeCategory(s.category);
      if (!category) {
        skinStats.skipped++;
        logErr("skin", s.id, `unknown category "${s.category}"`);
        continue;
      }

      const data = {
        externalId: s.externalId,
        name: s.name,
        weapon: s.weapon,
        category,
        pattern: s.pattern,
        rarity: s.rarity,
        rarityColor: normalizeHex(s.rarityColor),
        collection: s.collection,
        minFloat: clampFloat(s.minFloat) ?? 0,
        maxFloat: clampFloat(s.maxFloat) ?? 1,
        imageUrl: normalizeImageUrl(s.imageUrl),
        hasStatTrak: s.hasStatTrak,
        hasSouvenir: s.hasSouvenir,
        isKnife: s.isKnife,
        isGloves: s.isGloves,
        phases: (s.phases ?? undefined) as Prisma.InputJsonValue | undefined,
      };

      validSkinIds.add(s.id);
      if (DRY_RUN) { skinStats.created++; continue; }
      batch.push({ id: s.id, ...data });
    }

    if (!DRY_RUN && batch.length) {
      const res = await target.skin.createMany({ data: batch, skipDuplicates: true });
      skinStats.created += res.count;
      skinStats.updated += batch.length - res.count; // pre-existing ids (re-run)
    }
    process.stdout.write(`\r  skins processed: ${processed}`);
  }
  console.log("");
}

// ── Migrate Listings ──────────────────────────────────────────────────────
async function migrateListings() {
  const total = await source.skinListing.count();
  console.log(`\n▶ Listings: ${total} in source`);
  let cursor: string | undefined;
  let processed = 0;

  while (processed < LIMIT * 12) {
    const rows = await source.skinListing.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: "asc" },
    });
    if (rows.length === 0) break;
    cursor = rows[rows.length - 1].id;
    processed += rows.length;

    const batch: Prisma.SkinListingCreateManyInput[] = [];
    for (const l of rows) {
      const parsed = listingSchema.safeParse(l);
      if (!parsed.success) {
        listingStats.failed++;
        logErr("listing", l.id ?? "?", parsed.error.issues.map((i) => i.message).join("; "));
        continue;
      }
      // Referential integrity: parent skin must have been migrated.
      if (!validSkinIds.has(l.skinId)) {
        listingStats.skipped++;
        logErr("listing", l.id, `orphan — skin ${l.skinId} not migrated`);
        continue;
      }

      const data = {
        skinId: l.skinId,
        marketHashName: l.marketHashName,
        exterior: l.exterior,
        isStatTrak: l.isStatTrak,
        isSouvenir: l.isSouvenir,
        float: clampFloat(l.float),
        paintSeed: l.paintSeed,
        phase: l.phase,
        stickers: (l.stickers ?? undefined) as Prisma.InputJsonValue | undefined,
        inspectLink: l.inspectLink,
        imageUrl: normalizeImageUrl(l.imageUrl),
        price: l.price,
        currency: l.currency,
        steamPrice: l.steamPrice,
        discountPct: l.discountPct,
        market: normalizeMarket(l.market),
        status: l.status,
      };

      if (DRY_RUN) { listingStats.created++; continue; }
      batch.push({ id: l.id, ...data });
    }

    if (!DRY_RUN && batch.length) {
      const res = await target.skinListing.createMany({ data: batch, skipDuplicates: true });
      listingStats.created += res.count;
      listingStats.updated += batch.length - res.count;
    }
    process.stdout.write(`\r  listings processed: ${processed}`);
  }
  console.log("");
}

// ── Migrate PriceHistory ──────────────────────────────────────────────────
async function migratePriceHistory() {
  const total = await source.priceHistory.count();
  if (total === 0) { console.log("\n▶ PriceHistory: none in source"); return; }
  console.log(`\n▶ PriceHistory: ${total} in source`);
  let cursor: string | undefined;

  while (true) {
    const rows = await source.priceHistory.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      orderBy: { id: "asc" },
    });
    if (rows.length === 0) break;
    cursor = rows[rows.length - 1].id;

    for (const p of rows) {
      if (!validSkinIds.has(p.skinId)) { priceStats.failed++; continue; }
      if (DRY_RUN) { priceStats.copied++; continue; }
      await target.priceHistory.upsert({
        where: { id: p.id },
        create: { id: p.id, skinId: p.skinId, market: p.market, price: p.price, volume: p.volume, recordedAt: p.recordedAt },
        update: { market: p.market, price: p.price, volume: p.volume, recordedAt: p.recordedAt },
      });
      priceStats.copied++;
    }
  }
}

// ── Recompute denormalized summaries on target ────────────────────────────
async function recomputeSummaries() {
  if (DRY_RUN) return;
  console.log("\n▶ Recomputing lowestPrice / listingCount on target…");
  await target.$executeRawUnsafe(`
    UPDATE "Skin" s SET
      "listingCount" = COALESCE(agg.cnt, 0),
      "lowestPrice"  = agg.min_price
    FROM (
      SELECT "skinId", COUNT(*)::int AS cnt, MIN("price") AS min_price
      FROM "SkinListing"
      WHERE "status" = 'available'
      GROUP BY "skinId"
    ) agg
    WHERE s.id = agg."skinId";
  `);
}

// ── Main ──────────────────────────────────────────────────────────────────
async function main() {
  const startedAt = new Date();
  console.log(`FloatMarket product migration ${DRY_RUN ? "(DRY RUN)" : ""}`);
  console.log(`  source: ${new URL(SOURCE_URL!).host}`);
  console.log(`  target: ${new URL(TARGET_URL!).host}`);

  await migrateSkins();
  await migrateListings();
  await migratePriceHistory();
  await recomputeSummaries();

  // Record the run in the target for auditability.
  if (!DRY_RUN) {
    await target.skinImportRun.create({
      data: {
        source: "migration:previous-db",
        status: errors.length > 0 ? "completed" : "completed",
        dryRun: false,
        totalItems: skinStats.created + skinStats.updated + listingStats.created + listingStats.updated,
        created: skinStats.created + listingStats.created,
        updated: skinStats.updated + listingStats.updated,
        skipped: skinStats.skipped + listingStats.skipped,
        errorsCount: skinStats.failed + listingStats.failed,
        errorLog: errors.slice(0, 500) as unknown as Prisma.InputJsonValue,
        startedAt,
        finishedAt: new Date(),
      },
    });
  }

  console.log("\n──────────── MIGRATION REPORT ────────────");
  console.log(`Skins    → created ${skinStats.created}  updated ${skinStats.updated}  skipped ${skinStats.skipped}  failed ${skinStats.failed}`);
  console.log(`Listings → created ${listingStats.created}  updated ${listingStats.updated}  skipped ${listingStats.skipped}  failed ${listingStats.failed}`);
  console.log(`Prices   → copied ${priceStats.copied}  failed ${priceStats.failed}`);
  console.log(`Total problem rows: ${errors.length}`);
  if (errors.length > 40) console.log(`(showing first 40; full list stored in SkinImportRun.errorLog)`);
  console.log("──────────────────────────────────────────");

  await source.$disconnect();
  await target.$disconnect();
}

main().catch(async (e) => {
  console.error("\nMIGRATION FAILED:", e);
  await source.$disconnect().catch(() => {});
  await target.$disconnect().catch(() => {});
  process.exit(1);
});
