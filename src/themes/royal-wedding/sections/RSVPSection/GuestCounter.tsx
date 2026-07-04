"use client";

import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

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
        <label
          htmlFor="rsvp-guests"
          className="block font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]"
        >
          {label}
        </label>
        <div className="relative">
          <select
            ref={ref}
            id="rsvp-guests"
            className={cn(
              "w-full appearance-none rounded-2xl border border-[#D4AF37]/25 bg-white/60 px-4 py-3.5 pr-10",
              "font-[family-name:var(--font-rw-body)] text-[15px] text-[var(--rw-on-background)]",
              "shadow-[inset_0_1px_2px_rgba(122,31,43,0.04)]",
              "transition-all duration-300",
              "focus:border-[#D4AF37] focus:bg-white focus:outline-none",
              "focus:shadow-[0_0_0_3px_rgba(212,175,55,0.2),0_4px_16px_rgba(212,175,55,0.12)]",
              error && "border-[#7A1F2B]/50",
              className,
            )}
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
            className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#7A1F2B]/60"
            aria-hidden="true"
          />
        </div>
        {error ? (
          <p
            id="rsvp-guests-error"
            role="alert"
            className="font-[family-name:var(--font-rw-body)] text-sm text-[#7A1F2B]"
          >
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
