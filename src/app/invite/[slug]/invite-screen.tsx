import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getInvite,
  getInviteSideShare,
  isInviteSide,
} from "@/invites/registry";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getTheme } from "@/themes";
import type { InviteSide } from "@/types/theme";

function siteOrigin(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

function resolvedSide(side?: string): InviteSide | undefined {
  if (!side) return undefined;
  if (!isInviteSide(side)) return undefined;
  return side;
}

export function inviteMetadata(slug: string, side?: string): Metadata {
  const invite = getInvite(slug);
  if (!invite) return {};

  const audience = side ? getInviteSideShare(invite, side) : undefined;
  if (side && !audience) return {};

  const origin = siteOrigin();
  const pageUrl = side
    ? `${origin}/invite/${slug}/${side}`
    : `${origin}/invite/${slug}`;
  const imageUrl = `${origin}${invite.image}`;
  const title = audience?.title ?? invite.title;
  const description = audience?.description ?? invite.description;

  return {
    title,
    description,
    metadataBase: new URL(origin),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title,
      description,
      siteName: "ShubhInvite",
      images: [
        {
          url: imageUrl,
          width: invite.imageWidth ?? 720,
          height: invite.imageHeight ?? 1280,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function InviteScreen({
  slug,
  side,
}: {
  slug: string;
  side?: string;
}) {
  const invite = getInvite(slug);
  if (!invite) notFound();

  if (side && !getInviteSideShare(invite, side)) notFound();

  const theme = getTheme(invite.themeId);
  if (!theme) notFound();

  const { Template } = theme;

  return (
    <div className={theme.fontClassName}>
      <ThemeProvider
        themeId={theme.id}
        tokens={theme.tokens}
        config={theme.config}
        music={theme.music}
        intro={theme.intro}
        className={`${theme.id} min-h-dvh`}
      >
        <Template side={resolvedSide(side)} />
      </ThemeProvider>
    </div>
  );
}
