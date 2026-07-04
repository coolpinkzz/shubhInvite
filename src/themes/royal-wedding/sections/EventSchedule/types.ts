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
  color: string;
}
