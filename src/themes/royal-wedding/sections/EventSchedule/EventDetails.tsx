"use client";

import { CalendarDays, Clock, MapPin } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { WeddingEvent } from "./types";

interface EventDetailsProps {
  event: Pick<WeddingEvent, "date" | "time" | "venue" | "address">;
  className?: string;
}

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F7D9C4]/50 text-[#7A1F2B]"
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]">
          {label}
        </p>
        <p className="font-[family-name:var(--font-rw-body)] text-[15px] leading-snug text-[var(--rw-on-background)]">
          {value}
        </p>
      </div>
    </div>
  );
}

export function EventDetails({ event, className }: EventDetailsProps) {
  return (
    <div className={cn("space-y-3.5", className)}>
      <DetailRow
        icon={<CalendarDays className="size-4" strokeWidth={1.75} />}
        label="Date"
        value={event.date}
      />
      <DetailRow
        icon={<Clock className="size-4" strokeWidth={1.75} />}
        label="Time"
        value={event.time}
      />
      <DetailRow
        icon={<MapPin className="size-4" strokeWidth={1.75} />}
        label="Venue"
        value={event.venue}
      />
      <DetailRow
        icon={<MapPin className="size-4" strokeWidth={1.75} />}
        label="Address"
        value={event.address}
      />
    </div>
  );
}
