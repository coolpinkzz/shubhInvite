"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface RSVPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const RSVPInput = forwardRef<HTMLInputElement, RSVPInputProps>(
  function RSVPInput({ label, error, className, id, ...props }, ref) {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="block font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]"
        >
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
            className={cn(
              "w-full rounded-2xl border border-[#D4AF37]/25 bg-white/60 px-4 py-3.5",
              "font-[family-name:var(--font-rw-body)] text-[15px] text-[var(--rw-on-background)]",
              "placeholder:text-[var(--rw-on-surface-variant)]/50",
              "shadow-[inset_0_1px_2px_rgba(122,31,43,0.04)]",
              "transition-all duration-300",
              "focus:border-[#D4AF37] focus:bg-white focus:outline-none",
              "focus:shadow-[0_0_0_3px_rgba(212,175,55,0.2),0_4px_16px_rgba(212,175,55,0.12)]",
              error && "border-[#7A1F2B]/50 focus:border-[#7A1F2B]",
              className,
            )}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        {error ? (
          <p
            id={`${inputId}-error`}
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
