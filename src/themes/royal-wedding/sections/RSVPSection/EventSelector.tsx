"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import {
  ThemeFormError,
  ThemeFormLegend,
  themeSelectorOptionClass,
} from "@/themes/shared/components";
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
      <ThemeFormLegend>Which Events Will You Attend?</ThemeFormLegend>
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
              className={themeSelectorOptionClass(
                isSelected,
                cn(
                  "flex items-center gap-3 px-4 py-3.5 text-left",
                  disabled && "cursor-not-allowed opacity-50",
                ),
              )}
            >
              <span className="text-xl" aria-hidden="true">
                {event.emoji}
              </span>
              <span className="flex-1 font-theme-body text-[15px] text-primary">
                {event.label}
              </span>
              {isSelected ? (
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                  <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                </span>
              ) : (
                <span
                  className="size-5 shrink-0 rounded-full border border-accent/40"
                  aria-hidden="true"
                />
              )}
            </motion.button>
          );
        })}
      </div>
      {error ? <ThemeFormError>{error}</ThemeFormError> : null}
    </fieldset>
  );
}
