"use client";

import { motion } from "framer-motion";
import { ExternalLink, MapPin, Navigation } from "lucide-react";

import { useTheme } from "@/hooks/useTheme";
import { hexToRgba } from "@/themes/shared/utils/color";
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
  const { tokens } = useTheme();
  const { colors, shadows } = tokens;
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
          boxShadow: `0 8px 32px ${hexToRgba(colors.accent, 0.45)}`,
        }}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-full",
          "bg-accent px-6 py-4",
          "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-primary",
          "transition-shadow duration-300",
        )}
        style={{ boxShadow: shadows.button }}
      >
        <MapPin className="size-4" strokeWidth={2} aria-hidden="true" />
        Open in Google Maps
        <ExternalLink
          className="size-3.5 opacity-70"
          strokeWidth={2}
          aria-hidden="true"
        />
      </motion.a>

      <motion.a
        href={directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.97 }}
        whileHover={{
          backgroundColor: hexToRgba(colors.primaryContainer, 0.05),
        }}
        className={cn(
          "flex w-full items-center justify-center gap-2.5 rounded-full",
          "border-2 border-primary bg-transparent px-6 py-4",
          "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-primary",
          "transition-colors duration-300",
        )}
      >
        <Navigation className="size-4" strokeWidth={2} aria-hidden="true" />
        Get Directions
      </motion.a>
    </motion.div>
  );
}
