"use client";

import { motion } from "framer-motion";

import type { BabyGender } from "@/types/theme";
import { cn } from "@/lib/utils";
import { babyRevealDesignTokens, getGenderTokens } from "@/themes/baby-reveal/tokens";

const { animation, colors } = babyRevealDesignTokens;

interface BackgroundTransitionProps {
  gender: BabyGender;
  revealed: boolean;
  className?: string;
}

export function BackgroundTransition({
  gender,
  revealed,
  className,
}: BackgroundTransitionProps) {
  const genderColors = getGenderTokens(gender);
  const pastel = colors.pastel;

  const preRevealBackground = `linear-gradient(
    165deg,
    ${pastel.peach} 0%,
    ${pastel.pinkSoft} 30%,
    ${pastel.blueSoft} 65%,
    ${pastel.cream} 100%
  )`;

  return (
    <motion.div
      className={cn("absolute inset-0 -z-10", className)}
      aria-hidden="true"
      animate={{
        background: revealed ? genderColors.background : preRevealBackground,
      }}
      transition={{
        duration: animation.duration.background,
        ease: animation.easing.luxury,
      }}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: `radial-gradient(ellipse at 20% 30%, ${pastel.pinkLight}40 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, ${pastel.blueLight}35 0%, transparent 45%),
            radial-gradient(ellipse at 50% 80%, ${pastel.peachMid}30 0%, transparent 50%)`,
        }}
      />

      {revealed && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <motion.span
              key={index}
              className="absolute rounded-full"
              style={{
                width: 4 + (index % 3) * 2,
                height: 4 + (index % 3) * 2,
                left: `${8 + index * 9}%`,
                top: `${12 + (index % 5) * 16}%`,
                backgroundColor:
                  gender === "boy" ? pastel.blue : pastel.pink,
              }}
              animate={{
                y: [0, -18, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 4 + index * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.25,
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
