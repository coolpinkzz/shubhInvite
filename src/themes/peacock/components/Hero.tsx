"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ASSETS, MOTION, invitationData } from "./constants";
import { HeroContent } from "./HeroContent";
import { SectionContainer } from "./SectionContainer";
import type { HeroProps } from "./types";

export function Hero({ data = invitationData }: HeroProps) {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="invitation"
      aria-label={`${data.bride} and ${data.groom} wedding invitation`}
      className="relative min-h-dvh overflow-hidden bg-[#F7F1E8]"
    >
      {/* Full watercolor invitation artwork */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={ASSETS.watercolorBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#FFFDF8]/25" aria-hidden="true" />
      </div>

      <SectionContainer className="relative z-20 flex min-h-dvh flex-col pb-10 pt-14 sm:pb-12 sm:pt-16 lg:pt-20">
        <div className="flex flex-1 flex-col items-center justify-start">
          <motion.div
            className="w-full"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: MOTION.duration, ease: MOTION.ease }}
          >
            <HeroContent data={data} />
          </motion.div>
        </div>
      </SectionContainer>
    </section>
  );
}
