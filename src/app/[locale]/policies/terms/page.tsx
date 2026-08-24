import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Terms and Conditions — ConSkins" };

export default function TermsPage() {
  return (
    <PolicyLayout title="Terms and Conditions" lastUpdated="24 August 2026">
      <p>The main agreement governing access to ConSkins, the Account, Balance and Digital Item purchases.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>1.1 Acceptance and Scope</h2>
      <p>These Terms and Conditions govern your access to and use of conskins.com, your ConSkins Account, the ConSkins Balance, and Digital Items made available through the service. By creating an Account, adding funds, placing an Order or otherwise using ConSkins, you agree to these Terms and the policies identified below. If you do not agree, do not use the service.</p>
      <p>You must be at least 18 years old and legally capable of entering into this agreement. You must not use ConSkins where doing so would breach applicable law, Steam rules or a restriction imposed on you.</p>

      <h2>1.2 Key Definitions</h2>
      <p>“Account” means a registered ConSkins user account. “Balance” means internal account credit recorded by ConSkins for eligible purchases. “Cash-Funded Balance” means Balance added following a successful payment. “Promotional Credit” means a bonus, goodwill or other credit not paid for by you. “Digital Item” means a virtual in-game item capable of transfer through Steam. “Order” means a confirmed request to purchase a Digital Item using the Balance. “Steam Trade Offer” means an offer through Steam to transfer a Digital Item.</p>

      <h2>1.3 Account Rules</h2>
      <p>You must provide accurate registration information, keep your login credentials confidential and promptly notify us if you suspect unauthorised access. You may not create, control or use more than one Account without our written permission, use another person’s Account, or transfer an Account. We may require reasonable verification to protect Accounts, payments and users.</p>

      <h2>1.4 Balance and Orders</h2>
      <p>The Balance is internal account credit for eligible purchases through ConSkins only. It is not a bank account, deposit, investment, cryptocurrency or general payment instrument; it does not earn interest and cannot be transferred, sold, assigned or used outside ConSkins. Digital Items may be purchased only with available Balance.</p>
      <p>An Order is accepted only when ConSkins confirms it. We may decline, pause or cancel an Order before delivery where reasonably necessary to correct an obvious error, prevent fraud, comply with law, complete a verification review, address an unavailable item or protect the service. If we cancel an accepted but undelivered Order, the amount deducted for that Order will ordinarily be restored to the Balance, subject to the Billing, Refunds &amp; Chargebacks Policy.</p>

      <h2>1.5 Dedicated Policies</h2>
      <p>The following dedicated policies are incorporated into these Terms and should be read together with them:</p>
      <ul>
        <li>Billing, Refunds &amp; Chargebacks Policy: payments, Top-Ups, refunds, technical failures, disputes and payment reversals.</li>
        <li>Digital Item Delivery &amp; Steam Trade Policy: Steam requirements, Trade Offers, delivery, delays and failed delivery.</li>
        <li>KYC &amp; Sanctions Policy: verification, screening and service restrictions required for legal, security or fraud-prevention reasons.</li>
        <li>Acceptable Use, Fraud Prevention &amp; Account Security Policy: prohibited conduct, account safety and enforcement.</li>
        <li>Privacy Policy, Cookie Policy, Complaints &amp; Dispute Resolution Policy and Virtual Item &amp; Service Risk Disclosure.</li>
      </ul>

      <h2>1.6 Steam and Third Parties</h2>
      <p>Steam is operated by Valve Corporation. ConSkins is not endorsed by, affiliated with or sponsored by Valve or Steam. Steam independently controls its accounts, security features, Trade Offers, trade holds, restrictions, confirmations and any trade-protection or reversal mechanisms. You must comply with Steam’s rules. We cannot alter a Steam decision or guarantee that a Steam Account can trade at any time.</p>

      <h2>1.7 Intellectual Property</h2>
      <p>ConSkins and its content, except third-party marks and materials, are protected by applicable intellectual-property laws. You receive a limited, revocable, non-transferable right to use the service for its intended personal purpose. You may not copy, modify, reverse engineer, scrape, frame, distribute or exploit the service except where mandatory law permits it.</p>

      <h2>1.8 Suspension and Termination</h2>
      <p>We may restrict, suspend or close an Account, cancel a pending Order or reserve Balance where we reasonably believe this is necessary because of a breach of these Terms, fraud, a compromised Account, an unauthorised payment, sanctions concerns, an unresolved Chargeback, a Steam-related risk or a legal obligation. We will act proportionately where appropriate, but may not disclose security-sensitive details. You may request Account closure through the contact channel in the Billing, Refunds &amp; Chargebacks Policy.</p>

      <h2>1.9 Disclaimers and Liability</h2>
      <p>We use reasonable care and skill in providing ConSkins, but availability, item information, pricing, inventory, third-party integrations and Steam functionality may change or be interrupted. Nothing in these Terms excludes or limits liability that cannot lawfully be excluded, including liability for fraud or fraudulent misrepresentation, death or personal injury caused by negligence, or mandatory consumer rights.</p>
      <p>Subject to the preceding sentence, ConSkins is not liable for indirect or consequential loss, loss arising from your breach of Steam rules, a third-party decision, an incorrect Trade URL supplied by you, your failure to secure your Account, or price changes after delivery. Our aggregate liability arising from a particular Order will not exceed the amount paid to ConSkins for that Order, except where applicable law requires otherwise.</p>

      <h2>1.10 Changes, Governing Law and Contact</h2>
      <p>We may update these Terms where reasonably necessary for legal, security, operational or product reasons. Material changes will be published before they take effect where practicable. These Terms are governed by the laws of England and Wales, except that a consumer may retain mandatory protections of the law of their country of habitual residence. Courts of England and Wales have non-exclusive jurisdiction. Contact us at info@conskins.com.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
