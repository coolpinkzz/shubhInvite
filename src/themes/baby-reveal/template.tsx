"use client";

import { BabyRevealHero } from "./components/BabyReveal";
import { babyRevealConfig } from "./config";
import { EventScheduleSection } from "./sections/EventSchedule";
import { PhotoAlbumSection } from "./sections/PhotoAlbum";
import { RSVPSection } from "./sections/RSVPSection";
import { VenueLocationSection } from "./sections/VenueLocation";

import "./baby-reveal.css";

export function BabyRevealTemplate() {
  const {
    babyName,
    brand,
    parents,
    copy,
    scratchCard,
    countdownTarget,
    photoAlbum,
  } = babyRevealConfig;

  const scrollToPhotoAlbum = () => {
    document.getElementById("photo-album")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <BabyRevealHero
        babyName={babyName}
        brand={brand}
        scratchCard={scratchCard}
        parents={parents}
        parentsOverline={copy.parentsOverline}
        inviteLine={copy.inviteLine}
        title={copy.title}
        subtitle={copy.subtitle}
        revealMessage={copy.revealMessage}
        countdownTarget={countdownTarget}
        ctaPrimary={copy.ctaPrimary}
        ctaSecondary={copy.ctaSecondary}
        onPrimaryClick={scrollToPhotoAlbum}
        onSecondaryClick={scrollToPhotoAlbum}
      />

      <PhotoAlbumSection photos={photoAlbum} />

      <EventScheduleSection />

      <VenueLocationSection />

      <RSVPSection />
    </>
  );
}
