"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloralDividerProps {
  className?: string;
}

export function FloralDivider({ className }: FloralDividerProps) {
  return (
    <motion.div
      className={cn("flex items-center justify-center py-3", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="mx-3 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#D4AF37]/60" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-[#D4AF37]"
        >
          <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.7" />
          <ellipse
            cx="10"
            cy="5"
            rx="2.5"
            ry="4"
            fill="currentColor"
            opacity="0.45"
          />
          <ellipse
            cx="10"
            cy="15"
            rx="2.5"
            ry="4"
            fill="currentColor"
            opacity="0.45"
          />
          <ellipse
            cx="5"
            cy="10"
            rx="4"
            ry="2.5"
            fill="currentColor"
            opacity="0.45"
          />
          <ellipse
            cx="15"
            cy="10"
            rx="4"
            ry="2.5"
            fill="currentColor"
            opacity="0.45"
          />
        </svg>
        <span className="size-1.5 rounded-full bg-[#D4AF37]/60" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
    </motion.div>
  );
}
