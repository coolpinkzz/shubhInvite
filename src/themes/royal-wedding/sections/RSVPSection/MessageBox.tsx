"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import {
  ThemeFormError,
  ThemeFormLabel,
  themeFormControlClass,
  themeFormLabelClass,
} from "@/themes/shared/components";

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
        <ThemeFormLabel htmlFor="rsvp-message">{label}</ThemeFormLabel>
        <textarea
          ref={ref}
          id="rsvp-message"
          maxLength={MAX_LENGTH}
          rows={4}
          className={themeFormControlClass({
            error,
            className: cn("resize-none leading-relaxed", className),
          })}
          aria-invalid={error ? true : undefined}
          aria-describedby="rsvp-message-counter"
          {...props}
        />
        <div className="flex items-center justify-between">
          {error ? <ThemeFormError>{error}</ThemeFormError> : <span />}
          <p
            id="rsvp-message-counter"
            className={cn(
              themeFormLabelClass("tracking-wide text-muted/70"),
              charCount >= MAX_LENGTH && "text-primary",
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
