import type { ThemeId } from "@/types/theme";

export interface InviteShareMeta {
  themeId: ThemeId;
  /** Browser tab / share title */
  title: string;
  /** WhatsApp / OG description */
  description: string;
  /** Absolute path under /public for OG image */
  image: string;
}

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
    image: "/themes/royal-wedding/intro/envelop-poster.jpg",
  },
} as const satisfies Record<string, InviteShareMeta>;

export type InviteSlug = keyof typeof invites;

export function getInvite(slug: string): InviteShareMeta | undefined {
  if (slug in invites) {
    return invites[slug as InviteSlug];
  }
  return undefined;
}

export function listInviteSlugs(): InviteSlug[] {
  return Object.keys(invites) as InviteSlug[];
}
