"use client";

import { motion, useReducedMotion } from "framer-motion";

import { MOTION } from "./constants";
import { DateSection } from "./DateSection";
import type { InvitationContentProps } from "./types";

export function InvitationContent({ data }: InvitationContentProps) {
  const reducedMotion = useReducedMotion();

  return (
    <header className="relative z-30 mx-auto flex w-full max-w-xl flex-col items-center px-4 text-center sm:px-6">
      <motion.p
        className="font-theme-label text-sm font-black uppercase tracking-[0.28em] text-[#1A1A1A] sm:text-base sm:tracking-[0.32em]"
        initial={reducedMotion ? false : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.15,
          ease: MOTION.ease,
        }}
      >
        {data.title}
      </motion.p>

      <motion.p
        className="mt-3 font-theme-label text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#3D3D3D] sm:mt-4 sm:text-xs sm:tracking-[0.32em]"
        initial={reducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.22,
          ease: MOTION.ease,
        }}
      >
        {data.subtitle}
      </motion.p>

      <motion.h1
        className="mt-4 flex flex-col items-center gap-1 font-theme-display text-[2.75rem] leading-none text-[#1A1A1A] drop-shadow-[0_1px_0_rgba(255,255,255,0.6)] sm:mt-5 sm:gap-1.5 sm:text-6xl md:text-7xl"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.3,
          ease: MOTION.ease,
        }}
      >
        <span className="flex items-baseline justify-center gap-3">
          <span>{data.bride}</span>
          <span aria-hidden="true">&</span>
          <span>{data.groom}</span>
        </span>
      </motion.h1>

      <motion.p
        className="mt-5 max-w-md font-theme-body text-sm font-semibold leading-relaxed text-[#3D3D3D] sm:mt-6 sm:text-base"
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: MOTION.duration,
          delay: 0.4,
          ease: MOTION.ease,
        }}
      >
        {data.message}
      </motion.p>

      <div className="mt-8 w-full sm:mt-10">
        <DateSection
          dayOfMonth={data.dayOfMonth}
          month={data.month}
          year={data.year}
          dateIso={data.dateIso}
          revealThreshold={0.4}
        />
      </div>
    </header>
  );
}
