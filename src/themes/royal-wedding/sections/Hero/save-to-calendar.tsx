"use client";

import { motion } from "framer-motion";
import { CalendarPlus } from "lucide-react";
import { useMemo, useSyncExternalStore } from "react";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {
  buildWeddingCalendarEvent,
  toGoogleCalendarUrl,
} from "@/themes/shared/utils/calendar";
import { hexToRgba } from "@/themes/shared/utils/color";
import type { WeddingThemeContentConfig } from "@/types/theme";

type Platform = "ios" | "android" | "other";

function detectPlatform(): Platform {
  const { userAgent, maxTouchPoints } = navigator;
  // iPadOS reports a desktop Mac user agent, so fall back to touch support.
  const isIos =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
  if (isIos) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "other";
}

const subscribe = () => () => {};
const getServerPlatform = (): Platform => "other";

interface CalendarLink {
  label: string;
  href: string;
  external: boolean;
}

interface SaveToCalendarProps {
  config: WeddingThemeContentConfig;
  className?: string;
}

export function SaveToCalendar({ config, className }: SaveToCalendarProps) {
  const { themeId, tokens } = useTheme();
  const { colors, shadows } = tokens;
  const platform = useSyncExternalStore(
    subscribe,
    detectPlatform,
    getServerPlatform,
  );

  const googleUrl = useMemo(
    () => toGoogleCalendarUrl(buildWeddingCalendarEvent(config)),
    [config],
  );

  const google: CalendarLink = {
    label: "Google Calendar",
    href: googleUrl,
    external: true,
  };
  const apple: CalendarLink = {
    label: "Apple / Outlook Calendar",
    href: `/calendar/${themeId}`,
    external: false,
  };

  const [primary, secondary] = platform === "ios" ? [apple, google] : [google, apple];

  return (
    <motion.div
      className={cn("mx-auto mb-10 flex w-full max-w-xs flex-col items-center gap-3", className)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.a
        href={primary.href}
        target={primary.external ? "_blank" : undefined}
        rel={primary.external ? "noopener noreferrer" : undefined}
        whileTap={{ scale: 0.97 }}
        whileHover={{ boxShadow: `0 8px 32px ${hexToRgba(colors.accent, 0.45)}` }}
        className={cn(
          "flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full",
          "bg-accent px-6 py-4",
          "font-theme-label text-xs font-semibold uppercase tracking-[0.12em] text-white",
          "transition-shadow duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        )}
        style={{ boxShadow: shadows.button }}
      >
        <CalendarPlus className="size-4" strokeWidth={2} aria-hidden="true" />
        Save the Date
      </motion.a>

      <a
        href={secondary.href}
        target={secondary.external ? "_blank" : undefined}
        rel={secondary.external ? "noopener noreferrer" : undefined}
        className="font-theme-body text-sm italic text-muted underline underline-offset-4 hover:text-theme-primary"
      >
        Add to {secondary.label} instead
      </a>
    </motion.div>
  );
}
