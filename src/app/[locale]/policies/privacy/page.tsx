import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Privacy Policy — ConSkins" };

export default function PrivacyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="24 August 2026">
      <p>How ConSkins collects, uses, shares, protects and retains personal data.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>6.1 Information We Collect</h2>
      <p>We may collect account and contact information, Steam Account identifiers and publicly available Steam profile or inventory information needed to provide the service, Trade URLs, transaction and Order records, payment-related information supplied by payment providers, support communications, verification information, device and log data, IP address, cookie data, fraud-risk indicators, and records of preferences or consents.</p>

      <h2>6.2 How We Use Information</h2>
      <p>We use personal data to provide and secure ConSkins; create and manage Accounts; process payments, Balance and Orders; deliver Digital Items through Steam; provide support; prevent fraud and abuse; carry out verification and sanctions checks; comply with legal obligations; improve the service; communicate important service information; and, where permitted, send marketing communications or use non-essential cookies based on your choices.</p>

      <h2>6.3 Legal Bases</h2>
      <p>Depending on the activity, we process personal data because it is necessary to perform our contract with you, comply with a legal obligation, pursue legitimate interests such as service security and fraud prevention, protect vital interests, or because you have given consent. Where we rely on legitimate interests, we consider your rights and use proportionate safeguards.</p>

      <h2>6.4 Sharing</h2>
      <p>We may share information with payment providers, Steam and related technical services, hosting and security providers, analytics or communications providers, verification and fraud-prevention providers, professional advisers, group or service providers where applicable, and competent authorities where required or permitted by law. We do not sell personal data. Providers may process data on our instructions or under their own privacy notices where they act independently, such as payment providers.</p>

      <h2>6.5 International Transfers</h2>
      <p>Your information may be processed in the United Kingdom, the European Economic Area or other countries where our providers operate. Where required, we will use an appropriate transfer mechanism and safeguards for international transfers.</p>

      <h2>6.6 Data Retention</h2>
      <p>We retain personal data only for as long as reasonably necessary for the purposes described in this Policy, including providing services, complying with legal obligations, resolving disputes and enforcing our agreements. Retention may be extended where a legal claim, regulatory review, fraud investigation or dispute remains open.</p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Retention period</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Temporary uploads and supporting files used solely for a verification, support request or specific case</td>
            <td>No longer than 30 days after the relevant verification, request or case is completed; automatically deleted thereafter unless a lawful exception applies.</td>
          </tr>
          <tr>
            <td>Residual copies of those temporary uploads in system backups</td>
            <td>Deleted or overwritten within a maximum of 30 additional days.</td>
          </tr>
          <tr>
            <td>Transaction, payment, Top-Up, Order, refund, delivery, accounting, fraud-prevention and dispute records</td>
            <td>Up to 6 years, or longer where required by law or necessary for an unresolved legal, regulatory, fraud or dispute-related matter.</td>
          </tr>
          <tr>
            <td>Account data</td>
            <td>While the Account remains active and, where reasonably necessary, up to 6 years after closure for legal claims, accounting, fraud prevention or dispute resolution.</td>
          </tr>
          <tr>
            <td>Security and access logs</td>
            <td>Normally up to 24 months, or longer where connected to an active fraud, security or legal matter.</td>
          </tr>
        </tbody>
      </table>

      <h2>6.7 Your Rights</h2>
      <p>Subject to applicable law, you may have rights to request access, correction, deletion, restriction, objection, portability or withdrawal of consent. You may also complain to the UK Information Commissioner’s Office or another competent authority. To make a request, email info@conskins.com. We may need to verify your identity before responding.</p>

      <h2>6.8 Security and Organisational Clients</h2>
      <p>We use reasonable technical and organisational measures designed to protect personal data. No internet transmission or storage system is completely secure. Where ConSkins provides services to an organisation and processes personal data on its behalf as a processor, an appropriate Data Processing Agreement may be made available on request where required by applicable data-protection law.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
