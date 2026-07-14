"use client";

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
        "relative mx-auto max-w-sm overflow-hidden rounded-2xl md:max-w-md lg:max-w-lg",
        className,
      )}
    >
      <Image
        src={event.invitationImage}
        alt={event.title}
        width={event.invitationImage.width}
        height={event.invitationImage.height}
        className="h-auto w-full rounded-2xl"
        priority
      />
    </motion.article>
  );
}
