"use client";

import { royalMaroonFloralConfig } from "../../config";

export function InvitationHeader() {
  const { familiesLine } = royalMaroonFloralConfig.invitation;

  return (
    <p className="animate-fade-in font-theme-body text-xs tracking-[0.2em] text-theme-on-primary opacity-90 sm:text-sm">
      {familiesLine}
    </p>
  );
}
