"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface VenueCardProps {
  venueName: string;
  address: string;
  eventName: string;
  date: string;
  time: string;
  className?: string;
}

interface DetailRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function FloatingIcon({ children }: { children: ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F7D9C4]/50 text-[#7A1F2B]"
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
}

function DetailRow({ icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3">
      <FloatingIcon>{icon}</FloatingIcon>
      <div className="min-w-0 flex-1">
        <p className="font-[family-name:var(--font-rw-label)] text-[10px] font-semibold uppercase tracking-[0.14em] text-[#705a4a]">
          {label}
        </p>
        <p className="whitespace-pre-line font-[family-name:var(--font-rw-body)] text-[15px] leading-snug text-[var(--rw-on-background)]">
          {value}
        </p>
      </div>
    </div>
  );
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
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-[#FAF5EB]",
          "p-5 shadow-[0_8px_32px_rgba(122,31,43,0.08)]",
          "before:absolute before:inset-x-5 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent",
          "after:pointer-events-none after:absolute after:inset-2 after:rounded-2xl after:border after:border-[#7A1F2B]/8",
        )}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-[#F7D9C4] opacity-[0.12]"
          aria-hidden="true"
        />

        <div className="relative space-y-4">
          <DetailRow
            icon={<Building2 className="size-4" strokeWidth={1.75} />}
            label="Venue Name"
            value={venueName}
          />
          <DetailRow
            icon={<MapPin className="size-4" strokeWidth={1.75} />}
            label="Address"
            value={address}
          />
          <DetailRow
            icon={<Sparkles className="size-4" strokeWidth={1.75} />}
            label="Event"
            value={eventName}
          />
          <DetailRow
            icon={<CalendarDays className="size-4" strokeWidth={1.75} />}
            label="Date"
            value={date}
          />
          <DetailRow
            icon={<Clock className="size-4" strokeWidth={1.75} />}
            label="Time"
            value={time}
          />
        </div>
      </div>
    </motion.article>
  );
}
