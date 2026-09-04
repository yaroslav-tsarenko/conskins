export interface CreatePaymentCustomer {
  referenceId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  ip: string;
}

export interface CreatePaymentBillingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  countryCode: string;
  postalCode: string;
  state?: string;
}

export interface CreatePaymentPayload {
  amount: number;
  currency: string;
  referenceId: string;
  description?: string;
  paymentMethod?: string;
  customer: CreatePaymentCustomer;
  billingAddress?: Partial<CreatePaymentBillingAddress>;
  returnUrl: string;
  webhookUrl: string;
}

export interface PaymentDetails {
  id: string;
  redirectUrl?: string;
  state: string; // COMPLETED | PENDING | DECLINED | ERROR | CANCELLED | AWAITING_REDIRECT etc.
  paymentType?: string;
  paymentMethod?: string;
  referenceId?: string;
  amount: number;
  currency: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePaymentResponse {
  result?: PaymentDetails;
  error?: string;
  message?: string;
}

export function formatTransfermitPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/\D/g, "");
  if (!digits || digits.length < 4) return undefined;
  return `${digits.slice(0, 2)} ${digits.slice(2)}`;
}

export class TransfermitAPI {
  private apiKey: string;
  private apiUrl: string;

  constructor() {
    this.apiKey = process.env.TRANSFERMIT_API_KEY || "";
    // Base endpoint defaults to app.transfermit.com API
    this.apiUrl = (process.env.TRANSFERMIT_API_URL || "https://app.transfermit.com/api/v1/payments").replace(/\/$/, "");
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey !== "your_api_key_here" && this.apiKey.trim() !== "");
  }

  /**
   * Create a deposit payment request
   */
  async createPayment(data: CreatePaymentPayload): Promise<CreatePaymentResponse> {
    if (!this.isConfigured()) {
      throw new Error("Transfermit API Key is not configured in .env file.");
    }

    const formattedPhone = formatTransfermitPhone(data.customer.phone);

    const payload = {
      paymentType: "DEPOSIT",
      paymentMethod: data.paymentMethod || "BASIC_CARD",
      amount: data.amount,
      currency: data.currency,
      description: data.description || `Order ${data.referenceId} payment`,
      referenceId: data.referenceId,
      customer: {
        referenceId: data.customer.referenceId,
        firstName: data.customer.firstName || "Customer",
        lastName: data.customer.lastName || "Customer",
        email: data.customer.email,
        ...(formattedPhone ? { phone: formattedPhone } : {}),
        ip: data.customer.ip,
      },
      billingAddress: {
        addressLine1: data.billingAddress?.addressLine1 || "Digital Goods",
        addressLine2: data.billingAddress?.addressLine2 || undefined,
        city: data.billingAddress?.city || "London",
        countryCode: data.billingAddress?.countryCode || "GB",
        postalCode: data.billingAddress?.postalCode || "00000",
        state: data.billingAddress?.state || undefined,
      },
      returnUrl: data.returnUrl,
      webhookUrl: data.webhookUrl,
    };

    console.log(`[Transfermit API] Sending request to ${this.apiUrl}`, JSON.stringify(payload, null, 2));

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Transfermit-NextJS/1.0.8",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log(`[Transfermit API] Response Status: ${response.status}`, responseText);

    if (!response.ok) {
      throw new Error(
        `Transfermit API request failed with status ${response.status}: ${responseText}`
      );
    }

    return JSON.parse(responseText);
  }

  /**
   * Fetch payment status by Transfermit payment ID
   */
  async getPaymentStatus(paymentId: string): Promise<CreatePaymentResponse> {
    if (!this.isConfigured()) {
      throw new Error("Transfermit API Key is not configured in .env file.");
    }

    const url = `${this.apiUrl}/${encodeURIComponent(paymentId)}`;
    console.log(`[Transfermit API] Checking status at ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Accept": "application/json",
        "User-Agent": "Transfermit-NextJS/1.0.8",
      },
    });

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(
        `Transfermit API status check failed with status ${response.status}: ${responseText}`
      );
    }

    return JSON.parse(responseText);
  }

  /**
   * Create a refund for a payment
   */
  async createRefund(parentPaymentId: string, amount: number, currency: string) {
    if (!this.isConfigured()) {
      throw new Error("Transfermit API Key is not configured in .env file.");
    }

    const payload = {
      paymentType: "REFUND",
      parentPaymentId,
      amount,
      currency,
    };

    const response = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Transfermit-NextJS/1.0.8",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(`Transfermit refund failed (${response.status}): ${responseText}`);
    }

    return JSON.parse(responseText);
  }
}
