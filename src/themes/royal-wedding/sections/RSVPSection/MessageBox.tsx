"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import {
  rsvpControlClass,
  rsvpErrorClass,
  rsvpLabelClass,
} from "./rsvp-form-styles";

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
        <label htmlFor="rsvp-message" className={rsvpLabelClass()}>
          {label}
        </label>
        <textarea
          ref={ref}
          id="rsvp-message"
          maxLength={MAX_LENGTH}
          rows={4}
          className={rsvpControlClass({
            error,
            className: cn("resize-none leading-relaxed", className),
          })}
          aria-invalid={error ? true : undefined}
          aria-describedby="rsvp-message-counter"
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? (
            <p role="alert" className={rsvpErrorClass()}>
              {error}
            </p>
          ) : (
            <span />
          )}
          <p
            id="rsvp-message-counter"
            className={cn(
              rsvpLabelClass("tracking-wide text-[var(--theme-accent-light)]/70"),
              charCount >= MAX_LENGTH && "text-[var(--theme-accent-light)]",
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
