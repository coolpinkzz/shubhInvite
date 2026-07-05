"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import {
  ThemeFormError,
  ThemeFormLabel,
  themeFormControlClass,
} from "@/themes/shared/components";

const GUEST_OPTIONS = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5+" },
] as const;

interface GuestCounterProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange"> {
  label?: string;
  error?: string;
  onChange?: (value: number) => void;
}

export const GuestCounter = forwardRef<HTMLSelectElement, GuestCounterProps>(
  function GuestCounter(
    { label = "Number of Guests", error, className, onChange, ...props },
    ref,
  ) {
    return (
      <div className="space-y-2">
        <ThemeFormLabel htmlFor="rsvp-guests">{label}</ThemeFormLabel>
        <div className="relative">
          <select
            ref={ref}
            id="rsvp-guests"
            className={themeFormControlClass({
              error,
              className: cn("appearance-none pr-10", className),
            })}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "rsvp-guests-error" : undefined}
            onChange={(event) => onChange?.(Number(event.target.value))}
            {...props}
          >
            {GUEST_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-primary/60"
            aria-hidden="true"
          />
        </div>
        {error ? (
          <ThemeFormError id="rsvp-guests-error">{error}</ThemeFormError>
        ) : null}
      </div>
    );
  },
);
