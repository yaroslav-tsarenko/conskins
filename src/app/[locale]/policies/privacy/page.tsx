import { PolicyLayout, ContactBlock } from "@/components/layout/PolicyLayout/PolicyLayout";

export const metadata = { title: "Privacy Policy — ConSkins" };

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="31 July 2026">
      <h2>1. Introduction</h2>
      <p>This Privacy Policy explains how CONDEO LTD collects, uses, stores, shares and protects personal data when you:</p>
      <ul>
        <li>visit conskins.com;</li>
        <li>create or use a ConSkins Account;</li>
        <li>link a Steam Account;</li>
        <li>top up your ConSkins Balance;</li>
        <li>purchase or receive a Digital Item;</li>
        <li>communicate with customer support;</li>
        <li>participate in identity, payment or security verification;</li>
        <li>make a complaint or exercise a legal right; or</li>
        <li>otherwise interact with ConSkins.</li>
      </ul>
      <p>This Privacy Policy also explains your rights and how you may contact us about the use of your personal data.</p>

      <h2>2. Data Controller</h2>
      <p>The controller responsible for the processing described in this Privacy Policy is:</p>
      <ContactBlock />
      <p>In this Privacy Policy, “ConSkins”, “we”, “us” and “our” mean CONDEO LTD.</p>

      <h2>3. Scope of This Privacy Policy</h2>
      <p>This Privacy Policy applies to personal data processed by CONDEO LTD in connection with ConSkins.</p>
      <p>It does not govern processing carried out independently by:</p>
      <ul>
        <li>Valve Corporation or Steam;</li>
        <li>banks and card issuers;</li>
        <li>payment service providers;</li>
        <li>identity verification providers;</li>
        <li>fraud-prevention providers;</li>
        <li>third-party websites;</li>
        <li>browser extensions;</li>
        <li>external applications; or</li>
        <li>other services that determine their own purposes and methods of processing.</li>
      </ul>
      <p>Those organisations may act as separate controllers and provide their own privacy notices.</p>

      <h2>4. Definitions</h2>
      <p>For the purposes of this Privacy Policy:</p>
      <ul>
        <li>“Account” means a registered ConSkins user account;</li>
        <li>“Balance” or “ConSkins Balance” means the internal account credit available for eligible purchases through ConSkins;</li>
        <li>“Digital Item” means a virtual in-game item available through ConSkins and capable of being transferred through Steam;</li>
        <li>“Order” means a confirmed request to purchase a Digital Item using the ConSkins Balance;</li>
        <li>“Payment Method” means a payment card or another payment method available through the ConSkins payment interface;</li>
        <li>“Payment Provider” means an independent third party used to process payments, authentication, refunds and related services;</li>
        <li>“Steam Account” means the Steam account linked to a User’s ConSkins Account;</li>
        <li>“Steam Trade Offer” or “Trade Offer” means an offer made through Steam to transfer a Digital Item;</li>
        <li>“Top-Up” means a payment made to add Cash-Funded Balance to an Account;</li>
        <li>“User”, “you” and “your” mean the individual whose personal data is processed;</li>
        <li>“UK GDPR” means the United Kingdom General Data Protection Regulation;</li>
        <li>“personal data” means information relating to an identified or identifiable individual;</li>
        <li>“processing” includes collecting, recording, organising, storing, using, disclosing, restricting, deleting or otherwise handling personal data.</li>
      </ul>

      <h2>5. Personal Data We Collect</h2>
      <p>The personal data we collect depends on how you use ConSkins.</p>
      <p>We may collect the categories described below.</p>

      <h2>6. Account and Registration Data</h2>
      <p>When you create or manage an Account, we may collect:</p>
      <ul>
        <li>email address;</li>
        <li>password in encrypted or cryptographically protected form;</li>
        <li>internal User identifier;</li>
        <li>Account creation date;</li>
        <li>Account status;</li>
        <li>language and country preferences;</li>
        <li>age or date of birth where requested;</li>
        <li>email verification status;</li>
        <li>marketing preferences;</li>
        <li>security settings;</li>
        <li>Account changes;</li>
        <li>suspension or closure status; and</li>
        <li>records of acceptance of our Terms and Policies.</li>
      </ul>
      <p>We do not store your password in readable plain-text form.</p>

      <h2>7. Steam Data</h2>
      <p>When you link a Steam Account or purchase a Digital Item, we may collect or receive:</p>
      <ul>
        <li>Steam ID or SteamID64;</li>
        <li>Steam profile URL;</li>
        <li>Steam display name;</li>
        <li>avatar;</li>
        <li>publicly available profile information;</li>
        <li>Steam Trade URL;</li>
        <li>Steam inventory information where accessible and necessary;</li>
        <li>inventory visibility status;</li>
        <li>Steam Account eligibility information;</li>
        <li>trade restriction or cooldown information;</li>
        <li>Steam Trade Offer identifiers;</li>
        <li>Trade Offer status;</li>
        <li>item transfer information;</li>
        <li>delivery and acceptance timestamps;</li>
        <li>Digital Item information;</li>
        <li>Steam reversal information;</li>
        <li>information necessary to investigate delivery or security issues; and</li>
        <li>other data made available through authorised Steam functionality.</li>
      </ul>
      <p>Linking Steam does not give ConSkins access to your Steam password.</p>
      <p>ConSkins will never ask you to disclose your Steam password or Steam Guard code.</p>

      <h2>8. Balance and Transaction Data</h2>
      <p>When you top up or use the ConSkins Balance, we may collect:</p>
      <ul>
        <li>Top-Up amount;</li>
        <li>Balance amount;</li>
        <li>transaction currency;</li>
        <li>transaction date and time;</li>
        <li>available, reserved or restricted Balance;</li>
        <li>internal transaction identifier;</li>
        <li>Payment Provider reference;</li>
        <li>transaction status;</li>
        <li>Balance adjustments;</li>
        <li>promotional credits;</li>
        <li>refunds;</li>
        <li>reversals;</li>
        <li>negative Balance;</li>
        <li>Account closure refund information;</li>
        <li>Order history;</li>
        <li>Digital Item purchase details;</li>
        <li>pricing information;</li>
        <li>included fees and taxes; and</li>
        <li>records required for accounting, reconciliation and dispute resolution.</li>
      </ul>

      <h2>9. Payment Data</h2>
      <p>Payments are processed through an independent Payment Provider.</p>
      <p>Depending on the payment arrangement, we may receive:</p>
      <ul>
        <li>Payment Method type;</li>
        <li>card brand;</li>
        <li>last digits of the payment card;</li>
        <li>card expiry information in limited or tokenised form;</li>
        <li>issuing country;</li>
        <li>billing country;</li>
        <li>transaction reference;</li>
        <li>payment status;</li>
        <li>payment amount and currency;</li>
        <li>payment authentication result;</li>
        <li>3D Secure result;</li>
        <li>tokenised payment identifier;</li>
        <li>fraud or risk indicators;</li>
        <li>refund status;</li>
        <li>chargeback information; and</li>
        <li>limited information needed to identify and reconcile the payment.</li>
      </ul>
      <p>ConSkins does not intentionally store complete payment card numbers, card security codes, PINs or online banking passwords on its own servers.</p>
      <p>Full payment credentials are handled by the relevant Payment Provider and other participants in the payment process.</p>

      <h2>10. Identity and Verification Data</h2>
      <p>Where identity, age, payment ownership, fraud or sanctions verification is required, we or an authorised provider may collect:</p>
      <ul>
        <li>full legal name;</li>
        <li>date of birth;</li>
        <li>residential address;</li>
        <li>country of residence;</li>
        <li>nationality;</li>
        <li>telephone number;</li>
        <li>identity document type and number;</li>
        <li>passport, identity card, driving licence or residence permit;</li>
        <li>proof of address;</li>
        <li>photograph or selfie;</li>
        <li>video or liveness verification;</li>
        <li>document authenticity results;</li>
        <li>facial comparison results;</li>
        <li>Payment Method ownership evidence;</li>
        <li>redacted payment records;</li>
        <li>source-of-funds information;</li>
        <li>transaction explanations;</li>
        <li>sanctions screening results;</li>
        <li>politically exposed person screening results;</li>
        <li>fraud-prevention results;</li>
        <li>verification status;</li>
        <li>reasons for failed or incomplete verification; and</li>
        <li>correspondence relating to verification.</li>
      </ul>
      <p>Where facial verification generates biometric data used to uniquely identify a person, such data will be processed only where an applicable legal condition permits it.</p>
      <p>An external verification provider may process the underlying document, image or biometric information and provide ConSkins with a result rather than the complete source data.</p>

      <h2>11. Fraud, Security and Compliance Data</h2>
      <p>To protect Accounts, payments and the Service, we may collect or generate:</p>
      <ul>
        <li>risk scores;</li>
        <li>fraud indicators;</li>
        <li>payment anomalies;</li>
        <li>sanctions alerts;</li>
        <li>identity inconsistencies;</li>
        <li>suspected multiple-Account links;</li>
        <li>device associations;</li>
        <li>transaction patterns;</li>
        <li>disputed payment information;</li>
        <li>chargeback records;</li>
        <li>Steam reversal records;</li>
        <li>suspected phishing information;</li>
        <li>Account compromise reports;</li>
        <li>suspicious IP or location information;</li>
        <li>records of policy violations;</li>
        <li>investigation notes;</li>
        <li>restriction or suspension reasons;</li>
        <li>evidence submitted by a User;</li>
        <li>information received from fraud-prevention providers; and</li>
        <li>information received from banks, Payment Providers or competent authorities.</li>
      </ul>
      <p>This information may include allegations or indicators that require further investigation and do not necessarily establish wrongdoing.</p>

      <h2>12. Technical and Device Data</h2>
      <p>When you access ConSkins, we may automatically collect:</p>
      <ul>
        <li>IP address;</li>
        <li>approximate location derived from IP address;</li>
        <li>browser type and version;</li>
        <li>device type;</li>
        <li>operating system;</li>
        <li>screen and language settings;</li>
        <li>device identifiers;</li>
        <li>session identifiers;</li>
        <li>login dates and times;</li>
        <li>pages viewed;</li>
        <li>actions performed;</li>
        <li>referring website;</li>
        <li>error reports;</li>
        <li>server logs;</li>
        <li>security events;</li>
        <li>network information;</li>
        <li>cookie identifiers;</li>
        <li>consent preferences;</li>
        <li>performance information; and</li>
        <li>other technical information reasonably necessary to operate and secure the Service.</li>
      </ul>
      <p>We do not use precise GPS location unless a specific feature requires it and an appropriate notice and lawful basis are provided.</p>

      <h2>13. Communications and Support Data</h2>
      <p>When you contact us, we may collect:</p>
      <ul>
        <li>your name;</li>
        <li>email address;</li>
        <li>Account identifier;</li>
        <li>Order and transaction references;</li>
        <li>Steam information;</li>
        <li>the content of your message;</li>
        <li>attachments;</li>
        <li>screenshots;</li>
        <li>Trade Offer evidence;</li>
        <li>complaint details;</li>
        <li>refund requests;</li>
        <li>support history;</li>
        <li>dates and times of communications;</li>
        <li>our responses; and</li>
        <li>information necessary to investigate and resolve the matter.</li>
      </ul>
      <p>You should not send complete payment card numbers, card security codes, passwords or authentication codes to customer support.</p>

      <h2>14. Marketing and Preference Data</h2>
      <p>Where marketing communications are offered, we may collect:</p>
      <ul>
        <li>email address;</li>
        <li>marketing consent;</li>
        <li>date and method of consent;</li>
        <li>products or topics of interest;</li>
        <li>email interaction information where permitted;</li>
        <li>opt-out requests;</li>
        <li>suppression-list status; and</li>
        <li>communication preferences.</li>
      </ul>
      <p>Service and security communications are not marketing communications and may be sent where necessary to administer your Account or transactions.</p>

      <h2>15. Cookie and Similar Technology Data</h2>
      <p>We may use cookies, local storage, pixels, scripts and similar technologies to:</p>
      <ul>
        <li>maintain login sessions;</li>
        <li>remember settings;</li>
        <li>secure the Website;</li>
        <li>prevent fraud;</li>
        <li>manage consent;</li>
        <li>measure performance;</li>
        <li>understand use of the Website;</li>
        <li>diagnose errors; and</li>
        <li>provide optional analytics or marketing functionality.</li>
      </ul>
      <p>Strictly necessary technologies may be used without optional consent where permitted by law.</p>
      <p>Non-essential cookies and similar technologies will be used only where an appropriate legal basis, including consent where required, is available.</p>
      <p>Further details are provided in the Cookie Policy.</p>

      <h2>16. Data We Receive from You</h2>
      <p>We collect personal data directly from you when you:</p>
      <ul>
        <li>register an Account;</li>
        <li>provide or update Account information;</li>
        <li>link Steam;</li>
        <li>provide a Steam Trade URL;</li>
        <li>top up the Balance;</li>
        <li>place an Order;</li>
        <li>communicate with support;</li>
        <li>submit a complaint;</li>
        <li>request a refund;</li>
        <li>request Account closure;</li>
        <li>complete verification;</li>
        <li>respond to a security review;</li>
        <li>subscribe to marketing; or</li>
        <li>otherwise provide information to us.</li>
      </ul>

      <h2>17. Data We Receive from Steam</h2>
      <p>We may receive information from Steam when you:</p>
      <ul>
        <li>link a Steam Account;</li>
        <li>authenticate or confirm Steam information;</li>
        <li>provide a Steam ID or Trade URL;</li>
        <li>place an Order;</li>
        <li>receive a Trade Offer;</li>
        <li>accept or reject a Trade Offer;</li>
        <li>experience a trade restriction;</li>
        <li>reverse an eligible Steam trade; or</li>
        <li>request investigation of a delivery issue.</li>
      </ul>
      <p>Steam processes personal data under its own terms and privacy policy.</p>

      <h2>18. Data We Receive from Payment and Verification Providers</h2>
      <p>We may receive information from:</p>
      <ul>
        <li>Payment Providers;</li>
        <li>banks;</li>
        <li>card issuers;</li>
        <li>payment networks;</li>
        <li>identity verification providers;</li>
        <li>fraud-prevention providers;</li>
        <li>sanctions screening providers; and</li>
        <li>authentication services.</li>
      </ul>
      <p>This may include transaction status, authentication results, verification results, risk indicators, chargebacks, reversals and limited Payment Method information.</p>

      <h2>19. Data We Receive from Other Sources</h2>
      <p>We may receive personal data from:</p>
      <ul>
        <li>technology and fulfilment providers;</li>
        <li>hosting and security providers;</li>
        <li>customer support systems;</li>
        <li>analytics providers;</li>
        <li>public sanctions lists;</li>
        <li>public Steam profiles;</li>
        <li>publicly available sources;</li>
        <li>professional advisers;</li>
        <li>law enforcement authorities;</li>
        <li>courts;</li>
        <li>regulators;</li>
        <li>complainants; and</li>
        <li>persons reporting suspected fraud or misuse.</li>
      </ul>
      <p>We will assess the reliability and relevance of information received from other sources before relying on it for a material decision.</p>

      <h2>20. Purposes and Lawful Bases</h2>
      <p>We process personal data only where an appropriate lawful basis applies.</p>
      <p>Depending on the activity, we may rely on:</p>
      <ul>
        <li>performance of a contract;</li>
        <li>steps taken at your request before entering into a contract;</li>
        <li>compliance with a legal obligation;</li>
        <li>our legitimate interests or those of a third party;</li>
        <li>your consent;</li>
        <li>establishment, exercise or defence of legal claims;</li>
        <li>substantial public interest conditions permitted by law; or</li>
        <li>another lawful basis available under applicable data protection law.</li>
      </ul>

      <h2>21. Account Administration</h2>
      <p>We process Account and registration data to:</p>
      <ul>
        <li>create the Account;</li>
        <li>verify the email address;</li>
        <li>authenticate access;</li>
        <li>maintain Account settings;</li>
        <li>link Steam;</li>
        <li>display Account and transaction information;</li>
        <li>provide customer support;</li>
        <li>process Account closure; and</li>
        <li>enforce the Terms and Policies.</li>
      </ul>
      <p>The principal lawful basis is performance of our contract with you or taking steps at your request before entering into that contract.</p>
      <p>Security-related processing may also be based on our legitimate interests in protecting Users and the Service.</p>

      <h2>22. Balance, Payments and Orders</h2>
      <p>We process payment, Balance and transaction data to:</p>
      <ul>
        <li>process Top-Ups;</li>
        <li>credit and maintain the Balance;</li>
        <li>process Orders;</li>
        <li>arrange Digital Item delivery;</li>
        <li>issue refunds;</li>
        <li>reconcile transactions;</li>
        <li>respond to payment errors;</li>
        <li>investigate disputed payments;</li>
        <li>process Account closure refunds; and</li>
        <li>maintain transaction records.</li>
      </ul>
      <p>The principal lawful bases are:</p>
      <ul>
        <li>performance of our contract with you;</li>
        <li>compliance with legal obligations;</li>
        <li>our legitimate interests in accurate accounting, transaction administration and dispute resolution; and</li>
        <li>establishment, exercise or defence of legal claims.</li>
      </ul>

      <h2>23. Steam Linking and Digital Item Delivery</h2>
      <p>We process Steam data to:</p>
      <ul>
        <li>link the correct Steam Account;</li>
        <li>verify the Steam destination;</li>
        <li>validate the Trade URL;</li>
        <li>arrange a Steam Trade Offer;</li>
        <li>confirm delivery;</li>
        <li>investigate failed or incorrect delivery;</li>
        <li>manage Steam trade reversals; and</li>
        <li>prevent fraud and trade redirection.</li>
      </ul>
      <p>The principal lawful bases are:</p>
      <ul>
        <li>performance of our contract with you;</li>
        <li>taking steps at your request;</li>
        <li>our legitimate interests in secure and accurate delivery; and</li>
        <li>establishment, exercise or defence of legal claims.</li>
      </ul>

      <h2>24. Fraud Prevention and Security</h2>
      <p>We process personal data to:</p>
      <ul>
        <li>authenticate Users;</li>
        <li>protect Accounts;</li>
        <li>prevent stolen Payment Method use;</li>
        <li>identify unauthorised transactions;</li>
        <li>detect multiple-Account abuse;</li>
        <li>prevent phishing and Account takeover;</li>
        <li>detect technical misuse;</li>
        <li>respond to Chargebacks;</li>
        <li>investigate Steam reversals;</li>
        <li>protect Digital Item delivery;</li>
        <li>enforce transaction limits;</li>
        <li>secure the Website; and</li>
        <li>protect our Users, service providers and business.</li>
      </ul>
      <p>The principal lawful bases are:</p>
      <ul>
        <li>our legitimate interests in preventing fraud and protecting the Service;</li>
        <li>compliance with legal obligations;</li>
        <li>performance of our contract;</li>
        <li>establishment, exercise or defence of legal claims; and</li>
        <li>substantial public interest conditions where special category or criminal offence data is lawfully processed for fraud prevention.</li>
      </ul>
      <p>We assess legitimate interests against your rights and reasonable expectations.</p>

      <h2>25. Identity, Age and Payment Ownership Verification</h2>
      <p>We may process identity and verification data to:</p>
      <ul>
        <li>confirm that the User is at least 18;</li>
        <li>confirm identity;</li>
        <li>verify Payment Method ownership;</li>
        <li>investigate inconsistent information;</li>
        <li>prevent fraud;</li>
        <li>complete a refund;</li>
        <li>process Account closure;</li>
        <li>respond to provider requirements; and</li>
        <li>comply with law.</li>
      </ul>
      <p>The lawful basis may include:</p>
      <ul>
        <li>performance of our contract;</li>
        <li>compliance with a legal obligation;</li>
        <li>our legitimate interests in preventing fraud and ensuring Account integrity;</li>
        <li>substantial public interest conditions permitted by law; and</li>
        <li>consent where consent is appropriate and legally valid.</li>
      </ul>
      <p>We will not rely on consent where the processing is not genuinely optional.</p>

      <h2>26. Sanctions and Legal Compliance</h2>
      <p>We process personal data to:</p>
      <ul>
        <li>screen against applicable sanctions lists;</li>
        <li>identify Restricted Jurisdictions;</li>
        <li>respond to legally binding requests;</li>
        <li>prevent sanctions evasion;</li>
        <li>maintain accounting and tax records;</li>
        <li>comply with court orders;</li>
        <li>comply with regulatory obligations; and</li>
        <li>protect legal rights.</li>
      </ul>
      <p>The lawful bases may include:</p>
      <ul>
        <li>compliance with legal obligations;</li>
        <li>our legitimate interests in avoiding unlawful transactions and managing legal risk;</li>
        <li>substantial public interest conditions; and</li>
        <li>establishment, exercise or defence of legal claims.</li>
      </ul>

      <h2>27. Service Improvement and Analytics</h2>
      <p>We may process technical and usage data to:</p>
      <ul>
        <li>understand how the Website is used;</li>
        <li>diagnose errors;</li>
        <li>improve navigation and performance;</li>
        <li>test functionality;</li>
        <li>measure service reliability;</li>
        <li>identify popular features;</li>
        <li>improve customer support;</li>
        <li>prevent misuse; and</li>
        <li>plan service development.</li>
      </ul>
      <p>Depending on the technology, the lawful basis may be:</p>
      <ul>
        <li>our legitimate interests in improving and operating the Service; or</li>
        <li>your consent where consent is required for non-essential cookies or analytics technologies.</li>
      </ul>

      <h2>28. Communications</h2>
      <p>We process contact and communication data to:</p>
      <ul>
        <li>respond to questions;</li>
        <li>investigate delivery issues;</li>
        <li>resolve complaints;</li>
        <li>provide transaction notices;</li>
        <li>send security alerts;</li>
        <li>communicate Policy changes;</li>
        <li>provide Account information; and</li>
        <li>maintain support records.</li>
      </ul>
      <p>The lawful bases may include:</p>
      <ul>
        <li>performance of our contract;</li>
        <li>compliance with legal obligations;</li>
        <li>our legitimate interests in customer support and record keeping; and</li>
        <li>establishment, exercise or defence of legal claims.</li>
      </ul>

      <h2>29. Direct Marketing</h2>
      <p>Where permitted, we may send information about ConSkins products, features or promotions.</p>
      <p>We may rely on:</p>
      <ul>
        <li>your consent; or</li>
        <li>an applicable existing-customer exception where the legal requirements are met.</li>
      </ul>
      <p>You may unsubscribe at any time by:</p>
      <ul>
        <li>using the unsubscribe link in the communication;</li>
        <li>changing available Account preferences; or</li>
        <li>emailing info@conskins.com.</li>
      </ul>
      <p>Withdrawing from marketing does not affect essential service, payment, security, legal or Account communications.</p>
      <p>We may retain limited suppression-list information to ensure that your opt-out is respected.</p>

      <h2>30. Legal Claims and Disputes</h2>
      <p>We may process and retain relevant personal data to:</p>
      <ul>
        <li>establish facts;</li>
        <li>investigate a complaint;</li>
        <li>respond to a Chargeback;</li>
        <li>recover amounts owed;</li>
        <li>defend a legal claim;</li>
        <li>enforce our Terms;</li>
        <li>obtain legal advice;</li>
        <li>respond to authorities; and</li>
        <li>protect our legal rights.</li>
      </ul>
      <p>The lawful bases may include:</p>
      <ul>
        <li>our legitimate interests;</li>
        <li>compliance with a legal obligation; and</li>
        <li>establishment, exercise or defence of legal claims.</li>
      </ul>

      <h2>31. Special Category Data</h2>
      <p>ConSkins does not ordinarily seek to collect special category personal data.</p>
      <p>However, special category data may arise where:</p>
      <ul>
        <li>identity verification uses biometric data to uniquely identify a User;</li>
        <li>a User voluntarily includes sensitive information in support communications;</li>
        <li>sanctions or legal records reveal sensitive attributes; or</li>
        <li>processing is necessary in connection with a legal claim.</li>
      </ul>
      <p>Where special category data is processed, we will identify both:</p>
      <ul>
        <li>an Article 6 lawful basis; and</li>
        <li>an applicable special category condition.</li>
      </ul>
      <p>Depending on the circumstances, the condition may include:</p>
      <ul>
        <li>explicit consent;</li>
        <li>substantial public interest in preventing fraud;</li>
        <li>establishment, exercise or defence of legal claims; or</li>
        <li>another condition permitted by law.</li>
      </ul>
      <p>Users should avoid sending unnecessary health, political, religious or other sensitive information to customer support.</p>

      <h2>32. Criminal Offence Data</h2>
      <p>Fraud, account theft, payment abuse or law enforcement reports may involve criminal offence data.</p>
      <p>We will process such information only where authorised by law and subject to appropriate safeguards.</p>
      <p>Where required, we will maintain an appropriate policy document covering the processing.</p>
      <p>An allegation or risk indicator will not automatically be treated as proof that an offence occurred.</p>

      <h2>33. Automated Processing and Profiling</h2>
      <p>ConSkins and its service providers may use automated systems to:</p>
      <ul>
        <li>assess payment risk;</li>
        <li>identify unusual activity;</li>
        <li>detect possible fraud;</li>
        <li>link potentially related Accounts;</li>
        <li>identify location inconsistencies;</li>
        <li>screen against sanctions lists;</li>
        <li>prioritise transactions for review;</li>
        <li>apply transaction limits;</li>
        <li>request further authentication; and</li>
        <li>protect Accounts and the Service.</li>
      </ul>
      <p>An automated indicator may result in:</p>
      <ul>
        <li>a manual review;</li>
        <li>additional verification;</li>
        <li>delayed processing;</li>
        <li>a declined Top-Up;</li>
        <li>a temporary Balance restriction;</li>
        <li>cancellation of an Order; or</li>
        <li>Account suspension.</li>
      </ul>
      <p>ConSkins does not intend to make a decision producing legal or similarly significant effects based solely on automated processing unless:</p>
      <ul>
        <li>the decision is necessary for entering into or performing a contract;</li>
        <li>the decision is authorised by law;</li>
        <li>you have provided valid explicit consent where permitted; and</li>
        <li>appropriate safeguards are applied.</li>
      </ul>
      <p>Where applicable law gives you the right, you may request:</p>
      <ul>
        <li>human review;</li>
        <li>an opportunity to provide additional information;</li>
        <li>an explanation of the outcome; and</li>
        <li>reconsideration of the decision.</li>
      </ul>
      <p>Independent Payment Providers may make their own automated payment or risk decisions under their own privacy notices.</p>

      <h2>34. Sharing Personal Data</h2>
      <p>We may share personal data only where reasonably necessary for the purposes described in this Privacy Policy and where an appropriate legal basis applies.</p>
      <p>We may share personal data with the categories described below.</p>

      <h2>35. Payment Providers, Banks and Card Networks</h2>
      <p>We may share information with:</p>
      <ul>
        <li>Payment Providers;</li>
        <li>acquiring banks;</li>
        <li>card issuers;</li>
        <li>card networks;</li>
        <li>authentication providers;</li>
        <li>payment fraud-prevention services; and</li>
        <li>refund and Chargeback administrators.</li>
      </ul>
      <p>This sharing may be necessary to:</p>
      <ul>
        <li>process Top-Ups;</li>
        <li>authenticate payments;</li>
        <li>apply 3D Secure;</li>
        <li>prevent fraud;</li>
        <li>process refunds;</li>
        <li>respond to Chargebacks;</li>
        <li>reconcile transactions; and</li>
        <li>comply with payment rules.</li>
      </ul>
      <p>These organisations may act as processors, independent controllers or both, depending on the activity.</p>

      <h2>36. Identity, Fraud and Sanctions Providers</h2>
      <p>We may share personal data with providers that assist with:</p>
      <ul>
        <li>identity verification;</li>
        <li>age verification;</li>
        <li>document authentication;</li>
        <li>facial or liveness verification;</li>
        <li>Payment Method verification;</li>
        <li>sanctions screening;</li>
        <li>politically exposed person screening;</li>
        <li>fraud detection;</li>
        <li>device and transaction risk analysis; and</li>
        <li>Account security.</li>
      </ul>
      <p>We will limit disclosure to information reasonably required for the relevant service.</p>

      <h2>37. Steam, Technology and Fulfilment Providers</h2>
      <p>We may share relevant information with:</p>
      <ul>
        <li>Steam or Valve where necessary;</li>
        <li>Digital Item inventory providers;</li>
        <li>technology integration providers;</li>
        <li>fulfilment providers;</li>
        <li>providers involved in creating or monitoring Trade Offers; and</li>
        <li>providers assisting with delivery investigation.</li>
      </ul>
      <p>Information shared may include:</p>
      <ul>
        <li>Steam ID;</li>
        <li>Steam Trade URL;</li>
        <li>Order reference;</li>
        <li>Digital Item information;</li>
        <li>delivery status;</li>
        <li>Trade Offer information;</li>
        <li>security indicators; and</li>
        <li>information required to investigate a failed or disputed transfer.</li>
      </ul>
      <p>The identity and commercial arrangements of individual providers may constitute confidential business information.</p>
      <p>This does not limit your rights to receive the privacy information required by applicable law.</p>

      <h2>38. Hosting, Security and Operational Providers</h2>
      <p>We may use service providers for:</p>
      <ul>
        <li>website hosting;</li>
        <li>cloud infrastructure;</li>
        <li>databases;</li>
        <li>content delivery;</li>
        <li>cybersecurity;</li>
        <li>email delivery;</li>
        <li>customer support;</li>
        <li>error monitoring;</li>
        <li>analytics;</li>
        <li>consent management;</li>
        <li>document storage;</li>
        <li>accounting;</li>
        <li>communications; and</li>
        <li>technical maintenance.</li>
      </ul>
      <p>These providers may process personal data only to the extent required to provide their services and subject to appropriate contractual and security measures.</p>

      <h2>39. Professional Advisers</h2>
      <p>We may disclose personal data where reasonably necessary to:</p>
      <ul>
        <li>lawyers;</li>
        <li>accountants;</li>
        <li>auditors;</li>
        <li>tax advisers;</li>
        <li>insurers;</li>
        <li>consultants; and</li>
        <li>other professional advisers</li>
      </ul>
      <p>for legal advice, compliance, financial administration, insurance, audits or dispute resolution.</p>

      <h2>40. Authorities and Legal Recipients</h2>
      <p>We may disclose personal data to:</p>
      <ul>
        <li>law enforcement agencies;</li>
        <li>courts;</li>
        <li>regulators;</li>
        <li>tax authorities;</li>
        <li>sanctions authorities;</li>
        <li>data protection authorities;</li>
        <li>consumer protection bodies; and</li>
        <li>other competent authorities</li>
      </ul>
      <p>where:</p>
      <ul>
        <li>disclosure is required by law;</li>
        <li>a valid legal request is received;</li>
        <li>disclosure is necessary to prevent or investigate crime;</li>
        <li>disclosure is necessary to protect a person;</li>
        <li>disclosure is necessary to establish or defend legal rights; or</li>
        <li>another lawful basis applies.</li>
      </ul>
      <p>We may be prohibited from notifying you about certain requests or investigations.</p>

      <h2>41. Corporate Transactions</h2>
      <p>If CONDEO LTD is involved in:</p>
      <ul>
        <li>a merger;</li>
        <li>acquisition;</li>
        <li>corporate reorganisation;</li>
        <li>financing;</li>
        <li>sale of assets;</li>
        <li>transfer of the ConSkins business; or</li>
        <li>insolvency process,</li>
      </ul>
      <p>personal data may be disclosed to potential or actual purchasers, advisers, financiers or successor operators.</p>
      <p>Any recipient will be required to protect the information and use it only for lawful purposes.</p>

      <h2>42. No Sale of Personal Data</h2>
      <p>ConSkins does not sell personal data in exchange for money.</p>
      <p>We do not disclose personal data to unrelated third parties so that they may independently market their products to you without an appropriate legal basis.</p>

      <h2>43. International Data Transfers</h2>
      <p>Some service providers or recipients may be located outside the United Kingdom or may access personal data from another country.</p>
      <p>When personal data is transferred from the UK to a country not covered by applicable UK adequacy regulations, we will use an appropriate transfer mechanism where required, such as:</p>
      <ul>
        <li>the UK International Data Transfer Agreement;</li>
        <li>the UK Addendum to the European Commission’s Standard Contractual Clauses;</li>
        <li>another approved contractual safeguard;</li>
        <li>binding corporate rules;</li>
        <li>an applicable statutory exception; or</li>
        <li>another mechanism permitted by UK data protection law.</li>
      </ul>
      <p>Where required, we will assess whether supplementary contractual, organisational or technical measures are necessary.</p>

      <h2>44. EEA and Other International Transfers</h2>
      <p>Where the EU GDPR or another applicable data protection law applies, transfers may be protected using:</p>
      <ul>
        <li>an applicable adequacy decision;</li>
        <li>the European Commission’s Standard Contractual Clauses;</li>
        <li>binding corporate rules;</li>
        <li>an applicable legal exception; or</li>
        <li>another permitted safeguard.</li>
      </ul>
      <p>The transfer mechanism used may depend on:</p>
      <ul>
        <li>the country;</li>
        <li>the recipient;</li>
        <li>the purpose of the transfer;</li>
        <li>the type of data; and</li>
        <li>the law applicable to the transfer.</li>
      </ul>
      <p>You may contact us for further information about safeguards relevant to your personal data.</p>

      <h2>45. Data Security</h2>
      <p>We use appropriate technical and organisational measures designed to protect personal data against:</p>
      <ul>
        <li>unauthorised access;</li>
        <li>unlawful use;</li>
        <li>accidental loss;</li>
        <li>alteration;</li>
        <li>disclosure;</li>
        <li>destruction;</li>
        <li>fraud;</li>
        <li>account takeover; and</li>
        <li>other security risks.</li>
      </ul>
      <p>Measures may include:</p>
      <ul>
        <li>access controls;</li>
        <li>password hashing;</li>
        <li>encryption in transit;</li>
        <li>encryption at rest where appropriate;</li>
        <li>network and application security;</li>
        <li>monitoring and logging;</li>
        <li>authentication controls;</li>
        <li>role-based access;</li>
        <li>backups;</li>
        <li>vulnerability management;</li>
        <li>provider due diligence;</li>
        <li>incident-response procedures;</li>
        <li>staff confidentiality obligations; and</li>
        <li>data minimisation.</li>
      </ul>
      <p>No online service can guarantee complete security.</p>
      <p>You are responsible for protecting your password, email account, devices and linked Steam Account.</p>

      <h2>46. Personal Data Breaches</h2>
      <p>If a personal data breach occurs, we will:</p>
      <ul>
        <li>investigate the incident;</li>
        <li>take reasonable steps to contain it;</li>
        <li>assess the risks to affected individuals;</li>
        <li>document the incident;</li>
        <li>notify the Information Commissioner’s Office where legally required; and</li>
        <li>notify affected individuals without undue delay where the breach is likely to result in a high risk to their rights and freedoms.</li>
      </ul>
      <p>Where a report to the Information Commissioner’s Office is required, we will make it without undue delay and, where feasible, within the legally applicable 72-hour period after becoming aware of the breach.</p>

      <h2>47. Retention Principles</h2>
      <p>We retain personal data only for as long as reasonably necessary for the purposes for which it was collected, including:</p>
      <ul>
        <li>providing the Service;</li>
        <li>administering the Account;</li>
        <li>completing transactions;</li>
        <li>processing refunds;</li>
        <li>maintaining accounting records;</li>
        <li>preventing fraud;</li>
        <li>resolving complaints;</li>
        <li>responding to Chargebacks;</li>
        <li>complying with law;</li>
        <li>enforcing agreements; and</li>
        <li>establishing, exercising or defending legal claims.</li>
      </ul>
      <p>Retention may depend on:</p>
      <ul>
        <li>whether the Account remains open;</li>
        <li>the type of record;</li>
        <li>the date of the last transaction;</li>
        <li>an ongoing dispute;</li>
        <li>a legal limitation period;</li>
        <li>a provider requirement;</li>
        <li>an investigation;</li>
        <li>a legal preservation obligation; or</li>
        <li>a request from a competent authority.</li>
      </ul>

      <h2>48. Indicative Retention Periods</h2>
      <p>Unless a longer or shorter period is justified, we may apply the following indicative periods:</p>
      <h3>48.1 Account and Profile Data</h3>
      <p>Account and profile data may be retained while the Account remains open and for up to six years after closure where necessary for contractual records, disputes, fraud prevention or legal claims.</p>
      <p>Data that is not required after Account closure may be deleted or anonymised sooner.</p>
      <h3>48.2 Balance, Payment and Order Data</h3>
      <p>Top-Up, Balance, payment, Order, refund and delivery records may be retained for up to six years after the relevant transaction or end of the business relationship, or longer where required by law, an unresolved dispute or a legal preservation obligation.</p>
      <h3>48.3 Verification Data</h3>
      <p>Identity and verification data may be retained for the duration of the Account and for a reasonable period after the relationship ends where necessary for fraud prevention, provider requirements, legal claims or compliance obligations.</p>
      <p>Underlying identity documents may be deleted earlier where only the verification result is required.</p>
      <h3>48.4 Security and Technical Logs</h3>
      <p>Routine security, login and technical logs may generally be retained for up to 24 months.</p>
      <p>Relevant records may be retained longer where connected to:</p>
      <ul>
        <li>fraud;</li>
        <li>an Account compromise;</li>
        <li>a Chargeback;</li>
        <li>a complaint;</li>
        <li>a security incident;</li>
        <li>a legal claim; or</li>
        <li>an authority request.</li>
      </ul>
      <h3>48.5 Support and Complaint Records</h3>
      <p>Support, complaint and dispute records may be retained for up to six years after the matter is resolved where necessary to demonstrate how it was handled or to protect legal rights.</p>
      <h3>48.6 Marketing Data</h3>
      <p>Marketing preferences may be retained while you remain subscribed.</p>
      <p>Limited suppression-list data may be retained after an opt-out to ensure that further marketing is not sent against your wishes.</p>
      <h3>48.7 Cookie Data</h3>
      <p>Cookie and similar technology retention periods are described in the Cookie Policy and consent interface.</p>

      <h2>49. Anonymisation and Deletion</h2>
      <p>When personal data is no longer required, we may:</p>
      <ul>
        <li>securely delete it;</li>
        <li>anonymise it;</li>
        <li>aggregate it;</li>
        <li>remove direct identifiers; or</li>
        <li>retain only the limited information necessary for a legal or security purpose.</li>
      </ul>
      <p>Properly anonymised information that can no longer identify an individual is not personal data and may be retained for statistical, security or service-improvement purposes.</p>

      <h2>50. Account Closure</h2>
      <p>You may request permanent Account closure by emailing:</p>
      <p>info@conskins.com</p>
      <p>The request should be sent from the email address registered to the Account.</p>
      <p>Before closure, we may need to:</p>
      <ul>
        <li>verify Account ownership;</li>
        <li>complete or cancel active Orders;</li>
        <li>process eligible Balance refunds;</li>
        <li>resolve pending Steam Trade Offers;</li>
        <li>investigate fraud or Account compromise;</li>
        <li>resolve Chargebacks;</li>
        <li>comply with sanctions restrictions; or</li>
        <li>retain information required by law.</li>
      </ul>
      <p>Closing an Account does not require immediate deletion of every record.</p>
      <p>We may retain limited information where necessary for:</p>
      <ul>
        <li>accounting;</li>
        <li>fraud prevention;</li>
        <li>legal obligations;</li>
        <li>unresolved complaints;</li>
        <li>payment disputes;</li>
        <li>sanctions compliance;</li>
        <li>enforcement of agreements; or</li>
        <li>legal claims.</li>
      </ul>

      <h2>51. Children</h2>
      <p>ConSkins is intended only for individuals aged 18 or over.</p>
      <p>We do not knowingly permit children or minors to create or use an Account.</p>
      <p>If we reasonably believe that a User is under 18, we may:</p>
      <ul>
        <li>request age verification;</li>
        <li>restrict the Account;</li>
        <li>cancel pending Orders;</li>
        <li>close the Account; and</li>
        <li>delete or retain relevant information in accordance with law.</li>
      </ul>
      <p>A parent or guardian who believes that a minor has provided personal data to ConSkins may contact info@conskins.com.</p>

      <h2>52. Your Data Protection Rights</h2>
      <p>Depending on the law applicable to you, you may have the rights described below.</p>
      <p>These rights are not absolute and may be subject to legal conditions, exemptions and the rights of other persons.</p>

      <h2>53. Right to Be Informed</h2>
      <p>You have the right to receive clear information about how your personal data is collected and used.</p>
      <p>This Privacy Policy is intended to provide that information.</p>
      <p>Additional notices may be provided at the point where specific information is collected.</p>

      <h2>54. Right of Access</h2>
      <p>You may request:</p>
      <ul>
        <li>confirmation that we process your personal data;</li>
        <li>access to that personal data; and</li>
        <li>supplementary information about the processing.</li>
      </ul>
      <p>We may need to verify your identity before disclosing personal data.</p>
      <p>We will not disclose information that would unlawfully reveal another person’s data, compromise security or breach a legal restriction.</p>

      <h2>55. Right to Rectification</h2>
      <p>You may ask us to correct inaccurate personal data or complete incomplete information.</p>
      <p>Some Account information may be updated through Account settings.</p>
      <p>We may require supporting evidence before changing identity, transaction or payment-related information.</p>

      <h2>56. Right to Erasure</h2>
      <p>You may ask us to delete personal data in certain circumstances.</p>
      <p>The right to erasure does not apply where processing remains necessary for:</p>
      <ul>
        <li>compliance with law;</li>
        <li>accounting or transaction records;</li>
        <li>fraud prevention;</li>
        <li>sanctions compliance;</li>
        <li>freedom of expression;</li>
        <li>public interest purposes;</li>
        <li>establishment, exercise or defence of legal claims; or</li>
        <li>another lawful exception.</li>
      </ul>
      <p>Account closure and data erasure are related but separate processes.</p>

      <h2>57. Right to Restriction</h2>
      <p>You may ask us to restrict processing in certain circumstances, including while:</p>
      <ul>
        <li>the accuracy of data is being verified;</li>
        <li>an objection is being considered;</li>
        <li>processing is disputed as unlawful; or</li>
        <li>information is required for a legal claim.</li>
      </ul>
      <p>Restricted data may continue to be stored and processed where legally permitted.</p>

      <h2>58. Right to Object</h2>
      <p>You may object to processing based on legitimate interests.</p>
      <p>We will stop the processing unless:</p>
      <ul>
        <li>we demonstrate compelling legitimate grounds that override your interests, rights and freedoms;</li>
        <li>the processing is necessary for legal claims; or</li>
        <li>another lawful reason permits continued processing.</li>
      </ul>
      <p>You may object to direct marketing at any time.</p>

      <h2>59. Right to Data Portability</h2>
      <p>Where processing is based on consent or contract and carried out by automated means, you may have the right to receive certain personal data in a structured, commonly used and machine-readable format.</p>
      <p>Where technically feasible and legally required, you may request transmission to another controller.</p>

      <h2>60. Right to Withdraw Consent</h2>
      <p>Where processing is based on consent, you may withdraw consent at any time.</p>
      <p>Withdrawal does not affect processing carried out lawfully before consent was withdrawn.</p>
      <p>Withdrawal may affect optional features that depend on the relevant consent.</p>

      <h2>61. Rights Relating to Automated Decisions</h2>
      <p>Where applicable law provides the right, you may object to a decision based solely on automated processing that produces legal or similarly significant effects.</p>
      <p>You may also request:</p>
      <ul>
        <li>human intervention;</li>
        <li>an opportunity to express your position;</li>
        <li>reconsideration; and</li>
        <li>information about the decision.</li>
      </ul>

      <h2>62. How to Exercise Your Rights</h2>
      <p>Requests should be sent to:</p>
      <p>info@conskins.com</p>
      <p>Please include:</p>
      <ul>
        <li>your registered email address;</li>
        <li>the right you wish to exercise;</li>
        <li>sufficient information to identify the relevant data; and</li>
        <li>any information reasonably necessary to verify your identity.</li>
      </ul>
      <p>You do not need to use specific legal terminology.</p>
      <p>We will respond without undue delay and ordinarily within one month after receiving the request or any necessary identity verification.</p>
      <p>Where permitted, the period may be extended by up to two additional months if the request is complex or multiple requests are received. We will inform you of an extension and the reason for it.</p>

      <h2>63. Identity Verification for Rights Requests</h2>
      <p>Before responding to a request, we may ask for information reasonably necessary to confirm:</p>
      <ul>
        <li>your identity;</li>
        <li>ownership of the Account;</li>
        <li>authority to act for another person; or</li>
        <li>the scope of the request.</li>
      </ul>
      <p>We will not request more information than is reasonably necessary.</p>
      <p>The response period may begin after necessary identity information has been received, as permitted by applicable law.</p>

      <h2>64. Fees and Refusal</h2>
      <p>Data protection requests are generally handled without charge.</p>
      <p>Where permitted by law, we may charge a reasonable fee or refuse to act where a request is manifestly unfounded or excessive, including because it is repetitive.</p>
      <p>If we refuse or charge a fee, we will explain the reason and inform you of available complaint rights.</p>

      <h2>65. Data Protection Complaints</h2>
      <p>You may submit a complaint about our use of personal data by emailing:</p>
      <p>info@conskins.com</p>
      <p>Please include:</p>
      <ul>
        <li>your registered email address;</li>
        <li>a description of the concern;</li>
        <li>relevant dates;</li>
        <li>relevant Account, Order or transaction references;</li>
        <li>supporting information; and</li>
        <li>the resolution requested.</li>
      </ul>
      <p>We will:</p>
      <ul>
        <li>provide a clear method for raising the complaint;</li>
        <li>acknowledge receipt within 30 days;</li>
        <li>take appropriate steps to investigate;</li>
        <li>keep you informed where appropriate; and</li>
        <li>communicate the outcome without undue delay.</li>
      </ul>

      <h2>66. Complaints to the Information Commissioner</h2>
      <p>You also have the right to complain to the United Kingdom Information Commissioner’s Office.</p>
      <p>We encourage you to contact ConSkins first so that we have an opportunity to investigate, but you are not required to do so before contacting the supervisory authority.</p>
      <p>If you live outside the United Kingdom, you may also have the right to complain to the data protection authority responsible for your country or region.</p>

      <h2>67. Third-Party Links</h2>
      <p>The Website may contain links to external websites or services.</p>
      <p>ConSkins is not responsible for the privacy practices of an independent third party.</p>
      <p>You should review the relevant privacy notice before providing personal data to an external service.</p>

      <h2>68. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy to reflect:</p>
      <ul>
        <li>changes to the Service;</li>
        <li>new payment or verification providers;</li>
        <li>changes to Steam integration;</li>
        <li>new functionality;</li>
        <li>changes in law;</li>
        <li>security improvements;</li>
        <li>operational changes; or</li>
        <li>corrections and clarifications.</li>
      </ul>
      <p>The updated Policy will be published on the Website with a revised “Last updated” date.</p>
      <p>Where a change materially affects your rights or how we use personal data, we will provide an appropriate notice through:</p>
      <ul>
        <li>the Website;</li>
        <li>your Account;</li>
        <li>email; or</li>
        <li>another suitable method.</li>
      </ul>

      <h2>69. Relationship with Other Policies</h2>
      <p>This Privacy Policy should be read together with:</p>
      <ul>
        <li>the Terms and Conditions;</li>
        <li>the Digital Item Delivery &amp; Steam Trade Policy;</li>
        <li>the ConSkins Balance, Payments &amp; Pricing Policy;</li>
        <li>the Refund, Cancellation &amp; Failed Delivery Policy;</li>
        <li>the Acceptable Use, Fraud Prevention &amp; Account Security Policy;</li>
        <li>the KYC &amp; Sanctions Policy;</li>
        <li>the Cookie Policy; and</li>
        <li>the Complaints &amp; Dispute Resolution Policy.</li>
      </ul>

      <h2>70. Contact Details</h2>
      <p>Questions, rights requests, Account closure requests and data protection complaints should be sent to:</p>
      <ContactBlock />
    </PolicyLayout>
  );
}
