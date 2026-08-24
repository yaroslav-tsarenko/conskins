import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Cookie Policy — ConSkins" };

export default function CookiesPage() {
  return (
    <PolicyLayout title="Cookie Policy" lastUpdated="24 August 2026">
      <p>Information about cookies and similar technologies used on the ConSkins website.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>7.1 What Cookies Are</h2>
      <p>Cookies are small text files placed on your device. Similar technologies may also store or access information on your device. They help websites work, remember choices, measure performance and, where permitted, support analytics or marketing.</p>

      <h2>7.2 Categories We May Use</h2>
      <p>Strictly necessary cookies are used for core functions such as security, session management, fraud prevention, load balancing and remembering privacy choices. These may be used without consent where permitted. Preference cookies remember choices you make. Analytics cookies help us understand aggregate use and improve the service. Marketing cookies may help measure or deliver relevant advertising. We will seek consent before placing non-essential cookies where required.</p>

      <h2>7.3 Managing Choices</h2>
      <p>You can manage non-essential cookie choices through our cookie controls where available and through your browser settings. Blocking certain cookies may affect features such as login, security or service functionality. You can withdraw consent at any time through the same controls. For more on personal-data handling, see the Privacy Policy.</p>

      <h2>7.4 Third Parties</h2>
      <p>Third parties providing payment, security, analytics, communications or embedded services may set cookies or similar technologies in accordance with their own notices and your choices. The live cookie notice should identify the specific non-essential technologies used, their providers, purposes and duration before deployment.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
