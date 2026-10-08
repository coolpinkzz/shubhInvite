"use client";

import { EventSchedule } from "@/themes/royal-wedding/sections/EventSchedule";

import { sandalwoodEvents } from "../../events";

export function SandalwoodSchedule() {
  return (
    <EventSchedule
      events={sandalwoodEvents}
      title="The Celebrations"
      subtitle="From Patia to Cuttack and Brahmapur, every gathering has a place for you."
    />
  );
}
