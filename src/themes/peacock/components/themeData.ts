import type {
  DateCardItem,
  FrameOvalLayout,
  InvitationData,
  PeacockCornerPosition,
} from "./types";

export const ASSET_BASE = "/themes/peacock";

export const ASSETS = {
  peacockFeather: `${ASSET_BASE}/peacock-feather.png`,
  peacockLeft: `${ASSET_BASE}/peacock-left.png`,
  peacockRight: `${ASSET_BASE}/peacock-right.png`,
  peacockCorner: `${ASSET_BASE}/peacock-corner.png`,
  mandala: `${ASSET_BASE}/mandala.svg`,
  goldFrame: `${ASSET_BASE}/gold-frame.svg`,
  goldFramePhoto: `${ASSET_BASE}/gold-frame.webp`,
  ornateFrame: `${ASSET_BASE}/gold-frame.webp`,
  lotus: `${ASSET_BASE}/lotus.svg`,
  floralBorder: `${ASSET_BASE}/floral-border.svg`,
  watercolorBg: `${ASSET_BASE}/watercolor-bg.webp`,
  decorativeDivider: `${ASSET_BASE}/decorative-divider.svg`,
  watercolorTexture: `${ASSET_BASE}/watercolor-texture.svg`,
} as const;

export const COLORS = {
  primary: "#1E3A8A",
  secondary: "#0F766E",
  accent: "#D4AF37",
  background: "#FFFDF8",
  emerald: "#059669",
  turquoise: "#14B8A6",
  champagne: "#F5E6C8",
  text: "#1E293B",
  textMuted: "#475569",
  ink: "#1A3A3A",
} as const;

export const MOTION = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
  stagger: 0.1,
  featherFloat: 14,
} as const;

/** Transparent oval cutout inside the ornate peacock frame. */
export const FRAME_OVAL: FrameOvalLayout = {
  left: "25.4%",
  top: "27.1%",
  width: "49.11%",
  height: "63.27%",
};

/**
 * Bottom-corner peacock ornaments — bled outward so motifs frame
 * the invitation without covering copy.
 */
export const PEACOCK_LAYOUT: Record<
  PeacockCornerPosition,
  {
    wrapper: string;
    image: string;
    object: string;
    opacity: string;
    sizes: string;
  }
> = {
  "bottom-left": {
    wrapper:
      "bottom-0 left-0 h-[min(52vw,380px)] w-[min(52vw,380px)] -translate-x-[8%] translate-y-[6%] sm:h-[min(42vw,420px)] sm:w-[min(42vw,420px)]",
    image: "origin-bottom-left -scale-x-100",
    object: "object-contain object-bottom-left",
    opacity: "opacity-80 sm:opacity-90",
    sizes: "(max-width: 640px) 52vw, 420px",
  },
  "bottom-right": {
    wrapper:
      "bottom-0 right-0 h-[min(52vw,380px)] w-[min(52vw,380px)] translate-x-[8%] translate-y-[6%] sm:h-[min(42vw,420px)] sm:w-[min(42vw,420px)]",
    image: "origin-bottom-right",
    object: "object-contain object-bottom-right",
    opacity: "opacity-80 sm:opacity-90",
    sizes: "(max-width: 640px) 52vw, 420px",
  },
};

export const invitationData: InvitationData = {
  title: "Save the Date",
  subtitle: "Together With Our Families",
  bride: "Ananya",
  groom: "Arjun",
  description:
    "With our families' blessings, we invite you to celebrate our wedding.",
  date: "21 November 2026",
  dayOfMonth: "21",
  month: "Nov",
  year: "2026",
  day: "Saturday",
  time: "6:30 PM",
  venue: "The Royal Peacock Palace",
  address: "Jaipur, Rajasthan",
  rsvpLabel: "RSVP",
  viewInvitationLabel: "View Invitation",
  heartSeparator: "&",
  dateIso: "2026-11-21",
  dateCardLabel: "Date",
  timeCardLabel: "Time",
  venueCardLabel: "Venue",
  scratchHint: "gently scratch to reveal",
  scratchOverline: "Our Wedding",
  revealThreshold: 0.42,
};

export function buildDateCards(data: InvitationData): DateCardItem[] {
  return [
    {
      id: "date",
      label: data.dateCardLabel,
      value: `${data.dayOfMonth} ${data.month}`,
      subvalue: data.year,
    },
    {
      id: "time",
      label: data.timeCardLabel,
      value: data.time,
      subvalue: data.day,
    },
    {
      id: "venue",
      label: data.venueCardLabel,
      value: data.venue,
      subvalue: data.address,
    },
  ];
}

export const dateCards = buildDateCards(invitationData);
