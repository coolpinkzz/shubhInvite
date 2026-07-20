"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";

import { FloatingPetals } from "../../components/FloatingPetals";
import { christiansRSVPEvents } from "./events-data";
import { RSVPForm } from "./RSVPForm";
import { SuccessCard } from "./SuccessCard";
import type { RSVPFormData, RSVPSectionProps } from "./types";

async function defaultSubmitHandler(_data: RSVPFormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1500));
}

export function RSVPSection({
  title = "Kindly RSVP",
  subtitle = "Your presence is the greatest gift to us. Please let us know if you'll be joining our celebration.",
  className,
  events = christiansRSVPEvents,
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
    <ThemeSection
      id="rsvp"
      className={className ?? "scroll-mt-24 bg-[#FCF7F3] pb-28 pt-8"}
      srTitle={title}
    >
      <FloatingPetals />

      <ThemeSectionContent
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <ThemeSectionHeader
          overline="Your Response"
          title={title}
          subtitle={subtitle}
          titleId="cw-rsvp-section-title"
          showGarland={false}
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
                <RSVPForm events={events} onSubmit={handleSubmit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
