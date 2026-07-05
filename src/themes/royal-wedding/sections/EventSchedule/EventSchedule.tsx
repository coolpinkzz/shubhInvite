"use client";

import {
  ThemeFloralDivider,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "./EventCard";
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
    <ThemeSection id="events" className={className ?? "py-16"} srTitle={title}>
      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="Our Celebrations"
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-10 space-y-2">
          {events.map((event, index) => (
            <div key={event.id}>
              <EventCard event={event} index={index} />
              {index < events.length - 1 ? (
                <ThemeFloralDivider size="sm" />
              ) : null}
            </div>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
