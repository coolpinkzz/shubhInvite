"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EmbeddedMap } from "./EmbeddedMap";
import { FloralDivider } from "./FloralDivider";
import { FloatingPetals } from "./FloatingPetals";
import { LotusMotif } from "./LotusMotif";
import { SectionHeader } from "./SectionHeader";
import { VenueActions } from "./VenueActions";
import { VenueCard } from "./VenueCard";
import type { VenueLocationProps } from "./types";

export function VenueLocation({
  venueName,
  address,
  eventName,
  date,
  time,
  embedUrl,
  googleMapsUrl,
  title,
  subtitle,
  className,
}: VenueLocationProps) {
  return (
    <section
      id="venue"
      aria-labelledby="venue-location-title"
      className={cn(
        "relative overflow-hidden bg-[#FAF5EB] px-5 pt-16 sm:px-6",
        className,
      )}
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-[0.06]"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse at center bottom, #D4AF37 0%, transparent 70%)",
        }}
      />

      <FloatingPetals />

      <div className="pointer-events-none absolute left-0 top-0 h-24 w-full opacity-15">
        <div className="mughal-arch h-full w-full border-b-[16px] border-[#7A1F2B]/20" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[430px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <SectionHeader title={title} subtitle={subtitle} />

        <EmbeddedMap
          embedUrl={embedUrl}
          title={`Map showing ${venueName}`}
          className="mt-2"
        />

        <VenueCard
          venueName={venueName}
          address={address}
          eventName={eventName}
          date={date}
          time={time}
          className="mt-6"
        />

        <VenueActions
          googleMapsUrl={googleMapsUrl}
          venueName={venueName}
          address={address}
          className="mt-6"
        />

        <LotusMotif />
      </motion.div>

      <span id="venue-location-title" className="sr-only">
        {title ?? "Find Your Way"}
      </span>
    </section>
  );
}
