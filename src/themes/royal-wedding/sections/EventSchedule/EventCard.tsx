"use client";

import { motion } from "framer-motion";

import { useTheme } from "@/hooks/useTheme";
import { ThemeCard } from "@/themes/shared/components";
import { resolveEventAccent } from "@/themes/shared/utils/event-accent";
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
  const { tokens } = useTheme();
  const accentColor = resolveEventAccent(tokens.colors, event.accent);
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
      <ThemeCard radius="2xl" interactive>
        <div
          className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${accentColor}, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative flex items-start gap-4">
          <EventIcon icon={Icon} color={accentColor} />
          <div className="min-w-0 flex-1 pt-1">
            <h3 className="font-theme-headline text-xl font-medium leading-tight text-primary">
              {event.title}
            </h3>
            <p className="mt-3 font-theme-body text-[15px] leading-relaxed text-theme-subtle">
              {event.description}
            </p>
          </div>
        </div>

        <div className="relative mt-5 border-t border-accent/15 pt-5">
          <EventDetails event={event} />
        </div>
      </ThemeCard>
    </motion.article>
  );
}
