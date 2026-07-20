"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

import { ASSETS, MOTION } from "./constants";

interface FloralTopBannerProps {
  className?: string;
}

/** Horizontal floral border anchored to the top of the hero. */
export function FloralTopBanner({ className }: FloralTopBannerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10",
        "flex justify-center",
        className,
      )}
      aria-hidden="true"
      initial={reducedMotion ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: MOTION.duration,
        ease: MOTION.ease,
      }}
    >
      <div className="relative h-[min(18vw,120px)] w-full max-w-2xl sm:h-[min(16vw,140px)] lg:h-[160px]">
        <Image
          src={ASSETS.floralTop}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 80vw, 672px"
          className="object-contain object-top"
        />
      </div>
    </motion.div>
  );
}
