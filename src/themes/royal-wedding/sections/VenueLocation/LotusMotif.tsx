"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LotusMotifProps {
  className?: string;
}

export function LotusMotif({ className }: LotusMotifProps) {
  return (
    <motion.div
      className={cn("flex items-center justify-center gap-8 py-6", className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      aria-hidden="true"
    >
      <LotusSvg className="opacity-30" />
      <LotusSvg className="scale-125 opacity-50" />
      <LotusSvg className="opacity-30" />
    </motion.div>
  );
}

function LotusSvg({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={cn("text-[#D4AF37]", className)}
    >
      <ellipse cx="16" cy="20" rx="4" ry="8" fill="currentColor" opacity="0.6" />
      <ellipse
        cx="16"
        cy="20"
        rx="4"
        ry="8"
        fill="currentColor"
        opacity="0.5"
        transform="rotate(-45 16 20)"
      />
      <ellipse
        cx="16"
        cy="20"
        rx="4"
        ry="8"
        fill="currentColor"
        opacity="0.5"
        transform="rotate(45 16 20)"
      />
      <ellipse
        cx="16"
        cy="20"
        rx="4"
        ry="8"
        fill="currentColor"
        opacity="0.4"
        transform="rotate(-90 16 20)"
      />
      <ellipse
        cx="16"
        cy="20"
        rx="4"
        ry="8"
        fill="currentColor"
        opacity="0.4"
        transform="rotate(90 16 20)"
      />
      <circle cx="16" cy="20" r="3" fill="#7A1F2B" opacity="0.5" />
    </svg>
  );
}
