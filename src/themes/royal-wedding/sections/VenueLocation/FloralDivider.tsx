"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloralDividerProps {
  className?: string;
}

export function FloralDivider({ className }: FloralDividerProps) {
  return (
    <motion.div
      className={cn("flex items-center justify-center py-4", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="mx-4 flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-[#D4AF37]/70" />
        <svg
          width="28"
          height="14"
          viewBox="0 0 28 14"
          fill="none"
          className="text-[#D4AF37]"
        >
          <path
            d="M14 0L16.5 5H26L18.5 8L21 14L14 10.5L7 14L9.5 8L2 5H11.5L14 0Z"
            fill="currentColor"
            opacity="0.75"
          />
        </svg>
        <span className="size-1.5 rounded-full bg-[#D4AF37]/70" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
    </motion.div>
  );
}
