import { EventSchedule } from "@/themes/royal-wedding/sections/EventSchedule";
import { RoyalWeddingHero } from "@/themes/royal-wedding/sections/Hero";
import { RSVPSection } from "@/themes/royal-wedding/sections/RSVPSection";
import { VenueLocation } from "@/themes/royal-wedding/sections/VenueLocation";

import { modernVenue } from "./venue-data";

import "./modern-wedding.css";

export function ModernWeddingTemplate() {
  return (
    <>
      <RoyalWeddingHero />
      <EventSchedule />
      <VenueLocation {...modernVenue} />
      <RSVPSection />
    </>
  );
}
