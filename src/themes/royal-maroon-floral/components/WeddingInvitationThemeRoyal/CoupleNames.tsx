"use client";

import { royalMaroonFloralConfig } from "../../config";

export function CoupleNames() {
  const { bride, groom } = royalMaroonFloralConfig.couple;

  return (
    <div className="animate-fade-in animate-delay-100 space-y-1 px-2">
      <h1 className="rmf-name-gold font-theme-display text-[2.25rem] leading-tight sm:text-5xl md:text-[3.25rem]">
        {bride}
      </h1>
      <p
        className="rmf-name-gold font-theme-display text-2xl opacity-90 sm:text-3xl"
        aria-hidden="true"
      >
        &amp;
      </p>
      <h1 className="rmf-name-gold font-theme-display text-[2.25rem] leading-tight sm:text-5xl md:text-[3.25rem]">
        {groom}
      </h1>
    </div>
  );
}
