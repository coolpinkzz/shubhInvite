import type { PetalFallOptions } from "@/themes/royal-wedding/components/falling-petals";

export interface VenueLocationProps {
  venueName: string;
  address: string;
  eventName: string;
  date: string;
  time: string;
  embedUrl: string;
  googleMapsUrl: string;
  title?: string;
  subtitle?: string;
  className?: string;
  petals?: Partial<PetalFallOptions>;
}
