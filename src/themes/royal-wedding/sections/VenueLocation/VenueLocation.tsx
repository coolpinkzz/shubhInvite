"use client";

import {
  ThemeSection,
  ThemeSectionContent,
} from "@/themes/shared/components";
import { EmbeddedMap } from "./EmbeddedMap";
import { FloatingPetals } from "./FloatingPetals";
import { LotusMotif } from "./LotusMotif";
import { SectionHeader } from "./SectionHeader";
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
  subtitle = "We can't wait to welcome you. Here's where the celebrations begin.",
  className,
}: VenueLocationProps) {
  return (
    <ThemeSection
      id="venue"
      className={className ?? "pt-16"}
      srTitle={title}
      bottomGlow
    >
      <FloatingPetals />

      <ThemeSectionContent>
        <SectionHeader title={title} subtitle={subtitle} />

        <EmbeddedMap
          embedUrl={embedUrl}
          title={`Map showing ${venueName}`}
          className="mt-2"
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

        <LotusMotif />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
