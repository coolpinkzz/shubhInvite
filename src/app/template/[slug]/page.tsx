import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { getTheme, themeList } from "@/themes";
import { isBabyRevealConfig } from "@/types/theme";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return themeList.map((theme) => ({ slug: theme.id }));
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};

  const description = isBabyRevealConfig(theme.config)
    ? `Baby gender reveal for ${theme.config.parents.mother} & ${theme.config.parents.father}`
    : `Wedding invitation for ${theme.config.couple.bride} & ${theme.config.couple.groom}`;

  return {
    title: theme.config.name,
    description,
  };
}

export default async function TemplatePage({ params }: TemplatePageProps) {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) notFound();

  const { Template } = theme;

  return (
    <div className={theme.fontClassName}>
      <ThemeProvider
        themeId={theme.id}
        tokens={theme.tokens}
        config={theme.config}
        className={`${theme.id} min-h-dvh`}
      >
        <Template />
      </ThemeProvider>
    </div>
  );
}
