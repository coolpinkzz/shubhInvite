"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import { babyRevealDesignTokens } from "@/themes/baby-reveal/tokens";
import { createBalloonPieces } from "@/themes/baby-reveal/utils/particles";

const { colors } = babyRevealDesignTokens;

interface BalloonParticlesProps {
  active: boolean;
}

export function BalloonParticles({ active }: BalloonParticlesProps) {
  const pieces = useMemo(
    () => createBalloonPieces(12, colors.pastel.pinkLight),
    [],
  );

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {pieces.map((piece) => {
        const radians = (piece.angle * Math.PI) / 180;
        const targetX = Math.cos(radians) * piece.distance;
        const targetY = Math.sin(radians) * piece.distance + 80;

        return (
          <motion.span
            key={piece.id}
            className="absolute left-1/2 top-1/2"
            style={{
              width: 24 * piece.scale,
              height: 28 * piece.scale,
            }}
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{
              x: targetX,
              y: targetY,
              opacity: 0,
              rotate: piece.rotation,
              scale: piece.scale,
            }}
            transition={{
              duration: 0.8,
              ease: babyRevealDesignTokens.animation.easing.luxury,
            }}
          >
            <svg viewBox="0 0 24 28" className="h-full w-full">
              <ellipse
                cx="12"
                cy="14"
                rx="10"
                ry="12"
                fill={piece.color}
                opacity={0.85}
              />
            </svg>
          </motion.span>
        );
      })}

      {Array.from({ length: 16 }).map((_, index) => (
        <motion.span
          key={`sparkle-${index}`}
          className="absolute left-1/2 top-1/2 h-1 w-1 rounded-full"
          style={{ backgroundColor: colors.pastel.pink }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 200,
            y: (Math.random() - 0.5) * 200,
            opacity: 0,
            scale: 0,
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.02,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
