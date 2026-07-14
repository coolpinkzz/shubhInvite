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

import { ConfettiRain } from "../../components/ConfettiRain";
import { birthdayCelebrationVenue } from "../../venue-data";

export function VenueLocationSection({
  title = "Headquarters",
  subtitle = "Drop pin at the lawn for cake, games, and web-slinging fun.",
  className,
  ...venue
}: Partial<VenueLocationProps> = {}) {
  const resolvedVenue = { ...birthdayCelebrationVenue, ...venue };

  return (
    <ThemeSection
      id="venue"
      className={className ?? "py-16"}
      srTitle={title}
      bottomGlow
    >
      <ConfettiRain className="opacity-20" />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="The Drop Zone"
          title={title}
          subtitle={subtitle}
        />

        <div className="comic-panel mt-2 overflow-hidden">
          <EmbeddedMap
            embedUrl={resolvedVenue.embedUrl}
            title={`Map showing ${resolvedVenue.venueName}`}
            className="mt-0 rounded-none border-0 shadow-none"
          />
        </div>

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
