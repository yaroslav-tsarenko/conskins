import "dotenv/config";
import pg from "pg";

async function main() {
  const c = new pg.Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  await c.connect();
  const now = new Date().toISOString();
  await c.query(
    `INSERT INTO "StoreSettings" (id, name, description, "primaryColor", "secondaryColor", email, currency, "taxRate", "freeShippingMin", "metaTitle", "metaDescription", "updatedAt")
     VALUES ('default', $1, $2, '#0F172A', '#FFFFFF', 'info@conskins.com', 'GBP', 20, 100, $3, $4, $5)
     ON CONFLICT (id) DO UPDATE
       SET name = EXCLUDED.name,
           description = EXCLUDED.description,
           email = EXCLUDED.email,
           currency = EXCLUDED.currency,
           "taxRate" = EXCLUDED."taxRate",
           "freeShippingMin" = EXCLUDED."freeShippingMin",
           "metaTitle" = EXCLUDED."metaTitle",
           "metaDescription" = EXCLUDED."metaDescription",
           "updatedAt" = EXCLUDED."updatedAt"`,
    [
      "ConSkins",
      "Buy CS2 skins with instant, secure Steam delivery.",
      "ConSkins — Buy CS2 skins",
      "ConSkins — browse CS2 skins with live float, pattern and price data and receive them instantly via your Steam account.",
      now,
    ],
  );
  console.log("StoreSettings upserted.");
  await c.end();
}

main().catch((e) => { console.error(e); process.exit(1); });
