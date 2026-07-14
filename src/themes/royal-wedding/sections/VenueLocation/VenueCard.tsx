"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

import { ThemeCard, ThemeDetailRow } from "@/themes/shared/components";
import { cn } from "@/lib/utils";

/** Lighter dark royal card — same family as RSVP, soft step up in brightness */
const venueCardClassName = cn(
  "bg-[linear-gradient(180deg,var(--theme-primary-container)_0%,color-mix(in_srgb,var(--theme-primary-container)_72%,white)_100%)]",
  "border-accent/50",
  "shadow-[0_14px_40px_-12px_rgba(91,6,23,0.35),0_0_0_1px_rgba(212,175,55,0.14)]",
  "before:via-accent",
  "after:border-accent/25",
);

interface VenueCardProps {
  venueName: string;
  address: string;
  eventName: string;
  date: string;
  time: string;
  className?: string;
}

export function VenueCard({
  venueName,
  address,
  eventName,
  date,
  time,
  className,
}: VenueCardProps) {
  return (
    <motion.article
      className={cn("group relative", className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
    >
      <ThemeCard
        borderClassName="border-accent/50"
        className={venueCardClassName}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/15"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-4">
          <ThemeDetailRow
            tone="onDark"
            floatingIcon
            icon={<Building2 className="size-4" strokeWidth={1.75} />}
            label="Venue Name"
            value={venueName}
          />
          <ThemeDetailRow
            tone="onDark"
            floatingIcon
            icon={<MapPin className="size-4" strokeWidth={1.75} />}
            label="Address"
            value={address}
          />
          <ThemeDetailRow
            tone="onDark"
            floatingIcon
            icon={<Sparkles className="size-4" strokeWidth={1.75} />}
            label="Event"
            value={eventName}
          />
          <ThemeDetailRow
            tone="onDark"
            floatingIcon
            icon={<CalendarDays className="size-4" strokeWidth={1.75} />}
            label="Date"
            value={date}
          />
          <ThemeDetailRow
            tone="onDark"
            floatingIcon
            icon={<Clock className="size-4" strokeWidth={1.75} />}
            label="Time"
            value={time}
          />
        </div>
      </ThemeCard>
    </motion.article>
  );
}
