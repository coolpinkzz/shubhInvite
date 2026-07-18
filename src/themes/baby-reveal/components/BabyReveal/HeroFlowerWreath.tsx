"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";
import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";

const { colors } = babyRevealDesignTokens;

interface HeroFlowerWreathProps {
  className?: string;
  children: ReactNode;
}

const WREATH_FLOWERS = Array.from({ length: 10 }, (_, index) => {
  const angle = (index / 10) * 360;
  const radius = 52;
  const rad = (angle * Math.PI) / 180;
  const x = 50 + radius * Math.cos(rad);
  const y = 50 + radius * Math.sin(rad);

  return {
    x,
    y,
    rotation: angle + 90,
    size: index % 3 === 0 ? 14 : index % 2 === 0 ? 11 : 9,
    delay: index * 0.15,
  };
});

export function HeroFlowerWreath({
  className,
  children,
}: HeroFlowerWreathProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke={colors.pastel.blueLight}
          strokeWidth="0.6"
          opacity={0.45}
          strokeDasharray="3 5"
        />
        {WREATH_FLOWERS.map((flower, index) => (
          <motion.g
            key={index}
            transform={`translate(${flower.x}, ${flower.y}) rotate(${flower.rotation})`}
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: [1, 1.08, 1],
                    opacity: [0.55, 0.85, 0.55],
                  }
            }
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: flower.delay,
            }}
          >
            <ellipse
              cx="0"
              cy={-flower.size * 0.35}
              rx={flower.size * 0.35}
              ry={flower.size * 0.55}
              fill={colors.pastel.blueLight}
              opacity={0.75}
            />
            <ellipse
              cx={-flower.size * 0.3}
              cy={flower.size * 0.1}
              rx={flower.size * 0.35}
              ry={flower.size * 0.55}
              fill={colors.pastel.blueSoft}
              opacity={0.65}
              transform={`rotate(-72)`}
            />
            <ellipse
              cx={flower.size * 0.3}
              cy={flower.size * 0.1}
              rx={flower.size * 0.35}
              ry={flower.size * 0.55}
              fill={colors.pastel.blueSoft}
              opacity={0.65}
              transform={`rotate(72)`}
            />
            <circle
              r={flower.size * 0.22}
              fill={colors.pastel.blueDeep}
              opacity={0.7}
            />
          </motion.g>
        ))}
      </svg>

      <div className="relative z-10 p-3 sm:p-4">{children}</div>
    </div>
  );
}
