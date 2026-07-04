"use client";

import { motion } from "framer-motion";
import { Heart, HeartCrack } from "lucide-react";
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
      <legend className="mb-3 block font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]">
        Will You Attend?
      </legend>
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
              className={cn(
                "relative flex items-center gap-4 rounded-2xl border px-5 py-4 text-left",
                "transition-all duration-300",
                isSelected
                  ? "scale-[1.02] border-[#D4AF37] bg-[#F7D9C4]/50 shadow-[0_6px_24px_rgba(212,175,55,0.2)]"
                  : "border-[#D4AF37]/20 bg-white/50 hover:border-[#D4AF37]/40",
              )}
            >
              <span className="text-xl" aria-hidden="true">
                {option.emoji}
              </span>
              <span className="flex-1 font-[family-name:var(--font-rw-headline)] text-lg text-[#7A1F2B]">
                {option.label}
              </span>
              <Icon
                className={cn(
                  "size-5 shrink-0 transition-colors",
                  isSelected ? "text-[#D4AF37]" : "text-[#7A1F2B]/30",
                )}
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </motion.button>
          );
        })}
      </div>
      {error ? (
        <p role="alert" className="font-[family-name:var(--font-rw-body)] text-sm text-[#7A1F2B]">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
