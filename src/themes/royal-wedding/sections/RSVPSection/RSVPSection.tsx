"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import latkan from "@/assests/latkan.png";
import { cn } from "@/lib/utils";
import { LotusMotif } from "../VenueLocation/LotusMotif";
import { defaultRSVPEvents } from "./events-data";
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
  events = defaultRSVPEvents,
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
    <section
      id="rsvp"
      aria-labelledby="rsvp-section-title"
      className={cn(
        "relative overflow-hidden bg-[#FAF5EB] px-5 pb-16 sm:px-6",
        className,
      )}
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-24 w-full opacity-15">
        <div className="mughal-arch h-full w-full border-b-[16px] border-[#7A1F2B]/20" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[430px]"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <header className="relative text-center">
          <div className="pointer-events-none absolute -top-2 left-0 right-0 flex justify-between px-2">
            <motion.div
              className="garland-swing"
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Image
                src={latkan}
                alt=""
                width={32}
                height={96}
                className="h-16 w-auto object-contain opacity-80"
                aria-hidden="true"
              />
            </motion.div>
            <motion.div
              className="garland-swing"
              style={{ animationDelay: "-2s" }}
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src={latkan}
                alt=""
                width={32}
                height={96}
                className="h-16 w-auto object-contain opacity-80"
                aria-hidden="true"
              />
            </motion.div>
          </div>

          <motion.p
            className="mb-2 font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Response
          </motion.p>

          <motion.h2
            id="rsvp-section-title"
            className="font-[family-name:var(--font-rw-display)] text-[42px] leading-tight text-[#7A1F2B] sm:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="mx-auto mt-3 max-w-xs font-[family-name:var(--font-rw-body)] text-base italic leading-relaxed text-[var(--rw-secondary)] sm:max-w-sm"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            className="mx-auto mt-6 flex max-w-[200px] flex-col items-center gap-2"
            initial={{ opacity: 0, scaleX: 0.6 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <div className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#D4AF37]" />
              <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
                <path
                  d="M12 0L14.5 4.5H22L16 7.5L18.5 12L12 9L5.5 12L8 7.5L2 4.5H9.5L12 0Z"
                  fill="#D4AF37"
                  opacity="0.8"
                />
              </svg>
              <span className="size-1 rounded-full bg-[#D4AF37]" />
            </div>
            <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </motion.div>
        </header>

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
      </motion.div>
    </section>
  );
}
