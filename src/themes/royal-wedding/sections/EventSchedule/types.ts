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
}
