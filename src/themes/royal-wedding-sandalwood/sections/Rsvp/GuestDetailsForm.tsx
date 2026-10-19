"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";

import { cn } from "@/lib/utils";
import type { SandalwoodGuestEvent } from "../../events";
import {
  guestDetailsSchema,
  type GuestDetailsInput,
  type GuestDetailsValues,
} from "./schema";

const PARTY_SIZES = [
  { value: 1, label: "I (Just me)" },
  { value: 2, label: "2 Guests" },
  { value: 3, label: "3 Guests" },
  { value: 4, label: "4 Guests" },
  { value: 5, label: "5+ Guests" },
] as const;

const fieldClassName =
  "h-[52px] w-full rounded-full border border-[#E4CDB8] bg-[#FFFDFB] px-5 font-theme-body text-[17px] text-[#3F3330] outline-none transition-shadow placeholder:text-[#C4B3A8] focus:border-[#8E4034] focus:ring-2 focus:ring-[#8E4034]/15";

interface GuestDetailsFormProps {
  events: SandalwoodGuestEvent[];
  onSubmit: (data: GuestDetailsValues) => Promise<void>;
}

export function GuestDetailsForm({ events, onSubmit }: GuestDetailsFormProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestDetailsInput, unknown, GuestDetailsValues>({
    resolver: zodResolver(guestDetailsSchema),
    defaultValues: {
      name: "",
      phone: "",
      guests: 1,
      attending: null,
      events: [],
      message: "",
    },
    mode: "onBlur",
  });

  const attending = watch("attending");

  const submit = handleSubmit(async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(data);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  });

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-[28px] border border-[#E8D5C6] bg-[#FFF8F3] px-5 pb-6 pt-7 shadow-[0_18px_50px_-28px_rgba(90,40,30,0.35)] sm:px-6"
    >
      <header className="text-center">
        <h2 className="font-theme-headline text-[13px] font-medium uppercase tracking-[0.32em] text-[#7A2F3B]">
          Guest Details
        </h2>
        <div className="mt-3 h-px w-full bg-[#E6D3C6]" />
      </header>

      <div className="mt-6 space-y-5">
        <Field
          id="guest-name"
          label="Your name"
          error={errors.name?.message}
        >
          <input
            id="guest-name"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "guest-name-error" : undefined}
            className={cn(fieldClassName, errors.name && "border-[#9B3B3B]")}
            {...register("name")}
          />
        </Field>

        <Field
          id="guest-phone"
          label="Contact number"
          error={errors.phone?.message}
        >
          <input
            id="guest-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Contact number"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "guest-phone-error" : undefined}
            className={cn(fieldClassName, errors.phone && "border-[#9B3B3B]")}
            {...register("phone")}
          />
        </Field>

        <Controller
          name="attending"
          control={control}
          render={({ field }) => (
            <fieldset className="space-y-3 pt-1">
              <legend className="mx-auto mb-3 block text-center font-theme-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C5644]">
                Will you join us?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <AttendanceButton
                  selected={field.value === true}
                  onClick={() => field.onChange(true)}
                  label={"Joyfully\nAccept"}
                />
                <AttendanceButton
                  selected={field.value === false}
                  onClick={() => {
                    field.onChange(false);
                    setValue("events", []);
                  }}
                  label={"Regretfully\nDecline"}
                />
              </div>
              {errors.attending?.message ? (
                <p role="alert" className="text-center font-theme-body text-sm text-[#9B3B3B]">
                  {errors.attending.message}
                </p>
              ) : null}
            </fieldset>
          )}
        />

        {attending === true ? (
          <>
            <Controller
              name="guests"
              control={control}
              render={({ field }) => (
                <Field
                  id="guest-party"
                  label="Party size"
                  error={errors.guests?.message}
                >
                  <div className="relative">
                    <select
                      id="guest-party"
                      ref={field.ref}
                      name={field.name}
                      value={field.value}
                      onBlur={field.onBlur}
                      onChange={(event) => field.onChange(Number(event.target.value))}
                      aria-invalid={errors.guests ? true : undefined}
                      className={cn(fieldClassName, "appearance-none pr-12")}
                    >
                      {PARTY_SIZES.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <span
                      className="pointer-events-none absolute right-5 top-1/2 size-0 -translate-y-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-[#8E4034]"
                      aria-hidden="true"
                    />
                  </div>
                </Field>
              )}
            />

            <Controller
              name="events"
              control={control}
              render={({ field }) => (
                <fieldset className="space-y-3">
                  <legend className="mb-3 font-theme-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C5644]">
                    Events you&apos;ll attend
                  </legend>
                  <div className="space-y-3">
                    {events.map((event) => {
                      const selected = field.value.includes(event.id);
                      return (
                        <button
                          key={event.id}
                          type="button"
                          role="checkbox"
                          aria-checked={selected}
                          onClick={() => {
                            field.onChange(
                              selected
                                ? field.value.filter((id) => id !== event.id)
                                : [...field.value, event.id],
                            );
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-[18px] border bg-[#FFFDFB] px-4 py-3.5 text-left transition-colors",
                            selected ? "border-[#D7B09A]" : "border-[#E8D5C6]",
                          )}
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block font-theme-headline text-[15px] leading-snug text-[#7A2F3B]">
                              {event.title}
                            </span>
                            <span className="mt-1 block font-theme-body text-[13px] leading-snug text-[#A89890]">
                              {event.date}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "size-[22px] shrink-0 rounded-full border",
                              selected
                                ? "border-[#8E4034] bg-[#8E4034] shadow-[inset_0_0_0_5px_#FFFDFB]"
                                : "border-[#D7C0B0] bg-transparent",
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      );
                    })}
                  </div>
                  {errors.events?.message ? (
                    <p role="alert" className="font-theme-body text-sm text-[#9B3B3B]">
                      {errors.events.message}
                    </p>
                  ) : null}
                </fieldset>
              )}
            />
          </>
        ) : null}

        <Field
          id="guest-message"
          label="A message for the couple"
          error={errors.message?.message}
        >
          <textarea
            id="guest-message"
            rows={4}
            maxLength={300}
            placeholder="Leave a warm wish or note..."
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "guest-message-error" : undefined}
            className={cn(
              "min-h-[9.25rem] w-full resize-none rounded-[1.35rem] border border-[#E4CDB8] bg-white px-5 py-4 font-theme-body text-[17px] leading-relaxed text-[#3F3330] outline-none transition-shadow placeholder:text-[#B7A79C] focus:border-[#8E4034] focus:ring-2 focus:ring-[#8E4034]/15",
              errors.message && "border-[#9B3B3B]",
            )}
            {...register("message")}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#8E4034] font-theme-label text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_10px_24px_-8px_rgba(142,64,52,0.55)] transition-opacity disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {isSubmitting ? "Sending" : "Send RSVP"}
        </button>

        {submitError ? (
          <p role="alert" className="text-center font-theme-body text-sm text-[#9B3B3B]">
            {submitError}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block font-theme-label text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8C5644]"
      >
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="font-theme-body text-sm text-[#9B3B3B]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function AttendanceButton({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "flex min-h-[4.75rem] items-center justify-center rounded-full border px-3 text-center font-theme-label text-[11px] font-semibold uppercase leading-[1.25] tracking-[0.12em] whitespace-pre-line transition-colors",
        selected
          ? "border-[#8E4034] bg-[#8E4034] text-white shadow-[0_10px_22px_-10px_rgba(142,64,52,0.65)]"
          : "border-[#E4CDB8] bg-[#FFFDFB] text-[#8E4034]",
      )}
    >
      {label}
    </button>
  );
}
