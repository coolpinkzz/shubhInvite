"use client";

import { motion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ThemeFloralDividerVariant = "lotus" | "star";
export type ThemeFloralDividerSize = "sm" | "md" | "lg";

export interface ThemeFloralDividerProps {
  className?: string;
  variant?: ThemeFloralDividerVariant;
  size?: ThemeFloralDividerSize;
}

const sizeClasses: Record<ThemeFloralDividerSize, string> = {
  sm: "py-2",
  md: "py-3",
  lg: "py-4",
};

const lineOpacity: Record<ThemeFloralDividerSize, string> = {
  sm: "from-transparent via-accent/40 to-transparent",
  md: "from-transparent via-accent/50 to-transparent",
  lg: "from-transparent via-accent/50 to-transparent",
};

const dotOpacity: Record<ThemeFloralDividerSize, string> = {
  sm: "bg-accent/60",
  md: "bg-accent/60",
  lg: "bg-accent/70",
};

function LotusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="text-accent"
    >
      <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.7" />
      <ellipse
        cx="10"
        cy="5"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.45"
      />
      <ellipse
        cx="10"
        cy="15"
        rx="2.5"
        ry="4"
        fill="currentColor"
        opacity="0.45"
      />
      <ellipse
        cx="5"
        cy="10"
        rx="4"
        ry="2.5"
        fill="currentColor"
        opacity="0.45"
      />
      <ellipse
        cx="15"
        cy="10"
        rx="4"
        ry="2.5"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="28"
      height="14"
      viewBox="0 0 28 14"
      fill="none"
      className="text-accent"
    >
      <path
        d="M14 0L16.5 5H26L18.5 8L21 14L14 10.5L7 14L9.5 8L2 5H11.5L14 0Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

export function ThemeFloralDivider({
  className,
  variant = "lotus",
  size = "md",
}: ThemeFloralDividerProps) {
  const gapClass = size === "lg" ? "mx-4 gap-2" : "mx-3 gap-1.5";

  return (
    <motion.div
      className={cn(
        "flex items-center justify-center",
        sizeClasses[size],
        className,
      )}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      <div
        className={cn("h-px flex-1 bg-gradient-to-r", lineOpacity[size])}
      />
      <div className={cn("flex items-center", gapClass)}>
        <span className={cn("size-1.5 rounded-full", dotOpacity[size])} />
        {variant === "star" ? <StarIcon /> : <LotusIcon />}
        <span className={cn("size-1.5 rounded-full", dotOpacity[size])} />
      </div>
      <div
        className={cn("h-px flex-1 bg-gradient-to-r", lineOpacity[size])}
      />
    </motion.div>
  );
}

export interface ThemeSectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  srTitle?: string;
  bottomGlow?: boolean;
}

export function ThemeSection({
  id,
  children,
  className,
  srTitle,
  bottomGlow = false,
}: ThemeSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={srTitle ? `${id}-title` : undefined}
      className={cn("relative overflow-hidden bg-surface px-5 sm:px-6", className)}
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      {bottomGlow ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-[0.06]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse at center bottom, var(--theme-accent) 0%, transparent 70%)",
          }}
        />
      ) : null}

      <div className="pointer-events-none absolute left-0 top-0 h-24 w-full opacity-15">
        <div className="mughal-arch h-full w-full border-b-[16px] border-primary/20" />
      </div>

      {children}

      {srTitle ? (
        <span id={`${id}-title`} className="sr-only">
          {srTitle}
        </span>
      ) : null}
    </section>
  );
}

export interface ThemeSectionContentProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export function ThemeSectionContent({
  children,
  className,
  initial = { opacity: 0 },
  whileInView = { opacity: 1 },
  viewport = { once: true, margin: "-80px" },
  transition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  ...motionProps
}: ThemeSectionContentProps) {
  return (
    <motion.div
      className={cn("relative mx-auto w-full max-w-[430px]", className)}
      initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
