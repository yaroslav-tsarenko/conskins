/**
 * Central brand identity for ConSkins.
 * Import from here instead of hardcoding company details in components.
 * Company credentials come from NEXT_PUBLIC_* env vars so legal info can be
 * rotated without a code change.
 */

const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "CONDEO LTD";
const companyNumber = process.env.NEXT_PUBLIC_COMPANY_NUMBER || "17225871";
const companyAddress =
  process.env.NEXT_PUBLIC_COMPANY_ADDRESS ||
  "Dept 6790, 196 High Road, Wood Green, London, United Kingdom, N22 8HH";
const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "info@conskins.com";

export const brand = {
  name: "conskins",
  displayName: "ConSkins",
  domain: "conskins.com",
  url: "https://conskins.com",
  tagline: "Trade CS2 skins smarter.",
  description:
    "ConSkins — buy premium CS2 skins with instant, secure Steam delivery. Browse thousands of skins with live float, pattern and price data, compare across markets, and track price history.",
  applicationName: "ConSkins",

  company: {
    legalName: companyName,
    number: companyNumber,
    addressLine: companyAddress,
  },

  contact: {
    email: companyEmail,
    emailB2B: companyEmail,
    emailHref: `mailto:${companyEmail}`,
    contactPage: "/contact",
  },

  social: {
    discord: "https://discord.gg/conskins",
    twitter: "@conskins",
    instagram: "https://www.instagram.com/conskins/",
  },

  disclaimer:
    "ConSkins is not affiliated with or endorsed by Valve Corporation. Counter-Strike 2 and related trademarks are the property of Valve Corporation.",
} as const;

export const brandAddressLine = brand.company.addressLine;

export const brandLegalLine = `${brand.company.legalName} · Company number ${brand.company.number} · ${brand.company.addressLine}`;
