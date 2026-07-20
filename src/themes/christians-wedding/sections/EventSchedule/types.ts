import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  icon: LucideIcon;
  /** Renders a full invitation artwork card instead of the default event row. */
  cardVariant?: "invitation" | "default";
  invitationImage?: string | StaticImageData;
}
