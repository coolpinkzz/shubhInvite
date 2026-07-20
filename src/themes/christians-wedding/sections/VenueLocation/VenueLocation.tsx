"use client";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";

import { FloatingPetals } from "../../components/FloatingPetals";
import { EmbeddedMap } from "./EmbeddedMap";
import { VenueActions } from "./VenueActions";
import { VenueCard } from "./VenueCard";
import type { VenueLocationProps } from "./types";

export function VenueLocation({
  venueName,
  address,
  eventName,
  date,
  time,
  embedUrl,
  googleMapsUrl,
  title = "Find Your Way",
  subtitle = "We can't wait to welcome you. Here's where our celebration begins.",
  className,
}: VenueLocationProps) {
  return (
    <ThemeSection
      id="venue"
      className={className ?? "bg-[#FCF7F3] pt-16 pb-8"}
      srTitle={title}
      bottomGlow
    >
      <FloatingPetals />

      <ThemeSectionContent>
        <ThemeSectionHeader
          title={title}
          overline="Location"
          subtitle={subtitle}
          showGarland={false}
        />

        <EmbeddedMap
          embedUrl={embedUrl}
          title={`Map showing ${venueName}`}
          className="mt-8"
        />

        <VenueCard
          venueName={venueName}
          address={address}
          eventName={eventName}
          date={date}
          time={time}
          className="mt-6"
        />

        <VenueActions
          googleMapsUrl={googleMapsUrl}
          venueName={venueName}
          address={address}
          className="mt-6"
        />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
