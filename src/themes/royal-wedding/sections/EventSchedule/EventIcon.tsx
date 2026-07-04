"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventIconProps {
  icon: LucideIcon;
  color: string;
  className?: string;
}

export function EventIcon({ icon: Icon, color, className }: EventIconProps) {
  return (
    <motion.div
      className={cn(
        "relative flex size-14 shrink-0 items-center justify-center rounded-full",
        "border border-[#D4AF37]/40 bg-[#F7D9C4]/60 shadow-[0_4px_20px_rgba(122,31,43,0.08)]",
        className,
      )}
      animate={{ y: [0, -4, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color}33, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      <Icon
        className="relative size-6"
        style={{ color }}
        strokeWidth={1.75}
        aria-hidden="true"
      />
    </motion.div>
  );
}
