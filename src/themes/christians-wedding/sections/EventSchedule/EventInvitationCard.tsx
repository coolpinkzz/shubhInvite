"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { MOTION } from "../../components/constants";
import type { WeddingEvent } from "./types";

interface EventInvitationCardProps {
  event: WeddingEvent;
  index: number;
  className?: string;
}

function getImageDimensions(src: WeddingEvent["invitationImage"]) {
  if (!src) return { width: 4000, height: 4000 };

  if (typeof src === "string") {
    return { width: 4000, height: 4000 };
  }

  return { width: src.width, height: src.height };
}

export function EventInvitationCard({
  event,
  index,
  className,
}: EventInvitationCardProps) {
  if (!event.invitationImage) return null;

  const { width, height } = getImageDimensions(event.invitationImage);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px", amount: 0.2 }}
      transition={{
        duration: MOTION.duration,
        delay: index * 0.12,
        ease: MOTION.ease,
      }}
      className={cn(
        "relative mx-auto max-w-sm overflow-hidden rounded-2xl shadow-[0_12px_40px_-16px_rgba(46,46,46,0.25)] md:max-w-md",
        className,
      )}
    >
      <Image
        src={event.invitationImage}
        alt={`${event.title} invitation`}
        width={width}
        height={height}
        className="h-auto w-full rounded-2xl"
        sizes="(max-width: 768px) 90vw, 448px"
        priority={index === 0}
      />
    </motion.article>
  );
}
