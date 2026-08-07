// Imports the real, live SIH market catalog into our Skin/SkinListing tables.
// Unlike the synthetic bymykel importer, every listing here is a genuinely
// buyable item with the real SIH price — the same market_hash_name we hand back
// to SIH at purchase time. One GET /get-items call returns the whole catalog.

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getItems, isSihConfigured, SIH_APP_ID, type SihItem } from "./sih";
import { fetchSourceSkins, type SourceSkin } from "./source";
import {
  categoryFor,
  isGlovesCategory,
  isKnifeCategory,
  normalizeColor,
  parseSihName,
  rarityFromColor,
  type ParsedSihName,
  type SkinCategory,
} from "./sih-source";
import { round2, MAX_LISTING_PRICE_USD } from "./shared";

export interface SihImportOptions {
  dryRun?: boolean;
  limit?: number; // cap number of source items (testing)
  // Remove leftover non-SIH listings and now-empty skins so the catalog is
  // purely real. Safe only when there are no purchases referencing them.
  prune?: boolean;
  batchSize?: number;
  log?: (msg: string) => void;
}

export interface SihImportResult {
  runId: string | null;
  totalItems: number;
  skinlike: number;
  skins: number;
  listings: number;
  errorsCount: number;
  prunedListings: number;
  prunedSkins: number;
  durationMs: number;
}

interface Entry {
  parsed: ParsedSihName;
  item: SihItem;
  category: SkinCategory;
}

function buildEnrichmentMap(source: SourceSkin[]): Map<string, SourceSkin> {
  const map = new Map<string, SourceSkin>();
  for (const s of source) {
    if (s.name) map.set(s.name, s);
  }
  return map;
}

