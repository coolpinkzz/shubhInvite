"use client";

import { VenueLocation as RoyalVenueLocation } from "@/themes/royal-wedding/sections/VenueLocation";
import type { VenueLocationProps } from "@/themes/royal-wedding/sections/VenueLocation/types";

export function VenueLocation(props: VenueLocationProps) {
  return (
    <RoyalVenueLocation
      {...props}
      title={props.title ?? "Find Your Way"}
      subtitle={
        props.subtitle ??
        "We look forward to welcoming you to a celebration steeped in tradition and grace."
      }
      className={props.className ?? "scroll-mt-24 bg-[#FFFDF8] pt-16"}
    />
  );
}
