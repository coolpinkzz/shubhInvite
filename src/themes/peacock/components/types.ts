import type { ReactNode } from "react";

export interface InvitationData {
  title: string;
  subtitle: string;
  bride: string;
  groom: string;
  description: string;
  date: string;
  dayOfMonth: string;
  month: string;
  year: string;
  day: string;
  time: string;
  venue: string;
  address: string;
  rsvpLabel: string;
  viewInvitationLabel: string;
  heartSeparator: string;
  dateIso: string;
  dateCardLabel: string;
  timeCardLabel: string;
  venueCardLabel: string;
  scratchHint: string;
  scratchOverline: string;
  revealThreshold: number;
}

export type PeacockCornerPosition = "bottom-left" | "bottom-right";

export interface PeacockDecorationProps {
  position: PeacockCornerPosition;
  className?: string;
  delay?: number;
}

export interface DateCardItem {
  id: string;
  label: string;
  value: string;
  subvalue?: string;
}

export interface DateCardsProps {
  cards: readonly DateCardItem[];
  dateIso: string;
  className?: string;
}

export interface HeroButtonsProps {
  rsvpLabel: string;
  viewInvitationLabel: string;
  rsvpHref?: string;
  viewHref?: string;
  className?: string;
}

export interface HeroContentProps {
  data: InvitationData;
}

export interface HeroProps {
  data?: InvitationData;
}

export interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "header" | "footer";
  "aria-label"?: string;
}

export interface GoldDividerProps {
  className?: string;
}

export interface MandalaDecorationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export interface FloatingFeathersProps {
  className?: string;
  count?: number;
}

export interface BackgroundTextureProps {
  className?: string;
}

export interface ScratchRevealOvalProps {
  date: string;
  dateIso: string;
  hint: string;
  overline: string;
  revealThreshold?: number;
  className?: string;
  onRevealed?: () => void;
}

/**
 * Oval hole position inside ornate-frame.png / gold-frame.webp,
 * measured as percentages of the frame box.
 */
export interface FrameOvalLayout {
  left: string;
  top: string;
  width: string;
  height: string;
}
