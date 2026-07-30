import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getInvite, listInviteSlugs } from "@/invites/registry";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getTheme } from "@/themes";

interface InvitePageProps {
  params: Promise<{ slug: string }>;
}

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

export function generateStaticParams() {
  return listInviteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const invite = getInvite(slug);
  if (!invite) return {};

  const origin = siteOrigin();
  const pageUrl = `${origin}/invite/${slug}`;
  const imageUrl = `${origin}${invite.image}`;

  return {
    title: invite.title,
    description: invite.description,
    metadataBase: new URL(origin),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: invite.title,
      description: invite.description,
      siteName: "ShubhInvite",
      images: [
        {
          url: imageUrl,
          width: 720,
          height: 1280,
          alt: invite.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: invite.title,
      description: invite.description,
      images: [imageUrl],
    },
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { slug } = await params;
  const invite = getInvite(slug);
  if (!invite) notFound();

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
        <Template />
      </ThemeProvider>
    </div>
  );
}
