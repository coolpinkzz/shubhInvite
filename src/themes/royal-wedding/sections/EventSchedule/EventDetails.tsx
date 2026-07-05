"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";

import { ThemeDetailRow } from "@/themes/shared/components";
import { cn } from "@/lib/utils";
import type { WeddingEvent } from "./types";

interface EventDetailsProps {
  event: Pick<WeddingEvent, "date" | "time" | "venue" | "address">;
  className?: string;
}

export function EventDetails({ event, className }: EventDetailsProps) {
  return (
    <div className={cn("space-y-3.5", className)}>
      <ThemeDetailRow
        icon={<CalendarDays className="size-4" strokeWidth={1.75} />}
        label="Date"
        value={event.date}
      />
      <ThemeDetailRow
        icon={<Clock className="size-4" strokeWidth={1.75} />}
        label="Time"
        value={event.time}
      />
      <ThemeDetailRow
        icon={<MapPin className="size-4" strokeWidth={1.75} />}
        label="Venue"
        value={event.venue}
      />
      <ThemeDetailRow
        icon={<MapPin className="size-4" strokeWidth={1.75} />}
        label="Address"
        value={event.address}
      />
    </div>
  );
}
