"use client";

import { cn } from "@/lib/utils";

import type { BackgroundTextureProps } from "./types";

/**
 * Soft ivory watercolor wash with champagne & gold radial light.
 */
export function BackgroundTexture({ className }: BackgroundTextureProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[#FFFDF8]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_38%,rgba(212,175,55,0.14)_0%,rgba(245,230,200,0.1)_32%,transparent_68%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_48%_40%_at_10%_12%,rgba(15,118,110,0.08)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_92%_88%,rgba(30,58,138,0.07)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_88%_14%,rgba(20,184,166,0.07)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_36%_at_8%_86%,rgba(212,175,55,0.1)_0%,transparent_52%)]" />

      <div className="pk-paper-grain absolute inset-0 opacity-[0.04] mix-blend-multiply" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_50%,transparent_48%,rgba(30,58,138,0.04)_100%)]" />
    </div>
  );
}
