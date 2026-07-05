"use client";

import {
  ThemeFloralDivider,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "@/themes/royal-wedding/sections/EventSchedule/EventCard";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

import { FloralPetals } from "@/themes/baby-reveal/components/BabyReveal/FloralPetals";

import { babyRevealEvents } from "./events-data";

interface EventScheduleSectionProps {
  events?: WeddingEvent[];
  overline?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventScheduleSection({
  events = babyRevealEvents,
  overline = "Celebration Details",
  title = "Event Schedule",
  subtitle = "We can't wait to celebrate this precious moment with you.",
  className,
}: EventScheduleSectionProps) {
  return (
    <ThemeSection id="events" className={className} srTitle={title}>
      <FloralPetals className="pointer-events-none absolute inset-0 overflow-hidden opacity-50" />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline={overline}
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
