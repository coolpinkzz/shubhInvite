"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import susriLogo from "@/assests/susriLogo.jpeg";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { isWeddingConfig } from "@/types/theme";
import { ThemeFloralDivider } from "@/themes/shared/components";

const EASE = [0.16, 1, 0.3, 1] as const;

const CARD = "#54362C";
const GOLD = "#C6A56A";

interface BlessingFooterProps {
  className?: string;
  blessing?: string;
  /** Whose name is written first. Defaults to the bride. */
  nameOrder?: "bride" | "groom";
}

function formatHashtag(tag: string) {
  const trimmed = tag.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}

function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 52 52"
      className={cn("size-11 text-[#E7D6B8]/80 sm:size-12", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6 38V16.5C6 10.7 10.7 6 16.5 6H38"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <path
        d="M14.5 28.5C14.5 20.8 20.8 14.5 28.5 14.5"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeLinecap="round"
      />
      <path
        d="M14.2 14.2l1.35 1.35-1.35 1.35-1.35-1.35z"
        fill="currentColor"
      />
    </svg>
  );
}

function Diamond({ className }: { className?: string }) {
  return (
    <span
      className={cn("size-[5px] shrink-0 rotate-45 bg-current", className)}
      aria-hidden="true"
    />
  );
}

function NameDivider() {
  return (
    <div
      className="mx-auto mt-6 flex w-[min(100%,16.5rem)] items-center text-[#E7D3AE] sm:mt-7"
      aria-hidden="true"
    >
      <span className="h-px flex-1 bg-current" />
      <Diamond className="mx-2" />
      <span className="h-px w-7 bg-current sm:w-9" />
      <svg
        viewBox="0 0 28 16"
        className="mx-1.5 h-4 w-7 shrink-0"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 0.4 15.35 6.05 21.2 8 15.35 9.95 14 15.6 12.65 9.95 6.8 8 12.65 6.05Z" />
        <path d="M14 3.15 14.9 6.55 18.35 8 14.9 9.45 14 12.85 13.1 9.45 9.65 8 13.1 6.55Z" transform="rotate(90 14 8)" />
        <circle cx="14" cy="8" r="1.05" className="text-[#54362C]" fill="#54362C" />
      </svg>
      <span className="h-px w-7 bg-current sm:w-9" />
      <Diamond className="mx-2" />
      <span className="h-px flex-1 bg-current" />
    </div>
  );
}

export function BlessingFooter({
  className,
  blessing = "Your presence is the blessing we cherish most. We look forward to celebrating this day with you.",
  nameOrder = "bride",
}: BlessingFooterProps) {
  const reducedMotion = useReducedMotion();
  const { config } = useTheme();

  if (!isWeddingConfig(config)) return null;

  const { couple, date, hashtag } = config;
  const weddingTag = hashtag ? formatHashtag(hashtag) : "";
  const [firstName, secondName] =
    nameOrder === "groom"
      ? [couple.groom, couple.bride]
      : [couple.bride, couple.groom];

  return (
    <footer
      id="footer"
      className={cn(
        "relative z-20 overflow-hidden px-4 pb-32 pt-2 text-center sm:px-6",
        className,
      )}
      aria-label="Closing blessing"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='140' height='140' viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C4A882' fill-opacity='0.55'%3E%3Ccircle cx='22' cy='18' r='1.15'/%3E%3Ccircle cx='28' cy='18' r='1.15'/%3E%3Ccircle cx='25' cy='15' r='1.15'/%3E%3Ccircle cx='25' cy='21' r='1.15'/%3E%3Ccircle cx='25' cy='18' r='0.85'/%3E%3Ccircle cx='98' cy='86' r='1.15'/%3E%3Ccircle cx='104' cy='86' r='1.15'/%3E%3Ccircle cx='101' cy='83' r='1.15'/%3E%3Ccircle cx='101' cy='89' r='1.15'/%3E%3Ccircle cx='101' cy='86' r='0.85'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-xl">
        <ThemeFloralDivider variant="lotus" size="lg" />

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: EASE }}
        >
          <p className="mt-2 font-theme-label text-[10px] font-semibold uppercase tracking-[0.28em] text-accent">
            With Love &amp; Gratitude
          </p>
          <h2 className="mt-2 font-theme-display text-6xl leading-none text-theme-primary sm:text-7xl">
            Thank You
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-theme-body text-base italic leading-relaxed text-muted sm:max-w-md sm:text-[1.05rem]">
            {blessing}
          </p>
        </motion.div>

        <motion.div
          className="relative mx-auto mt-12 w-full max-w-[40rem] sm:mt-14"
          initial={reducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
        >
          <div
            className="relative z-0 overflow-hidden rounded-[1.65rem] px-5 pb-7 pt-[7.15rem] sm:rounded-[1.85rem] sm:px-10 sm:pb-8 sm:pt-[8.35rem]"
            style={{
              backgroundColor: CARD,
              border: `1px solid ${GOLD}`,
              boxShadow: "0 22px 50px -28px rgba(62, 32, 18, 0.55)",
            }}
          >
            <CornerFlourish className="absolute left-2.5 top-2.5 sm:left-3.5 sm:top-3.5" />
            <CornerFlourish className="absolute right-2.5 top-2.5 -scale-x-100 sm:right-3.5 sm:top-3.5" />
            <CornerFlourish className="absolute bottom-2.5 left-2.5 -scale-y-100 sm:bottom-3.5 sm:left-3.5" />
            <CornerFlourish className="absolute bottom-2.5 right-2.5 -scale-100 sm:bottom-3.5 sm:right-3.5" />

            <p className="text-balance font-theme-display text-[clamp(2.05rem,8.4vw,3.35rem)] leading-[1.12] text-white">
              {firstName}
            </p>
            <p className="my-0.5 font-theme-display text-[1.85rem] leading-none text-white sm:text-[2.15rem]">
              &amp;
            </p>
            <p className="text-balance font-theme-display text-[clamp(2.05rem,8.4vw,3.35rem)] leading-[1.12] text-white">
              {secondName}
            </p>

            <NameDivider />

            <p className="mt-4 font-theme-label text-[10px] font-medium uppercase tracking-[0.22em] text-white sm:text-[11px] sm:tracking-[0.26em]">
              {date}
            </p>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-2 z-20 size-[5.65rem] -translate-x-1/2 overflow-hidden rounded-full sm:top-2.5 sm:size-[6.65rem]">
            <Image
              src={susriLogo}
              alt="Susri and Manoranjan monogram"
              width={1024}
              height={1536}
              className="size-full object-cover object-[center_34%]"
            />
          </div>
        </motion.div>

        {weddingTag ? (
          <p className="mt-7 text-balance font-theme-label text-xs font-semibold tracking-[0.12em] text-accent">
            {weddingTag}
          </p>
        ) : null}
      </div>
    </footer>
  );
}
