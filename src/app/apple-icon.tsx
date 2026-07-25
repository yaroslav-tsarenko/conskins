import { ImageResponse } from "next/og";

// Apple touch icon (180×180). Full-bleed dark tile with the ConSkins
// droplet mark — iOS applies its own corner rounding.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const droplet = `
<svg width="120" height="120" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="w" x1="16" y1="3" x2="16" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#4ade80"/><stop offset="0.32" stop-color="#a3e635"/>
      <stop offset="0.55" stop-color="#facc15"/><stop offset="0.78" stop-color="#fb923c"/>
      <stop offset="1" stop-color="#ef4444"/>
    </linearGradient>
    <linearGradient id="r" x1="4" y1="4" x2="28" y2="30" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#22D3EE"/>
    </linearGradient>
  </defs>
  <path d="M16 2.5C16 2.5 26.5 14.2 26.5 21.2C26.5 27 21.8 30 16 30C10.2 30 5.5 27 5.5 21.2C5.5 14.2 16 2.5 16 2.5Z" fill="url(#w)"/>
  <path d="M16 2.5C16 2.5 26.5 14.2 26.5 21.2C26.5 27 21.8 30 16 30C10.2 30 5.5 27 5.5 21.2C5.5 14.2 16 2.5 16 2.5Z" fill="none" stroke="url(#r)" stroke-width="1.6" stroke-linejoin="round"/>
  <path d="M10.5 20.5L16 10.5L21.5 20.5" fill="none" stroke="#0E1015" stroke-opacity="0.85" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E1015",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          width={120}
          height={120}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(droplet)}`}
          alt=""
        />
      </div>
    ),
    size
  );
}
