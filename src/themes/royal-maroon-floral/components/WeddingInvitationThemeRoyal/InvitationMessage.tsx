"use client";

import { royalMaroonFloralConfig } from "../../config";

export function InvitationMessage() {
  const { message } = royalMaroonFloralConfig.invitation;

  return (
    <p className="animate-fade-in animate-delay-200 mx-auto max-w-xs font-theme-body text-sm italic leading-relaxed text-theme-on-primary opacity-90 sm:max-w-sm sm:text-base">
      {message}
    </p>
  );
}
