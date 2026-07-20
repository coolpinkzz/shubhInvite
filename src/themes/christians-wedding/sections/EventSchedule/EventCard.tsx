"use client";

import { motion } from "framer-motion";
import { CalendarDays, Clock, MapPin } from "lucide-react";

import { ThemeCard, ThemeFloralDivider } from "@/themes/shared/components";
import { cn } from "@/lib/utils";

import { MOTION } from "../../components/constants";
import type { WeddingEvent } from "./types";

interface EventCardProps {
  event: WeddingEvent;
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
        duration: MOTION.duration,
        delay: index * 0.12,
        ease: MOTION.ease,
      }}
      className={cn("group relative", className)}
    >
      <ThemeCard
        radius="2xl"
        interactive
        borderClassName="border-accent/30"
        className="bg-[linear-gradient(180deg,rgba(255,252,250,0.95)_0%,rgba(245,235,227,0.7)_100%)]"
      >
        <div className="relative flex items-start gap-4">
          <div
            className={cn(
              "flex size-12 shrink-0 items-center justify-center rounded-full",
              "bg-accent/12 text-accent ring-1 ring-accent/25",
            )}
            aria-hidden="true"
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="font-theme-display text-3xl leading-tight text-primary sm:text-[2rem]">
              {event.title}
            </h3>
            <p className="mt-2 font-theme-body text-[15px] font-bold leading-relaxed text-[#1A1A1A]">
              {event.description}
            </p>
          </div>
        </div>

        <div className="relative mt-5 border-t border-accent/15 pt-5">
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CalendarDays
                className="mt-0.5 size-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="font-theme-body text-sm font-bold text-[#1A1A1A]">
                {event.date}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock
                className="mt-0.5 size-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="font-theme-body text-sm font-bold text-[#1A1A1A]">
                {event.time}
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-accent"
                strokeWidth={1.75}
                aria-hidden="true"
              />
              <span className="font-theme-body text-sm font-bold leading-relaxed text-[#1A1A1A]">
                {event.venue}
                <br />
                <span className="font-bold text-[#1A1A1A]">{event.address}</span>
              </span>
            </li>
          </ul>
        </div>
      </ThemeCard>
    </motion.article>
  );
}

export function EventCardDivider() {
  return <ThemeFloralDivider variant="star" size="sm" className="mt-8" />;
}
