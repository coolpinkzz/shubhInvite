// import { RoyalWeddingHero } from "@/themes/royal-wedding/sections/Hero";
import { VenueLocation } from "@/themes/royal-wedding/sections/VenueLocation";
import type { ThemeTemplateProps } from "@/types/theme";

import { sandalwoodCopyForSide, sandalwoodGuestEventsForSide } from "./events";
import { heroPetals, venuePetals } from "./petals";
import { BlessingFooter } from "./sections/Footer";
import { ShivParvatiHero } from "./sections/Hero";
import { FamilyBlessings, TheFamilies } from "./sections/Families";
import { AwaitingPresence } from "./sections/Presence";
import { SandalwoodRsvpSection } from "./sections/Rsvp";
import { SandalwoodSchedule } from "./sections/Schedule";
import { weddingVenue } from "./venue";

import "@/themes/royal-wedding/royal-wedding.css";

export function RoyalWeddingSandalwoodTemplate({ side }: ThemeTemplateProps) {
  const copy = sandalwoodCopyForSide(side);
  const nameOrder = side === "groom" ? "groom" : "bride";

  return (
    <>
      {/* <RoyalWeddingHero
        petals={heroPetals}
        showGalleryNav={false}
        coupleClassName="text-[clamp(2.05rem,8vw,3.25rem)] sm:text-[3.4rem]"
        nameOrder={nameOrder}
      /> */}
      <ShivParvatiHero nameOrder={nameOrder} petals={heroPetals} />
      {/* <FamilyBlessings
        lead={side === "bride" || side === "bride-wedding" ? "bride" : "groom"}
      /> */}
      <SandalwoodSchedule side={side} />
      {/* {copy.showWeddingVenue ? (
        <VenueLocation
          {...weddingVenue}
          petals={venuePetals}
          title="The Wedding Venue"
          subtitle={copy.venueSubtitle}
          showMap={side !== "bride-wedding"}
        />
      ) : null} */}
      <AwaitingPresence />
      <SandalwoodRsvpSection
        side={side}
        events={sandalwoodGuestEventsForSide(side)}
        subtitle={copy.rsvpSubtitle}
        className="scroll-mt-24 bg-[#FBF6F1] pb-12 pt-10"
      />
      <TheFamilies />
      <BlessingFooter
        nameOrder={nameOrder}
        blessing="Your presence is the greatest blessing we could ask for. Thank you for being part of our beautiful beginning and making our special moments even more memorable."
      />
    </>
  );
}
