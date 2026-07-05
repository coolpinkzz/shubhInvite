"use client";

import { forwardRef } from "react";

import { cn } from "@/lib/utils";
import {
  ThemeFormError,
  ThemeFormLabel,
  themeFormControlClass,
} from "@/themes/shared/components";

interface RSVPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const RSVPInput = forwardRef<HTMLInputElement, RSVPInputProps>(
  function RSVPInput({ label, error, className, id, ...props }, ref) {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <ThemeFormLabel htmlFor={inputId}>{label}</ThemeFormLabel>
        <input
          ref={ref}
          id={inputId}
          className={themeFormControlClass({ error, className })}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <ThemeFormError id={`${inputId}-error`}>{error}</ThemeFormError>
        ) : null}
      </div>
    );
  },
);
