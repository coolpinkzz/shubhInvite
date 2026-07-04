"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RSVPEventOption } from "./types";

interface EventSelectorProps {
  events: RSVPEventOption[];
  value: string[];
  onChange: (events: string[]) => void;
  error?: string;
  disabled?: boolean;
}

export function EventSelector({
  events,
  value,
  onChange,
  error,
  disabled,
}: EventSelectorProps) {
  const toggleEvent = (eventId: string) => {
    if (disabled) return;
    if (value.includes(eventId)) {
      onChange(value.filter((id) => id !== eventId));
      return;
    }
    onChange([...value, eventId]);
  };

  return (
    <fieldset className="space-y-3" disabled={disabled}>
      <legend className="mb-3 block font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]">
        Which Events Will You Attend?
      </legend>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {events.map((event) => {
          const isSelected = value.includes(event.id);

          return (
            <motion.button
              key={event.id}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleEvent(event.id)}
              className={cn(
                "relative flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left",
                "transition-all duration-300",
                isSelected
                  ? "border-[#D4AF37] bg-[#F7D9C4]/40 shadow-[0_4px_20px_rgba(212,175,55,0.15)]"
                  : "border-[#D4AF37]/20 bg-white/50 hover:border-[#D4AF37]/40",
                disabled && "cursor-not-allowed opacity-50",
              )}
            >
              <span className="text-xl" aria-hidden="true">
                {event.emoji}
              </span>
              <span className="flex-1 font-[family-name:var(--font-rw-body)] text-[15px] text-[#7A1F2B]">
                {event.label}
              </span>
              {isSelected ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#D4AF37] text-[#7A1F2B]">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
              ) : (
                <span
                  className="size-5 shrink-0 rounded-full border border-[#D4AF37]/40"
                  aria-hidden="true"
                />
              )}
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
