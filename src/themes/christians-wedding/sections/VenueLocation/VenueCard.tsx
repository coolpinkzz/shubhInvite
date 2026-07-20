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

import { MOTION } from "../../components/constants";

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
      transition={{ duration: MOTION.duration, ease: MOTION.ease }}
    >
      <ThemeCard
        borderClassName="border-accent/35"
        className="bg-[linear-gradient(180deg,rgba(255,252,250,0.95)_0%,rgba(245,235,227,0.75)_100%)]"
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-accent/10"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-1 text-center">
          <p className="font-theme-label text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
            Venue
          </p>
          <h3 className="font-theme-display text-4xl leading-tight text-primary sm:text-5xl">
            {venueName}
          </h3>
        </div>

        <div className="relative z-10 mt-6 space-y-4 cw-venue-details">
          <ThemeDetailRow
            floatingIcon
            icon={<Building2 className="size-4" strokeWidth={1.75} />}
            label="Venue Name"
            value={venueName}
          />
          <ThemeDetailRow
            floatingIcon
            icon={<MapPin className="size-4" strokeWidth={1.75} />}
            label="Address"
            value={address}
          />
          <ThemeDetailRow
            floatingIcon
            icon={<Sparkles className="size-4" strokeWidth={1.75} />}
            label="Event"
            value={eventName}
          />
          <ThemeDetailRow
            floatingIcon
            icon={<CalendarDays className="size-4" strokeWidth={1.75} />}
            label="Date"
            value={date}
          />
          <ThemeDetailRow
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
