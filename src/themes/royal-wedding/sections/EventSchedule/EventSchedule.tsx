"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventCard } from "./EventCard";
import { EventHeader } from "./EventHeader";
import { FloralDivider } from "./FloralDivider";
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
  title,
  subtitle,
  className,
}: EventScheduleProps) {
  return (
    <section
      id="events"
      aria-labelledby="event-schedule-title"
      className={cn(
        "relative overflow-hidden bg-[#FAF5EB] px-5 py-16 sm:px-6",
        className,
      )}
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <div className="pointer-events-none absolute left-0 top-0 h-24 w-full opacity-15">
        <div className="mughal-arch h-full w-full border-b-[16px] border-[#7A1F2B]/20" />
      </div>

      <motion.div
        className="relative mx-auto w-full max-w-[430px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <EventHeader title={title} subtitle={subtitle} />

        <div className="mt-10 space-y-2">
          {events.map((event, index) => (
            <div key={event.id}>
              <EventCard event={event} index={index} />
              {index < events.length - 1 ? <FloralDivider /> : null}
            </div>
          ))}
        </div>
      </motion.div>

      <span id="event-schedule-title" className="sr-only">
        {title ?? "Wedding Festivities"}
      </span>
    </section>
  );
}
