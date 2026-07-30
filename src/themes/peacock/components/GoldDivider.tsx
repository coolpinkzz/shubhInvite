"use client";

import { cn } from "@/lib/utils";

import { ASSETS } from "./constants";
import type { GoldDividerProps } from "./types";

export function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div
      className={cn("mx-auto flex w-full max-w-xs items-center justify-center", className)}
      role="separator"
      aria-hidden="true"
    >
      {/* Decorative SVG — served directly (next/image does not optimize SVG). */}
      <img
        src={ASSETS.decorativeDivider}
        alt=""
        width={320}
        height={24}
        className="h-5 w-full max-w-[280px] object-contain opacity-80"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
