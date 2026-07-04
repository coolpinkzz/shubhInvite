"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const MAX_LENGTH = 300;

interface MessageBoxProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "maxLength"> {
  label?: string;
  error?: string;
  value?: string;
}

export const MessageBox = forwardRef<HTMLTextAreaElement, MessageBoxProps>(
  function MessageBox(
    {
      label = "Message for the Couple",
      error,
      className,
      value = "",
      ...props
    },
    ref,
  ) {
    const charCount = value.length;

    return (
      <div className="space-y-2">
        <label
          htmlFor="rsvp-message"
          className="block font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id="rsvp-message"
          maxLength={MAX_LENGTH}
          rows={4}
          className={cn(
            "w-full resize-none rounded-2xl border border-[#D4AF37]/25 bg-white/60 px-4 py-3.5",
            "font-[family-name:var(--font-rw-body)] text-[15px] leading-relaxed text-[var(--rw-on-background)]",
            "placeholder:text-[var(--rw-on-surface-variant)]/50",
            "shadow-[inset_0_1px_2px_rgba(122,31,43,0.04)]",
            "transition-all duration-300",
            "focus:border-[#D4AF37] focus:bg-white focus:outline-none",
            "focus:shadow-[0_0_0_3px_rgba(212,175,55,0.2),0_4px_16px_rgba(212,175,55,0.12)]",
            error && "border-[#7A1F2B]/50",
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby="rsvp-message-counter"
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p
              role="alert"
              className="font-[family-name:var(--font-rw-body)] text-sm text-[#7A1F2B]"
            >
              {error}
            </p>
          ) : (
            <span />
          )}
          <p
            id="rsvp-message-counter"
            className={cn(
              "font-[family-name:var(--font-rw-label)] text-[10px] tracking-wide text-[#705a4a]/70",
              charCount >= MAX_LENGTH && "text-[#7A1F2B]",
            )}
            aria-live="polite"
          >
            {charCount}/{MAX_LENGTH}
          </p>
        </div>
      </div>
    );
  },
);
