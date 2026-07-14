"use client";

import {
  ThemeFloralDivider,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "@/themes/royal-wedding/sections/EventSchedule/EventCard";
import { EventInvitationCard } from "@/themes/royal-wedding/sections/EventSchedule/EventInvitationCard";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";
import { FloatingPetals } from "@/themes/royal-wedding/sections/VenueLocation/FloatingPetals";

import { royalMaroonFloralEvents } from "./events-data";

interface EventScheduleSectionProps {
  events?: WeddingEvent[];
  overline?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventScheduleSection({
  events = royalMaroonFloralEvents,
  overline = "Our Celebrations",
  title = "Wedding Festivities",
  subtitle = "We can't wait to celebrate every special moment with you.",
  className,
}: EventScheduleSectionProps) {
  return (
    <ThemeSection id="events" className={className ?? "py-16"} srTitle={title}>
      <FloatingPetals />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-10 space-y-8">
          {events.map((event, index) => (
            <div key={event.id}>
              {event.cardVariant === "invitation" ? (
                <EventInvitationCard event={event} index={index} />
              ) : (
                <EventCard event={event} index={index} />
              )}
              {index < events.length - 1 ? (
                <ThemeFloralDivider size="sm" className="mt-8" />
              ) : null}
            </div>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
