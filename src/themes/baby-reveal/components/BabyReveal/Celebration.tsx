"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

import type { BabyGender } from "@/types/theme";
import {
  babyRevealDesignTokens,
  celebrationEmojis,
} from "@/themes/baby-reveal/tokens";
import { createCelebrationParticles } from "@/themes/baby-reveal/utils/particles";

interface CelebrationProps {
  active: boolean;
  gender: BabyGender;
}

export function Celebration({ active, gender }: CelebrationProps) {
  const emojis = useMemo(() => {
    const genderEmojis =
      gender === "boy" ? celebrationEmojis.boy : celebrationEmojis.girl;
    return [...celebrationEmojis.shared, ...genderEmojis];
  }, [gender]);

  const particles = useMemo(
    () => createCelebrationParticles(emojis, 40),
    [emojis],
  );

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute left-1/2 top-1/3 select-none"
          style={{ fontSize: particle.size }}
          initial={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            rotate: 0,
            scale: 0.5,
          }}
          animate={{
            x: [particle.x, particle.x + particle.driftX * 0.5, particle.x + particle.driftX],
            y: [particle.y, particle.y + particle.driftY * 0.3, particle.y + particle.driftY],
            opacity: [0, 1, 1, 0],
            rotate: [0, particle.rotation * 0.5, particle.rotation],
            scale: [0.5, 1.1, 0.8, 0.4],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: babyRevealDesignTokens.animation.easing.luxury,
            times: [0, 0.2, 0.7, 1],
          }}
        >
          {particle.emoji}
        </motion.span>
      ))}
    </div>
  );
}
