"use client";

import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";
import { PackageOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: React.ReactNode;
}

export function EmptyState({
  title,
  subtitle,
  actionLabel,
  actionHref,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-[var(--radius-xl)] border border-[color:var(--color-border)] bg-[color:var(--color-bg-secondary)] text-[color:var(--color-text-tertiary)]">
        {icon || <PackageOpen size={28} />}
      </div>
      <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[color:var(--color-text)]">
        {title}
      </h3>
      {subtitle && (
        <p className="max-w-sm text-sm text-[color:var(--color-text-secondary)]">{subtitle}</p>
      )}
      {actionLabel && actionHref && (
        <Button as={Link} href={actionHref} variant="secondary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
