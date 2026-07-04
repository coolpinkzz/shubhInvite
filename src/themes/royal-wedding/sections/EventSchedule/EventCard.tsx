"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EventDetails } from "./EventDetails";
import { EventIcon } from "./EventIcon";
import type { WeddingEvent } from "./types";

interface EventCardProps {
  event: WeddingEvent;
  index: number;
  className?: string;
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 48,
    scale: 0.96,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      delay: index * 0.12,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function EventCard({ event, index, className }: EventCardProps) {
  const Icon = event.icon;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      whileTap={{ scale: 0.985, y: -2 }}
      className={cn("group relative", className)}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-[#D4AF37]/25 bg-[#FAF5EB]",
          "p-5 shadow-[0_8px_32px_rgba(122,31,43,0.08)]",
          "transition-shadow duration-300",
          "before:absolute before:inset-x-5 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37] before:to-transparent",
          "after:pointer-events-none after:absolute after:inset-2 after:rounded-xl after:border after:border-[#7A1F2B]/8",
          "group-active:shadow-[0_16px_48px_rgba(212,175,55,0.18)]",
        )}
      >
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full opacity-[0.06]"
          style={{ background: `radial-gradient(circle, ${event.color}, transparent 70%)` }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-4">
          <EventIcon icon={Icon} color={event.color} />
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="font-[family-name:var(--font-rw-headline)] text-xl font-medium leading-tight text-[#7A1F2B]">
              {event.title}
            </h3>
            <p className="mt-3 font-[family-name:var(--font-rw-body)] text-[15px] leading-relaxed text-[var(--rw-on-surface-variant)]">
              {event.description}
            </p>
          </div>
        </div>

        <div className="relative mt-5 border-t border-[#D4AF37]/15 pt-5">
          <EventDetails event={event} />
        </div>
      </div>
    </motion.article>
  );
}
