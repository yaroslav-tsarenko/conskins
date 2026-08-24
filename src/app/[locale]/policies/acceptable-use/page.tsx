import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Acceptable Use, Fraud Prevention & Account Security Policy — ConSkins" };

export default function AcceptableUsePage() {
  return (
    <PolicyLayout
      title="Acceptable Use, Fraud Prevention & Account Security Policy"
      lastUpdated="24 August 2026"
    >
      <p>Rules that protect users, payments, Steam transfers and the service.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>5.1 Prohibited Conduct</h2>
      <p>You must not use ConSkins to commit or facilitate fraud, money laundering, sanctions evasion, phishing, impersonation, payment-card misuse, account takeover, use of stolen or compromised Steam Accounts, deceptive conduct, unlawful trade activity or any other unlawful act.</p>
      <p>You must not manipulate prices or availability, create sham activity, use multiple Accounts to bypass limits or verification, exploit errors, interfere with the service, introduce malware, scrape or use automated tools without written permission, circumvent security controls, submit false information, abuse refunds or Chargebacks, or attempt to obtain Digital Items or Balance without valid payment and authorisation.</p>

      <h2>5.2 Account Security</h2>
      <p>Use a unique strong password, protect access to your registered email and Steam Account, enable available Steam security features, and never disclose your password, Steam Guard code, mobile authenticator approval or payment security code. ConSkins will not ask you for a Steam password or authenticator code. Verify the website address and Trade Offer details before taking action.</p>

      <h2>5.3 Suspected Compromise</h2>
      <p>If you suspect unauthorised access, phishing, a wrong Trade Offer or unauthorised payment activity, contact info@conskins.com immediately and secure your email and Steam Account. We may take reasonable steps to protect the Account, including temporary restrictions. You remain responsible for losses arising from your failure to protect credentials except to the extent caused by our breach of applicable law or duty.</p>

      <h2>5.4 Enforcement</h2>
      <p>We may investigate suspected breaches and take proportionate action, including warnings, transaction cancellation, removal of Promotional Credit, reservation of Balance, suspension, closure, reporting to a payment provider or competent authority, and recovery of losses where permitted by law. We do not have to disclose internal fraud-prevention methods.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
