"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface VenueActionsProps {
  googleMapsUrl: string;
  venueName: string;
  address: string;
  className?: string;
}

function buildDirectionsUrl(venueName: string, address: string): string {
  const destination = `${venueName}, ${address.replace(/\n/g, ", ")}`;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
}

export function VenueActions({
  googleMapsUrl,
  venueName,
  address,
  className,
}: VenueActionsProps) {
  const directionsUrl = buildDirectionsUrl(venueName, address);

  return (
    <motion.div
      className={cn("flex w-full flex-col gap-3", className)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        whileHover={{
          boxShadow: "0 8px 32px rgba(212, 175, 55, 0.45)",
        }}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-full",
          "bg-[#D4AF37] px-6 py-4",
          "font-[family-name:var(--font-rw-label)] text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1F2B]",
          "shadow-[0_6px_24px_rgba(212,175,55,0.3)]",
          "transition-shadow duration-300",
        )}
      >
        <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
        Open in Google Maps
        <ExternalLink className="size-3.5 opacity-70" strokeWidth={2} aria-hidden="true" />
      </motion.a>

      <motion.a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        whileHover={{
          backgroundColor: "rgba(122, 31, 43, 0.05)",
        }}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-full",
          "border-2 border-[#7A1F2B] bg-transparent px-6 py-4",
          "font-[family-name:var(--font-rw-label)] text-xs font-semibold uppercase tracking-[0.12em] text-[#7A1F2B]",
          "transition-colors duration-300",
        )}
      >
        <Navigation className="size-4" strokeWidth={2} aria-hidden="true" />
        Get Directions
      </motion.a>
    </motion.div>
  );
}
