"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { submitRsvp } from "@/features/rsvp/actions/submit-rsvp";
import { useTheme } from "@/hooks/useTheme";
import {
  ThemeSection,
  ThemeSectionContent,
} from "@/themes/shared/components";

import type { SandalwoodGuestEvent } from "../../events";
import { GuestDetailsForm } from "./GuestDetailsForm";
import type { GuestDetailsValues } from "./schema";

interface SandalwoodRsvpSectionProps {
  events: SandalwoodGuestEvent[];
  subtitle?: string;
  className?: string;
}

export function SandalwoodRsvpSection({
  events,
  subtitle,
  className,
}: SandalwoodRsvpSectionProps) {
  const { themeId } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = useCallback(
    async (data: GuestDetailsValues) => {
      const result = await submitRsvp({
        invitationId: themeId,
        response: data,
        eventLabels: events
          .filter((event) => data.events.includes(event.id))
          .map((event) => event.title),
      });
      if (!result.ok) throw new Error(result.error);
      setIsSubmitted(true);
    },
    [events, themeId],
  );

  return (
    <ThemeSection
      id="rsvp"
      className={className ?? "scroll-mt-24 bg-[#FBF6F1] pb-12 pt-10"}
      srTitle="Guest details"
    >
      <ThemeSectionContent className="max-w-[420px]">
        {subtitle ? (
          <p className="mb-5 text-center font-theme-body text-[15px] italic leading-relaxed text-[#C4B0A4]">
            {subtitle}
          </p>
        ) : null}

        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ThankYouCard
                onBack={() => {
                  setIsSubmitted(false);
                  setFormKey((key) => key + 1);
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`form-${formKey}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <GuestDetailsForm
                key={formKey}
                events={events}
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </ThemeSectionContent>
    </ThemeSection>
  );
}

function ThankYouCard({ onBack }: { onBack: () => void }) {
  return (
    <div className="rounded-[28px] border border-[#E8D5C6] bg-[#FFF8F3] px-6 py-10 text-center shadow-[0_18px_50px_-28px_rgba(90,40,30,0.35)]">
      <h2 className="font-theme-headline text-3xl text-[#7A2F3B]">Thank you</h2>
      <p className="mx-auto mt-3 max-w-xs font-theme-body text-base italic leading-relaxed text-[#8A7368]">
        Your response has reached us. We are grateful you took the time to reply.
      </p>
      <button
        type="button"
        onClick={onBack}
        className="mt-8 h-14 w-full rounded-full border border-[#E4CDB8] bg-[#FFFDFB] font-theme-label text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8E4034]"
      >
        Back to invitation
      </button>
    </div>
  );
}
