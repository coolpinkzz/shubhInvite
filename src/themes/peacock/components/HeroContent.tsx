"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ASSETS, MOTION } from "./constants";
import { ScratchRevealOval } from "./ScratchRevealOval";
import type { HeroContentProps } from "./types";

export function HeroContent({ data }: HeroContentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <header className="relative z-30 mx-auto flex w-full max-w-lg flex-col items-center px-4 text-center sm:max-w-xl sm:px-6">
      <motion.p
        className="font-theme-headline text-[0.7rem] font-semibold uppercase tracking-[0.42em] text-[#1A3A3A] sm:text-sm sm:tracking-[0.48em]"
        initial={reducedMotion ? false : { opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.12,
          ease: MOTION.ease,
        }}
      >
        {data.title}
      </motion.p>

      <motion.h1
        className="mt-3 flex flex-wrap items-baseline justify-center gap-x-2 gap-y-1 font-theme-headline text-[2.35rem] font-medium leading-none tracking-wide text-[#1A3A3A] sm:mt-4 sm:gap-x-3 sm:text-5xl md:text-[3.25rem]"
        initial={reducedMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.22,
          ease: MOTION.ease,
        }}
      >
        <span>{data.bride}</span>
        <span
          className="font-theme-display text-[1.85rem] leading-none text-[#C4A35A] sm:text-4xl md:text-[2.75rem]"
          aria-hidden="true"
        >
          {data.heartSeparator}
        </span>
        <span className="sr-only">and</span>
        <span>{data.groom}</span>
      </motion.h1>

      <motion.p
        className="mt-4 max-w-md font-theme-body text-sm leading-relaxed text-[#3D5A5A] sm:mt-5 sm:text-base"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.28,
          ease: MOTION.ease,
        }}
      >
        {data.description}
      </motion.p>

      <motion.div
        className="relative mt-5 w-[min(86vw,340px)] sm:mt-6 sm:w-[min(78vw,400px)] md:w-[420px]"
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.34,
          ease: MOTION.ease,
        }}
      >
        {/* Aspect matches gold-frame.webp (1122×1402) */}
        <div className="relative aspect-[1122/1402] w-full">
          <div className="absolute left-[25.4%] top-[27.1%] z-10 h-[63.27%] w-[49.11%]">
            <ScratchRevealOval
              date={data.date}
              dateIso={data.dateIso}
              hint={data.scratchHint}
              overline={data.scratchOverline}
              revealThreshold={data.revealThreshold}
            />
          </div>

          <div className="pointer-events-none absolute inset-0 z-20">
            <Image
              src={ASSETS.ornateFrame}
              alt=""
              fill
              priority
              sizes="(max-width: 640px) 86vw, 420px"
              className="object-contain drop-shadow-[0_18px_40px_rgba(26,58,58,0.12)]"
            />
          </div>
        </div>
      </motion.div>
    </header>
  );
}
