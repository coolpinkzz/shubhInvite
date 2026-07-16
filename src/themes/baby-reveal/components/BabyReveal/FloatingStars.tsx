"use client";

import { motion } from "framer-motion";

import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors } = babyRevealDesignTokens;

interface FloatingStarsProps {
  count?: number;
  className?: string;
}

const STAR_POSITIONS = [
  { top: "8%", left: "15%", size: 6, delay: 0 },
  { top: "14%", right: "20%", size: 4, delay: 0.5 },
  { top: "22%", left: "8%", size: 5, delay: 1 },
  { top: "10%", right: "12%", size: 7, delay: 1.5 },
  { top: "28%", right: "8%", size: 4, delay: 0.8 },
  { top: "6%", left: "45%", size: 5, delay: 2 },
  { bottom: "18%", left: "18%", size: 5, delay: 1.2 },
  { bottom: "12%", right: "22%", size: 4, delay: 0.6 },
] as const;

export function FloatingStars({ count = 6, className }: FloatingStarsProps) {
  const stars = STAR_POSITIONS.slice(0, count);

  return (
    <div className={className} aria-hidden="true">
      {stars.map((star, index) => (
        <motion.span
          key={index}
          className="absolute"
          style={{
            top: "top" in star ? star.top : undefined,
            bottom: "bottom" in star ? star.bottom : undefined,
            left: "left" in star ? star.left : undefined,
            right: "right" in star ? star.right : undefined,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        >
          <svg viewBox="0 0 24 24" fill={colors.neutral.gold}>
            <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 17.8 5.7 21l2.3-7-6-4.6h7.6L12 2z" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
