"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  ThemeCard,
  ThemeFloralDivider,
  ThemeFormError,
  ThemeFormLabel,
  ThemeFormLegend,
} from "@/themes/shared/components";
import {
  themeFormControlClass,
  themeSelectorOptionClass,
} from "@/themes/shared/styles/theme-form-styles";
import { cn } from "@/lib/utils";

import { christiansRSVPEvents } from "./events-data";
import { rsvpSchema } from "./schema";
import type { RSVPEventOption, RSVPFormData } from "./types";

interface RSVPFormProps {
  events?: RSVPEventOption[];
  onSubmit: (data: RSVPFormData) => Promise<void>;
  className?: string;
}

const defaultValues: RSVPFormData = {
  name: "",
  guests: 1,
  attending: null,
  events: [],
  message: "",
};

export function RSVPForm({
  events = christiansRSVPEvents,
  onSubmit,
  className,
}: RSVPFormProps) {
  const [submitState, setSubmitState] = useState<"idle" | "loading">("idle");

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues,
    mode: "onBlur",
  });

  const attending = watch("attending");

  const handleFormSubmit = handleSubmit(async (data) => {
    setSubmitState("loading");
    try {
      await onSubmit(data);
    } catch {
      setSubmitState("idle");
    }
  });

  return (
    <ThemeCard
      as="form"
      onSubmit={handleFormSubmit}
      noValidate
      borderClassName="border-accent/40"
      className={cn(
        "bg-[linear-gradient(180deg,rgba(255,252,250,0.97)_0%,rgba(245,235,227,0.8)_100%)]",
        className,
      )}
    >
      <div className="relative z-10 space-y-5">
        <div>
          <ThemeFormLabel htmlFor="cw-rsvp-name">Guest Name</ThemeFormLabel>
          <input
            id="cw-rsvp-name"
            type="text"
            autoComplete="name"
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cw-rsvp-name-error" : undefined}
            className={cn(themeFormControlClass({ error: errors.name?.message }), "mt-2")}
            {...register("name")}
          />
          {errors.name?.message ? (
            <ThemeFormError id="cw-rsvp-name-error" className="mt-1.5">
              {errors.name.message}
            </ThemeFormError>
          ) : null}
        </div>

        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <div>
              <ThemeFormLabel id="cw-rsvp-guests-label">
                Number of Guests
              </ThemeFormLabel>
              <div
                className="mt-2 flex items-center gap-3"
                role="group"
                aria-labelledby="cw-rsvp-guests-label"
              >
                <button
                  type="button"
                  aria-label="Decrease guests"
                  disabled={field.value <= 1}
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border border-accent/30",
                    "bg-white/70 text-primary transition-colors hover:bg-accent/10",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                  )}
                >
                  <Minus className="size-4" strokeWidth={2} />
                </button>
                <span
                  className="min-w-10 text-center font-theme-headline text-2xl font-bold text-[#1A1A1A]"
                  aria-live="polite"
                >
                  {field.value}
                </span>
                <button
                  type="button"
                  aria-label="Increase guests"
                  disabled={field.value >= 5}
                  onClick={() => field.onChange(Math.min(5, field.value + 1))}
                  className={cn(
                    "flex size-11 items-center justify-center rounded-full border border-accent/30",
                    "bg-white/70 text-primary transition-colors hover:bg-accent/10",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                  )}
                >
                  <Plus className="size-4" strokeWidth={2} />
                </button>
              </div>
              {errors.guests?.message ? (
                <ThemeFormError className="mt-1.5">
                  {errors.guests.message}
                </ThemeFormError>
              ) : null}
            </div>
          )}
        />

        <ThemeFloralDivider variant="star" size="sm" />

        <Controller
          name="attending"
          control={control}
          render={({ field }) => (
            <fieldset>
              <ThemeFormLegend>Will you be attending?</ThemeFormLegend>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true, label: "Joyfully Yes" },
                  { value: false, label: "Regretfully No" },
                ].map((option) => {
                  const selected = field.value === option.value;
                  return (
                    <button
                      key={String(option.value)}
                      type="button"
                      onClick={() => {
                        field.onChange(option.value);
                        if (!option.value) setValue("events", []);
                      }}
                      className={cn(
                        themeSelectorOptionClass(selected),
                        "rounded-2xl px-4 py-3.5 font-theme-body text-sm font-bold text-[#1A1A1A]",
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
              {errors.attending?.message ? (
                <ThemeFormError className="mt-1.5">
                  {errors.attending.message}
                </ThemeFormError>
              ) : null}
            </fieldset>
          )}
        />

        {attending === true ? (
          <Controller
            name="events"
            control={control}
            render={({ field }) => (
              <fieldset>
                <ThemeFormLegend>Which events will you attend?</ThemeFormLegend>
                <div className="space-y-2.5">
                  {events.map((event) => {
                    const selected = field.value.includes(event.id);
                    return (
                      <button
                        key={event.id}
                        type="button"
                        onClick={() => {
                          field.onChange(
                            selected
                              ? field.value.filter((id) => id !== event.id)
                              : [...field.value, event.id],
                          );
                        }}
                        className={cn(
                          themeSelectorOptionClass(selected),
                          "flex w-full items-center rounded-2xl px-4 py-3.5 text-left",
                          "font-theme-body text-sm font-bold text-[#1A1A1A]",
                        )}
                      >
                        {event.label}
                      </button>
                    );
                  })}
                </div>
                {errors.events?.message ? (
                  <ThemeFormError className="mt-1.5">
                    {errors.events.message}
                  </ThemeFormError>
                ) : null}
              </fieldset>
            )}
          />
        ) : null}

        <ThemeFloralDivider variant="star" size="sm" />

        <div>
          <ThemeFormLabel htmlFor="cw-rsvp-message">Message</ThemeFormLabel>
          <textarea
            id="cw-rsvp-message"
            rows={4}
            placeholder="Leave your blessings or a lovely message..."
            aria-invalid={Boolean(errors.message)}
            className={cn(
              themeFormControlClass({ error: errors.message?.message }),
              "mt-2 resize-none",
            )}
            {...register("message")}
          />
          {errors.message?.message ? (
            <ThemeFormError className="mt-1.5">
              {errors.message.message}
            </ThemeFormError>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={submitState === "loading"}
          className={cn(
            "w-full rounded-full bg-accent px-6 py-4",
            "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-white",
            "shadow-[var(--theme-shadow-button)] transition-opacity",
            "disabled:cursor-wait disabled:opacity-70",
          )}
        >
          {submitState === "loading" ? "Sending…" : "Send RSVP"}
        </button>
      </div>
    </ThemeCard>
  );
}
