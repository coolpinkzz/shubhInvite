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
      <ThemeCard>
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-theme-secondary-container opacity-[0.12]"
          aria-hidden="true"
        />

        <div className="relative space-y-4">
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
