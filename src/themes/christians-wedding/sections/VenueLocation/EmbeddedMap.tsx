"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

import { MOTION } from "../../components/constants";

interface EmbeddedMapProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

export function EmbeddedMap({
  embedUrl,
  title = "Wedding venue location map",
  className,
}: EmbeddedMapProps) {
  return (
    <motion.div
      className={cn("relative w-full", className)}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: MOTION.duration, ease: MOTION.ease }}
    >
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-3xl",
          "border border-accent/40 shadow-[var(--theme-shadow-card)]",
        )}
      >
        <iframe
          src={embedUrl}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </motion.div>
  );
}
