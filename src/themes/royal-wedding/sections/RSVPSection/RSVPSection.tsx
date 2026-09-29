"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import { submitRsvp } from "@/features/rsvp/actions/submit-rsvp";
import { useTheme } from "@/hooks/useTheme";
import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { LotusMotif } from "../VenueLocation/LotusMotif";
import { defaultRSVPEvents } from "./events-data";
import { RSVPForm } from "./RSVPForm";
import { SuccessCard } from "./SuccessCard";
import type { RSVPFormData, RSVPSectionProps } from "./types";

export function RSVPSection({
  title = "Kindly RSVP",
  subtitle = "Your presence is the greatest gift to us. Please let us know if you'll be joining our celebration.",
  className,
  events = defaultRSVPEvents,
  onSubmit,
}: RSVPSectionProps) {
  const { themeId } = useTheme();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = useCallback(
    async (data: RSVPFormData) => {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        const result = await submitRsvp({
          invitationId: themeId,
          response: data,
          eventLabels: events
            .filter((event) => data.events.includes(event.id))
            .map((event) => event.label),
        });
        if (!result.ok) throw new Error(result.error);
      }
      setIsSubmitted(true);
    },
    [onSubmit, themeId, events],
  );

  const handleBack = useCallback(() => {
    setIsSubmitted(false);
    setFormKey((key) => key + 1);
  }, []);

  return (
    <ThemeSection
      id="rsvp"
      className={className ?? "scroll-mt-24 pb-28"}
      srTitle={title}
    >
      <ThemeSectionContent
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <ThemeSectionHeader
          overline="Your Response"
          title={title}
          subtitle={subtitle}
          titleId="rsvp-section-title"
        />

        <div className="mt-10">
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <SuccessCard onBack={handleBack} />
              </motion.div>
            ) : (
              <motion.div
                key={`form-${formKey}`}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
              >
                <RSVPForm
                  key={formKey}
                  events={events}
                  onSubmit={handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <LotusMotif />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