export async function importSihSkins(opts: SihImportOptions = {}): Promise<SihImportResult> {
  const { dryRun = false, limit, prune = true, batchSize = 25, log = () => {} } = opts;
  const start = Date.now();

  if (!isSihConfigured()) {
    throw new Error("SIH_API_KEY is not configured — cannot import from SIH.");
  }

  log("Fetching SIH market catalog…");
  const items = await getItems({ appId: SIH_APP_ID, extended: true });
  let names = Object.keys(items);
  log(`SIH returned ${names.length} items.`);
  if (limit) names = names.slice(0, limit);

  // Keep only real skins (weapons, knives, gloves, agents).
  const entries: Entry[] = [];
  for (const raw of names) {
    const item = items[raw];
    if (!item || typeof item.price !== "number" || item.price <= 0) continue;
    const parsed = parseSihName(raw);
    const category = categoryFor(parsed, item.color);
    if (!category) continue;
    entries.push({ parsed, item, category });
  }
  log(`Skin-like items: ${entries.length}.`);

  // Group listings by their definition (base) name → one Skin per group.
  const groups = new Map<string, Entry[]>();
  for (const e of entries) {
    const arr = groups.get(e.parsed.baseName);
    if (arr) arr.push(e);
    else groups.set(e.parsed.baseName, [e]);
  }
  log(`Distinct skins: ${groups.size}.`);

  log("Loading bymykel catalog for enrichment…");
  const enrichment = buildEnrichmentMap(await fetchSourceSkins().catch(() => []));

  const run = dryRun
    ? null
    : await prisma.skinImportRun.create({
        data: { source: "sih", dryRun, totalItems: entries.length, status: "running" },
      });

  let skinCount = 0;
  let listingCount = 0;
  const errors: { name: string; error: string }[] = [];

  const groupList = [...groups.entries()];
  for (let i = 0; i < groupList.length; i += batchSize) {
    const batch = groupList.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async ([baseName, group]) => {
        try {
          // Enforce the platform price ceiling: drop any listing above the cap so
          // the catalog never carries a skin worth more than €4,000.
          const kept = group.filter((g) => round2(g.item.price) <= MAX_LISTING_PRICE_USD);
          if (kept.length === 0) {
            // Every variant of this skin is over the cap — remove it entirely.
            if (!dryRun) {
              await prisma.skinListing.deleteMany({
                where: { skin: { externalId: `sih:${baseName}` } },
              });
              await prisma.skin.deleteMany({ where: { externalId: `sih:${baseName}` } });
            }
            return;
          }

          const first = kept[0];
          const category = first.category;
          const enrich = enrichment.get(baseName);
          const color = first.item.color;

          const prices = kept.map((g) => round2(g.item.price));
          const lowestPrice = Math.min(...prices);

          const skinData = {
            externalId: `sih:${baseName}`,
            name: baseName,
            weapon: first.parsed.weapon,
            category,
            pattern: first.parsed.pattern ?? enrich?.pattern?.name ?? null,
            rarity: enrich?.rarity?.name ?? rarityFromColor(color),
            rarityColor: enrich?.rarity?.color ?? `#${normalizeColor(color) || "d32ce6"}`,
            collection: enrich?.collections?.[0]?.name ?? null,
            minFloat: enrich?.min_float ?? 0,
            maxFloat: enrich?.max_float ?? 1,
            imageUrl: enrich?.image ?? first.item.image ?? null,
            hasStatTrak: kept.some((g) => g.parsed.isStatTrak),
            hasSouvenir: kept.some((g) => g.parsed.isSouvenir),
            isKnife: isKnifeCategory(category),
            isGloves: isGlovesCategory(category),
            phases: null as Prisma.InputJsonValue | null,
          };

          if (dryRun) return;

          const skin = await prisma.skin.upsert({
            where: { externalId: skinData.externalId },
            create: {
              ...skinData,
              phases: skinData.phases ?? undefined,
              lowestPrice,
              listingCount: kept.length,
            },
            update: {
              ...skinData,
              phases: skinData.phases ?? undefined,
              lowestPrice,
              listingCount: kept.length,
            },
            select: { id: true },
          });

          // Replace this skin's listings with the current SIH snapshot.
          await prisma.skinListing.deleteMany({ where: { skinId: skin.id } });
          await prisma.skinListing.createMany({
            data: kept.map((g) => {
              const price = round2(g.item.price);
              const steamPrice =
                typeof g.item.steam === "number" ? round2(g.item.steam) : null;
              const discountPct =
                steamPrice && steamPrice > price
                  ? round2(((steamPrice - price) / steamPrice) * 100)
                  : null;
              return {
                skinId: skin.id,
                marketHashName: g.parsed.raw,
                exterior: g.parsed.exterior,
                isStatTrak: g.parsed.isStatTrak,
                isSouvenir: g.parsed.isSouvenir,
                float: null,
                paintSeed: null,
                phase: g.item.phase ?? null,
                price,
                steamPrice,
                discountPct,
                imageUrl: g.item.image ?? skinData.imageUrl,
                currency: "USD",
                market: "sih",
                status: "available",
              };
            }),
          });

          skinCount++;
          listingCount += kept.length;
        } catch (err) {
          errors.push({ name: baseName, error: err instanceof Error ? err.message : String(err) });
        }
      }),
    );
    log(`Processed ${Math.min(i + batchSize, groupList.length)}/${groupList.length} skins…`);
  }

  // Drop the old synthetic catalog so only real SIH data remains.
  let prunedListings = 0;
  let prunedSkins = 0;
  if (prune && !dryRun) {
    log("Pruning synthetic listings and empty skins…");
    const delListings = await prisma.skinListing.deleteMany({
      where: { market: { not: "sih" } },
    });
    prunedListings = delListings.count;
    const delSkins = await prisma.skin.deleteMany({ where: { listings: { none: {} } } });
    prunedSkins = delSkins.count;
  }

  const result: SihImportResult = {
    runId: run?.id ?? null,
    totalItems: names.length,
    skinlike: entries.length,
    skins: skinCount,
    listings: listingCount,
    errorsCount: errors.length,
    prunedListings,
    prunedSkins,
    durationMs: Date.now() - start,
  };

  if (run) {
    await prisma.skinImportRun.update({
      where: { id: run.id },
      data: {
        status: errors.length && skinCount === 0 ? "failed" : "completed",
        created: skinCount,
        updated: 0,
        skipped: 0,
        errorsCount: errors.length,
        errorLog: errors.length ? (errors.slice(0, 100) as Prisma.InputJsonValue) : undefined,
        finishedAt: new Date(),
      },
    });
  }

  log(
    `Done in ${result.durationMs}ms — skins ${skinCount}, listings ${listingCount}, ` +
      `pruned ${prunedListings} listings / ${prunedSkins} skins, errors ${errors.length}.`,
  );
  return result;
}
