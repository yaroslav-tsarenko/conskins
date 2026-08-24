import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "KYC & Sanctions Policy — ConSkins" };

export default function KycPage() {
  return (
    <PolicyLayout title="KYC & Sanctions Policy" lastUpdated="24 August 2026">
      <p>Verification and restrictions used to meet legal, security and fraud-prevention responsibilities.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>4.1 Purpose and When Checks Apply</h2>
      <p>ConSkins may apply proportionate identity, age, payment-method, source-of-funds or other verification checks where reasonably necessary to prevent fraud, protect users, comply with law, respond to payment-provider requirements, investigate unusual activity or manage a sanctions risk. Checks may apply before or after a Top-Up, Order, refund or Account closure request.</p>

      <h2>4.2 Information We May Request</h2>
      <p>Depending on the case, we may request confirmation of your registered email, identity document, proof of address, proof of payment-method ownership, payment statement showing the relevant transaction, source-of-funds information, Steam Account or Trade URL details, or other information reasonably necessary for the stated purpose. We will seek only information that is proportionate to the review.</p>

      <h2>4.3 Sanctions and Restricted Use</h2>
      <p>You must not use ConSkins if you are subject to applicable sanctions, acting for a sanctioned person or entity, located in a jurisdiction where the service cannot lawfully be provided, or using the service to evade sanctions or financial restrictions. We may screen users and transactions against relevant sanctions information and may refuse, pause, restrict or terminate service where a sanctions concern exists.</p>

      <h2>4.4 Outcomes and Reviews</h2>
      <p>While a review is pending, we may place a payment, Balance, Order, refund or Account on hold. Failure to complete a reasonable request, provision of misleading information or confirmed high-risk activity may result in refusal of a transaction, cancellation of an undelivered Order, Account restriction or closure. We may be unable to explain detailed screening methods where doing so could compromise security, a legal obligation or an investigation.</p>

      <h2>4.5 Contact</h2>
      <p>If you believe a verification or restriction decision is incorrect, contact info@conskins.com with the relevant reference and supporting information. We will review the matter in accordance with the Complaints &amp; Dispute Resolution Policy.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
