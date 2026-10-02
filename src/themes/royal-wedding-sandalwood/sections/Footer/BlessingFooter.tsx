"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { isWeddingConfig } from "@/types/theme";
import { ThemeFloralDivider } from "@/themes/shared/components";

const EASE = [0.16, 1, 0.3, 1] as const;

interface BlessingFooterProps {
  className?: string;
  blessing?: string;
}

function formatHashtag(tag: string) {
  const trimmed = tag.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function firstInitial(name: string) {
  const letter = name.trim().charAt(0);
  return letter ? letter.toUpperCase() : "";
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      className={cn("size-12 text-[var(--theme-accent-light)]", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 50V22C6 13.2 13.2 6 22 6H50"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path
        d="M6 34C16 34 22 28 22 18"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.65"
      />
      <circle cx="22" cy="22" r="1.6" fill="currentColor" />
    </svg>
  );
}

export function BlessingFooter({
  className,
  blessing = "Your presence is the blessing we cherish most. We look forward to celebrating this day with you.",
}: BlessingFooterProps) {
  const reducedMotion = useReducedMotion();
  const { config } = useTheme();

  if (!isWeddingConfig(config)) return null;

  const { couple, date, hashtag } = config;
  const weddingTag = hashtag ? formatHashtag(hashtag) : "";
  const monogram = `${firstInitial(couple.bride)}${firstInitial(couple.groom)}`;

  return (
    <footer
      id="footer"
      className={cn(
        "relative z-20 overflow-hidden px-5 pb-32 pt-2 text-center sm:px-6",
        className,
      )}
      aria-label="Closing blessing"
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.045]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(ellipse at center top, color-mix(in srgb, var(--theme-accent) 28%, transparent) 0%, transparent 72%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-md">
        <ThemeFloralDivider variant="lotus" size="lg" />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="mt-2 font-theme-label text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            With Gratitude
          </p>
          <h2 className="mt-2 font-theme-display text-6xl leading-none text-theme-primary sm:text-7xl">
            Thank You
          </h2>
          <p className="mx-auto mt-4 max-w-xs font-theme-body text-base italic leading-relaxed text-muted sm:max-w-sm sm:text-[1.05rem]">
            {blessing}
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-12 max-w-sm"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          <div
            className="absolute left-1/2 top-0 z-10 flex size-[4.25rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
            style={{
              background:
                "linear-gradient(160deg, var(--theme-accent-light), var(--theme-accent-dark))",
              boxShadow: "var(--theme-shadow-button)",
            }}
            aria-hidden="true"
          >
            <span
              className="flex size-[3.55rem] items-center justify-center rounded-full font-theme-headline text-sm font-medium tracking-[0.18em] text-[var(--theme-accent-light)]"
              style={{ background: "var(--theme-primary)" }}
            >
              {monogram}
            </span>
          </div>

          <div
            className="rounded-[1.85rem] p-px"
            style={{
              background:
                "linear-gradient(180deg, var(--theme-accent-light) 0%, var(--theme-accent-dark) 100%)",
              boxShadow: "var(--theme-shadow-hero)",
            }}
          >
            <div
              className="relative overflow-hidden rounded-[1.75rem] px-6 pb-9 pt-14"
              style={{
                background:
                  "linear-gradient(180deg, var(--theme-primary) 0%, color-mix(in srgb, var(--theme-primary) 72%, black) 100%)",
              }}
            >
              <CornerFlourish className="absolute left-2 top-2" />
              <CornerFlourish className="absolute right-2 top-2 scale-x-[-1]" />
              <CornerFlourish className="absolute bottom-2 left-2 scale-y-[-1]" />
              <CornerFlourish className="absolute bottom-2 right-2 -scale-x-100 -scale-y-100" />

              <p className="font-theme-display text-[2.75rem] leading-none text-[var(--theme-accent-light)] sm:text-5xl">
                {couple.bride}
              </p>
              <p className="my-1 font-theme-body text-2xl italic leading-none text-[var(--theme-accent)]">
                &amp;
              </p>
              <p className="font-theme-display text-[2.75rem] leading-none text-[var(--theme-accent-light)] sm:text-5xl">
                {couple.groom}
              </p>

              <div
                className="mx-auto mt-6 h-px w-24"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--theme-accent-light), transparent)",
                }}
                aria-hidden="true"
              />

              <p className="mt-4 font-theme-label text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--theme-accent-light)]/90">
                {date}
              </p>
            </div>
          </div>
        </motion.div>

        {weddingTag ? (
          <p className="mt-7 font-theme-label text-xs font-semibold tracking-[0.16em] text-accent">
            {weddingTag}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
