import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Checkout Withdrawal Waiver — ConSkins" };

export default function WithdrawalWaiverPage() {
  return (
    <PolicyLayout title="Checkout Withdrawal Waiver" lastUpdated="24 August 2026">
      <p>Required checkout wording and implementation record for eligible EU/UK customers purchasing digital goods.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>A.1 Checkout Control</h2>
      <p>Before payment is completed, the checkout flow for EU/UK customers requesting immediate delivery of digital goods should present an unticked, required checkbox. The customer must actively select it before the order can proceed.</p>

      <h2>A.2 Checkbox Text</h2>
      <p>I understand that by purchasing digital goods and requesting immediate delivery, I waive my statutory right of withdrawal once delivery begins.</p>

      <h2>A.3 Recordkeeping and Consumer Rights</h2>
      <p>The checkout record should retain the wording shown, checkbox status, timestamp, Account identifier, Order reference and the confirmation delivered to the customer. This waiver applies only to the extent permitted by applicable law and does not affect remedies for digital content that is faulty, not as described, not delivered or otherwise subject to mandatory consumer protections.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
