// Parses SIH market hash names (from GET /get-items) into the structured shape
// our catalog needs. SIH keys items only by market_hash_name, so weapon,
// exterior, StatTrak/Souvenir and rarity all have to be recovered from the name
// and the item's rarity `color`.

import { exteriorFromLabel, type ExteriorCode } from "./shared";

const RIFLES = new Set([
  "AK-47", "M4A4", "M4A1-S", "AWP", "AUG", "SG 553", "FAMAS", "Galil AR",
  "SSG 08", "G3SG1", "SCAR-20",
]);
const PISTOLS = new Set([
  "Glock-18", "USP-S", "P250", "Desert Eagle", "Five-SeveN", "Tec-9",
  "CZ75-Auto", "P2000", "Dual Berettas", "R8 Revolver",
]);
const SMGS = new Set(["MAC-10", "MP9", "MP7", "MP5-SD", "P90", "PP-Bizon", "UMP-45"]);
const HEAVY = new Set(["Nova", "XM1014", "Sawed-Off", "MAG-7", "M249", "Negev"]);

// Item types that are not weapon/knife/glove/agent skins — excluded from the
// skin catalog.
const NON_SKIN = [
  /^Sticker\b/, /^Sealed Graffiti\b/, /^Graffiti\b/, /^Music Kit\b/,
  /^Charm\b/, /^Patch\b/, /^Sticker Slab\b/,
];

// SIH rarity color (lowercased, no `#`) → CS2 rarity name.
const COLOR_RARITY: Record<string, string> = {
  b0c3d9: "Consumer Grade",
  "5e98d9": "Industrial Grade",
  "4b69ff": "Mil-Spec Grade",
  "4662e8": "Mil-Spec Grade",
  "8847ff": "Restricted",
  "8546f9": "Restricted",
  d32ce6: "Classified",
  d22ce5: "Classified",
  eb4b4b: "Covert",
  e4ae39: "Contraband",
  ffd7aa: "Extraordinary",
  fa8072: "Superior", // agents
};

export type SkinCategory =
  | "Rifles" | "Pistols" | "SMGs" | "Heavy" | "Knives" | "Gloves" | "Agents";

export interface ParsedSihName {
  raw: string;
  // Definition name used to group listings into one Skin (keeps the ★, drops
  // StatTrak/Souvenir prefixes and the exterior suffix). e.g. "★ Karambit | Fade".
  baseName: string;
  weapon: string; // "AK-47", "★ Karambit" (star kept for knives/gloves)
  pattern: string | null; // paint name after " | "
  exterior: ExteriorCode;
  exteriorLabel: string | null;
  isStatTrak: boolean;
  isSouvenir: boolean;
  isStar: boolean; // knife/glove marker
}

const EXTERIOR_RE =
  / \((Factory New|Minimal Wear|Field-Tested|Well-Worn|Battle-Scarred)\)$/;

export function parseSihName(raw: string): ParsedSihName {
  let s = raw;
  let isSouvenir = false;
  let isStar = false;
  let isStatTrak = false;

  if (s.startsWith("Souvenir ")) {
    isSouvenir = true;
    s = s.slice("Souvenir ".length);
  }
  if (s.startsWith("★ ")) {
    isStar = true;
    s = s.slice("★ ".length);
  }
  if (s.startsWith("StatTrak™ ")) {
    isStatTrak = true;
    s = s.slice("StatTrak™ ".length);
  }

  let exterior: ExteriorCode = "NA";
  let exteriorLabel: string | null = null;
  const m = s.match(EXTERIOR_RE);
  if (m) {
    exteriorLabel = m[1];
    exterior = exteriorFromLabel(m[1]);
    s = s.slice(0, m.index);
  }

  const pipe = s.indexOf(" | ");
  const weaponCore = pipe < 0 ? s : s.slice(0, pipe);
  const pattern = pipe < 0 ? null : s.slice(pipe + 3);
  const weapon = isStar ? `★ ${weaponCore}` : weaponCore;
  const baseName = isStar ? `★ ${s}` : s;

  return {
    raw,
    baseName,
    weapon,
    pattern,
    exterior,
    exteriorLabel,
    isStatTrak,
    isSouvenir,
    isStar,
  };
}

// Best-effort category. Returns null for non-skin items (stickers, cases, …).
export function categoryFor(parsed: ParsedSihName, color: string | undefined): SkinCategory | null {
  const core = parsed.weapon.replace(/^★ /, "");
  if (parsed.isStar) {
    return /Gloves|Hand Wraps|Wraps/.test(core) ? "Gloves" : "Knives";
  }
  if (RIFLES.has(core)) return "Rifles";
  if (PISTOLS.has(core)) return "Pistols";
  if (SMGS.has(core)) return "SMGs";
  if (HEAVY.has(core)) return "Heavy";
  if (NON_SKIN.some((r) => r.test(core))) return null;
  if (normalizeColor(color) === "fa8072") return "Agents";
  return null; // containers, pins, passes, unknown → excluded
}

export function normalizeColor(color: string | undefined): string {
  return (color ?? "").replace(/^#/, "").toLowerCase();
}

export function rarityFromColor(color: string | undefined): string {
  return COLOR_RARITY[normalizeColor(color)] ?? "Classified";
}

export function isKnifeCategory(c: SkinCategory): boolean {
  return c === "Knives";
}
export function isGlovesCategory(c: SkinCategory): boolean {
  return c === "Gloves";
}
