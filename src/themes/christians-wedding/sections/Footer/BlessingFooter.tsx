"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { FloralDecoration } from "../../components/FloralDecoration";
import { invitationData, MOTION } from "../../components/constants";

interface BlessingFooterProps {
  className?: string;
  blessing?: string;
}

export function BlessingFooter({
  className,
  blessing = "May God bless our gathering with love and joy.",
}: BlessingFooterProps) {
  const reducedMotion = useReducedMotion();
  const { bride, groom, date, day } = invitationData;

  return (
    <footer
      id="footer"
      className={cn(
        "relative overflow-hidden bg-[#F5EBE3] px-6 pb-24 pt-16 text-center sm:pb-28 sm:pt-20",
        className,
      )}
      aria-label="Closing blessing"
    >
      <div
        className="pointer-events-none absolute inset-0 cw-paper-grain opacity-[0.35]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#FCF7F3] to-transparent"
        aria-hidden="true"
      />

      <FloralDecoration position="bottom-left" delay={0.1} />
      <FloralDecoration position="bottom-right" delay={0.18} />

      <motion.div
        className="relative z-10 mx-auto flex max-w-md flex-col items-center"
        initial={reducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: MOTION.duration, ease: MOTION.ease }}
      >
        <p className="font-theme-label text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#6B4F38]">
          With Gratitude
        </p>

        <h2 className="mt-3 font-theme-display text-5xl leading-none text-[#1A1A1A] sm:text-6xl">
          Thank You
        </h2>

        <div
          className="mt-5 flex items-center gap-3"
          aria-hidden="true"
        >
          <span className="h-px w-10 bg-linear-to-r from-transparent to-[#B88C6A]" />
          <span className="font-theme-display text-xl leading-none text-[#B88C6A]">
            ♥
          </span>
          <span className="h-px w-10 bg-linear-to-l from-transparent to-[#B88C6A]" />
        </div>

        <p className="mt-5 max-w-xs font-theme-body text-base font-bold leading-relaxed text-[#1A1A1A] sm:text-[1.05rem]">
          {blessing}
        </p>

        <p className="mt-8 font-theme-display text-4xl leading-tight text-[#1A1A1A] sm:text-5xl">
          {bride}{" "}
          <span className="mx-1 inline-block text-2xl text-[#B88C6A] sm:text-3xl">
            &
          </span>{" "}
          {groom}
        </p>

        <p className="mt-4 font-theme-label text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[#1A1A1A]">
          {day} · {date}
        </p>
      </motion.div>
    </footer>
  );
}
