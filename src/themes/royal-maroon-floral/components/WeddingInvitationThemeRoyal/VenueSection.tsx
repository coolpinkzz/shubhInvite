"use client";

import { royalMaroonFloralConfig } from "../../config";

export function VenueSection() {
  const { venueName } = royalMaroonFloralConfig.invitation;
  const { location } = royalMaroonFloralConfig;

  return (
    <div className="animate-fade-in animate-delay-500 space-y-1.5 px-2">
      <p className="font-theme-body text-sm italic text-theme-on-primary opacity-80">at</p>
      <p className="font-theme-headline text-base uppercase tracking-wide text-theme-accent-light sm:text-lg">
        {venueName}
      </p>
      <p className="font-theme-body text-xs uppercase tracking-wider text-theme-on-primary opacity-85 sm:text-sm">
        {location}
      </p>
    </div>
  );
}
