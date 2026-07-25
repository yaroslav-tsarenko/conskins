/**
 * Ad-hoc DB inspector. Reads a connection string from process.env.INSPECT_URL
 * and prints every public table with its row count. Never logs credentials.
 *
 *   INSPECT_URL="postgres://..." npx tsx scripts/inspect-db.ts
 */
import { Client } from "pg";

async function main() {
  const url = process.env.INSPECT_URL;
  if (!url) {
    console.error("Set INSPECT_URL");
    process.exit(1);
  }

  const host = (() => {
    try {
      return new URL(url).host;
    } catch {
      return "(unparseable)";
    }
  })();
  console.log(`\n=== DB @ ${host} ===`);

  const client = new Client({ connectionString: url });
  await client.connect();

  const { rows: tables } = await client.query<{ table_name: string }>(
    `select table_name from information_schema.tables
     where table_schema = 'public' and table_type = 'BASE TABLE'
     order by table_name`
  );

  if (tables.length === 0) {
    console.log("(no tables — empty database)");
    await client.end();
    return;
  }

  for (const { table_name } of tables) {
    try {
      const { rows } = await client.query(
        `select count(*)::int as c from "${table_name}"`
      );
      console.log(`${String(rows[0].c).padStart(8)}  ${table_name}`);
    } catch (e) {
      console.log(`   ERR    ${table_name}: ${(e as Error).message}`);
    }
  }

  await client.end();
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
