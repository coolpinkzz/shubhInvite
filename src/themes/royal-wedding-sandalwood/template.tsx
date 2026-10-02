import { EventSchedule } from "@/themes/royal-wedding/sections/EventSchedule";
import { RoyalWeddingHero } from "@/themes/royal-wedding/sections/Hero";
import { RSVPSection } from "@/themes/royal-wedding/sections/RSVPSection";
import {
  defaultVenue,
  VenueLocation,
} from "@/themes/royal-wedding/sections/VenueLocation";

import { SANDALWOOD_EVENT_IDS, sandalwoodRSVPEvents } from "./events";
import { heroPetals, venuePetals } from "./petals";

import "@/themes/royal-wedding/royal-wedding.css";

export function RoyalWeddingSandalwoodTemplate() {
  return (
    <>
      <RoyalWeddingHero petals={heroPetals} showGalleryNav={false} />
      <EventSchedule eventIds={SANDALWOOD_EVENT_IDS} />
      <VenueLocation {...defaultVenue} petals={venuePetals} />
      <RSVPSection events={sandalwoodRSVPEvents} />
    </>
  );
}
