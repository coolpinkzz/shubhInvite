"use client";

import { cn } from "@/lib/utils";

export interface BackgroundPatternProps {
  className?: string;
}

/** Cream floral backdrop — swap pattern SVG for premium artwork later. */
export function BackgroundPattern({ className }: BackgroundPatternProps) {
  return (
    <div
      className={cn(
        "rmf-background-pattern pointer-events-none absolute inset-0",
        className,
      )}
      aria-hidden="true"
    />
  );
}
