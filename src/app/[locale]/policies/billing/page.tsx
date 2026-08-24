import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Billing, Refunds & Chargebacks Policy — ConSkins" };

export default function BillingPage() {
  return (
    <PolicyLayout title="Billing, Refunds & Chargebacks Policy" lastUpdated="24 August 2026">
      <p>Clear payment, refund and dispute rules for Top-Ups, Balance and Digital Item Orders.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>2.1 Billing Contact and Payment Processing</h2>
      <p>Billing contact: info@conskins.com. Please use the subject line “Billing – [Order or payment reference]”. Payments are processed through the payment methods shown in the checkout interface and may involve an independent payment provider. Submitting payment details does not guarantee approval. A Top-Up is complete only when payment confirmation is received and the corresponding Cash-Funded Balance is shown as available in your Account.</p>
      <p>You confirm that you are authorised to use the payment method, that the payment information is accurate, and that the funds are lawful and used for your own Account. We and the payment provider may request proportionate verification, such as payment confirmation, identity information or evidence of payment-method ownership.</p>

      <h2>2.2 Pending, Failed and Duplicate Payments</h2>
      <p>A pending payment does not create available Balance. Do not submit repeated payments for the same Top-Up while it remains pending unless support asks you to do so. A declined or failed Top-Up does not create Balance. If a payment was successfully debited but Balance was not credited because of a technical failure attributable to ConSkins, we will investigate and, where confirmed, credit the Balance or refund the affected amount to the original payment method as appropriate.</p>
      <p>If a duplicate payment is confirmed and the duplicate Balance remains unused, we will ordinarily refund the duplicate amount to the original payment method. External bank charges, foreign-exchange differences and charges outside our control may not be refundable unless required by law.</p>

      <h2>2.3 Refund Eligibility</h2>
      <p>A refund or remedy may be available where an Order cannot be completed, a Digital Item is not delivered within the stated delivery framework and the issue is not caused by your Steam Account or information, an incorrect Digital Item is delivered, a material technical error attributable to ConSkins affects the transaction, a duplicate or unauthorised payment is confirmed, or applicable law requires a refund.</p>
      <p>Where an undelivered Order is cancelled, the usual remedy is restoration of the full amount deducted for that Order to the Balance. A monetary refund to the original payment method may be appropriate for an uncredited or duplicate Top-Up, a confirmed unauthorised payment, eligible unused Cash-Funded Balance on permanent Account closure, a ConSkins technical failure preventing the intended service, or where law requires it. We will not replace a legally required monetary refund with Balance without your agreement.</p>

      <h2>2.4 Non-Refundable Items and Limits</h2>
      <p>Promotional Credit is not paid-for credit and, unless required by law or expressly stated otherwise, is not redeemable for money, transferable or refundable. Cash-Funded Balance already used to complete delivery of a correct Digital Item is not refundable for change of mind once delivery has begun, subject to mandatory consumer rights and the withdrawal information in Appendix A.</p>
      <p>A refund may be refused or adjusted where the claim is fraudulent, abusive, contradicted by reliable transaction records, relates to Balance or a Digital Item already used or delivered, results from an incorrect Trade URL or Steam restriction caused by you, or relates solely to a price change after a completed Order. This does not affect rights that cannot be limited by law.</p>

      <h2>2.5 Refund Request Window and Evidence</h2>
      <p>Submit a refund or billing request within 30 days of the relevant payment, Order or delivery issue, unless a longer period is required by law. Send the request to info@conskins.com from the email registered to your Account and include the Account email, Order or payment reference, date and amount, a clear description of the issue, and supporting evidence reasonably available to you.</p>
      <p>Useful evidence may include screenshots of the ConSkins Order status, Steam Trade Offer, Steam Inventory, payment confirmation, error message or correspondence. Do not send complete payment-card numbers, card security codes, Steam passwords or authenticator codes. We may request further reasonable evidence to verify the claim.</p>

      <h2>2.6 Response Times and Investigation</h2>
      <p>We aim to acknowledge a complete billing or refund request within 2 Business Days and provide a substantive response within 10 Business Days. More complex matters, including payment-provider investigations, Steam records, fraud reviews or Chargebacks, may take longer. If more time is needed, we will provide an update where reasonably practicable.</p>

      <h2>2.7 Chargebacks and Payment Disputes</h2>
      <p>Before initiating a Chargeback or payment dispute with your bank, card issuer or payment provider, please contact us at info@conskins.com and give us a reasonable opportunity to investigate and resolve the issue. This request does not limit any right you have under applicable law or your payment-provider agreement.</p>
      <p>If you initiate a Chargeback, we may provide relevant transaction, delivery, consent, communications and verification records to the payment provider to respond to it. We may reserve related Balance, pause delivery or restrict the Account while the matter is reviewed. A fraudulent or abusive Chargeback, including disputing a payment after using the related Balance or receiving the Digital Item, may lead to Account suspension, recovery action or other lawful steps.</p>

      <h2>2.8 Account Closure and Unused Cash-Funded Balance</h2>
      <p>To request permanent Account closure, contact info@conskins.com from the registered email. We may require Account ownership verification and resolution of pending Orders, Trade Offers, payment reviews, disputes or negative balances. Subject to verification, legal restrictions and the status of the funds, eligible unused Cash-Funded Balance may be returned to the original payment method. Promotional Credit is not ordinarily refunded.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
