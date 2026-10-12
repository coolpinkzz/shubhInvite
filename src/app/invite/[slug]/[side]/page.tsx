import type { Metadata } from "next";

import { getInvite, isInviteSide, listInviteSlugs } from "@/invites/registry";
import type { InviteSide } from "@/types/theme";

import { InviteScreen, inviteMetadata } from "../invite-screen";

interface InviteSidePageProps {
  params: Promise<{ slug: string; side: string }>;
}

export function generateStaticParams() {
  return listInviteSlugs().flatMap((slug) => {
    const invite = getInvite(slug);
    if (!invite?.sides) return [];

    return (Object.keys(invite.sides) as InviteSide[])
      .filter((side) => isInviteSide(side) && invite.sides?.[side])
      .map((side) => ({ slug, side }));
  });
}

export async function generateMetadata({
  params,
}: InviteSidePageProps): Promise<Metadata> {
  const { slug, side } = await params;
  return inviteMetadata(slug, side);
}

export default async function InviteSidePage({ params }: InviteSidePageProps) {
  const { slug, side } = await params;
  return <InviteScreen slug={slug} side={side} />;
}
