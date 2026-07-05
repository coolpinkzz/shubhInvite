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
}

const iconClassName =
  "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-theme-secondary-container/50 text-primary";

export function ThemeDetailRow({
  icon,
  label,
  value,
  className,
  floatingIcon = false,
}: ThemeDetailRowProps) {
  const iconWrapper = floatingIcon ? (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={iconClassName}
      aria-hidden="true"
    >
      {icon}
    </motion.div>
  ) : (
    <div className={iconClassName} aria-hidden="true">
      {icon}
    </div>
  );

  return (
    <div className={cn("flex items-start gap-3", className)}>
      {iconWrapper}
      <div className="min-w-0 flex-1">
        <p className="font-theme-label text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
          {label}
        </p>
        <p className="whitespace-pre-line font-theme-body text-[15px] leading-snug text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}
