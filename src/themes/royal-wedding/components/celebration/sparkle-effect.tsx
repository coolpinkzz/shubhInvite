"use client";

import { memo, useMemo } from "react";
import { motion } from "framer-motion";

interface SparkleEffectProps {
  active: boolean;
  count?: number;
}

interface SparkleItem {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export const SparkleEffect = memo(function SparkleEffect({
  active,
  count = 10,
}: SparkleEffectProps) {
  const sparkles = useMemo<SparkleItem[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: 10 + Math.random() * 80,
        y: 5 + Math.random() * 90,
        size: 4 + Math.random() * 6,
        delay: Math.random() * 0.5,
      })),
    [count],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20" aria-hidden="true">
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute text-accent"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            fontSize: sparkle.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.3, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 1.2,
            delay: sparkle.delay,
            ease: "easeOut",
            repeat: 1,
            repeatDelay: 0.3,
          }}
        >
          ✦
        </motion.span>
      ))}
    </div>
  );
});
