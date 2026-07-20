"use client";

import { BackgroundTexture } from "./BackgroundTexture";
import { invitationData, MOTION } from "./constants";
import { CoupleIllustration } from "./CoupleIllustration";
import { FloralDecoration } from "./FloralDecoration";
import { FloralTopBanner } from "./FloralTopBanner";
import { HeroAtmosphere } from "./HeroAtmosphere";
import { InvitationContent } from "./InvitationContent";
import type { HeroProps } from "./types";

export function Hero({ data = invitationData }: HeroProps) {
  return (
    <section
      id="invitation"
      aria-label={`${data.bride} and ${data.groom} wedding invitation`}
      className="relative min-h-dvh overflow-hidden bg-[#FCF7F3]"
    >
      <BackgroundTexture />
      <HeroAtmosphere />

      <FloralTopBanner />

      <FloralDecoration position="top-left" delay={0} />
      <FloralDecoration position="top-right" delay={MOTION.floralStagger} />
      <FloralDecoration
        position="bottom-right"
        delay={MOTION.floralStagger * 2}
      />
      <FloralDecoration
        position="bottom-left"
        delay={MOTION.floralStagger * 3}
      />

      <div className="relative z-20 mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-4 pb-6 pt-14 sm:px-8 sm:pb-8 sm:pt-16 lg:px-12 lg:pb-4 lg:pt-20">
        {/* Invitation copy — centered with room for couple on large screens */}
        <div className="flex flex-1 flex-col items-center justify-center pt-20 sm:pb-8 lg:pb-28">
          <InvitationContent data={data} />
        </div>

        {/* Mobile: couple below content · Desktop: anchored bottom-left */}
        <div className="relative z-20 flex justify-center sm:absolute sm:bottom-0 sm:left-4 sm:justify-start lg:left-8 xl:left-12">
          <CoupleIllustration bride={data.bride} groom={data.groom} />
        </div>
      </div>
    </section>
  );
}
