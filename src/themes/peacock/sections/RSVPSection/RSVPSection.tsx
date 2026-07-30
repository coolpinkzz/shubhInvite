"use client";

import { RSVPSection as RoyalRSVPSection } from "@/themes/royal-wedding/sections/RSVPSection";
import type { RSVPSectionProps } from "@/themes/royal-wedding/sections/RSVPSection/types";

import { peacockRSVPEvents } from "./events-data";

export function RSVPSection({
  title = "Kindly RSVP",
  subtitle = "Your presence is our greatest blessing. Please let us know if you will join our celebration.",
  events = peacockRSVPEvents,
  className,
  onSubmit,
}: RSVPSectionProps) {
  return (
    <RoyalRSVPSection
      title={title}
      subtitle={subtitle}
      events={events}
      onSubmit={onSubmit}
      className={className ?? "scroll-mt-24 bg-[#FFFDF8] pb-28 pt-8"}
    />
  );
}
