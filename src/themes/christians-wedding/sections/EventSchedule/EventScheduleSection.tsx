"use client";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";

import { FloatingPetals } from "../../components/FloatingPetals";
import { EventCard, EventCardDivider } from "./EventCard";
import { EventInvitationCard } from "./EventInvitationCard";
import { christiansWeddingEvents } from "./events-data";
import type { WeddingEvent } from "./types";

interface EventScheduleSectionProps {
  events?: WeddingEvent[];
  overline?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventScheduleSection({
  events = christiansWeddingEvents,
  overline = "Celebrate With Us",
  title = "Wedding Events",
  subtitle = "We would be honored by your presence at each sacred celebration.",
  className,
}: EventScheduleSectionProps) {
  return (
    <ThemeSection
      id="events"
      className={className ?? "bg-[#FCF7F3] py-16"}
      srTitle={title}
    >
      <FloatingPetals />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
          showGarland={false}
        />

        <div className="mt-10 space-y-8">
          {events.map((event, index) => (
            <div key={event.id}>
              {event.cardVariant === "invitation" ? (
                <EventInvitationCard event={event} index={index} />
              ) : (
                <EventCard event={event} index={index} />
              )}
              {index < events.length - 1 ? <EventCardDivider /> : null}
            </div>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
