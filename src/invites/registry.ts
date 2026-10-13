import {
  isInviteSide,
  type InviteSide,
  type ThemeId,
} from "@/types/theme";

export interface InviteSideShare {
  /** Browser tab / share title for this side's link */
  title: string;
  /** WhatsApp / OG description for this side's link */
  description: string;
}

export interface InviteShareMeta {
  themeId: ThemeId;
  /** Browser tab / share title */
  title: string;
  /** WhatsApp / OG description */
  description: string;
  /** Absolute path under /public for OG image */
  image: string;
  /** Pixel size of `image`, sent as og:image width and height. */
  imageWidth?: number;
  imageHeight?: number;
  /**
   * Side-specific share links. When set, /invite/<slug>/<side> shows only that side's events.
   * `bride-wedding` is the bride's wedding card. The bare /invite/<slug> link still shows every event.
   */
  sides?: Partial<Record<InviteSide, InviteSideShare>>;
}

export { isInviteSide };
export type { InviteSide };

/**
 * Client invite slugs → theme + share preview.
 * Share: /invite/<slug>
 */
export const invites = {
  "priya-vibs": {
    themeId: "baby-reveal",
    title: "You're invited to Naming Ceremony!",
    description:
      "Join Priya & Vaibhav as they celebrate the naming of their beloved son. View the invitation, event schedule, and venue details.",
    image: "/themes/baby-reveal/boynamingceremony1.jpeg",
  },
  "susri-manoranjan": {
    themeId: "royal-wedding-sandalwood",
    title: "You're invited to the wedding of Susri & Manoranjan!",
    description:
      "Join Susri Sangita Parija & Manoranjan Patnaik as they celebrate their wedding on Friday, 11 December 2026 at Casa Royal, Trisulia, Cuttack. View the invitation, event schedule, and venue details.",
    image: "/themes/royal-wedding/intro/envelop-share.jpg",
    imageWidth: 1600,
    imageHeight: 900,
    sides: {
      bride: {
        title: "You're invited — Susri & Manoranjan",
        description:
          "Join the bride's family for Sangeet, Mehendi, Haldi, and the wedding. View the invitation and celebration details.",
      },
      groom: {
        title: "You're invited — Manoranjan & Susri",
        description:
          "Join the groom's family for Haldi and the reception. View the invitation and celebration details.",
      },
      "bride-wedding": {
        title: "You're invited to the wedding of Susri & Manoranjan!",
        description:
          "Join the bride's family for the wedding of Susri Sangita Parija & Manoranjan Patnaik on Friday, 11 December 2026 at Casa Royal, Trisulia, Cuttack.",
      },
    },
  },
} as const satisfies Record<string, InviteShareMeta>;

export type InviteSlug = keyof typeof invites;

export function getInvite(slug: string): InviteShareMeta | undefined {
  if (slug in invites) {
    return invites[slug as InviteSlug];
  }
  return undefined;
}

export function getInviteSideShare(
  invite: InviteShareMeta,
  side: string,
): InviteSideShare | undefined {
  if (!isInviteSide(side)) return undefined;
  return invite.sides?.[side];
}

export function listInviteSlugs(): InviteSlug[] {
  return Object.keys(invites) as InviteSlug[];
}
