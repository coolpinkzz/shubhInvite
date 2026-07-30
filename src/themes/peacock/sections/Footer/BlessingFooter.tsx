"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION, invitationData } from "../../components/constants";
import { GoldDivider } from "../../components/GoldDivider";
import { PeacockDecoration } from "../../components/PeacockDecoration";

interface BlessingFooterProps {
  className?: string;
  blessing?: string;
  overline?: string;
  title?: string;
}

export function BlessingFooter({
  className,
  blessing = "Thank you for sharing in our joy. May your path be blessed with love and light.",
  overline = "With Gratitude",
  title = "Thank You",
}: BlessingFooterProps) {
  const reducedMotion = useReducedMotion();
  const { bride, groom, date, day, heartSeparator } = invitationData;

  return (
    <footer
      id="footer"
      className={cn(
        "relative overflow-hidden bg-[#F8F5EC] px-6 pb-24 pt-16 text-center sm:pb-28 sm:pt-20",
        className,
      )}
      aria-label="Closing blessing"
    >
      <div
        className="pointer-events-none absolute inset-0 pk-paper-grain opacity-[0.3]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#FFFDF8] to-transparent"
        aria-hidden="true"
      />

      <PeacockDecoration position="bottom-left" delay={0.1} />
      <PeacockDecoration position="bottom-right" delay={0.18} />

      <motion.div
        className="relative z-10 mx-auto flex max-w-md flex-col items-center"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: MOTION.duration, ease: MOTION.ease }}
      >
        <img
          src={ASSETS.lotus}
          alt=""
          width={40}
          height={30}
          className="mb-4 h-7 w-9 object-contain opacity-70"
          loading="lazy"
          decoding="async"
        />

        <p className="font-theme-label text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
          {overline}
        </p>

        <h2 className="mt-3 font-theme-display text-5xl leading-none text-[#1E3A8A] sm:text-6xl">
          {title}
        </h2>

        <div className="mt-5 w-full max-w-[220px]">
          <GoldDivider />
        </div>

        <p className="mt-5 max-w-xs font-theme-body text-base leading-relaxed text-[#475569] sm:text-[1.05rem]">
          {blessing}
        </p>

        <p className="mt-8 font-theme-display text-4xl leading-tight text-[#1E3A8A] sm:text-5xl">
          {bride}{" "}
          <span className="mx-1 inline-block text-2xl text-[#D4AF37] sm:text-3xl">
            {heartSeparator}
          </span>{" "}
          {groom}
        </p>

        <p className="mt-4 font-theme-label text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#1E3A8A]">
          {day} · {date}
        </p>
      </motion.div>
    </footer>
  );
}
