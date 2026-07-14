import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { getTheme, themeList } from "@/themes";
import {
  isBabyRevealConfig,
  isBirthdayConfig,
  isWeddingConfig,
  type AnyThemeContentConfig,
} from "@/types/theme";

interface TemplatePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return themeList.map((theme) => ({ slug: theme.id }));
}

function themeDescription(config: AnyThemeContentConfig): string {
  if (isBirthdayConfig(config)) {
    return `Birthday invitation for ${config.celebrant.fullName}'s ${config.age}${getOrdinalSuffix(config.age)} birthday`;
  }
  if (isBabyRevealConfig(config)) {
    return `Baby name reveal for ${config.parents.mother} & ${config.parents.father}`;
  }
  if (isWeddingConfig(config)) {
    return `Wedding invitation for ${config.couple.bride} & ${config.couple.groom}`;
  }
  return "Invitation template";
}

function getOrdinalSuffix(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return "th";
  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export async function generateMetadata({
  params,
}: TemplatePageProps): Promise<Metadata> {
  const { slug } = await params;
  const theme = getTheme(slug);
  if (!theme) return {};

  return {
    title: theme.config.name,
    description: themeDescription(theme.config),
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
        music={theme.music}
        intro={theme.intro}
        className={`${theme.id} min-h-dvh`}
      >
        <Template />
      </ThemeProvider>
    </div>
  );
}
