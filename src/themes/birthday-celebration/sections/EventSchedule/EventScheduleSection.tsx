"use client";

import { motion } from "framer-motion";

import {
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";
import { EventCard } from "@/themes/royal-wedding/sections/EventSchedule/EventCard";
import type { WeddingEvent } from "@/themes/royal-wedding/sections/EventSchedule/types";

import { ConfettiRain } from "../../components/ConfettiRain";
import { birthdayCelebrationEvents } from "./events-data";

interface EventScheduleSectionProps {
  events?: WeddingEvent[];
  overline?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function EventScheduleSection({
  events = birthdayCelebrationEvents,
  overline = "Mission Briefing",
  title = "Party Schedule",
  subtitle = "A day packed with hero-level fun — here's how the mission unfolds.",
  className,
}: EventScheduleSectionProps) {
  return (
    <ThemeSection id="events" className={className} srTitle={title}>
      <ConfettiRain className="opacity-20" />

      <ThemeSectionContent>
        <ThemeSectionHeader
          overline={overline}
          title={title}
          subtitle={subtitle}
        />

        <div className="mt-10 space-y-4">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-swing-in"
              initial={{ opacity: 0, y: 36, rotate: index % 2 === 0 ? -2.5 : 2.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-40px", amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <EventCard event={event} index={0} />
              {index < events.length - 1 ? (
                <div className="comic-web-divider my-5" aria-hidden="true" />
              ) : null}
            </motion.div>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
