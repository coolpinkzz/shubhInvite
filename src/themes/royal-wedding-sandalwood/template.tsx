import { RoyalWeddingHero } from "@/themes/royal-wedding/sections/Hero";
import { RSVPSection } from "@/themes/royal-wedding/sections/RSVPSection";
import { VenueLocation } from "@/themes/royal-wedding/sections/VenueLocation";

import { sandalwoodRSVPEvents } from "./events";
import { heroPetals, venuePetals } from "./petals";
import { BlessingFooter } from "./sections/Footer";
import { FamilyBlessings } from "./sections/Families";
import { RsvpContacts } from "./sections/RsvpContacts";
import { SandalwoodSchedule } from "./sections/Schedule";
import { weddingVenue } from "./venue";

import "@/themes/royal-wedding/royal-wedding.css";

export function RoyalWeddingSandalwoodTemplate() {
  return (
    <>
      <RoyalWeddingHero
        petals={heroPetals}
        showGalleryNav={false}
        coupleClassName="text-[clamp(2.05rem,8vw,3.25rem)] sm:text-[3.4rem]"
      />
      <FamilyBlessings />
      <SandalwoodSchedule />
      <VenueLocation
        {...weddingVenue}
        petals={venuePetals}
        title="The Wedding Venue"
        subtitle="Susri Sangita and Manoranjan will be married here. Directions for every other celebration are on the cards above."
      />
      <RsvpContacts />
      <RSVPSection
        events={sandalwoodRSVPEvents}
        title="Kindly RSVP"
        subtitle="Your presence is the greatest gift. Let us know which celebrations you can join."
        className="scroll-mt-24 pb-8"
      />
      <BlessingFooter blessing="Your presence is the blessing we cherish most. The Patnaik and Parija families look forward to celebrating with you." />
    </>
  );
}
