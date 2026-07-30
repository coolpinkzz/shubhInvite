"use client";

import {
  ThemeFloralDivider,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "@/themes/royal-wedding/sections/EventSchedule/EventCard";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

import { FloatingFeathers } from "../../components/FloatingFeathers";
import { GoldDivider } from "../../components/GoldDivider";
import { peacockEvents } from "./events-data";

interface EventScheduleSectionProps {
  events?: WeddingEvent[];
  overline?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventScheduleSection({
  events = peacockEvents,
  overline = "Celebrate With Us",
  title = "Wedding Events",
  subtitle = "From sacred rituals to joyous evenings — we would be honored by your presence.",
  className,
}: EventScheduleSectionProps) {
  return (
    <ThemeSection
      id="events"
      className={className ?? "scroll-mt-24 bg-[#FFFDF8] py-16"}
      srTitle={title}
    >
      <FloatingFeathers count={2} className="opacity-60" />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
          showGarland={false}
        />

        <div className="mx-auto mt-4 max-w-xs">
          <GoldDivider />
        </div>

        <div className="mt-10 space-y-8">
          {events.map((event, index) => (
            <div key={event.id}>
              <EventCard event={event} index={index} />
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
