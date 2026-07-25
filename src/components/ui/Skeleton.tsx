import React from "react";
import { twMerge } from "tailwind-merge";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
}

/** Shimmer placeholder block — pairs with the .skeleton utility in globals.css. */
export function Skeleton({ rounded = "md", className, ...rest }: SkeletonProps) {
  const radii = {
    sm: "rounded-[var(--radius-sm)]",
    md: "rounded-[var(--radius-md)]",
    lg: "rounded-[var(--radius-lg)]",
    xl: "rounded-[var(--radius-xl)]",
    full: "rounded-full",
  };
  return (
    <div
      aria-hidden
      className={twMerge("skeleton", radii[rounded], className)}
      {...rest}
    />
  );
}
