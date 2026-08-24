import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Digital Item Delivery & Steam Trade Policy — ConSkins" };

export default function ShippingPage() {
  return (
    <PolicyLayout title="Digital Item Delivery & Steam Trade Policy" lastUpdated="24 August 2026">
      <p>How Digital Items are processed and delivered through Steam Trade Offers.</p>

      <h2>Service Provider</h2>
      <p>ConSkins is operated by CONDEO LTD, company number 17225871, whose registered office is Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH. In this policy pack, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>
      <ContactBlock />

      <h2>3.1 Delivery Process</h2>
      <p>To receive a Digital Item, you must have an eligible linked Steam Account and a valid Steam Trade URL. After an Order is accepted, the purchase amount may be deducted or reserved from the Balance, the Order is processed, and a Steam Trade Offer is sent to the linked Steam Account. Delivery is complete only when Steam completes the transfer and the correct Digital Item appears in the linked Steam Inventory.</p>

      <h2>3.2 Your Steam Responsibilities</h2>
      <p>You are responsible for providing and maintaining the correct Trade URL; ensuring that the linked Steam Account belongs to and is controlled by you; enabling required Steam security features; keeping inventory visibility and trade settings suitable for delivery; and reviewing Trade Offers before acceptance. You must not link a stolen, compromised or unauthorised Steam Account.</p>

      <h2>3.3 Delivery Timing</h2>
      <p>Delivery is normally initiated shortly after an Order is accepted and may be completed within minutes. Processing and delivery can take up to 24 hours after the Order is accepted, your Steam details are validated, and any payment or security checks are completed. This timing is an estimate, not an absolute guarantee.</p>
      <p>Delivery may be delayed by Steam outages, trade holds, security restrictions, a wrong or invalid Trade URL, inventory settings, a pending review, a third-party technical issue, or Digital Item availability. If delivery cannot be completed within 24 hours, we may ask you to correct the issue, continue processing with your agreement, cancel the Order or restore the deducted amount to the Balance.</p>

      <h2>3.4 Review Before Acceptance</h2>
      <p>Before accepting a Trade Offer, verify the expected sender information, item name, exterior or wear category, StatTrak status, float, pattern, stickers and other characteristics expressly included in your Order, as applicable. A delivery Trade Offer should not ask you to transfer an item in return unless a different flow is expressly documented by ConSkins.</p>
      <p>If the offer is incorrect, suspicious or does not match the confirmed Order, do not accept it. Take screenshots and contact info@conskins.com promptly. Minor display differences caused by game updates, screen settings, images or compression do not make an item incorrect if it matches the confirmed Order.</p>

      <h2>3.5 Expired, Rejected or Failed Offers</h2>
      <p>A Trade Offer may expire, be rejected or fail because you do not accept it in time, Steam cancels it, an account becomes restricted, a security risk is detected or an item becomes unavailable. Depending on the circumstances, we may send a replacement offer, request confirmation of your Steam details, hold or cancel the Order, or restore the amount to the Balance. Repeated failure to accept valid offers may lead to additional verification or reasonable Account restrictions.</p>

      <h2>3.6 Steam Trade Restrictions and Reversals</h2>
      <p>Steam independently determines trade holds, bans, account restrictions, confirmation requirements and any trade-protection or reversal mechanism. We cannot remove or shorten them. If Steam reverses a completed trade or a related transaction is reversed, we may investigate, adjust records, reserve related Balance or take other proportionate steps necessary to address the result. Nothing in this policy prevents a mandatory consumer remedy.</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
