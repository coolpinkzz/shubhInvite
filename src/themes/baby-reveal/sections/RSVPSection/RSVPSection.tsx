"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { RSVPForm } from "@/themes/royal-wedding/sections/RSVPSection/RSVPForm";
import { SuccessCard } from "@/themes/royal-wedding/sections/RSVPSection/SuccessCard";
import type {
  RSVPFormData,
  RSVPSectionProps,
} from "@/themes/royal-wedding/sections/RSVPSection/types";

import { FloralPetals } from "@/themes/baby-reveal/components/BabyReveal/FloralPetals";

import { babyRevealRSVPEvents } from "./events-data";

async function defaultSubmitHandler(_data: RSVPFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export function RSVPSection({
  title = "Kindly RSVP",
  subtitle = "We would be honoured to have you celebrate our little one's special day with us.",
  className,
  events = babyRevealRSVPEvents,
  onSubmit = defaultSubmitHandler,
}: RSVPSectionProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = useCallback(
    async (data: RSVPFormData) => {
      await onSubmit(data);
      setIsSubmitted(true);
    },
    [onSubmit],
  );

  const handleBack = useCallback(() => {
    setIsSubmitted(false);
    setFormKey((key) => key + 1);
  }, []);

  return (
    <ThemeSection id="rsvp" className={className ?? "pb-16"} srTitle={title}>
      <FloralPetals className="pointer-events-none absolute inset-0 overflow-hidden opacity-50" />

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
      </ThemeSectionContent>
    </ThemeSection>
  );
}
