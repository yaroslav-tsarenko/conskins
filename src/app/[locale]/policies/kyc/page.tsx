import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "KYC & Sanctions Policy — ConSkins" };

export default function KycPolicyPage() {
  return (
    <PolicyLayout title="KYC & Sanctions Policy" lastUpdated="31 July 2026">
      <h2>1. Purpose of This Policy</h2>
      <p>This KYC & Sanctions Policy explains the identity, payment, fraud-prevention and sanctions controls that may apply when a User accesses or uses ConSkins.</p>
      <p>The purposes of these controls include:</p>
      <ul>
        <li>confirming that a User is eligible to use ConSkins;</li>
        <li>verifying the identity and age of a User where necessary;</li>
        <li>confirming ownership or authorised use of a Payment Method;</li>
        <li>preventing fraud, identity theft and Account misuse;</li>
        <li>identifying suspicious or unusual activity;</li>
        <li>preventing the use of ConSkins for money laundering, terrorist financing or sanctions evasion;</li>
        <li>complying with applicable laws and binding legal requirements;</li>
        <li>meeting reasonable requirements imposed by Payment Providers and other service providers; and</li>
        <li>protecting ConSkins, its Users and third parties.</li>
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
        <li>“Digital Item” means a virtual in-game item available for purchase through ConSkins and capable of being transferred through Steam;</li>
        <li>“KYC” means identity, age, payment ownership and related verification checks that may be conducted in relation to a User;</li>
        <li>“Order” means a confirmed request to purchase a Digital Item using the ConSkins Balance;</li>
        <li>“Payment Method” means a payment card or another payment method available through the ConSkins payment interface;</li>
        <li>“Payment Provider” means an independent third party used to process payments, refunds, authentication and related services;</li>
        <li>“Restricted Jurisdiction” means a country, territory or region in which ConSkins does not provide all or part of the Service because of legal, sanctions, payment, security or operational restrictions;</li>
        <li>“Sanctions” means applicable financial, trade or economic restrictions imposed by the United Kingdom, United Nations or another authority whose requirements apply to ConSkins, a transaction or a service provider;</li>
        <li>“Sanctions List” means an applicable official list of designated or restricted individuals, entities, organisations, vessels or other persons;</li>
        <li>“Steam Account” means the Steam account linked to a User’s ConSkins Account;</li>
        <li>“Top-Up” means a payment made to add Cash-Funded Balance to an Account;</li>
        <li>“User”, “you” and “your” mean the individual accessing or using ConSkins.</li>
      </ul>

      <h2>4. Nature of This Policy</h2>
      <p>ConSkins is a digital item purchasing service and does not represent itself as a bank, deposit-taking institution, electronic money issuer or provider of general-purpose payment accounts.</p>
      <p>This Policy does not mean that CONDEO LTD is claiming to be subject to every obligation applicable to banks, regulated payment institutions or other businesses within a formally supervised sector.</p>
      <p>However, ConSkins may apply proportionate identity, payment, fraud-prevention and sanctions controls where reasonably necessary to:</p>
      <ul>
        <li>comply with applicable law;</li>
        <li>meet Payment Provider requirements;</li>
        <li>prevent criminal or abusive activity;</li>
        <li>investigate transactions;</li>
        <li>protect Users;</li>
        <li>manage legal and commercial risk; or</li>
        <li>enforce the Terms and Conditions.</li>
      </ul>
      <p>The nature and extent of a check may vary according to the circumstances.</p>

      <h2>5. Age Requirement</h2>
      <p>ConSkins is available only to individuals who are at least 18 years old.</p>
      <p>By creating an Account or using ConSkins, you confirm that you are at least 18.</p>
      <p>ConSkins may request evidence of age where:</p>
      <ul>
        <li>the date of birth provided appears inconsistent;</li>
        <li>Account information suggests that the User may be under 18;</li>
        <li>a Payment Provider requires age verification;</li>
        <li>a transaction presents an increased risk;</li>
        <li>a complaint or report raises an age-related concern; or</li>
        <li>verification is otherwise reasonably necessary.</li>
      </ul>
      <p>A User must not:</p>
      <ul>
        <li>provide a false date of birth;</li>
        <li>use another person’s identity to satisfy the age requirement;</li>
        <li>submit altered or false evidence of age;</li>
        <li>create an Account for a minor; or</li>
        <li>allow a minor to use the User’s Account.</li>
      </ul>
      <p>An Account may be suspended or closed if the User is under 18 or does not complete a reasonable age-verification request.</p>

      <h2>6. Risk-Based Verification</h2>
      <p>Not every User will necessarily be required to complete the same verification process.</p>
      <p>ConSkins may apply a risk-based approach and consider factors such as:</p>
      <ul>
        <li>the value of a Top-Up;</li>
        <li>the total value or frequency of transactions;</li>
        <li>the number of Payment Methods used;</li>
        <li>the age and history of the Account;</li>
        <li>the User’s country or region;</li>
        <li>inconsistencies in Account information;</li>
        <li>unusual device, network or location information;</li>
        <li>payment authentication results;</li>
        <li>repeated payment failures;</li>
        <li>previous refunds or Chargebacks;</li>
        <li>multiple related Accounts;</li>
        <li>suspected third-party payment activity;</li>
        <li>sanctions or legal risk;</li>
        <li>attempts to bypass transaction limits;</li>
        <li>unusual Steam Account activity; and</li>
        <li>information supplied by Payment Providers or fraud-prevention services.</li>
      </ul>
      <p>A request for verification does not necessarily mean that ConSkins believes the User has acted unlawfully.</p>

      <h2>7. When Verification May Be Required</h2>
      <p>ConSkins or its service providers may request verification:</p>
      <ul>
        <li>during Account registration;</li>
        <li>before a Top-Up is accepted;</li>
        <li>after a Top-Up has been submitted;</li>
        <li>before Balance becomes available;</li>
        <li>before an Order is processed;</li>
        <li>before a Digital Item is delivered;</li>
        <li>before a refund is issued;</li>
        <li>before eligible unused Balance is returned following Account closure;</li>
        <li>when Account details are changed;</li>
        <li>when a new Payment Method is used;</li>
        <li>when suspicious activity is identified;</li>
        <li>when a Chargeback or unauthorised payment claim is made;</li>
        <li>when a Steam trade reversal occurs;</li>
        <li>when a Payment Provider requires verification;</li>
        <li>when required by law or a competent authority; or</li>
        <li>at another time where reasonably necessary to protect the Service.</li>
      </ul>
      <p>A transaction may remain pending or restricted until the verification process has been completed.</p>

      <h2>8. Information That May Be Requested</h2>
      <p>Depending on the circumstances, ConSkins or a verification provider may request:</p>
      <ul>
        <li>full legal name;</li>
        <li>date of birth;</li>
        <li>residential address;</li>
        <li>country of residence;</li>
        <li>nationality;</li>
        <li>telephone number;</li>
        <li>verified email address;</li>
        <li>a passport;</li>
        <li>a national identity card;</li>
        <li>a driving licence;</li>
        <li>a residence permit;</li>
        <li>proof of address;</li>
        <li>a photograph or selfie;</li>
        <li>a short video or liveness check;</li>
        <li>confirmation of Payment Method ownership;</li>
        <li>a redacted payment statement;</li>
        <li>a bank or card transaction record;</li>
        <li>information concerning the source of funds;</li>
        <li>an explanation of transaction activity;</li>
        <li>confirmation of Steam Account ownership;</li>
        <li>the Steam ID or profile associated with the Account;</li>
        <li>information concerning the purpose of a payment or purchase; or</li>
        <li>other information reasonably required for the relevant check.</li>
      </ul>
      <p>ConSkins will seek to request only information that is proportionate and relevant to the purpose of the verification.</p>

      <h2>9. Identity Documents</h2>
      <p>Any identity document provided must be:</p>
      <ul>
        <li>genuine;</li>
        <li>valid and unexpired, unless an expired document is expressly accepted;</li>
        <li>issued to the User;</li>
        <li>clear and legible;</li>
        <li>complete where a complete image is requested;</li>
        <li>free from unauthorised alteration;</li>
        <li>consistent with the Account information; and</li>
        <li>submitted through the method specified by ConSkins or the verification provider.</li>
      </ul>
      <p>A User must not submit:</p>
      <ul>
        <li>a forged document;</li>
        <li>an edited or manipulated document;</li>
        <li>another person’s document;</li>
        <li>a screenshot of a document belonging to an unknown third party;</li>
        <li>a document obtained through identity theft;</li>
        <li>false address evidence; or</li>
        <li>information known to be inaccurate.</li>
      </ul>
      <p>ConSkins may reject a document that cannot be reasonably authenticated.</p>

      <h2>10. Identity Verification Providers</h2>
      <p>ConSkins may use independent identity or fraud-prevention providers to perform verification checks.</p>
      <p>A verification provider may:</p>
      <ul>
        <li>capture identity document information;</li>
        <li>assess document authenticity;</li>
        <li>compare identity information;</li>
        <li>perform facial or liveness checks where appropriate;</li>
        <li>check whether information is consistent;</li>
        <li>return a verification result;</li>
        <li>screen against relevant databases; and</li>
        <li>retain information in accordance with its own legal obligations and privacy terms.</li>
      </ul>
      <p>Where a third-party verification provider is used, the User may be asked to review and accept that provider’s privacy notice or terms.</p>
      <p>The identity of operational providers may change and does not need to be permanently named in this Policy.</p>

      <h2>11. Payment Method Verification</h2>
      <p>A Payment Method used for a Top-Up must:</p>
      <ul>
        <li>belong to the User; or</li>
        <li>be used with the lawful holder’s express authorisation.</li>
      </ul>
      <p>ConSkins or the Payment Provider may request evidence such as:</p>
      <ul>
        <li>the name of the Payment Method holder;</li>
        <li>the last digits of a payment card;</li>
        <li>confirmation of the issuing bank;</li>
        <li>a transaction reference;</li>
        <li>a redacted statement;</li>
        <li>3D Secure authentication;</li>
        <li>confirmation through an online banking application; or</li>
        <li>another proportionate proof of ownership or authority.</li>
      </ul>
      <p>A User must not send a full payment card number, card security code, PIN or online banking password by email.</p>

      <h2>12. Third-Party Payment Methods</h2>
      <p>ConSkins may refuse or restrict a Top-Up made using a Payment Method that does not appear to belong to the User.</p>
      <p>Where a third-party Payment Method is used, ConSkins may require:</p>
      <ul>
        <li>identification of the payment holder;</li>
        <li>evidence of the relationship between the User and payment holder;</li>
        <li>confirmation of the payment holder’s consent;</li>
        <li>proof of Payment Method ownership;</li>
        <li>additional transaction verification; or</li>
        <li>cancellation and refund to the original Payment Method.</li>
      </ul>
      <p>ConSkins may prohibit third-party payments where they create an unacceptable fraud, payment or compliance risk.</p>
      <p>A third-party payment arrangement must never be used to conceal the origin of funds or the true beneficiary of a transaction.</p>

      <h2>13. Source of Funds</h2>
      <p>Where reasonably necessary, ConSkins may request information concerning the source of funds used for a Top-Up.</p>
      <p>This may include a general explanation or supporting evidence showing that funds originate from a lawful source, such as:</p>
      <ul>
        <li>employment income;</li>
        <li>personal savings;</li>
        <li>business income;</li>
        <li>investment proceeds;</li>
        <li>sale of personal property;</li>
        <li>a lawful gift;</li>
        <li>or another legitimate source.</li>
      </ul>
      <p>The nature of the information requested will depend on the amount, transaction pattern and identified risk.</p>
      <p>A User must not provide false or misleading source-of-funds information.</p>

      <h2>14. Purpose of Transactions</h2>
      <p>ConSkins may request an explanation of the purpose of a transaction where activity appears inconsistent with the intended use of the Service.</p>
      <p>The ConSkins Balance is intended only for eligible purchases through ConSkins.</p>
      <p>A User must not use ConSkins to:</p>
      <ul>
        <li>store funds for unrelated purposes;</li>
        <li>transfer value between persons;</li>
        <li>move money on behalf of an undisclosed third party;</li>
        <li>convert criminal proceeds into Digital Items;</li>
        <li>conceal the source or destination of funds;</li>
        <li>facilitate sanctions evasion;</li>
        <li>conduct unauthorised payment services;</li>
        <li>settle private debts;</li>
        <li>finance gambling or unlawful activity; or</li>
        <li>otherwise misuse the Service as a financial transfer mechanism.</li>
      </ul>

      <h2>15. Transaction Monitoring</h2>
      <p>ConSkins and its service providers may monitor transactions and Account activity for security, fraud-prevention, sanctions and legal-compliance purposes.</p>
      <p>Monitoring may consider:</p>
      <ul>
        <li>Top-Up amounts;</li>
        <li>transaction frequency;</li>
        <li>failed payment attempts;</li>
        <li>Payment Methods;</li>
        <li>Account access patterns;</li>
        <li>IP address and approximate location;</li>
        <li>device and browser information;</li>
        <li>Steam Account information;</li>
        <li>Order history;</li>
        <li>refunds and Chargebacks;</li>
        <li>Account closure requests;</li>
        <li>repeated changes to Account details;</li>
        <li>multiple related Accounts;</li>
        <li>unusual purchasing patterns;</li>
        <li>inconsistent identity information; and</li>
        <li>information received from service providers.</li>
      </ul>
      <p>Monitoring may be automated, manual or a combination of both.</p>

      <h2>16. Unusual or Suspicious Activity</h2>
      <p>Activity may be treated as unusual or suspicious where it includes:</p>
      <ul>
        <li>use of stolen or unauthorised Payment Methods;</li>
        <li>repeated payments using different cards;</li>
        <li>mismatched identity and payment information;</li>
        <li>multiple Accounts controlled by the same person;</li>
        <li>payments made on behalf of unknown third parties;</li>
        <li>rapid Top-Ups followed by unusual purchase activity;</li>
        <li>attempted use of the Service to transfer value;</li>
        <li>repeated Chargebacks;</li>
        <li>false non-delivery claims;</li>
        <li>attempts to bypass verification;</li>
        <li>altered documents;</li>
        <li>use of anonymisation tools to conceal a prohibited location;</li>
        <li>transactions connected to known fraud indicators;</li>
        <li>activity linked to a compromised Steam Account;</li>
        <li>transactions inconsistent with the stated purpose of the Service;</li>
        <li>sanctions-related concerns; or</li>
        <li>another pattern reasonably associated with fraud or financial crime.</li>
      </ul>
      <p>The presence of one risk factor does not automatically establish unlawful conduct.</p>

      <h2>17. Sanctions Compliance</h2>
      <p>ConSkins will not knowingly provide the Service in breach of applicable Sanctions.</p>
      <p>ConSkins may screen Users, transactions, Payment Methods and related information against:</p>
      <ul>
        <li>the UK Sanctions List;</li>
        <li>relevant United Nations sanctions designations;</li>
        <li>sanctions lists required by a Payment Provider;</li>
        <li>sanctions lists applicable to a transaction or service provider; and</li>
        <li>other official restrictions that ConSkins is legally required to observe.</li>
      </ul>
      <p>Screening may occur:</p>
      <ul>
        <li>at Account registration;</li>
        <li>before or after a Top-Up;</li>
        <li>before an Order;</li>
        <li>before delivery;</li>
        <li>before a refund;</li>
        <li>during Account closure;</li>
        <li>when a sanctions list is updated; or</li>
        <li>when a relevant risk is identified.</li>
      </ul>

      <h2>18. Designated and Restricted Persons</h2>
      <p>A User must not use ConSkins if the User:</p>
      <ul>
        <li>is a person designated under applicable Sanctions;</li>
        <li>is owned or controlled by a designated person where the relevant restriction applies;</li>
        <li>acts for or on behalf of a designated person;</li>
        <li>is attempting to make funds or economic resources available to a designated person;</li>
        <li>is using ConSkins to evade a sanctions restriction;</li>
        <li>is subject to a binding asset freeze or transaction prohibition; or</li>
        <li>is otherwise prohibited from receiving the Service.</li>
      </ul>
      <p>A User must not provide false information to avoid sanctions screening.</p>

      <h2>19. Restricted Jurisdictions</h2>
      <p>ConSkins may restrict or refuse access from countries, territories or regions where:</p>
      <ul>
        <li>applicable law prohibits the Service;</li>
        <li>broad or targeted sanctions create unacceptable legal risk;</li>
        <li>a Payment Provider does not support the jurisdiction;</li>
        <li>Digital Item delivery is not available;</li>
        <li>fraud levels create an unacceptable security risk;</li>
        <li>local legal requirements cannot reasonably be met; or</li>
        <li>another service provider prohibits the relevant activity.</li>
      </ul>
      <p>The list of Restricted Jurisdictions may change without prior notice in response to legal, sanctions, payment or security developments.</p>
      <p>Access to the Website does not guarantee that Account registration, Top-Ups, purchases or delivery are available in a particular country.</p>

      <h2>20. Location Information</h2>
      <p>ConSkins may use information such as:</p>
      <ul>
        <li>IP address;</li>
        <li>device settings;</li>
        <li>billing country;</li>
        <li>Payment Method country;</li>
        <li>Account information;</li>
        <li>telephone country code;</li>
        <li>Steam Account information; and</li>
        <li>other relevant indicators</li>
      </ul>
      <p>to assess the User’s location and eligibility.</p>
      <p>A User must not use:</p>
      <ul>
        <li>a VPN;</li>
        <li>a proxy;</li>
        <li>false address information;</li>
        <li>a remote device;</li>
        <li>location spoofing;</li>
        <li>another person’s Payment Method; or</li>
        <li>another concealment method</li>
      </ul>
      <p>to bypass a geographic or sanctions restriction.</p>
      <p>The ordinary use of privacy or security technology is not itself prohibited unless it is used to conceal a material fact or circumvent a restriction.</p>

      <h2>21. Politically Exposed Persons</h2>
      <p>Where proportionate, required by a Payment Provider or otherwise legally relevant, ConSkins or its service providers may determine whether a User is:</p>
      <ul>
        <li>a politically exposed person;</li>
        <li>a family member of a politically exposed person; or</li>
        <li>a known close associate of a politically exposed person.</li>
      </ul>
      <p>Such status does not automatically prohibit the use of ConSkins.</p>
      <p>However, it may result in:</p>
      <ul>
        <li>additional verification;</li>
        <li>further information concerning source of funds;</li>
        <li>enhanced review;</li>
        <li>transaction limits;</li>
        <li>delayed processing; or</li>
        <li>refusal of a transaction where the risk cannot reasonably be managed.</li>
      </ul>

      <h2>22. Adverse Information</h2>
      <p>Where proportionate and lawful, ConSkins or its service providers may consider reliable information indicating possible involvement in:</p>
      <ul>
        <li>fraud;</li>
        <li>identity theft;</li>
        <li>cybercrime;</li>
        <li>sanctions evasion;</li>
        <li>money laundering;</li>
        <li>terrorist financing;</li>
        <li>payment card abuse;</li>
        <li>organised crime;</li>
        <li>account theft; or</li>
        <li>another serious financial or security offence.</li>
      </ul>
      <p>Unverified allegations will not automatically be treated as proof of wrongdoing.</p>
      <p>ConSkins may request clarification or supporting information before making a final decision.</p>

      <h2>23. Automated Screening</h2>
      <p>ConSkins and its service providers may use automated tools to identify possible:</p>
      <ul>
        <li>identity inconsistencies;</li>
        <li>document fraud;</li>
        <li>sanctions matches;</li>
        <li>Payment Method risk;</li>
        <li>unusual transactions;</li>
        <li>multiple related Accounts;</li>
        <li>device anomalies;</li>
        <li>location inconsistencies;</li>
        <li>fraud indicators; and</li>
        <li>account compromise.</li>
      </ul>
      <p>An automated result may lead to:</p>
      <ul>
        <li>additional authentication;</li>
        <li>manual review;</li>
        <li>delayed processing;</li>
        <li>a request for documents;</li>
        <li>rejection of a Top-Up;</li>
        <li>temporary restriction of Balance;</li>
        <li>cancellation of an Order; or</li>
        <li>Account suspension.</li>
      </ul>
      <p>Where required by applicable data protection law, further information about automated decision-making will be provided in the Privacy Policy.</p>

      <h2>24. Possible Sanctions Match</h2>
      <p>If information appears to match a person or entity on an applicable Sanctions List, ConSkins may:</p>
      <ul>
        <li>pause Account activity;</li>
        <li>restrict a Top-Up;</li>
        <li>prevent new Orders;</li>
        <li>suspend delivery;</li>
        <li>delay a refund;</li>
        <li>request additional identity information;</li>
        <li>conduct a manual review;</li>
        <li>consult a Payment Provider or professional adviser;</li>
        <li>reject or cancel a transaction;</li>
        <li>restrict or close the Account;</li>
        <li>preserve relevant records; or</li>
        <li>take another action required by law.</li>
      </ul>
      <p>ConSkins may be legally prohibited from completing, refunding or otherwise dealing with certain funds or economic resources without authorisation from a competent authority.</p>

      <h2>25. False Positive Reviews</h2>
      <p>A sanctions or identity screening result may occasionally relate to another person with a similar name or details.</p>
      <p>If you believe that a restriction resulted from an incorrect match, you may contact:</p>
      <p>info@conskins.com</p>
      <p>You may be asked to provide:</p>
      <ul>
        <li>full legal name;</li>
        <li>date of birth;</li>
        <li>nationality;</li>
        <li>country of residence;</li>
        <li>identity document;</li>
        <li>address information; or</li>
        <li>another detail necessary to distinguish you from the listed person.</li>
      </ul>
      <p>ConSkins will review the matter within a reasonable period, subject to any legal restrictions.</p>

      <h2>26. Payment Provider Decisions</h2>
      <p>A Payment Provider may independently:</p>
      <ul>
        <li>request identity verification;</li>
        <li>apply transaction limits;</li>
        <li>decline a payment;</li>
        <li>delay settlement;</li>
        <li>request further authentication;</li>
        <li>reverse a transaction;</li>
        <li>block a Payment Method; or</li>
        <li>refuse to process a refund.</li>
      </ul>
      <p>ConSkins does not control an independent decision made by a Payment Provider.</p>
      <p>Where reasonably possible, ConSkins may provide general information about the transaction status, but may not have access to the Payment Provider’s complete internal reasoning.</p>

      <h2>27. Failure to Complete Verification</h2>
      <p>If a User does not complete a reasonable verification request, ConSkins may:</p>
      <ul>
        <li>reject a Top-Up;</li>
        <li>keep a transaction pending;</li>
        <li>prevent use of related Balance;</li>
        <li>cancel a pending Order;</li>
        <li>suspend delivery;</li>
        <li>delay an Account closure refund;</li>
        <li>restrict Account functionality;</li>
        <li>suspend the Account; or</li>
        <li>close the Account.</li>
      </ul>
      <p>Any valid unused Cash-Funded Balance will be handled in accordance with:</p>
      <ul>
        <li>applicable law;</li>
        <li>the Terms and Conditions;</li>
        <li>the ConSkins Balance, Payments & Pricing Policy;</li>
        <li>the Refund, Cancellation & Failed Delivery Policy; and</li>
        <li>any legal or Payment Provider restrictions.</li>
      </ul>
      <p>Failure to verify does not entitle ConSkins to confiscate valid funds as a penalty.</p>

      <h2>28. Pending Reviews</h2>
      <p>A payment, Balance amount, Order, delivery or refund may remain pending while ConSkins:</p>
      <ul>
        <li>verifies identity;</li>
        <li>confirms Payment Method ownership;</li>
        <li>reviews a sanctions alert;</li>
        <li>investigates suspected fraud;</li>
        <li>responds to a Chargeback;</li>
        <li>checks transaction information;</li>
        <li>reviews a Steam trade reversal;</li>
        <li>awaits information from a service provider; or</li>
        <li>complies with a lawful request.</li>
      </ul>
      <p>ConSkins will seek to complete reviews without undue delay, but the time required may depend on the complexity of the issue and the response of third parties.</p>

      <h2>29. Restrictions During a Review</h2>
      <p>During a verification or compliance review, ConSkins may temporarily restrict:</p>
      <ul>
        <li>Account access;</li>
        <li>new Top-Ups;</li>
        <li>available Balance;</li>
        <li>new Orders;</li>
        <li>pending Digital Item delivery;</li>
        <li>refunds;</li>
        <li>Account closure; or</li>
        <li>selected Account functions.</li>
      </ul>
      <p>Restrictions will be proportionate to the identified risk where reasonably possible.</p>
      <p>Unrelated activity should not be restricted for longer than reasonably necessary unless a wider restriction is required by law or security considerations.</p>

      <h2>30. Rejection or Cancellation of Transactions</h2>
      <p>ConSkins may reject or cancel a Top-Up, Order or refund where:</p>
      <ul>
        <li>identity cannot be reasonably verified;</li>
        <li>a Payment Method cannot be verified;</li>
        <li>false information was provided;</li>
        <li>the transaction appears unauthorised;</li>
        <li>fraud is reasonably suspected;</li>
        <li>a sanctions restriction applies;</li>
        <li>the User is in a Restricted Jurisdiction;</li>
        <li>the transaction would breach provider requirements;</li>
        <li>the transaction is inconsistent with the intended use of ConSkins;</li>
        <li>required information is not provided; or</li>
        <li>completing the transaction would create an unacceptable legal or security risk.</li>
      </ul>
      <p>Where an Order is cancelled before delivery, the purchase amount will ordinarily be restored to the ConSkins Balance unless the underlying Top-Up is unpaid, reversed, fraudulent or legally restricted.</p>

      <h2>31. Account Suspension or Closure</h2>
      <p>ConSkins may suspend or close an Account where:</p>
      <ul>
        <li>the User is not eligible to use the Service;</li>
        <li>identity information is false;</li>
        <li>forged or altered documents are submitted;</li>
        <li>a Payment Method is used without authority;</li>
        <li>the Account is linked to fraud;</li>
        <li>sanctions restrictions apply;</li>
        <li>the User attempts to evade verification;</li>
        <li>multiple Accounts are used to bypass controls;</li>
        <li>funds appear to originate from unlawful activity;</li>
        <li>the User refuses necessary verification;</li>
        <li>the Account creates an unacceptable security or legal risk; or</li>
        <li>continued use would breach applicable law or provider requirements.</li>
      </ul>
      <p>Where legally permitted, ConSkins will provide a general explanation and an opportunity to contact support.</p>

      <h2>32. Treatment of Balance Following Suspension or Closure</h2>
      <p>Where an Account is suspended or closed, ConSkins may temporarily restrict the Balance while it:</p>
      <ul>
        <li>confirms the source and ownership of funds;</li>
        <li>resolves Chargebacks;</li>
        <li>investigates fraud;</li>
        <li>completes sanctions screening;</li>
        <li>calculates a negative Balance;</li>
        <li>determines the correct refund destination; or</li>
        <li>complies with legal instructions.</li>
      </ul>
      <p>Eligible unused Cash-Funded Balance will ordinarily be returned to the original Payment Method after permanent Account closure, subject to verification and applicable restrictions.</p>
      <p>ConSkins will not knowingly:</p>
      <ul>
        <li>return funds to an unrelated third party;</li>
        <li>return funds to a Payment Method suspected to be stolen;</li>
        <li>make funds available in breach of Sanctions;</li>
        <li>refund an unpaid or reversed Top-Up; or</li>
        <li>treat Promotional Balance as refundable cash unless required by law.</li>
      </ul>

      <h2>33. Information Sharing</h2>
      <p>ConSkins may share relevant information with:</p>
      <ul>
        <li>Payment Providers;</li>
        <li>banks and card issuers;</li>
        <li>identity verification providers;</li>
        <li>fraud-prevention services;</li>
        <li>sanctions screening providers;</li>
        <li>Steam-related technology or fulfilment providers;</li>
        <li>hosting and security providers;</li>
        <li>professional advisers;</li>
        <li>insurers;</li>
        <li>auditors;</li>
        <li>courts;</li>
        <li>regulators;</li>
        <li>law enforcement agencies; and</li>
        <li>other competent authorities</li>
      </ul>
      <p>where reasonably necessary and supported by an appropriate legal basis.</p>
      <p>Information will not be shared merely for unrelated purposes.</p>

      <h2>34. Reports to Authorities</h2>
      <p>ConSkins may report suspected fraud, cybercrime, sanctions breaches or other unlawful activity to an appropriate authority where:</p>
      <ul>
        <li>reporting is legally required;</li>
        <li>a lawful request is received;</li>
        <li>disclosure is necessary to protect legal rights;</li>
        <li>disclosure is necessary to prevent or investigate crime; or</li>
        <li>ConSkins reasonably determines that a report is appropriate and lawful.</li>
      </ul>
      <p>ConSkins may be prohibited from informing a User about a report, investigation or related disclosure.</p>

      <h2>35. No Tipping-Off or Detailed Disclosure</h2>
      <p>ConSkins may be unable to disclose:</p>
      <ul>
        <li>whether a report has been made;</li>
        <li>whether an authority is investigating;</li>
        <li>details of a sanctions review;</li>
        <li>internal fraud indicators;</li>
        <li>risk scores;</li>
        <li>screening rules;</li>
        <li>provider security requirements;</li>
        <li>confidential investigation methods; or</li>
        <li>information concerning another person.</li>
      </ul>
      <p>Where possible, ConSkins will provide a general explanation without compromising legal or security obligations.</p>

      <h2>36. Accuracy of Information</h2>
      <p>Users must ensure that information provided to ConSkins remains accurate and current.</p>
      <p>A User should promptly update or report changes to:</p>
      <ul>
        <li>legal name;</li>
        <li>residential address;</li>
        <li>country of residence;</li>
        <li>email address;</li>
        <li>Payment Method;</li>
        <li>linked Steam Account;</li>
        <li>Steam Trade URL; or</li>
        <li>another material Account detail.</li>
      </ul>
      <p>ConSkins may request reverification if material information changes.</p>

      <h2>37. Data Protection</h2>
      <p>Identity, payment and sanctions checks involve the processing of personal data.</p>
      <p>Depending on the check, this may include:</p>
      <ul>
        <li>identity information;</li>
        <li>contact details;</li>
        <li>identity document data;</li>
        <li>photographs or verification images;</li>
        <li>Payment Method information;</li>
        <li>transaction records;</li>
        <li>Steam Account information;</li>
        <li>device and network information;</li>
        <li>screening results;</li>
        <li>risk indicators;</li>
        <li>communications; and</li>
        <li>supporting documents.</li>
      </ul>
      <p>ConSkins will process this information in accordance with the Privacy Policy and applicable data protection law.</p>

      <h2>38. Data Minimisation</h2>
      <p>ConSkins will seek to collect information that is:</p>
      <ul>
        <li>adequate for the relevant purpose;</li>
        <li>relevant to the verification or investigation; and</li>
        <li>limited to what is reasonably necessary.</li>
      </ul>
      <p>The information required may differ between Users because the nature and level of risk may differ.</p>
      <p>ConSkins will not intentionally request sensitive information merely because it might be useful in the future.</p>

      <h2>39. Security of Verification Information</h2>
      <p>ConSkins and its service providers will apply appropriate technical and organisational measures to protect verification information against:</p>
      <ul>
        <li>unauthorised access;</li>
        <li>accidental loss;</li>
        <li>unlawful disclosure;</li>
        <li>alteration;</li>
        <li>misuse; and</li>
        <li>destruction.</li>
      </ul>
      <p>No online system can be guaranteed to be completely secure.</p>
      <p>Users should submit documents only through the method specified by ConSkins or the authorised verification provider.</p>

      <h2>40. Retention</h2>
      <p>Verification and transaction information may be retained for as long as reasonably necessary to:</p>
      <ul>
        <li>administer the Account;</li>
        <li>complete the relevant check;</li>
        <li>prevent repeated fraud;</li>
        <li>resolve payment disputes;</li>
        <li>respond to Chargebacks;</li>
        <li>establish, exercise or defend legal claims;</li>
        <li>comply with accounting or legal obligations;</li>
        <li>respond to authorities; and</li>
        <li>enforce the Terms and Conditions.</li>
      </ul>
      <p>Retention periods may differ depending on the type of record and the purpose for which it is held.</p>
      <p>Information that is no longer required will be deleted, anonymised or securely disposed of in accordance with the Privacy Policy and applicable law.</p>

      <h2>41. User Rights</h2>
      <p>Depending on applicable data protection law, a User may have rights concerning personal data used for verification, including rights to:</p>
      <ul>
        <li>receive information about processing;</li>
        <li>request access;</li>
        <li>request correction;</li>
        <li>request deletion in certain circumstances;</li>
        <li>request restriction;</li>
        <li>object to certain processing;</li>
        <li>receive certain data in a portable format; and</li>
        <li>complain to a competent data protection authority.</li>
      </ul>
      <p>These rights are not absolute and may be limited where information must be retained for fraud prevention, legal claims, sanctions compliance or another lawful purpose.</p>
      <p>Further information is provided in the Privacy Policy.</p>

      <h2>42. Automated Decisions and Human Review</h2>
      <p>Where a decision with a significant effect is based solely on automated processing and applicable law provides a right to human involvement, the User may request that ConSkins:</p>
      <ul>
        <li>review the decision;</li>
        <li>consider additional information; and</li>
        <li>allow the User to express their position.</li>
      </ul>
      <p>Not every automated risk alert constitutes a solely automated decision with legal or similarly significant effect.</p>

      <h2>43. User Cooperation</h2>
      <p>A User must cooperate reasonably with a legitimate verification or compliance review.</p>
      <p>This includes:</p>
      <ul>
        <li>responding within a reasonable period;</li>
        <li>providing authentic documents;</li>
        <li>answering relevant questions accurately;</li>
        <li>protecting confidential verification links;</li>
        <li>not submitting another person’s information;</li>
        <li>not attempting to influence or deceive a verification provider; and</li>
        <li>notifying ConSkins if information previously supplied becomes inaccurate.</li>
      </ul>
      <p>A User should contact info@conskins.com if they cannot provide a requested document so that a reasonable alternative may be considered where available.</p>

      <h2>44. Prohibited Conduct</h2>
      <p>A User must not:</p>
      <ul>
        <li>impersonate another person;</li>
        <li>use a false identity;</li>
        <li>submit forged documents;</li>
        <li>conceal the true Payment Method holder;</li>
        <li>make payments for undisclosed third parties;</li>
        <li>conceal the source of funds;</li>
        <li>evade Sanctions;</li>
        <li>use a Restricted Jurisdiction through location spoofing;</li>
        <li>create multiple Accounts to avoid checks;</li>
        <li>interfere with screening systems;</li>
        <li>bribe or threaten personnel;</li>
        <li>submit false explanations;</li>
        <li>manipulate verification images;</li>
        <li>use stolen credentials;</li>
        <li>exploit a false positive;</li>
        <li>disclose another person’s identity information without authority; or</li>
        <li>otherwise obstruct a legitimate review.</li>
      </ul>

      <h2>45. Appeals and Complaints</h2>
      <p>If you believe that a verification, sanctions or Account restriction decision was incorrect, you may contact:</p>
      <p>info@conskins.com</p>
      <p>The request should include:</p>
      <ul>
        <li>the registered Account email;</li>
        <li>the relevant transaction or Order reference;</li>
        <li>a clear explanation of the issue;</li>
        <li>any supporting evidence; and</li>
        <li>the requested outcome.</li>
      </ul>
      <p>ConSkins may require verification of Account ownership before discussing the matter.</p>
      <p>A review does not guarantee that a restriction will be removed.</p>
      <p>Complaints will be handled in accordance with the Complaints & Dispute Resolution Policy.</p>

      <h2>46. Relationship with Other Policies</h2>
      <p>This Policy should be read together with:</p>
      <ul>
        <li>the Terms and Conditions;</li>
        <li>the Digital Item Delivery & Steam Trade Policy;</li>
        <li>the ConSkins Balance, Payments & Pricing Policy;</li>
        <li>the Refund, Cancellation & Failed Delivery Policy;</li>
        <li>the Acceptable Use, Fraud Prevention & Account Security Policy;</li>
        <li>the Privacy Policy;</li>
        <li>the Cookie Policy; and</li>
        <li>the Complaints & Dispute Resolution Policy.</li>
      </ul>
      <p>If there is a conflict, the Terms and Conditions will prevail unless another Policy expressly takes precedence for a particular issue or applicable law requires otherwise.</p>

      <h2>47. Changes to This Policy</h2>
      <p>ConSkins may update this Policy to reflect:</p>
      <ul>
        <li>changes in applicable law;</li>
        <li>changes to Sanctions;</li>
        <li>changes to Payment Provider requirements;</li>
        <li>new fraud or security risks;</li>
        <li>changes to identity verification methods;</li>
        <li>operational changes;</li>
        <li>changes to geographic availability; or</li>
        <li>corrections and clarifications.</li>
      </ul>
      <p>The current version will be published on the Website with a revised “Last updated” date.</p>
      <p>A change to a Sanctions List or binding legal restriction may be applied immediately where necessary.</p>

      <h2>48. Governing Law</h2>
      <p>This Policy is governed by the laws of England and Wales.</p>
      <p>Users may also benefit from mandatory rights and protections available under the laws of their country of residence.</p>
      <p>Nothing in this Policy excludes rights that cannot lawfully be excluded.</p>

      <h2>49. Contact Details</h2>
      <p>Questions, verification issues, sanctions-match reviews and complaints should be sent to:</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
