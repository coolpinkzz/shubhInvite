"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

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
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden rounded-3xl",
          "border-2 border-accent/60 shadow-[var(--theme-shadow-card)]",
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
