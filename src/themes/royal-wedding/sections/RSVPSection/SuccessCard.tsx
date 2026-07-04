"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  FlowerShower,
  SparkleEffect,
} from "@/themes/royal-wedding/components/celebration";
import type { CelebrationOrigin } from "@/themes/royal-wedding/components/celebration";
import { cn } from "@/lib/utils";

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
          className="absolute text-[#D4AF37]/40"
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
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#FAF5EB]",
            "px-6 py-10 text-center",
            "shadow-[0_12px_48px_rgba(122,31,43,0.1)]",
            "before:absolute before:inset-x-6 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent",
            "after:pointer-events-none after:absolute after:inset-3 after:rounded-2xl after:border after:border-[#7A1F2B]/8",
          )}
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
            className="relative z-10 mt-4 font-[family-name:var(--font-rw-display)] text-4xl text-[#7A1F2B]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Thank You!
          </motion.h3>

          <motion.p
            className="relative z-10 mx-auto mt-4 max-w-xs font-[family-name:var(--font-rw-body)] text-base italic leading-relaxed text-[var(--rw-secondary)]"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            We are delighted to celebrate this beautiful occasion with you.
          </motion.p>

          <motion.p
            className="relative z-10 mx-auto mt-2 max-w-xs font-[family-name:var(--font-rw-body)] text-[15px] leading-relaxed text-[var(--rw-on-surface-variant)]"
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
              "relative z-10 mt-8 w-full rounded-full border-2 border-[#7A1F2B] px-6 py-4",
              "font-[family-name:var(--font-rw-label)] text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1F2B]",
              "transition-colors hover:bg-[#7A1F2B]/5",
            )}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Back to Invitation
          </motion.button>
        </div>
      </motion.article>
    </>
  );
}
