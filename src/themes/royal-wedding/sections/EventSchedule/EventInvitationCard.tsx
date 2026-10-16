"use client";

import { Send } from "lucide-react";
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
        <div className="relative mx-auto mt-5 w-full max-w-sm">
          <a
            href={event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 flex w-full items-center justify-center gap-2.5 rounded-full bg-[#A3543A] px-6 py-4 font-theme-label text-[13px] font-medium uppercase tracking-[0.22em] text-white shadow-[0_12px_24px_-14px_rgba(90,36,22,0.7)] transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3543A] focus-visible:ring-offset-2"
          >
            <Send
              className="size-[1.05rem] -rotate-6"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            Get Directions
          </a>
        </div>
      ) : null}
    </motion.article>
  );
}
