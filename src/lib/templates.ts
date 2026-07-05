import { getTheme, themeList } from "@/themes";

export interface TemplateEntry {
  slug: string;
  name: string;
  description: string;
}

export const templates: TemplateEntry[] = themeList.map((theme) => ({
  slug: theme.id,
  name: theme.name,
  description: theme.description,
}));

export function getTemplate(slug: string): TemplateEntry | undefined {
  const theme = getTheme(slug);
  if (!theme) return undefined;

  return {
    slug: theme.id,
    name: theme.name,
    description: theme.description,
  };
}
