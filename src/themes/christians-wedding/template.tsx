"use client";

import { useTheme } from "@/hooks/useTheme";
import { isWeddingConfig } from "@/types/theme";

import { Hero } from "./components";
import { invitationData } from "./components/constants";
import { EventScheduleSection } from "./sections/EventSchedule";
import { BlessingFooter } from "./sections/Footer";
import { PhotoAlbumSection } from "./sections/PhotoAlbum";
import { RSVPSection } from "./sections/RSVPSection";
import { VenueLocation } from "./sections/VenueLocation";
import { christiansWeddingVenue } from "./venue-data";

import "./christians-wedding.css";

export function ChristiansWeddingTemplate() {
  const { config } = useTheme();

  if (!isWeddingConfig(config)) {
    throw new Error(
      "ChristiansWeddingTemplate requires a wedding theme configuration.",
    );
  }

  return (
    <div className="christians-wedding relative overflow-x-hidden selection:bg-[#B88C6A]/25 selection:text-[#2E2E2E]">
      <Hero data={invitationData} />
      <div className="cw-section-content">
        <PhotoAlbumSection photos={config.photoAlbum} />
        <EventScheduleSection />
        <VenueLocation {...christiansWeddingVenue} />
        <RSVPSection />
        <BlessingFooter />
      </div>
    </div>
  );
}
