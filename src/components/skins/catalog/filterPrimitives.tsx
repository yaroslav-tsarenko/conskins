"use client";

export function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2.5 font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-text-tertiary)]">
        {title}
      </div>
      {children}
    </div>
  );
}

export function ChipButton({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-[var(--radius-sm)] border font-medium transition",
        small ? "px-1.5 py-0.5 text-[11px]" : "px-2 py-1 text-xs",
        active
          ? "border-[color:var(--color-primary)]/70 bg-[color:var(--color-primary-tint)] text-[color:var(--color-text)]"
          : "border-[color:var(--color-border)] text-[color:var(--color-text-secondary)] hover:border-[color:var(--color-border-hover)]",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between text-sm text-[color:var(--color-text-secondary)]"
    >
      <span>{label}</span>
      <span
        className={`relative h-5 w-9 rounded-full transition ${
          checked ? "bg-[color:var(--color-primary)]" : "bg-[color:var(--color-bg-tertiary)]"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${
            checked ? "left-[18px] bg-[color:var(--color-primary-fg)]" : "left-0.5 bg-white"
          }`}
        />
      </span>
    </button>
  );
}

export function TextFilterInput({
  value,
  onChange,
  placeholder,
  mono,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  mono?: boolean;
}) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={[
        "w-full rounded-[var(--radius-md)] border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 py-2 text-sm text-[color:var(--color-text)] outline-none placeholder:text-[color:var(--color-text-tertiary)] focus:border-[color:var(--color-primary)]/60",
        mono ? "font-mono text-[13px]" : "",
      ].join(" ")}
    />
  );
}
