import type { Metadata } from "next";

import { listInviteSlugs } from "@/invites/registry";

import { InviteScreen, inviteMetadata } from "./invite-screen";

interface InvitePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return listInviteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { slug } = await params;
  return inviteMetadata(slug);
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params;
  return <InviteScreen slug={slug} />;
}
