"use client";

import { forwardRef } from "react";

import { rsvpControlClass, rsvpErrorClass, rsvpLabelClass } from "./rsvp-form-styles";

interface RSVPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const RSVPInput = forwardRef<HTMLInputElement, RSVPInputProps>(
  function RSVPInput({ label, error, className, id, ...props }, ref) {
    const inputId = id ?? props.name;

    return (
      <div className="space-y-2">
        <label htmlFor={inputId} className={rsvpLabelClass()}>
          {label}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={rsvpControlClass({ error, className })}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error ? (
          <p id={`${inputId}-error`} role="alert" className={rsvpErrorClass()}>
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
