"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { AttendanceSelector } from "./AttendanceSelector";
import { defaultRSVPEvents } from "./events-data";
import { EventSelector } from "./EventSelector";
import { FloralDivider } from "./FloralDivider";
import { GuestCounter } from "./GuestCounter";
import { MessageBox } from "./MessageBox";
import { RSVPInput } from "./RSVPInput";
import { rsvpSchema } from "./schema";
import { SubmitButton } from "./SubmitButton";
import type { RSVPFormData, RSVPEventOption } from "./types";

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
  events = defaultRSVPEvents,
  onSubmit,
  className,
}: RSVPFormProps) {
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success"
  >("idle");

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
    <form
      onSubmit={handleFormSubmit}
      noValidate
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-[#FAF5EB]",
        "p-5 shadow-[0_8px_32px_rgba(122,31,43,0.08)]",
        "before:absolute before:inset-x-5 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-2 after:rounded-2xl after:border after:border-[#7A1F2B]/8",
        className,
      )}
    >
      <div className="relative space-y-5">
        <RSVPInput
          label="Guest Name"
          placeholder="Enter your full name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <Controller
          name="guests"
          control={control}
          render={({ field }) => (
            <GuestCounter
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              error={errors.guests?.message}
            />
          )}
        />

        <FloralDivider />

        <Controller
          name="attending"
          control={control}
          render={({ field }) => (
            <AttendanceSelector
              value={field.value}
              onChange={(value) => {
                field.onChange(value);
                if (!value) {
                  setValue("events", []);
                }
              }}
              error={errors.attending?.message}
            />
          )}
        />

        {attending === true ? (
          <Controller
            name="events"
            control={control}
            render={({ field }) => (
              <EventSelector
                events={events}
                value={field.value}
                onChange={field.onChange}
                error={errors.events?.message}
              />
            )}
          />
        ) : null}

        <FloralDivider />

        <Controller
          name="message"
          control={control}
          render={({ field }) => (
            <MessageBox
              placeholder="Leave your blessings or a lovely message..."
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
              error={errors.message?.message}
            />
          )}
        />

        <SubmitButton state={submitState} />
      </div>
    </form>
  );
}
