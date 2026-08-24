import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Complaints & Dispute Resolution Policy — ConSkins" };

export default function ComplaintsPage() {
  return (
    <PolicyLayout title="Complaints & Dispute Resolution Policy" lastUpdated="24 August 2026">
      <p>A clear route for complaints concerning payments, delivery, Accounts, privacy and service decisions.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>8.1 How to Submit a Complaint</h2>
      <p>Send a complaint to info@conskins.com with the subject “Complaint – [brief description or reference]”. Please use the email registered to your Account where possible. Include your name, Account email, Order or payment reference where relevant, a clear description of the issue, the outcome you seek and supporting evidence such as screenshots.</p>

      <h2>8.2 What We Will Do</h2>
      <p>We aim to acknowledge a complete complaint within 2 Business Days and provide a substantive response within 10 Business Days. Complex matters involving payment providers, Steam, verification, fraud or a Chargeback may require more time. If so, we will update you where reasonably practicable and explain the next steps.</p>

      <h2>8.3 Scope and Fair Handling</h2>
      <p>You may complain about an Account, payment, Balance, Order, delivery, refund, Trade Offer, security decision, verification, sanctions restriction, personal data or support experience. A genuine complaint will not itself lead to adverse treatment. We may still take proportionate action where the facts indicate fraud, unauthorised activity, a security risk or a breach of these Terms.</p>

      <h2>8.4 Review and Escalation</h2>
      <p>If you disagree with our final response, you may request an internal review by replying to it within 30 days and explaining why. This does not affect your statutory rights, your right to contact a competent regulator or your rights under a payment-provider agreement. ConSkins cannot overturn a decision independently made by Steam, a bank, card issuer or payment provider, but will review records within our control.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
