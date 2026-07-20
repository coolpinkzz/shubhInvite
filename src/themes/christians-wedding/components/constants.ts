import type { FloralCornerPosition, InvitationData } from "./types";

export const ASSET_BASE = "/themes/christians-wedding";

export const ASSETS = {
  floral: `${ASSET_BASE}/christianFlowerBorderlefttop.png`,
  floralTop: `${ASSET_BASE}/floralFlowertop.png`,
  couple: `${ASSET_BASE}/couplebackpose.png`,
  lottieFloral: `${ASSET_BASE}/soft-floral-bloom.json`,
} as const;

export const invitationData: InvitationData = {
  title: "SAVE THE DATE",
  subtitle: "FOR THE WEDDING OF",
  bride: "Cahaya",
  groom: "Daniel",
  message:
    "The delighted to invite you to their wedding reception along with their family.",
  date: "15 December 2026",
  dayOfMonth: "15",
  month: "Dec",
  year: "2026",
  day: "Saturday",
  time: "1 PM",
  timePrefix: "At",
  venue: "Fauget Hotel",
  address: "123 Anywhere Street, Any City",
  rsvpLabel: "RSVP",
  rsvp: "www.reallygreatsite.com",
  dateIso: "2023-06-15",
};

export const COLORS = {
  background: "#FCF7F3",
  primary: "#2E2E2E",
  secondary: "#666666",
  accent: "#B88C6A",
} as const;

/**
 * Corner florals — pinned to viewport edges and bled outward so leaves
 * grow from the frame rather than floating as inset stickers.
 * Asset is an L-shaped spray oriented for top-left; flips handle other corners.
 */
export const FLORAL_LAYOUT: Record<
  FloralCornerPosition,
  {
    wrapper: string;
    image: string;
    object: string;
    opacity: string;
    sizes: string;
  }
> = {
  "top-left": {
    wrapper:
      "left-0 top-0 h-[min(70vw,520px)] w-[min(56vw,400px)] -translate-x-[12%] -translate-y-[10%]",
    image: "",
    object: "object-left-top",
    opacity: "opacity-95",
    sizes: "(max-width: 768px) 56vw, 400px",
  },
  "top-right": {
    wrapper:
      "right-0 top-0 h-[min(70vw,520px)] w-[min(56vw,400px)] translate-x-[12%] -translate-y-[10%]",
    /* Flip in place (origin-center) so the L-spray mirrors into the top-right */
    image: "origin-center -scale-x-100",
    object: "object-left-top",
    opacity: "opacity-95",
    sizes: "(max-width: 768px) 56vw, 400px",
  },
  "bottom-right": {
    wrapper:
      "bottom-0 right-0 h-[min(68vw,520px)] w-[min(54vw,400px)] translate-x-[12%] translate-y-[10%]",
    image: "origin-center -scale-x-100 -scale-y-100",
    object: "object-left-top",
    opacity: "opacity-90",
    sizes: "(max-width: 768px) 54vw, 400px",
  },
  "bottom-left": {
    wrapper:
      "bottom-0 left-0 z-[5] h-[min(58vw,440px)] w-[min(46vw,340px)] -translate-x-[12%] translate-y-[10%]",
    image: "origin-center -scale-y-100",
    object: "object-left-top",
    opacity: "opacity-55",
    sizes: "(max-width: 768px) 46vw, 340px",
  },
};

export const MOTION = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1] as const,
  floralStagger: 0.12,
} as const;
