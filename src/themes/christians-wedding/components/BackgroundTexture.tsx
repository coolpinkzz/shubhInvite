"use client";

import { cn } from "@/lib/utils";

interface BackgroundTextureProps {
  className?: string;
}

/**
 * Soft watercolor paper wash — radial peach tints + subtle grain.
 * Built with layered utility backgrounds (no flat fill).
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
      {/* Base warm paper */}
      <div className="absolute inset-0 bg-[#FCF7F3]" />

      {/* Center peach watercolor bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_42%,rgba(232,196,176,0.38)_0%,rgba(248,220,200,0.18)_35%,transparent_70%)]" />

      {/* Soft corner washes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_12%_8%,rgba(184,140,106,0.12)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_40%_at_88%_92%,rgba(200,160,140,0.14)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_90%_10%,rgba(232,210,190,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_35%_at_8%_88%,rgba(220,200,180,0.16)_0%,transparent_50%)]" />

      {/* Paper grain */}
      <div className="cw-paper-grain absolute inset-0 opacity-[0.045] mix-blend-multiply" />

      {/* Soft vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_50%,rgba(184,140,106,0.06)_100%)]" />
    </div>
  );
}
