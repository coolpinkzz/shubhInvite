"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface ThemeDetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
  floatingIcon?: boolean;
  /** Use on dark maroon / accent surfaces */
  tone?: "default" | "onDark";
}

const iconToneClass = {
  default: "bg-theme-secondary-container/50 text-primary",
  onDark:
    "bg-accent/20 text-[var(--theme-accent-light)] ring-1 ring-accent/35",
} as const;

const labelToneClass = {
  default: "text-muted",
  onDark: "text-[var(--theme-accent-light)]/85",
} as const;

const valueToneClass = {
  default: "text-foreground",
  onDark: "text-[var(--theme-primary-foreground)]",
} as const;

export function ThemeDetailRow({
  icon,
  label,
  value,
  className,
  floatingIcon = false,
  tone = "default",
}: ThemeDetailRowProps) {
  const iconWrapperClass = cn(
    "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full",
    iconToneClass[tone],
  );

  const iconWrapper = floatingIcon ? (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={iconWrapperClass}
      aria-hidden="true"
    >
      {icon}
    </motion.div>
  ) : (
    <div className={iconWrapperClass} aria-hidden="true">
      {icon}
    </div>
  );

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {iconWrapper}
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-theme-label text-[10px] font-semibold uppercase tracking-[0.14em]",
            labelToneClass[tone],
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "whitespace-pre-line font-theme-body text-[15px] leading-snug",
            valueToneClass[tone],
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
