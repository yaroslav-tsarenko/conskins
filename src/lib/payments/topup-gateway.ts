// Pluggable top-up gateway. The real payment provider is not wired yet, so a
// dev stub "settles" the charge instantly and the wallet is credited in the
// same request. When a real gateway lands, add a provider here that returns a
// redirect/checkout URL and settles the credit from its webhook instead.
//
// Callers only ever touch `activeTopupGateway`.

export type TopupIntent = {
  userId: string;
  // Amount + currency the user chose to pay (pre-conversion to EUR).
  amount: number;
  currency: string;
};

export type TopupResult =
  // Stub: charge is already settled, caller should credit the wallet now.
  | { kind: "settled"; providerRef: string; provider: string }
  // Real gateway: redirect the user to complete payment; webhook settles later.
  | { kind: "redirect"; url: string; providerRef: string; provider: string };

export interface TopupGateway {
  name: string;
  createIntent(intent: TopupIntent): Promise<TopupResult>;
}

// Instant-settle stub used until a real gateway is configured.
class StubTopupGateway implements TopupGateway {
  name = "stub";

  async createIntent(intent: TopupIntent): Promise<TopupResult> {
    const providerRef = `stub_${intent.userId}_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2, 8)}`;
    return { kind: "settled", providerRef, provider: this.name };
  }
}

export function isRealGatewayConfigured(): boolean {
  // No real gateway env is wired yet; flip this when one is added.
  return false;
}

export const activeTopupGateway: TopupGateway = new StubTopupGateway();
