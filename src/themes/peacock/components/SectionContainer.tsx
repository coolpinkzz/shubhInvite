"use client";

import { cn } from "@/lib/utils";

import type { SectionContainerProps } from "./types";

export function SectionContainer({
  children,
  className,
  id,
  as: Tag = "section",
  "aria-label": ariaLabel,
}: SectionContainerProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
