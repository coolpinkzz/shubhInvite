"use client";

import { ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import type { WeddingEvent } from "./types";

interface EventInvitationCardProps {
  event: WeddingEvent;
  index: number;
  className?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: index * 0.1,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

/** Static canva artwork invitation card. */
export function EventInvitationCard({
  event,
  index,
  className,
}: EventInvitationCardProps) {
  if (!event.invitationImage) return null;

  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      className={cn(
        "relative mx-auto flex w-full max-w-sm flex-col md:max-w-md lg:max-w-lg",
        className,
      )}
    >
      <div className="overflow-hidden rounded-2xl">
        <Image
          src={event.invitationImage}
          alt={`${event.title} invitation`}
          width={event.invitationImage.width}
          height={event.invitationImage.height}
          className="h-auto w-full"
          sizes="(max-width: 768px) 384px, (max-width: 1024px) 448px, 512px"
          priority={index === 0}
        />
      </div>
      {event.mapsUrl ? (
        <a
          href={event.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-theme-label text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[var(--theme-shadow-button)]"
        >
          <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
          View on Google Maps
          <ExternalLink
            className="size-3.5 opacity-70"
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      ) : null}
    </motion.article>
  );
}
