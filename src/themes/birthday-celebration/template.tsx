"use client";

import { birthdayCelebrationConfig } from "./config";
import { BirthdayHero } from "./sections/Hero";
import { PhotoAlbumSection } from "./sections/PhotoAlbum";
import { EventScheduleSection } from "./sections/EventSchedule";
import { VenueLocationSection } from "./sections/VenueLocation";
import { RSVPSection } from "./sections/RSVPSection";
import { BirthdayFooter } from "./sections/Footer";

import "./birthday-celebration.css";

export function BirthdayCelebrationTemplate() {
  const { photoAlbum, celebrant } = birthdayCelebrationConfig;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <BirthdayHero
        onPrimaryClick={() => scrollTo("photo-album")}
        onSecondaryClick={() => scrollTo("events")}
      />

      <PhotoAlbumSection
        photos={photoAlbum}
        overline="Origin Story"
        title={`${celebrant.firstName}'s Moments`}
      />

      <EventScheduleSection />

      <VenueLocationSection />

      <RSVPSection />

      <BirthdayFooter />
    </>
  );
}
