"use client";

import { motion } from "framer-motion";

import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";
import type { RevealPhase } from "@/themes/baby-reveal/hooks/useRevealState";

const { colors } = babyRevealDesignTokens;

interface BalloonStringProps {
  phase: RevealPhase;
}

export function BalloonString({ phase }: BalloonStringProps) {
  const isShaking = phase === "shake";
  const isStretching = phase === "stretch";

  return (
    <motion.svg
      viewBox="0 0 20 80"
      className="pointer-events-none absolute left-1/2 top-[97%] h-14 w-5 -translate-x-1/2"
      style={{ transformOrigin: "top center" }}
      aria-hidden="true"
      animate={
        isShaking
          ? { rotate: [-3, 3, -3, 3, 0] }
          : isStretching
            ? { scaleY: [1, 1.3, 1.1] }
            : { rotate: [-2, 2, -2] }
      }
      transition={
        isShaking
          ? { duration: 0.15, repeat: 4, ease: "easeInOut" }
          : isStretching
            ? { duration: 0.4, ease: babyRevealDesignTokens.animation.easing.luxury }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
      }
    >
      <path
        d="M10 0 Q12 30 10 60 Q8 70 10 80"
        fill="none"
        stroke={colors.pastel.textMuted}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
