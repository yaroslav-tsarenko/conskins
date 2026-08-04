/**
 * Import the real, live SIH market catalog (real prices + images).
 *
 * Usage:
 *   npx tsx scripts/import-sih-skins.ts               # full import + prune synthetic
 *   npx tsx scripts/import-sih-skins.ts --dry-run     # no writes, just counts
 *   npx tsx scripts/import-sih-skins.ts --limit 500   # first 500 source items
 *   npx tsx scripts/import-sih-skins.ts --no-prune    # keep existing synthetic listings
 */
import "dotenv/config";
import { importSihSkins } from "@/lib/skins/sih-import";

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const prune = !args.includes("--no-prune");
  const limitIdx = args.indexOf("--limit");
  const limit = limitIdx >= 0 ? Number(args[limitIdx + 1]) : undefined;

  const result = await importSihSkins({
    dryRun,
    limit,
    prune,
    log: (msg) => console.log(`[sih-import] ${msg}`),
  });

  console.log("\nResult:", JSON.stringify(result, null, 2));
  process.exit(result.errorsCount && result.skins === 0 ? 1 : 0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
