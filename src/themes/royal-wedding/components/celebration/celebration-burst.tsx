"use client";

import { motion } from "framer-motion";

interface CelebrationBurstProps {
  active: boolean;
}

export function CelebrationBurst({ active }: CelebrationBurstProps) {
  if (!active) return null;

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.45) 0%, rgba(250,245,235,0.2) 40%, transparent 70%)",
        }}
        initial={{ scale: 0.2, opacity: 0.8 }}
        animate={{ scale: 2.8, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/40"
        initial={{ scale: 0.5, opacity: 0.6 }}
        animate={{ scale: 3.5, opacity: 0 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
      />
    </motion.div>
  );
}
