"use client";

import { motion, useReducedMotion } from "framer-motion";

import { GoldDivider } from "../../components/GoldDivider";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AwaitingPresence() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="presence"
      aria-labelledby="presence-title"
      className="bg-[#FBF6F1] px-6 pb-4 pt-16 text-center sm:px-8 sm:pb-6 sm:pt-20"
    >
      <motion.div
        className="mx-auto w-full max-w-[28rem]"
        initial={reducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, ease: EASE }}
      >
        <h2
          id="presence-title"
          className="font-theme-display text-[clamp(2.65rem,9.2vw,3.45rem)] leading-[1.02] text-[#8B2942]"
        >
          <span className="block">Awaiting your noble</span>
          <span className="mt-1 block">presence</span>
        </h2>

        <div className="my-7 sm:my-8">
          <GoldDivider />
        </div>

        <p className="text-balance font-theme-body text-[17px] italic leading-[1.75] text-[#5E554E] sm:text-lg">
          We look forward to celebrating our special day with you. Your
          presence and blessings will make this occasion truly memorable.
        </p>
      </motion.div>
    </section>
  );
}
