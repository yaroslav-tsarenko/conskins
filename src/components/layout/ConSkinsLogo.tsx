/**
 * ConSkins mark — an angular hexagonal "vault" holding a volt shard/chevron:
 * the silhouette reads as both a gem (skin value) and a crosshair notch
 * (CS2 competitive DNA). Volt→ice gradient rim on graphite.
 * Original artwork — no game assets.
 */

export function ConSkinsMark({
  size = 28,
  className,
  monochrome = false,
}: {
  size?: number;
  className?: string;
  monochrome?: boolean;
}) {
  const uid = monochrome ? "cs-mono" : "cs";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id={`${uid}-volt`} x1="4" y1="4" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          {monochrome ? (
            <>
              <stop offset="0" stopColor="currentColor" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.6" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#B4FF39" />
              <stop offset="1" stopColor="#5AC8FF" />
            </>
          )}
        </linearGradient>
      </defs>
      {/* Hexagonal vault */}
      <path
        d="M16 2L27.5 8.5V23.5L16 30L4.5 23.5V8.5L16 2Z"
        fill={monochrome ? "none" : "#12151B"}
        stroke={`url(#${uid}-volt)`}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Volt shard — angular C-cut */}
      <path
        d="M20.5 10.5L14 10.5L10.5 16L14 21.5L20.5 21.5"
        stroke={`url(#${uid}-volt)`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Crosshair notch */}
      {!monochrome && (
        <circle cx="20.5" cy="16" r="1.6" fill="#B4FF39" />
      )}
    </svg>
  );
}

export function ConSkinsLogo({
  size = 20,
  showWordmark = true,
  layout = "horizontal",
  monochrome = false,
}: {
  size?: number;
  showWordmark?: boolean;
  layout?: "horizontal" | "stacked";
  monochrome?: boolean;
}) {
  const markSize = Math.max(22, Math.round(size * 1.5));
  const stacked = layout === "stacked";

  return (
    <span
      className={`inline-flex ${stacked ? "flex-col items-center gap-1.5" : "items-center gap-2.5"} leading-none`}
    >
      <ConSkinsMark size={stacked ? markSize * 1.3 : markSize} monochrome={monochrome} />
      {showWordmark && (
        <span
          className="font-display font-bold uppercase"
          style={{
            fontSize: size * 0.82,
            letterSpacing: "0.02em",
            color: monochrome ? "currentColor" : "var(--color-text)",
          }}
        >
          Con
          <span style={{ color: monochrome ? "currentColor" : "var(--color-primary)" }}>
            Skins
          </span>
        </span>
      )}
    </span>
  );
}
