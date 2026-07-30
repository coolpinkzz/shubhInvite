"use client";

import { motion } from "framer-motion";
import {
  CalendarDays,
  Clock,
  ExternalLink,
  MapPin,
  type LucideIcon,
} from "lucide-react";

import { ThemeCard } from "@/themes/shared/components";
import { cn } from "@/lib/utils";

export interface BabyRevealEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  icon: LucideIcon;
  googleMapsUrl: string;
}

interface EventCardProps {
  event: BabyRevealEvent;
  index: number;
  className?: string;
}

export function EventCard({ event, index, className }: EventCardProps) {
  const Icon = event.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{
        duration: 0.65,
        delay: index * 0.12,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn("group relative", className)}
    >
      <ThemeCard
        radius="2xl"
        interactive
        className={cn(
          "border border-white/15",
          "bg-[linear-gradient(165deg,#1E3A4C_0%,#2A4F63_42%,#3D6A82_100%)]",
          "shadow-[0_18px_40px_-16px_rgba(30,58,76,0.55)]",
        )}
      >
        <div className="relative flex items-start gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full",
              "bg-white/15 text-white ring-1 ring-white/30",
            )}
            aria-hidden="true"
          >
            <Icon className="size-5" strokeWidth={2} />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-theme-headline text-xl font-bold leading-tight text-white">
              {event.title}
            </h3>
            <p className="mt-2 font-theme-body text-[15px] font-semibold leading-relaxed text-white/90">
              {event.description}
            </p>
          </div>
        </div>

        <div className="relative mt-5 border-t border-white/20 pt-5">
          <ul className="space-y-3.5">
            <li className="flex items-start gap-3">
              <CalendarDays
                className="mt-0.5 size-4 shrink-0 text-[#A8D4F0]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div>
                <p className="font-theme-label text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
                  Date
                </p>
                <p className="mt-0.5 font-theme-body text-sm font-bold text-white">
                  {event.date}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock
                className="mt-0.5 size-4 shrink-0 text-[#A8D4F0]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div>
                <p className="font-theme-label text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
                  Time
                </p>
                <p className="mt-0.5 font-theme-body text-sm font-bold text-white">
                  {event.time}
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-[#A8D4F0]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <div>
                <p className="font-theme-label text-[10px] font-bold uppercase tracking-[0.16em] text-white/65">
                  Venue
                </p>
                <p className="mt-0.5 font-theme-body text-sm font-bold text-white">
                  {event.venue}
                </p>
                <p className="mt-0.5 font-theme-body text-sm font-semibold leading-relaxed text-white/90">
                  {event.address}
                </p>
              </div>
            </li>
          </ul>

          <a
            href={event.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-5 flex w-full items-center justify-center gap-2 rounded-full",
              "bg-white px-5 py-3.5 text-[#1E3A4C]",
              "font-theme-label text-xs font-bold uppercase tracking-[0.12em]",
              "shadow-[0_4px_20px_-4px_rgba(0,0,0,0.35)]",
              "transition-transform active:scale-[0.98]",
            )}
          >
            <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
            Open in Google Maps
            <ExternalLink
              className="size-3.5 opacity-70"
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </div>
      </ThemeCard>
    </motion.article>
  );
}
