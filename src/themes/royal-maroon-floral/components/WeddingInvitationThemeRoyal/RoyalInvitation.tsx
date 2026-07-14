"use client";

import { useTheme } from "@/hooks/useTheme";
import { isWeddingConfig } from "@/types/theme";
import { RSVPSection } from "@/themes/royal-wedding/sections/RSVPSection";
import { VenueLocation } from "@/themes/royal-wedding/sections/VenueLocation";

import { EventScheduleSection } from "../../sections/EventSchedule";
import { PhotoAlbumSection } from "../../sections/PhotoAlbum";
import { royalMaroonFloralVenue } from "../../venue-data";
import { InvitationHero } from "./InvitationHero";

export function RoyalInvitation() {
  const { config } = useTheme();

  if (!isWeddingConfig(config)) {
    throw new Error(
      "RoyalInvitation requires a wedding theme configuration.",
    );
  }

  return (
    <div className="relative overflow-x-hidden selection:bg-primary selection:text-[var(--theme-primary-container-foreground)]">
      <InvitationHero />
      <PhotoAlbumSection photos={config.photoAlbum} />
      <EventScheduleSection />
      <VenueLocation {...royalMaroonFloralVenue} />
      <RSVPSection />
    </div>
  );
}
