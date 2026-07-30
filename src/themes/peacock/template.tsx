"use client";

import { useTheme } from "@/hooks/useTheme";
import { isWeddingConfig } from "@/types/theme";

import { Hero } from "./components";
import { invitationData } from "./components/themeData";
import { EventScheduleSection } from "./sections/EventSchedule";
import { BlessingFooter } from "./sections/Footer";
import { PhotoAlbumSection } from "./sections/PhotoAlbum";
import { RSVPSection } from "./sections/RSVPSection";
import { VenueLocation } from "./sections/VenueLocation";
import { peacockVenue } from "./venue-data";

import "./peacock.css";

export function PeacockTemplate() {
  const { config } = useTheme();

  if (!isWeddingConfig(config)) {
    throw new Error("PeacockTemplate requires a wedding theme configuration.");
  }

  return (
    <div className="peacock relative overflow-x-hidden selection:bg-[#D4AF37]/25 selection:text-[#1E3A8A]">
      <Hero data={invitationData} />
      <div className="pk-section-content">
        <PhotoAlbumSection photos={config.photoAlbum} />
        <EventScheduleSection />
        <VenueLocation {...peacockVenue} />
        <RSVPSection />
        <BlessingFooter />
      </div>
    </div>
  );
}
