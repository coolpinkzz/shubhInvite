"use client";

import { royalMaroonFloralConfig } from "../../config";

export function InvitationRSVPTeaser() {
  const { rsvpDeadline, rsvpPhone } = royalMaroonFloralConfig.invitation;

  return (
    <div className="animate-fade-in animate-delay-700 space-y-1 pt-1">
      <p className="font-theme-body text-xs text-theme-on-primary opacity-80 sm:text-sm">
        Kindly RSVP before {rsvpDeadline}
      </p>
      <p className="font-theme-body text-xs tracking-wide text-theme-on-primary opacity-90 sm:text-sm">
        on{" "}
        <a
          href={`tel:${rsvpPhone.replace(/\s/g, "")}`}
          className="text-theme-accent-light underline decoration-[var(--theme-accent-light)]/50 underline-offset-2 transition-opacity hover:opacity-80"
        >
          {rsvpPhone}
        </a>
      </p>
    </div>
  );
}
