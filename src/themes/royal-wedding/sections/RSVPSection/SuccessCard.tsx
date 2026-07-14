"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  FlowerShower,
  SparkleEffect,
} from "@/themes/royal-wedding/components/celebration";
import type { CelebrationOrigin } from "@/themes/royal-wedding/components/celebration";
import { ThemeCard } from "@/themes/shared/components";
import { cn } from "@/lib/utils";
import { rsvpCardClassName } from "./rsvp-form-styles";

interface SuccessCardProps {
  onBack: () => void;
  className?: string;
}

interface FloatingHeart {
  id: number;
  x: number;
  delay: number;
  duration: number;
}

function FloatingHearts() {
  const hearts = useMemo<FloatingHeart[]>(
    () =>
      Array.from({ length: 6 }, (_, id) => ({
        id,
        x: 15 + Math.random() * 70,
        delay: Math.random() * 2,
        duration: 4 + Math.random() * 2,
      })),
    [],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute text-accent/40"
          style={{ left: `${heart.x}%`, bottom: "10%" }}
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -120,
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <Heart className="size-4 fill-current" />
        </motion.div>
      ))}
    </div>
  );
}

export function SuccessCard({ onBack, className }: SuccessCardProps) {
  const [celebrationOrigin, setCelebrationOrigin] =
    useState<CelebrationOrigin | null>(null);

  useEffect(() => {
    setCelebrationOrigin({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  }, []);

  return (
    <>
      <FlowerShower active origin={celebrationOrigin} />
      <motion.article
        className={cn("relative", className)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ThemeCard
          padding="loose"
          borderClassName="border-accent/55 text-center"
          topInsetClassName="before:inset-x-6"
          innerInsetClassName="after:inset-3"
          className={cn("relative", rsvpCardClassName)}
        >
          <SparkleEffect active count={14} />
          <FloatingHearts />

          <motion.div
            className="relative z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <span className="text-5xl" role="img" aria-label="Heart">
              ❤️
            </span>
          </motion.div>

          <motion.h3
            className="relative z-10 mt-4 font-theme-display text-4xl text-[var(--theme-accent-light)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Thank You!
          </motion.h3>

          <motion.p
            className="relative z-10 mx-auto mt-4 max-w-xs font-theme-body text-base italic leading-relaxed text-[var(--theme-primary-foreground)]/85"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            We are delighted to celebrate this beautiful occasion with you.
          </motion.p>

          <motion.p
            className="relative z-10 mx-auto mt-2 max-w-xs font-theme-body text-[15px] leading-relaxed text-[var(--theme-primary-foreground)]/65"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            We look forward to creating unforgettable memories together.
          </motion.p>

          <motion.button
            type="button"
            onClick={onBack}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "relative z-10 mt-8 w-full rounded-full border-2 border-accent px-6 py-4",
              "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-[var(--theme-accent-light)]",
              "transition-colors hover:bg-accent/15",
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Back to Invitation
          </motion.button>
        </ThemeCard>
      </motion.article>
    </>
  );
}
