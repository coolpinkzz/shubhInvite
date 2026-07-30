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
    title: "You're invited to Vedansh's Naming Ceremony!",
    description:
      "Join Priya & Vaibhav as they celebrate the naming of their beloved son, Vedansh. View the invitation, event schedule, and venue details.",
    image: "/themes/baby-reveal/boynamingceremony1.jpeg",
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
