import type { StaticImageData } from "next/image";
import type { LucideIcon } from "lucide-react";

import type { EventAccentVariant } from "@/themes/shared/utils/event-accent";

export type { EventAccentVariant };

export interface WeddingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  description: string;
  icon: LucideIcon;
  accent: EventAccentVariant;
  /** Renders a full illustrated invitation card instead of the default event row. */
  cardVariant?: "invitation" | "default";
  /** Static canva artwork for invitation cards. */
  invitationImage?: StaticImageData;
}
