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
    ${pastel.cream} 0%,
    ${pastel.blueSoft} 35%,
    ${pastel.blueLight} 70%,
    ${pastel.cream} 100%
  )`;

  const revealedBackground = `linear-gradient(
    165deg,
    ${pastel.blueSoft} 0%,
    ${pastel.cream} 40%,
    ${pastel.blueLight} 100%
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
