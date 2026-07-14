"use client";

import { BackgroundPattern } from "./BackgroundPattern";
import { CoupleNames } from "./CoupleNames";
import { DateSection } from "./DateSection";
import { DecorativeBorder } from "./DecorativeBorder";
import { FloralCorner } from "./FloralCorner";
import { HangingLamp } from "./HangingLamp";
import { InvitationHeader } from "./InvitationHeader";
import { InvitationMessage } from "./InvitationMessage";
import { InvitationRSVPTeaser } from "./InvitationRSVPTeaser";
import { VenueSection } from "./VenueSection";

export function InvitationHero() {
  return (
    <section
      id="invitation"
      className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14"
    >
      <BackgroundPattern />

      <div
        className="rmf-frame-border-top pointer-events-none absolute inset-x-0 top-0 z-10"
        aria-hidden="true"
      />
      <div
        className="rmf-frame-border-bottom pointer-events-none absolute inset-x-0 bottom-0 z-10"
        aria-hidden="true"
      />

      <article className="relative w-full max-w-md overflow-visible animate-fade-in px-3 sm:max-w-lg sm:px-6">
        <div className="rmf-invitation-card relative z-10 mx-auto overflow-visible px-5 pb-8 pt-14 sm:px-8 sm:pb-10 sm:pt-16">
          <FloralCorner position="bottom-left" />
          <FloralCorner position="bottom-right" />
          <div
            className="rmf-card-pattern pointer-events-none absolute inset-0"
            aria-hidden="true"
          />
          <div
            className="rmf-card-inner-glow pointer-events-none absolute inset-0"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-20"
            aria-hidden="true"
          >
            <HangingLamp
              size="lg"
              delay={0}
              className="absolute left-[6%] top-0 sm:left-[8%]"
            />
            <HangingLamp
              size="sm"
              delay={1.2}
              className="absolute left-[24%] top-3 sm:left-[26%] sm:top-4"
            />
            <HangingLamp
              size="lg"
              delay={0.6}
              className="absolute right-[6%] top-0 sm:right-[8%]"
            />
            <HangingLamp
              size="sm"
              delay={1.8}
              className="absolute right-[24%] top-3 sm:right-[26%] sm:top-4"
            />
          </div>

          <div className="rmf-card-content relative z-30 space-y-5 text-center sm:space-y-6">
            <InvitationHeader />
            <CoupleNames />
            <InvitationMessage />
            <DateSection />
            <VenueSection />
            <DecorativeBorder />
            <InvitationRSVPTeaser />
          </div>
        </div>
      </article>
    </section>
  );
}
