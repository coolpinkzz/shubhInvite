export interface InvitationData {
  title: string;
  subtitle: string;
  bride: string;
  groom: string;
  message: string;
  date: string;
  dayOfMonth: string;
  month: string;
  year: string;
  day: string;
  time: string;
  timePrefix: string;
  venue: string;
  address: string;
  rsvpLabel: string;
  rsvp: string;
  /** ISO date for the semantic <time> element */
  dateIso: string;
}

export type FloralCornerPosition =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export interface FloralDecorationProps {
  position: FloralCornerPosition;
  className?: string;
  delay?: number;
}

export interface CoupleIllustrationProps {
  bride: string;
  groom: string;
  className?: string;
}

export interface DateSectionProps {
  dayOfMonth: string;
  month: string;
  year: string;
  dateIso: string;
  /** Fraction of heart surface scratched before auto-reveal (0–1). */
  revealThreshold?: number;
}

export interface HeartScratchCardProps {
  value: string;
  label: string;
  revealThreshold?: number;
  className?: string;
  valueClassName?: string;
  onRevealed?: () => void;
}

export interface InvitationContentProps {
  data: InvitationData;
}

export interface HeroProps {
  data?: InvitationData;
}
