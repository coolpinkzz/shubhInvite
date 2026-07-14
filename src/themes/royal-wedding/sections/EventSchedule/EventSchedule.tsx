"use client";

import {
  ThemeFloralDivider,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "./EventCard";
import { EventInvitationCard } from "./EventInvitationCard";
import { weddingEvents } from "./events-data";
import type { WeddingEvent } from "./types";

interface EventScheduleProps {
  events?: WeddingEvent[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventSchedule({
  events = weddingEvents,
  title = "Wedding Festivities",
  subtitle = "We can't wait to celebrate every special moment with you.",
  className,
}: EventScheduleProps) {
  return (
    <ThemeSection
      id="events"
      className={className ?? "scroll-mt-24 py-16"}
      srTitle={title}
    >
      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="Our Celebrations"
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
