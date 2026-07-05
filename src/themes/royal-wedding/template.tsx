import { EventSchedule } from "./sections/EventSchedule";
import { RoyalWeddingHero } from "./sections/Hero";
import { RSVPSection } from "./sections/RSVPSection";
import { defaultVenue, VenueLocation } from "./sections/VenueLocation";

import "./royal-wedding.css";

export function RoyalWeddingTemplate() {
  return (
    <>
      <RoyalWeddingHero />
      <EventSchedule />
      <VenueLocation {...defaultVenue} />
      <RSVPSection />
    </>
  );
}
