import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Virtual Item & Service Risk Disclosure — ConSkins" };

export default function RiskDisclosurePage() {
  return (
    <PolicyLayout title="Virtual Item & Service Risk Disclosure" lastUpdated="24 August 2026">
      <p>Important information about Digital Items, Steam and service availability.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>9.1 Digital Items Are Not Financial Products</h2>
      <p>Digital Items may change in price, availability and transferability. They are not deposits, investments, savings products, securities or guaranteed stores of value. Past pricing, demand, rarity information, float, pattern or other item characteristics do not predict future value or liquidity.</p>

      <h2>9.2 Steam and Game Changes</h2>
      <p>Steam, Valve and game publishers may change game rules, item characteristics, inventory availability, trade rules, trade holds, account requirements or technical functionality. Those changes may affect the ability to receive, use or transfer a Digital Item. ConSkins does not control those systems and does not guarantee their continued availability.</p>

      <h2>9.3 Your Decisions</h2>
      <p>You are responsible for reviewing the item information displayed before placing an Order and for deciding whether a Digital Item is suitable for you. ConSkins does not provide investment, financial, tax or legal advice. Obtain independent advice where appropriate.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
