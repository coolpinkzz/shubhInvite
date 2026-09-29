import type { WeddingThemeContentConfig } from "@/types/theme";

export type CalendarEventTiming =
  | { allDay: false; start: Date; end: Date }
  | { allDay: true; year: number; month: number; day: number };

export interface CalendarEvent {
  uid: string;
  title: string;
  description: string;
  location: string;
  timing: CalendarEventTiming;
}

const MS_PER_MINUTE = 60_000;
const ICS_LINE_LIMIT = 75;

export function buildWeddingCalendarEvent(
  config: WeddingThemeContentConfig,
): CalendarEvent {
  const { couple, calendar, countdownTarget, location, id } = config;

  let timing: CalendarEventTiming;
  if (calendar) {
    const start = new Date(calendar.startsAt);
    timing = {
      allDay: false,
      start,
      end: new Date(start.getTime() + calendar.durationMinutes * MS_PER_MINUTE),
    };
  } else {
    // countdownTarget has no offset, so its local date parts are the intended date.
    const target = new Date(countdownTarget);
    timing = {
      allDay: true,
      year: target.getFullYear(),
      month: target.getMonth() + 1,
      day: target.getDate(),
    };
  }

  return {
    uid: `${id}@shubhinvite`,
    title: `${couple.bride} & ${couple.groom} — Wedding`,
    description: `With the blessings of our families, we look forward to celebrating the wedding of ${couple.bride} & ${couple.groom} with you.`,
    location,
    timing,
  };
}

const pad = (value: number) => value.toString().padStart(2, "0");

function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function formatDate(year: number, month: number, day: number): string {
  return `${year}${pad(month)}${pad(day)}`;
}

function nextDay(year: number, month: number, day: number): string {
  const date = new Date(Date.UTC(year, month - 1, day + 1));
  return formatDate(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
}

function formatRange(timing: CalendarEventTiming): [string, string] {
  if (timing.allDay) {
    const { year, month, day } = timing;
    return [formatDate(year, month, day), nextDay(year, month, day)];
  }
  return [formatUtc(timing.start), formatUtc(timing.end)];
}

export function toGoogleCalendarUrl(event: CalendarEvent): string {
  const [start, end] = formatRange(event.timing);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

/** RFC 5545 §3.1: lines longer than 75 octets continue on the next line after a space. */
function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = "";

  for (const char of line) {
    const limit = parts.length === 0 ? ICS_LINE_LIMIT : ICS_LINE_LIMIT - 1;
    if (encoder.encode(current + char).length > limit) {
      parts.push(current);
      current = char;
    } else {
      current += char;
    }
  }
  parts.push(current);

  return parts.join("\r\n ");
}

export function toIcs(event: CalendarEvent, now: Date = new Date()): string {
  const [start, end] = formatRange(event.timing);
  const dateParam = event.timing.allDay ? ";VALUE=DATE" : "";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ShubhInvite//Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${event.uid}`,
    `DTSTAMP:${formatUtc(now)}`,
    `DTSTART${dateParam}:${start}`,
    `DTEND${dateParam}:${end}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-P1D",
    `DESCRIPTION:${escapeIcsText(event.title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${lines.map(foldIcsLine).join("\r\n")}\r\n`;
}
