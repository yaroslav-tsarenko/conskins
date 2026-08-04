// SIH Market API client (https://docs.sih.app/guide/).
//
// SIH fulfils a skin purchase by buying the item on the market and dispatching
// a Steam trade offer to the buyer. Authentication is a project `apikey` header
// — never expose it client-side. All calls are server-only.

const DEFAULT_BASE_URL = "https://api.sih.market/api/v1";

// CS2 / CS:GO app id used for every listing on this store.
export const SIH_APP_ID = 730;

function baseUrl(): string {
  const raw = process.env.SIH_API_BASE_URL?.trim();
  // The env historically pointed at api.sih.app; the documented API host is
  // api.sih.market. Fall back to the documented host when unset or clearly the
  // marketing domain, so a stale env value can't silently break fulfilment.
  if (!raw || /(^https?:\/\/)?(www\.)?sih\.app\/?$/i.test(raw)) return DEFAULT_BASE_URL;
  return raw.replace(/\/+$/, "");
}

function apiKey(): string | null {
  return process.env.SIH_API_KEY?.trim() || null;
}

export function isSihConfigured(): boolean {
  return apiKey() !== null;
}

export interface SihOrder {
  id: number | string;
  customId?: string;
  steamId?: string;
  item?: string;
  amount?: number;
  expectedAmount?: number;
  status: SihOrderStatus;
  error?: string | null;
  created?: number;
  updated?: number;
}

// SIH lifecycle: created → processing → sent → finished, or failed / penalized.
export type SihOrderStatus =
  | "created"
  | "processing"
  | "sent"
  | "finished"
  | "failed"
  | "penalized";

export interface CreateOrderInput {
  // Buyer's SteamID64 and trade-URL token — SIH delivers the trade offer here.
  steamId: string;
  token: string;
  // Market hash name, e.g. "AWP | Dragon Lore (Field-Tested)".
  item: string;
  // Maximum amount (in the project's wallet currency) to spend on the item.
  amount: number;
  // Our internal SkinPurchase id — lets us reconcile status idempotently.
  customId: string;
  // When true, SIH simulates the purchase without debiting the wallet.
  test?: boolean;
  appId?: number;
}

export interface CreateOrderResult {
  success: boolean;
  id?: number | string;
  balance?: number;
  error?: string;
  status?: number;
}

class SihError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "SihError";
  }
}

async function request<T>(
  method: "GET" | "POST",
  path: string,
  init: { query?: Record<string, string | number | boolean | undefined>; body?: unknown } = {},
): Promise<T> {
  const key = apiKey();
  if (!key) throw new SihError("SIH_API_KEY is not configured", 500);

  const url = new URL(`${baseUrl()}/${path.replace(/^\/+/, "")}`);
  if (init.query) {
    for (const [k, v] of Object.entries(init.query)) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url, {
    method,
    headers: {
      apikey: key,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });

  const text = await res.text();
  let json: unknown = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    // Non-JSON response — surface the raw text as the error message.
  }
  if (!res.ok) {
    const jsonError =
      json && typeof json === "object" && "error" in json
        ? String((json as { error: unknown }).error)
        : "";
    const message = jsonError || text || `SIH request failed (${res.status})`;
    throw new SihError(message, res.status);
  }
  return json as T;
}

// POST /create-order — buy an item and dispatch a Steam trade offer.
export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  try {
    const data = await request<{ success?: boolean; id?: number | string; balance?: number; error?: string }>(
      "POST",
      "create-order",
      {
        body: {
          steamId: input.steamId,
          token: input.token,
          item: input.item,
          amount: input.amount,
          customId: input.customId,
          appId: input.appId ?? SIH_APP_ID,
          test: input.test ?? false,
        },
      },
    );
    return {
      success: data.success ?? true,
      id: data.id,
      balance: data.balance,
    };
  } catch (err) {
    if (err instanceof SihError) {
      return { success: false, error: err.message, status: err.status };
    }
    return { success: false, error: err instanceof Error ? err.message : "Unknown error" };
  }
}

// GET /get-order — fetch a single order by SIH id or by our customId.
export async function getOrder(params: { id?: string | number; customId?: string }): Promise<SihOrder | null> {
  if (params.id === undefined && !params.customId) return null;
  try {
    const data = await request<SihOrder & { success?: boolean }>("GET", "get-order", {
      query: { id: params.id, customId: params.customId },
    });
    if (!data || (data as { success?: boolean }).success === false) return null;
    return data;
  } catch {
    return null;
  }
}

// Shape of one entry in the GET /get-items map (extended payload).
export interface SihItem {
  price: number;
  count?: number;
  image?: string;
  color?: string;
  phase?: string;
  // Present on some items; absent in the CS2 catalog we've observed.
  steam?: number;
  sell?: number;
  market?: string;
}

// GET /get-items — the entire live market catalog, keyed by market hash name.
// One call returns every currently-sellable item (~17k for CS2), so callers
// should treat it as a bulk snapshot rather than paginate.
export async function getItems(
  opts: { appId?: number; extended?: boolean; minified?: boolean } = {},
): Promise<Record<string, SihItem>> {
  const data = await request<{ success?: boolean; items?: Record<string, SihItem> }>(
    "GET",
    "get-items",
    {
      query: {
        appId: opts.appId ?? SIH_APP_ID,
        extended: opts.extended ? true : undefined,
        minified: opts.minified ? true : undefined,
      },
    },
  );
  return data?.items ?? {};
}

// GET /get-min-item — lowest available price for a market hash name.
export async function getMinItemPrice(item: string, appId = SIH_APP_ID): Promise<number | null> {
  try {
    const data = await request<{ price?: number; count?: number } & Record<string, unknown>>(
      "GET",
      "get-min-item",
      { query: { item, appId, minified: true } },
    );
    const price = typeof data?.price === "number" ? data.price : null;
    return price;
  } catch {
    return null;
  }
}

// Map a raw SIH status onto our internal SkinPurchase status vocabulary.
export function mapSihStatus(status: SihOrderStatus | string): "pending" | "trade_sent" | "completed" | "failed" {
  switch (status) {
    case "sent":
      return "trade_sent";
    case "finished":
      return "completed";
    case "failed":
    case "penalized":
      return "failed";
    case "created":
    case "processing":
    default:
      return "pending";
  }
}
