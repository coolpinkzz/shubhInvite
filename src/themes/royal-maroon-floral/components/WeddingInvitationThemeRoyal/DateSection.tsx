"use client";

import { cn } from "@/lib/utils";

import { royalMaroonFloralConfig } from "../../config";

function DateSideLabel({ children }: { children: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="h-px w-8 bg-gradient-to-r from-transparent via-[var(--theme-accent-light)]/70 to-transparent sm:w-10" />
      <span className="font-theme-label text-[0.6rem] tracking-[0.18em] text-theme-accent-light sm:text-[0.65rem]">
        {children}
      </span>
      <span className="h-px w-8 bg-gradient-to-r from-transparent via-[var(--theme-accent-light)]/70 to-transparent sm:w-10" />
    </div>
  );
}

export function DateSection() {
  const { month, day, year, dayOfWeek, ceremonyTime } =
    royalMaroonFloralConfig.invitation;

  return (
    <div className="animate-fade-in animate-delay-300 mx-auto w-full max-w-xs py-2 sm:max-w-sm">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <DateSideLabel>{dayOfWeek}</DateSideLabel>

        <div className="flex flex-col items-center">
          <span className="font-theme-label text-[0.65rem] tracking-[0.3em] text-theme-accent-light opacity-90 sm:text-xs">
            {month}
          </span>
          <span
            className={cn(
              "font-theme-headline text-5xl font-semibold leading-none text-theme-accent-light sm:text-6xl",
            )}
          >
            {day}
          </span>
          <span className="font-theme-label mt-1 text-xs tracking-[0.25em] text-theme-accent-light opacity-90 sm:text-sm">
            {year}
          </span>
        </div>

        <DateSideLabel>{`AT ${ceremonyTime.toUpperCase()}`}</DateSideLabel>
      </div>
    </div>
  );
}
