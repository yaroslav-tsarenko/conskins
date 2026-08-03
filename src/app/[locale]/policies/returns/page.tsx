import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Refund, Cancellation & Failed Delivery Policy — ConSkins" };

export default function RefundsPolicyPage() {
  return (
    <PolicyLayout title="Refund, Cancellation & Failed Delivery Policy" lastUpdated="31 July 2026">
      <h2>1. Purpose of This Policy</h2>
      <p>This Refund, Cancellation & Failed Delivery Policy explains:</p>
      <ul>
        <li>when an Order may be cancelled;</li>
        <li>when a refund may be issued to the ConSkins Balance;</li>
        <li>when a monetary refund may be returned to the original payment method;</li>
        <li>what happens if a Digital Item cannot be delivered;</li>
        <li>how incorrect or materially misdescribed Digital Items are handled;</li>
        <li>how duplicate, failed or unauthorised payments are handled;</li>
        <li>how Steam Trade Protection and trade reversals affect refunds;</li>
        <li>how refund requests are submitted and reviewed; and</li>
        <li>how mandatory consumer rights are protected.</li>
      </ul>
      <p>This Policy forms part of the ConSkins Terms and Conditions.</p>

      <h2>2. Service Provider</h2>
      <p>The ConSkins service is operated by:</p>
      <ContactBlock />
      <p>In this Policy, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>

      <h2>3. Definitions</h2>
      <p>For the purposes of this Policy:</p>
      <ul>
        <li>“Account” means a registered ConSkins user account;</li>
        <li>“Balance” or “ConSkins Balance” means the internal account credit available for eligible purchases through ConSkins;</li>
        <li>“Cash-Funded Balance” means Balance added through a successfully completed payment by the User;</li>
        <li>“Promotional Balance” means any bonus, complimentary, promotional or goodwill credit not funded by a payment from the User;</li>
        <li>“Digital Item” means a virtual in-game item available through ConSkins and capable of being transferred through Steam;</li>
        <li>“Order” means a confirmed request to purchase a Digital Item using the ConSkins Balance;</li>
        <li>“Payment Method” means a payment card or another payment method made available through the ConSkins payment interface;</li>
        <li>“Payment Provider” means an independent third party used to process payments, authentication, refunds and related payment services;</li>
        <li>“Steam” means the service operated by Valve Corporation;</li>
        <li>“Steam Account” means the Steam account linked to the User’s ConSkins Account;</li>
        <li>“Steam Trade Offer” or “Trade Offer” means an offer through Steam to transfer a Digital Item;</li>
        <li>“Top-Up” means a payment made to add Cash-Funded Balance to an Account;</li>
        <li>“User”, “you” and “your” mean the individual using ConSkins.</li>
      </ul>

      <h2>4. General Refund Principles</h2>
      <p>ConSkins distinguishes between:</p>
      <ul>
        <li>a refund of an unsuccessful or cancelled Digital Item Order to the ConSkins Balance;</li>
        <li>a reversal or refund of the original Top-Up to the original Payment Method;</li>
        <li>a monetary refund required by applicable law; and</li>
        <li>the return of eligible unused Cash-Funded Balance when an Account is permanently closed.</li>
      </ul>
      <p>Where an Order cannot be completed, the amount deducted for that Order will ordinarily be restored to the ConSkins Balance.</p>
      <p>Restoring an Order amount to the Balance does not automatically reverse the original Top-Up transaction.</p>
      <p>A monetary refund will be made where:</p>
      <ul>
        <li>the original Top-Up was duplicated or incorrectly processed;</li>
        <li>an unauthorised payment is confirmed;</li>
        <li>an eligible unused Cash-Funded Balance is returned following permanent Account closure;</li>
        <li>ConSkins expressly agrees to a monetary refund;</li>
        <li>the Payment Provider requires a reversal; or</li>
        <li>applicable law requires the refund to be returned in money.</li>
      </ul>
      <p>Nothing in this Policy limits a right or remedy that cannot lawfully be excluded.</p>

      <h2>5. Immediate Supply of Digital Items</h2>
      <p>Digital Items are supplied electronically through Steam Trade Offers.</p>
      <p>At checkout, the User may be asked to:</p>
      <ul>
        <li>expressly request that delivery begins immediately; and</li>
        <li>acknowledge that the ordinary statutory right to cancel may be lost once supply of the Digital Item begins or is completed.</li>
      </ul>
      <p>Where legally required, these confirmations will be obtained separately from general acceptance of the Terms and Conditions.</p>
      <p>If the required consent or acknowledgement has not been validly obtained, the User will retain any cancellation rights provided by applicable law.</p>
      <p>Consent to immediate supply does not remove rights relating to:</p>
      <ul>
        <li>non-delivery;</li>
        <li>incorrect delivery;</li>
        <li>materially misdescribed Digital Items;</li>
        <li>unauthorised payments;</li>
        <li>defective performance;</li>
        <li>lack of legal authority to supply the Digital Item; or</li>
        <li>another matter protected by mandatory law.</li>
      </ul>

      <h2>6. Cancellation Before an Order Is Accepted</h2>
      <p>A User may attempt to cancel an Order before it has been accepted and processing has begun.</p>
      <p>A cancellation request should be submitted immediately through any available Account function or by emailing:</p>
      <p>info@conskins.com</p>
      <p>An Order is not guaranteed to be cancellable merely because a request was submitted.</p>
      <p>A cancellation may no longer be possible if:</p>
      <ul>
        <li>the Order has already been accepted;</li>
        <li>the purchase amount has been deducted or reserved;</li>
        <li>fulfilment processing has begun;</li>
        <li>a Steam Trade Offer has been created;</li>
        <li>the Digital Item has been reserved or transferred;</li>
        <li>delivery has been completed; or</li>
        <li>cancellation would no longer be technically possible.</li>
      </ul>
      <p>If an Order is successfully cancelled before delivery, the full amount deducted for that Order will be restored to the ConSkins Balance.</p>

      <h2>7. Cancellation After Processing Has Begun</h2>
      <p>Once processing has begun, ConSkins may be unable to cancel the Order.</p>
      <p>Where cancellation remains technically possible, ConSkins may:</p>
      <ul>
        <li>stop the pending delivery;</li>
        <li>withdraw an unaccepted Trade Offer;</li>
        <li>cancel the Order; and</li>
        <li>restore the full deducted amount to the ConSkins Balance.</li>
      </ul>
      <p>Where a valid Trade Offer has already been accepted and the correct Digital Item has been transferred, the Order will generally be treated as completed.</p>
      <p>A completed Order is not ordinarily cancellable merely because the User changed their mind.</p>

      <h2>8. Change-of-Mind Requests</h2>
      <p>Once the correct Digital Item has been successfully delivered, ConSkins does not ordinarily provide a refund or cancellation merely because:</p>
      <ul>
        <li>the User changed their mind;</li>
        <li>the User no longer wants the Digital Item;</li>
        <li>the User selected the wrong item;</li>
        <li>the User did not sufficiently review the item information;</li>
        <li>the User found a lower price elsewhere;</li>
        <li>the market value increased or decreased;</li>
        <li>the User dislikes the appearance after delivery;</li>
        <li>the User’s personal circumstances changed;</li>
        <li>the User can no longer use the relevant Steam Account;</li>
        <li>the User transferred, modified, consumed or otherwise used the Digital Item; or</li>
        <li>the User’s Steam Account was subsequently restricted.</li>
      </ul>
      <p>This limitation applies only to the extent permitted by law and does not affect remedies for non-delivery, incorrect delivery or lack of conformity with the confirmed Order.</p>

      <h2>9. Failed Delivery</h2>
      <p>Delivery is considered unsuccessful where:</p>
      <ul>
        <li>no Digital Item was transferred to the linked Steam Account;</li>
        <li>a Trade Offer could not be created;</li>
        <li>the Digital Item became permanently unavailable;</li>
        <li>the Order was cancelled before completed delivery;</li>
        <li>Steam permanently prevented the transfer;</li>
        <li>the Trade Offer repeatedly failed for reasons not caused by the User;</li>
        <li>a technical failure prevented fulfilment;</li>
        <li>the relevant inventory became unavailable;</li>
        <li>the Digital Item could not lawfully or technically be supplied; or</li>
        <li>ConSkins otherwise determines that the Order cannot reasonably be completed.</li>
      </ul>
      <p>Where delivery fails, ConSkins will ordinarily:</p>
      <ul>
        <li>cancel the Order;</li>
        <li>release any reserved Balance; or</li>
        <li>restore the full amount deducted for the Order to the ConSkins Balance.</li>
      </ul>
      <p>No ConSkins cancellation fee will be deducted from a refund for an Order that could not be supplied.</p>

      <h2>10. Delivery Timeframe</h2>
      <p>Delivery is normally initiated shortly after Order acceptance and may often be completed within several minutes.</p>
      <p>However, processing and delivery may take up to 24 hours after:</p>
      <ul>
        <li>the Order has been accepted;</li>
        <li>sufficient Balance has been deducted or reserved;</li>
        <li>the Steam details have been validated; and</li>
        <li>any required payment, identity or security checks have been completed.</li>
      </ul>
      <p>A delay within this timeframe does not by itself create an immediate refund right.</p>
      <p>If delivery cannot be completed within 24 hours, ConSkins may:</p>
      <ul>
        <li>continue processing with the User’s agreement;</li>
        <li>ask the User to correct a Steam-related issue;</li>
        <li>attempt delivery again;</li>
        <li>cancel the Order; or</li>
        <li>restore the full purchase amount to the Balance.</li>
      </ul>
      <p>ConSkins will not keep an Order pending indefinitely without delivery, cancellation or another appropriate resolution.</p>

      <h2>11. Digital Item Becomes Unavailable</h2>
      <p>Digital Item availability may change before delivery.</p>
      <p>An item may become unavailable because:</p>
      <ul>
        <li>it was transferred through another transaction;</li>
        <li>the source inventory changed;</li>
        <li>Steam imposed a restriction;</li>
        <li>a third-party integration returned delayed information;</li>
        <li>the item was removed or modified;</li>
        <li>a technical error occurred; or</li>
        <li>fulfilment became impossible.</li>
      </ul>
      <p>If the selected Digital Item becomes unavailable after Order acceptance, ConSkins may:</p>
      <ul>
        <li>cancel the Order and restore the full purchase amount to the Balance; or</li>
        <li>offer an alternative Digital Item.</li>
      </ul>
      <p>An alternative will not be supplied without the User’s agreement where it materially differs from the confirmed Order.</p>
      <p>The User is not required to accept a substitute.</p>

      <h2>12. Incorrect Digital Item Before Acceptance</h2>
      <p>The User must review every Steam Trade Offer before accepting it.</p>
      <p>If the Trade Offer contains a Digital Item that materially differs from the confirmed Order, the User should:</p>
      <ul>
        <li>not accept the Trade Offer;</li>
        <li>take screenshots of the Trade Offer;</li>
        <li>retain the Order details;</li>
        <li>contact info@conskins.com promptly; and</li>
        <li>follow reasonable support instructions.</li>
      </ul>
      <p>ConSkins may:</p>
      <ul>
        <li>withdraw the incorrect Trade Offer;</li>
        <li>send a corrected Trade Offer;</li>
        <li>replace the Digital Item with the correct item;</li>
        <li>cancel the Order; or</li>
        <li>restore the full purchase amount to the Balance.</li>
      </ul>

      <h2>13. Incorrect Digital Item Accepted by the User</h2>
      <p>If the User accepts an incorrect Digital Item before noticing the discrepancy, the User must contact ConSkins as soon as reasonably possible.</p>
      <p>The User should not:</p>
      <ul>
        <li>transfer the item to another Steam Account;</li>
        <li>sell or exchange the item;</li>
        <li>modify it;</li>
        <li>apply or remove stickers;</li>
        <li>rename it;</li>
        <li>use it in a trade-up contract;</li>
        <li>initiate an unrelated Steam transfer; or</li>
        <li>otherwise make recovery more difficult.</li>
      </ul>
      <p>ConSkins may request that the item be returned through a verified Steam Trade Offer before:</p>
      <ul>
        <li>delivering the correct item;</li>
        <li>restoring the purchase amount to the Balance; or</li>
        <li>providing another appropriate remedy.</li>
      </ul>
      <p>Accepting an incorrect item does not automatically remove mandatory consumer rights.</p>
      <p>However, a remedy may be affected where the User knowingly transferred, altered or disposed of the item after becoming aware of the discrepancy.</p>

      <h2>14. Materially Misdescribed Digital Item</h2>
      <p>A Digital Item may be materially misdescribed where it differs from a characteristic expressly included in the confirmed Order, such as:</p>
      <ul>
        <li>item type;</li>
        <li>exterior or wear category;</li>
        <li>StatTrak status;</li>
        <li>a specific float value or range;</li>
        <li>a specific pattern or paint seed;</li>
        <li>an expressly identified sticker configuration;</li>
        <li>a name tag expressly included in the Order; or</li>
        <li>another unique characteristic forming part of the confirmed description.</li>
      </ul>
      <p>Minor differences caused by:</p>
      <ul>
        <li>screen settings;</li>
        <li>display resolution;</li>
        <li>image compression;</li>
        <li>game lighting;</li>
        <li>Steam rendering;</li>
        <li>illustrative catalogue images;</li>
        <li>minor rounding of values; or</li>
        <li>later game updates</li>
      </ul>
      <p>will not ordinarily make a Digital Item materially misdescribed where the underlying item corresponds to the confirmed Order.</p>
      <p>Where an item is materially misdescribed, ConSkins may provide:</p>
      <ul>
        <li>correction or replacement;</li>
        <li>cancellation of the Order;</li>
        <li>restoration of the purchase amount to the Balance;</li>
        <li>an appropriate price adjustment; or</li>
        <li>another remedy required by law.</li>
      </ul>

      <h2>15. User-Caused Delivery Failure</h2>
      <p>Delivery may fail because the User:</p>
      <ul>
        <li>supplied an incorrect Steam Trade URL;</li>
        <li>linked the wrong Steam Account;</li>
        <li>failed to enable required Steam security features;</li>
        <li>had a trade ban, hold, lock or cooldown;</li>
        <li>failed to accept a valid Trade Offer;</li>
        <li>declined the correct Trade Offer;</li>
        <li>changed the Trade URL during processing;</li>
        <li>made the Steam Inventory inaccessible;</li>
        <li>lost access to the linked Steam Account;</li>
        <li>failed to complete required verification; or</li>
        <li>otherwise prevented delivery.</li>
      </ul>
      <p>Where reasonably possible, ConSkins will allow the User to correct the issue.</p>
      <p>ConSkins may:</p>
      <ul>
        <li>attempt delivery again;</li>
        <li>request updated Steam details;</li>
        <li>keep the Order pending for a reasonable period;</li>
        <li>withdraw and replace the Trade Offer;</li>
        <li>cancel the Order; or</li>
        <li>restore the purchase amount to the Balance.</li>
      </ul>
      <p>A User will not lose valid Cash-Funded Balance solely because of an ordinary correctable delivery issue.</p>
      <p>However, ConSkins may not be able to recover or refund a Digital Item successfully transferred to an incorrect Steam Account where the User supplied and confirmed the wrong Trade URL.</p>

      <h2>16. Failure to Accept a Trade Offer</h2>
      <p>A Steam Trade Offer may expire if it is not accepted within the applicable period.</p>
      <p>Where the User fails to accept a valid Trade Offer, ConSkins may:</p>
      <ul>
        <li>send another Trade Offer;</li>
        <li>ask the User to confirm their Steam details;</li>
        <li>place the Order on hold;</li>
        <li>cancel the Order; or</li>
        <li>restore the purchase amount to the Balance.</li>
      </ul>
      <p>Repeated failure to accept valid Trade Offers may result in:</p>
      <ul>
        <li>additional verification;</li>
        <li>temporary purchasing restrictions;</li>
        <li>delayed processing;</li>
        <li>withdrawal of pending offers; or</li>
        <li>Account suspension where abuse is reasonably suspected.</li>
      </ul>

      <h2>17. Steam Holds and Restrictions</h2>
      <p>Steam may impose:</p>
      <ul>
        <li>trade holds;</li>
        <li>trade cooldowns;</li>
        <li>Steam Guard requirements;</li>
        <li>device or password-related restrictions;</li>
        <li>account limitations;</li>
        <li>confirmation requirements;</li>
        <li>temporary or permanent trade bans;</li>
        <li>protected-item restrictions; or</li>
        <li>other transfer limitations.</li>
      </ul>
      <p>These restrictions are controlled by Steam and may change without notice.</p>
      <p>ConSkins cannot remove, shorten or override a Steam restriction.</p>
      <p>If a Steam restriction prevents delivery, ConSkins may:</p>
      <ul>
        <li>wait for a reasonable period;</li>
        <li>ask the User to resolve the issue;</li>
        <li>attempt delivery after the restriction ends;</li>
        <li>cancel the Order; or</li>
        <li>restore the amount to the Balance.</li>
      </ul>
      <p>A Steam restriction affecting the User’s Account does not automatically entitle the User to a monetary refund of the original Top-Up.</p>

      <h2>18. Steam Trade Protection</h2>
      <p>Steam may designate certain Digital Items or completed transfers as protected for a period determined by Steam.</p>
      <p>During that period, Steam may permit eligible trades to be reversed through Steam’s own systems.</p>
      <p>Steam Trade Protection is separate from the ConSkins refund process.</p>
      <p>ConSkins does not control:</p>
      <ul>
        <li>which Digital Items receive protection;</li>
        <li>the length of the protection period;</li>
        <li>whether a reversal is permitted;</li>
        <li>whether Steam approves a reversal;</li>
        <li>the consequences imposed by Steam; or</li>
        <li>later changes to the protection mechanism.</li>
      </ul>
      <p>The fact that an item remains trade-protected or temporarily restricted after delivery does not by itself mean that delivery failed.</p>

      <h2>19. Steam Trade Reversals</h2>
      <p>If the correct Digital Item was delivered and the User later initiates or participates in a Steam reversal:</p>
      <ul>
        <li>the original Order does not automatically qualify for a refund;</li>
        <li>ConSkins may investigate the transaction;</li>
        <li>the Account and remaining Balance may be temporarily restricted;</li>
        <li>pending Orders may be cancelled;</li>
        <li>related Balance adjustments may be reversed;</li>
        <li>the User may be asked to provide evidence of account compromise; and</li>
        <li>ConSkins may take reasonable steps to prevent the User from retaining both the item value and the refunded amount.</li>
      </ul>
      <p>The User must not use Steam Trade Protection to:</p>
      <ul>
        <li>recover the Digital Item while also seeking a refund;</li>
        <li>obtain both the Digital Item and the purchase value;</li>
        <li>reverse a valid delivery because the market value changed;</li>
        <li>avoid an authorised purchase;</li>
        <li>support a fraudulent Chargeback; or</li>
        <li>obtain another unfair financial benefit.</li>
      </ul>
      <p>Where the reversal resulted from genuine unauthorised access, phishing or Steam Account compromise, the User should:</p>
      <ul>
        <li>secure the Steam Account;</li>
        <li>contact Steam Support;</li>
        <li>notify ConSkins promptly;</li>
        <li>provide available supporting evidence; and</li>
        <li>cooperate with the investigation.</li>
      </ul>
      <p>Each case will be assessed individually.</p>

      <h2>20. Duplicate Delivery</h2>
      <p>If a technical error causes the User to receive more Digital Items than were purchased, the User must notify ConSkins promptly.</p>
      <p>The User must not knowingly:</p>
      <ul>
        <li>sell the additional item;</li>
        <li>transfer it;</li>
        <li>use or modify it;</li>
        <li>conceal it;</li>
        <li>initiate a reversal involving it; or</li>
        <li>otherwise prevent reasonable recovery.</li>
      </ul>
      <p>ConSkins may request return of the additional Digital Item through a verified Steam Trade Offer.</p>
      <p>ConSkins will not ask the User to return an item through an unofficial website, unknown social media account or unverified support contact.</p>

      <h2>21. Duplicate Top-Up</h2>
      <p>If the same Top-Up appears to have been charged more than once, the User should contact:</p>
      <p>info@conskins.com</p>
      <p>The request should include:</p>
      <ul>
        <li>the registered Account email;</li>
        <li>the payment date;</li>
        <li>the amount;</li>
        <li>the transaction references;</li>
        <li>the last digits of the payment card, where applicable; and</li>
        <li>relevant bank or Payment Provider evidence.</li>
      </ul>
      <p>ConSkins will investigate whether:</p>
      <ul>
        <li>multiple payment requests were submitted;</li>
        <li>multiple completed payments were received;</li>
        <li>one transaction is only a temporary authorisation;</li>
        <li>the Balance was credited more than once; or</li>
        <li>a genuine duplicate payment occurred.</li>
      </ul>
      <p>Where a duplicate payment is confirmed, the duplicate amount will ordinarily be returned to the original Payment Method.</p>
      <p>The amount may remain as ConSkins Balance only where the User expressly agrees.</p>

      <h2>22. Missing Balance After a Top-Up</h2>
      <p>If a payment appears completed but the corresponding Balance has not been credited, the User should contact support.</p>
      <p>ConSkins may request:</p>
      <ul>
        <li>the payment reference;</li>
        <li>the date and amount;</li>
        <li>the payment status;</li>
        <li>limited Payment Method information; and</li>
        <li>confirmation from the Payment Provider.</li>
      </ul>
      <p>Where ConSkins confirms that:</p>
      <ul>
        <li>the payment was received but Balance was not credited, the Balance will be corrected or the payment refunded;</li>
        <li>the payment failed, no Balance will be credited;</li>
        <li>the payment remains pending, the User may be asked to wait for the final status; or</li>
        <li>the payment was reversed, related provisional Balance may be removed.</li>
      </ul>
      <p>A pending bank authorisation does not necessarily mean that ConSkins received the funds.</p>

      <h2>23. Unauthorised Payments</h2>
      <p>A User who believes that a Payment Method was used without permission should:</p>
      <ul>
        <li>contact the bank, card issuer or Payment Provider promptly;</li>
        <li>secure the relevant payment account;</li>
        <li>change the ConSkins Account password;</li>
        <li>secure the registered email account;</li>
        <li>notify ConSkins at info@conskins.com; and</li>
        <li>provide reasonable information required for the investigation.</li>
      </ul>
      <p>ConSkins may temporarily restrict the Account and Balance while the matter is reviewed.</p>
      <p>A report of unauthorised payment does not automatically establish that the transaction was unauthorised.</p>
      <p>ConSkins may review:</p>
      <ul>
        <li>authentication results;</li>
        <li>payment records;</li>
        <li>Account access records;</li>
        <li>device and security information;</li>
        <li>Order history;</li>
        <li>Steam delivery records;</li>
        <li>communications; and</li>
        <li>other relevant evidence.</li>
      </ul>
      <p>Where an unauthorised payment is confirmed, ConSkins will cooperate with the Payment Provider and provide the remedy required by applicable law.</p>

      <h2>24. Promotional Balance</h2>
      <p>Promotional Balance is not ordinarily refundable in money.</p>
      <p>Where an Order funded partly or entirely with Promotional Balance fails, ConSkins may restore the relevant Promotional Balance subject to:</p>
      <ul>
        <li>the applicable promotion terms;</li>
        <li>the original expiry date;</li>
        <li>eligibility requirements;</li>
        <li>fraud-prevention restrictions; and</li>
        <li>applicable law.</li>
      </ul>
      <p>Promotional Balance may be cancelled where it was obtained through:</p>
      <ul>
        <li>fraud;</li>
        <li>multiple-Account abuse;</li>
        <li>technical error;</li>
        <li>breach of promotion conditions; or</li>
        <li>another misuse of the Service.</li>
      </ul>
      <p>Promotional Balance will not be included in a monetary Account closure refund unless expressly stated or required by law.</p>

      <h2>25. Refunds to the ConSkins Balance</h2>
      <p>A refund will ordinarily be credited to the ConSkins Balance where:</p>
      <ul>
        <li>an Order is cancelled before delivery;</li>
        <li>the Digital Item becomes unavailable;</li>
        <li>delivery fails;</li>
        <li>an incorrect Trade Offer is withdrawn;</li>
        <li>a technical error prevents fulfilment;</li>
        <li>the Order cannot be completed within a reasonable period;</li>
        <li>ConSkins agrees to cancel the Order; or</li>
        <li>another Order-specific remedy is appropriate.</li>
      </ul>
      <p>The Balance refund will ordinarily equal the full amount deducted for the affected Order.</p>
      <p>Because displayed prices include ConSkins fees and applicable VAT or taxes, the full amount deducted for an unfulfilled Order will be restored.</p>
      <p>A Balance refund may be used for another eligible purchase through ConSkins.</p>

      <h2>26. Monetary Refunds</h2>
      <p>A monetary refund may be returned to the original Payment Method where:</p>
      <ul>
        <li>a Top-Up was duplicated;</li>
        <li>a Top-Up was incorrectly processed;</li>
        <li>the Balance was not credited and the payment should be reversed;</li>
        <li>an unauthorised payment is confirmed;</li>
        <li>the Payment Provider requires a reversal;</li>
        <li>eligible unused Cash-Funded Balance is returned following Account closure;</li>
        <li>ConSkins expressly approves a monetary refund; or</li>
        <li>applicable law requires a refund in money.</li>
      </ul>
      <p>Where applicable law requires a monetary refund, ConSkins will not substitute it with internal Balance or Promotional Balance without the User’s valid agreement.</p>
      <p>A monetary refund will ordinarily be made through the same Payment Method used for the original transaction unless:</p>
      <ul>
        <li>the User expressly agrees to another lawful method;</li>
        <li>the original Payment Method is no longer available;</li>
        <li>the Payment Provider requires another process; or</li>
        <li>applicable law permits another method.</li>
      </ul>

      <h2>27. Refund Amount</h2>
      <p>A refund for an unfulfilled Order will ordinarily equal the amount deducted from the Balance for that Order.</p>
      <p>A monetary refund will not exceed the amount actually and successfully paid by the User for the relevant transaction.</p>
      <p>ConSkins may deduct or exclude only amounts that:</p>
      <ul>
        <li>were not successfully paid;</li>
        <li>were already refunded;</li>
        <li>represent Promotional Balance;</li>
        <li>were reversed or charged back;</li>
        <li>were used for successfully delivered Digital Items;</li>
        <li>were obtained through fraud or error; or</li>
        <li>may lawfully be withheld.</li>
      </ul>
      <p>ConSkins will not impose a separate refund fee where the Order failed because the Digital Item could not be supplied.</p>
      <p>External currency conversion differences or bank charges may be outside ConSkins’ control.</p>

      <h2>28. Refund Processing Time</h2>
      <p>Balance refunds will be credited without undue delay after ConSkins confirms that the Order qualifies for a refund.</p>
      <p>Approved monetary refunds will be initiated without undue delay.</p>
      <p>Where applicable law sets a specific deadline, ConSkins will process the refund within that deadline.</p>
      <p>After ConSkins initiates a monetary refund, the time required for it to appear may depend on:</p>
      <ul>
        <li>the Payment Provider;</li>
        <li>the card issuer;</li>
        <li>the User’s bank;</li>
        <li>the payment network;</li>
        <li>weekends and public holidays;</li>
        <li>currency conversion; and</li>
        <li>additional bank verification.</li>
      </ul>
      <p>ConSkins cannot guarantee the exact date on which an external financial institution will display the returned funds.</p>

      <h2>29. Account Closure Refunds</h2>
      <p>A User may request permanent Account closure by emailing:</p>
      <p>info@conskins.com</p>
      <p>The request should be sent from the email address registered to the Account.</p>
      <p>Before completing closure and refunding the eligible unused Cash-Funded Balance, ConSkins may require:</p>
      <ul>
        <li>confirmation of Account ownership;</li>
        <li>identity verification;</li>
        <li>confirmation of Payment Method ownership;</li>
        <li>completion or cancellation of active Orders;</li>
        <li>resolution of pending Steam Trade Offers;</li>
        <li>resolution of payment disputes or Chargebacks;</li>
        <li>correction of a negative Balance;</li>
        <li>completion of fraud or compliance checks; and</li>
        <li>information reasonably required to process the refund.</li>
      </ul>
      <p>Subject to those checks, eligible unused Cash-Funded Balance will be returned to the original Payment Method.</p>
      <p>Where the Balance was funded through multiple Top-Ups, the refund may be allocated between the corresponding original transactions.</p>

      <h2>30. Amounts Excluded from an Account Closure Refund</h2>
      <p>The following are not ordinarily refundable in money when an Account is closed:</p>
      <ul>
        <li>Promotional Balance;</li>
        <li>complimentary or goodwill credits;</li>
        <li>amounts already spent on successfully delivered Digital Items;</li>
        <li>Balance created by a failed or unpaid Top-Up;</li>
        <li>amounts resulting from a reversed payment;</li>
        <li>amounts subject to an unresolved Chargeback;</li>
        <li>amounts associated with suspected fraud;</li>
        <li>amounts owed to ConSkins because of a negative Balance;</li>
        <li>amounts that have already been refunded; and</li>
        <li>amounts ConSkins is legally required to restrict or withhold.</li>
      </ul>
      <p>ConSkins will not confiscate valid unused Cash-Funded Balance solely because the User requested Account closure.</p>

      <h2>31. Original Payment Method Unavailable</h2>
      <p>If the original Payment Method is no longer available, expired or closed, the User should inform ConSkins.</p>
      <p>ConSkins may request additional verification before arranging an alternative refund.</p>
      <p>Depending on the Payment Provider and applicable law, ConSkins may:</p>
      <ul>
        <li>attempt the refund to the original Payment Method;</li>
        <li>request updated payment information;</li>
        <li>use another verified method belonging to the same User; or</li>
        <li>follow another process required by the Payment Provider.</li>
      </ul>
      <p>ConSkins will not send a refund to an unrelated third party.</p>

      <h2>32. Refund Requests</h2>
      <p>Refund and cancellation requests should be sent to:</p>
      <p>info@conskins.com</p>
      <p>The request should include, where applicable:</p>
      <ul>
        <li>the registered Account email;</li>
        <li>the Order number;</li>
        <li>the payment or Top-Up reference;</li>
        <li>the date and amount;</li>
        <li>the Digital Item concerned;</li>
        <li>the linked Steam profile or Steam ID;</li>
        <li>the Steam Trade Offer reference;</li>
        <li>a clear description of the issue;</li>
        <li>screenshots or screen recordings; and</li>
        <li>the requested resolution.</li>
      </ul>
      <p>The User should submit the request as soon as reasonably possible after discovering the issue.</p>
      <p>Delay may make it more difficult to recover a Digital Item, inspect an expired Trade Offer or verify technical information.</p>

      <h2>33. Evidence and Investigation</h2>
      <p>ConSkins may review:</p>
      <ul>
        <li>Account records;</li>
        <li>Top-Up and payment records;</li>
        <li>Order details;</li>
        <li>the confirmed Digital Item description;</li>
        <li>Steam Trade Offer records;</li>
        <li>delivery timestamps;</li>
        <li>Steam Account and Trade URL information;</li>
        <li>authentication results;</li>
        <li>device and security logs;</li>
        <li>communications;</li>
        <li>screenshots;</li>
        <li>information from fulfilment or technology providers; and</li>
        <li>relevant Payment Provider records.</li>
      </ul>
      <p>ConSkins may request additional information where reasonably necessary.</p>
      <p>The User must not knowingly:</p>
      <ul>
        <li>submit false evidence;</li>
        <li>alter screenshots;</li>
        <li>conceal relevant transactions;</li>
        <li>delete relevant communications;</li>
        <li>misrepresent Trade Offer contents; or</li>
        <li>claim non-delivery after receiving the Digital Item.</li>
      </ul>

      <h2>34. Refund Decision</h2>
      <p>After investigation, ConSkins may:</p>
      <ul>
        <li>approve a full refund to the Balance;</li>
        <li>approve a partial price adjustment where appropriate;</li>
        <li>approve a monetary refund;</li>
        <li>resend a Trade Offer;</li>
        <li>arrange delivery of the correct Digital Item;</li>
        <li>request return of an incorrectly delivered item;</li>
        <li>reject an unsupported request;</li>
        <li>restrict the Account while further review continues; or</li>
        <li>take action concerning suspected fraud or abuse.</li>
      </ul>
      <p>Where a request is rejected, ConSkins will provide a general explanation where reasonably possible.</p>
      <p>Detailed security or fraud-detection criteria may be withheld where disclosure could compromise controls, prejudice an investigation or breach legal obligations.</p>

      <h2>35. No Double Recovery</h2>
      <p>A User is not entitled to receive or retain more than one remedy for the same loss.</p>
      <p>The User must not knowingly retain:</p>
      <ul>
        <li>the Digital Item and a full refund;</li>
        <li>the original Digital Item and a replacement;</li>
        <li>a Balance refund and a monetary refund for the same amount;</li>
        <li>a Payment Provider reversal and an additional ConSkins refund; or</li>
        <li>a Steam reversal and the corresponding purchase value.</li>
      </ul>
      <p>Where duplicate recovery occurs, ConSkins may:</p>
      <ul>
        <li>reverse an internal Balance credit;</li>
        <li>restrict the Account;</li>
        <li>request return of the Digital Item;</li>
        <li>request repayment;</li>
        <li>offset future valid credits; or</li>
        <li>take other lawful recovery action.</li>
      </ul>

      <h2>36. Chargebacks</h2>
      <p>Users are encouraged to contact info@conskins.com before initiating a Chargeback so that ConSkins has a reasonable opportunity to investigate and resolve the issue.</p>
      <p>This does not prevent the User from exercising a lawful right to contact:</p>
      <ul>
        <li>a bank;</li>
        <li>a card issuer;</li>
        <li>a Payment Provider;</li>
        <li>a consumer protection body;</li>
        <li>a court; or</li>
        <li>another competent authority.</li>
      </ul>
      <p>A User must not use a Chargeback to:</p>
      <ul>
        <li>avoid an authorised purchase after successful delivery;</li>
        <li>obtain both the Digital Item and the payment amount;</li>
        <li>reverse a payment because the Digital Item’s value changed;</li>
        <li>falsely claim that an authorised transaction was unauthorised;</li>
        <li>bypass a reasonable investigation; or</li>
        <li>commit fraud.</li>
      </ul>
      <p>When a Chargeback is opened, ConSkins may temporarily restrict:</p>
      <ul>
        <li>the disputed amount;</li>
        <li>the remaining Balance;</li>
        <li>pending Orders;</li>
        <li>additional Top-Ups;</li>
        <li>Digital Item delivery; and</li>
        <li>Account access.</li>
      </ul>

      <h2>37. Chargeback Evidence</h2>
      <p>ConSkins may provide relevant evidence to a bank, card issuer or Payment Provider, including:</p>
      <ul>
        <li>payment records;</li>
        <li>authentication results;</li>
        <li>Account registration information;</li>
        <li>login and device records;</li>
        <li>Order details;</li>
        <li>Steam delivery information;</li>
        <li>Trade Offer records;</li>
        <li>communications;</li>
        <li>refund history; and</li>
        <li>other information reasonably required to respond to the dispute.</li>
      </ul>
      <p>Personal data will be disclosed only where reasonably necessary and in accordance with the Privacy Policy.</p>
      <p>If the Chargeback is resolved in the User’s favour, ConSkins will make any required correction.</p>
      <p>If the Chargeback is resolved against the User, ConSkins may restore restrictions, recover a negative Balance or take other proportionate action permitted by law.</p>

      <h2>38. Fraudulent or Abusive Refund Requests</h2>
      <p>ConSkins may restrict or close an Account where there is reasonable evidence that the User:</p>
      <ul>
        <li>falsely claimed non-delivery;</li>
        <li>used stolen payment details;</li>
        <li>submitted manipulated evidence;</li>
        <li>repeatedly abused cancellation requests;</li>
        <li>accepted the Digital Item and then denied receipt;</li>
        <li>initiated a fraudulent Chargeback;</li>
        <li>exploited a technical error;</li>
        <li>created multiple Accounts to obtain repeated refunds;</li>
        <li>used Steam Trade Protection for double recovery; or</li>
        <li>otherwise attempted to obtain an improper financial benefit.</li>
      </ul>
      <p>A refund may be delayed while a legitimate fraud, payment or security investigation remains open.</p>
      <p>Nothing in this section permits ConSkins to refuse a valid mandatory consumer remedy merely because the User made a complaint or exercised a lawful payment right.</p>

      <h2>39. Technical Errors</h2>
      <p>If a technical error results in:</p>
      <ul>
        <li>an incorrect Balance deduction;</li>
        <li>duplicate deduction;</li>
        <li>incorrect refund;</li>
        <li>duplicate credit;</li>
        <li>incorrect Digital Item reservation;</li>
        <li>incorrect Order status; or</li>
        <li>another transaction-record error,</li>
      </ul>
      <p>ConSkins may correct the Account records after reasonable investigation.</p>
      <p>Where the error caused the User to lose valid Balance, the Balance will be restored or another appropriate remedy will be provided.</p>
      <p>Where the error caused an excess credit, ConSkins may remove the excess amount provided that:</p>
      <ul>
        <li>the adjustment is based on reliable records;</li>
        <li>the User is not charged more than the incorrect credit;</li>
        <li>valid unrelated Balance is not removed without justification; and</li>
        <li>the correction complies with applicable law.</li>
      </ul>

      <h2>40. Suspension During a Refund Review</h2>
      <p>ConSkins may temporarily restrict an Account, Balance or Order while reviewing:</p>
      <ul>
        <li>an unauthorised payment claim;</li>
        <li>a Chargeback;</li>
        <li>conflicting delivery evidence;</li>
        <li>a Steam reversal;</li>
        <li>suspected identity misuse;</li>
        <li>suspected fraud;</li>
        <li>a duplicated transaction;</li>
        <li>a negative Balance; or</li>
        <li>another material security issue.</li>
      </ul>
      <p>Restrictions will be proportionate to the issue under review.</p>
      <p>Where reasonably possible, unaffected valid Balance and unrelated Account functionality will not be restricted longer than necessary.</p>

      <h2>41. Consumer Rights</h2>
      <p>Nothing in this Policy excludes or restricts statutory rights that cannot lawfully be excluded.</p>
      <p>Depending on the applicable law and circumstances, a User may be entitled to a remedy where:</p>
      <ul>
        <li>digital content was not supplied;</li>
        <li>the supplied Digital Item did not conform to the contract;</li>
        <li>the Digital Item was materially different from its description;</li>
        <li>ConSkins lacked the right to arrange its supply;</li>
        <li>the service was not performed with reasonable care and skill;</li>
        <li>a payment was unauthorised;</li>
        <li>a refund was not properly processed; or</li>
        <li>another mandatory consumer protection applies.</li>
      </ul>
      <p>Available remedies may include:</p>
      <ul>
        <li>repeat performance;</li>
        <li>replacement;</li>
        <li>price reduction;</li>
        <li>refund to the Balance;</li>
        <li>monetary refund; or</li>
        <li>another remedy required by law.</li>
      </ul>
      <p>A term describing a completed Order as final does not override mandatory consumer rights.</p>

      <h2>42. Relationship with Steam and Valve</h2>
      <p>ConSkins is independent from Valve Corporation and Steam.</p>
      <p>Valve controls:</p>
      <ul>
        <li>Steam Accounts;</li>
        <li>Steam inventories;</li>
        <li>Trade Offers;</li>
        <li>trade confirmations;</li>
        <li>Trade Holds;</li>
        <li>Trade Protection;</li>
        <li>trade reversals;</li>
        <li>trade bans; and</li>
        <li>Steam functionality.</li>
      </ul>
      <p>ConSkins cannot guarantee that Steam will:</p>
      <ul>
        <li>permit a transfer;</li>
        <li>remove a restriction;</li>
        <li>restore an item;</li>
        <li>approve a reversal;</li>
        <li>maintain a particular trading rule; or</li>
        <li>continue supporting a particular Digital Item.</li>
      </ul>
      <p>Where Steam prevents an accepted Order from being delivered, ConSkins will provide an appropriate Order-level remedy under this Policy.</p>

      <h2>43. Complaints and Disputes</h2>
      <p>If the User disagrees with a refund decision, the User may submit a complaint to:</p>
      <p>info@conskins.com</p>
      <p>The complaint should include:</p>
      <ul>
        <li>the relevant Order or payment reference;</li>
        <li>the original refund request;</li>
        <li>the reason for disagreement;</li>
        <li>any additional evidence; and</li>
        <li>the resolution requested.</li>
      </ul>
      <p>The complaint will be reviewed in accordance with the Complaints & Dispute Resolution Policy.</p>
      <p>Submitting an internal complaint does not remove any right to contact a bank, Payment Provider, consumer authority or court.</p>

      <h2>44. Personal Data</h2>
      <p>ConSkins may process personal data for the purposes of:</p>
      <ul>
        <li>reviewing refund requests;</li>
        <li>confirming delivery;</li>
        <li>identifying transactions;</li>
        <li>processing monetary refunds;</li>
        <li>responding to Chargebacks;</li>
        <li>preventing fraud;</li>
        <li>verifying identity;</li>
        <li>maintaining accounting records;</li>
        <li>resolving complaints; and</li>
        <li>complying with legal obligations.</li>
      </ul>
      <p>Information may be shared with Payment Providers, banks, fulfilment providers, identity verification providers, professional advisers and competent authorities where reasonably necessary.</p>
      <p>Further information is provided in the Privacy Policy.</p>

      <h2>45. Changes to This Policy</h2>
      <p>ConSkins may update this Policy to reflect:</p>
      <ul>
        <li>changes in law;</li>
        <li>changes to Steam;</li>
        <li>changes to delivery methods;</li>
        <li>changes to Payment Provider requirements;</li>
        <li>new Balance functionality;</li>
        <li>fraud-prevention requirements;</li>
        <li>operational improvements; or</li>
        <li>corrections and clarifications.</li>
      </ul>
      <p>The current version will be published on the Website with an updated revision date.</p>
      <p>Changes will not ordinarily remove a mandatory right or remedy that arose before the updated Policy took effect.</p>

      <h2>46. Governing Law</h2>
      <p>This Policy is governed by the laws of England and Wales.</p>
      <p>Consumers may also benefit from mandatory rights and jurisdictional protections available under the laws of their country of residence.</p>
      <p>Nothing in this Policy removes those mandatory protections.</p>

      <h2>47. Contact Details</h2>
      <p>Refund, cancellation, failed delivery and Account closure requests should be sent to:</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
