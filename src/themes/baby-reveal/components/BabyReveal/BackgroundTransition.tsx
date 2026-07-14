"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors, animation } = babyRevealDesignTokens;

interface BackgroundTransitionProps {
  revealed: boolean;
  className?: string;
}

export function BackgroundTransition({
  revealed,
  className,
}: BackgroundTransitionProps) {
  const pastel = colors.pastel;

  const baseBackground = `linear-gradient(
    165deg,
    ${pastel.peach} 0%,
    ${pastel.pinkSoft} 30%,
    ${pastel.blueSoft} 65%,
    ${pastel.cream} 100%
  )`;

  const revealedBackground = `linear-gradient(
    165deg,
    ${pastel.pinkSoft} 0%,
    ${pastel.cream} 40%,
    ${pastel.blueSoft} 100%
  )`;

  return (
    <motion.div
      className={cn("absolute inset-0 -z-10", className)}
      aria-hidden="true"
      animate={{
        background: revealed ? revealedBackground : baseBackground,
      }}
      transition={{
        duration: animation.duration.background,
        ease: animation.easing.luxury,
      }}
    />
  );
}
