"use client";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EmbeddedMap } from "@/themes/royal-wedding/sections/VenueLocation/EmbeddedMap";
import { VenueActions } from "@/themes/royal-wedding/sections/VenueLocation/VenueActions";
import { VenueCard } from "@/themes/royal-wedding/sections/VenueLocation/VenueCard";
import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation/types";

import { FloralPetals } from "@/themes/baby-reveal/components/BabyReveal/FloralPetals";

import { babyRevealVenue } from "../../venue-data";

export function VenueLocationSection({
  title = "Find Your Way",
  subtitle = "We can't wait to welcome you to our little one's celebration.",
  className,
  ...venue
}: Partial<VenueLocationProps> = {}) {
  const resolvedVenue = { ...babyRevealVenue, ...venue };

  return (
    <ThemeSection
      id="venue"
      className={className ?? "py-16"}
      srTitle={title}
      bottomGlow
    >
      <FloralPetals className="pointer-events-none absolute inset-0 overflow-hidden opacity-50" />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="The Venue"
          title={title}
          subtitle={subtitle}
        />

        <EmbeddedMap
          embedUrl={resolvedVenue.embedUrl}
          title={`Map showing ${resolvedVenue.venueName}`}
          className="mt-2"
        />

        <VenueCard
          venueName={resolvedVenue.venueName}
          address={resolvedVenue.address}
          eventName={resolvedVenue.eventName}
          date={resolvedVenue.date}
          time={resolvedVenue.time}
          className="mt-6"
        />

        <VenueActions
          googleMapsUrl={resolvedVenue.googleMapsUrl}
          venueName={resolvedVenue.venueName}
          address={resolvedVenue.address}
          className="mt-6"
        />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
