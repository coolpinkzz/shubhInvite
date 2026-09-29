import { getTheme, themeList } from "@/themes";
import {
  buildWeddingCalendarEvent,
  toIcs,
} from "@/themes/shared/utils/calendar";
import { isWeddingConfig } from "@/types/theme";

interface CalendarRouteContext {
  params: Promise<{ themeId: string }>;
}

export function generateStaticParams() {
  return themeList
    .filter((theme) => isWeddingConfig(theme.config))
    .map((theme) => ({ themeId: theme.id }));
}

export async function GET(_request: Request, { params }: CalendarRouteContext) {
  const { themeId } = await params;
  const theme = getTheme(themeId);

  if (!theme || !isWeddingConfig(theme.config)) {
    return new Response("Calendar event not found", { status: 404 });
  }

  const ics = toIcs(buildWeddingCalendarEvent(theme.config));

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `inline; filename="${theme.id}-wedding.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
