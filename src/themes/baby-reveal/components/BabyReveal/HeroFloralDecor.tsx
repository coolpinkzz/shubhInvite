"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/themes/baby-reveal/hooks/useReducedMotion";

interface HeroFloralDecorProps {
  className?: string;
}

export function HeroFloralDecor({ className }: HeroFloralDecorProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("pointer-events-none absolute inset-0 z-1", className)}
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={
        reducedMotion ? { opacity: 1 } : { opacity: 1, scale: [1, 1.012, 1] }
      }
      transition={
        reducedMotion
          ? { duration: 0.6 }
          : {
              opacity: { duration: 0.8 },
              scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            }
      }
    >
      <Image
        src="/themes/baby-reveal/bluebg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-fill object-top mix-blend-screen"
      />
    </motion.div>
  );
}
