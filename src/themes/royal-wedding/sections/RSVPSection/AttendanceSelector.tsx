"use client";

import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";

import {
  ThemeFormError,
  ThemeFormLegend,
  themeSelectorOptionClass,
} from "@/themes/shared/components";
import { cn } from "@/lib/utils";

interface AttendanceSelectorProps {
  value: boolean | null;
  onChange: (attending: boolean) => void;
  error?: string;
}

const OPTIONS = [
  {
    value: true,
    label: "Joyfully Accept",
    emoji: "✅",
    icon: Heart,
  },
  {
    value: false,
    label: "Regretfully Decline",
    emoji: "❌",
    icon: HeartCrack,
  },
] as const;

export function AttendanceSelector({
  value,
  onChange,
  error,
}: AttendanceSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <ThemeFormLegend>Will You Attend?</ThemeFormLegend>
      <div className="grid grid-cols-1 gap-3">
        {OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const Icon = option.icon;

          return (
            <motion.button
              key={String(option.value)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange(option.value)}
              className={themeSelectorOptionClass(
                isSelected,
                cn(
                  "flex items-center gap-4 px-5 py-4 text-left",
                  isSelected && "scale-[1.02]",
                ),
              )}
            >
              <span className="text-xl" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="flex-1 font-theme-headline text-lg text-primary">
                {option.label}
              </span>
              <Icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isSelected ? "text-accent" : "text-primary/30",
                )}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </motion.button>
          );
        })}
      </div>
      {error ? <ThemeFormError>{error}</ThemeFormError> : null}
    </fieldset>
  );
}
