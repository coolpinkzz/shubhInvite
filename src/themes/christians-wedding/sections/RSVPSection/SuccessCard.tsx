"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useMemo } from "react";

import { ThemeCard } from "@/themes/shared/components";
import { cn } from "@/lib/utils";

import { MOTION } from "../../components/constants";

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
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
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
  return (
    <motion.article
      className={cn("relative", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: MOTION.duration, ease: MOTION.ease }}
    >
      <ThemeCard
        padding="loose"
        borderClassName="border-accent/40 text-center"
        className="relative bg-[linear-gradient(180deg,rgba(255,252,250,0.97)_0%,rgba(245,235,227,0.85)_100%)]"
      >
        <FloatingHearts />

        <motion.div
          className="relative z-10 mx-auto flex size-16 items-center justify-center rounded-full bg-accent/15 text-accent"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
        >
          <Heart className="size-8 fill-current" aria-hidden="true" />
          <span className="sr-only">Thank you</span>
        </motion.div>

        <motion.h3
          className="relative z-10 mt-5 font-theme-display text-4xl text-primary sm:text-5xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Thank You!
        </motion.h3>

        <motion.p
          className="relative z-10 mx-auto mt-4 max-w-xs font-theme-body text-base font-bold leading-relaxed text-[#1A1A1A]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          We are delighted to celebrate this beautiful occasion with you.
        </motion.p>

        <motion.p
          className="relative z-10 mx-auto mt-2 max-w-xs font-theme-body text-[15px] font-bold leading-relaxed text-[#1A1A1A]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          We look forward to creating unforgettable memories together.
        </motion.p>

        <motion.button
          type="button"
          onClick={onBack}
          whileTap={{ scale: 0.97 }}
          className={cn(
            "relative z-10 mt-8 w-full rounded-full border-2 border-accent px-6 py-4",
            "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-accent",
            "transition-colors hover:bg-accent/10",
          )}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
        >
          Back to Invitation
        </motion.button>
      </ThemeCard>
    </motion.article>
  );
}
