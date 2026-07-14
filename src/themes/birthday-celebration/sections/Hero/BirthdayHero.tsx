"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { isBirthdayConfig } from "@/types/theme";
import { ConfettiRain } from "../../components/ConfettiRain";
import { AgeRevealCard } from "../AgeReveal";

const SPIDER_EMBLEM_SRC = "/themes/birthday-celebration/spiderman.png";

interface BirthdayHeroProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

function WebCornerStrands() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-0 z-20 h-36 w-full text-white/25 sm:h-44"
      viewBox="0 0 400 120"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
    >
      <path
        d="M0 0 C40 30 70 50 100 80 M0 0 C50 18 90 28 140 55 M0 0 C20 40 35 70 50 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M400 0 C360 30 330 50 300 80 M400 0 C350 18 310 28 260 55 M400 0 C380 40 365 70 350 110"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M60 20 Q120 40 160 28 Q200 16 240 40"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}

function CitySkyline() {
  const lights = [
    { x: 18, delay: "0s" },
    { x: 42, delay: "0.4s" },
    { x: 67, delay: "0.9s" },
    { x: 88, delay: "0.2s" },
    { x: 112, delay: "1.1s" },
    { x: 148, delay: "0.6s" },
    { x: 190, delay: "0.3s" },
    { x: 230, delay: "0.8s" },
    { x: 268, delay: "0.15s" },
    { x: 310, delay: "1s" },
    { x: 340, delay: "0.5s" },
    { x: 372, delay: "0.7s" },
  ];

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] w-full"
      aria-hidden="true"
    >
      <svg
        className="h-28 w-full text-[#050A12] sm:h-36"
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 100 V58 H18 V32 H32 V58 H48 V40 H70 V22 H86 V40 H98 V55 H118 V28 H140 V48 H158 V18 H178 V48 H198 V35 H220 V55 H240 V25 H262 V55 H280 V42 H300 V15 H322 V42 H340 V50 H360 V30 H380 V58 H400 V100 Z"
        />
        {lights.map((light) => (
          <rect
            key={`${light.x}-${light.delay}`}
            className="comic-city-light"
            x={light.x}
            y={48}
            width="3"
            height="4"
            fill="#F5C542"
            style={{ animationDelay: light.delay }}
            opacity="0.7"
          />
        ))}
      </svg>
      <div className="h-3 w-full bg-[#050A12]" />
    </div>
  );
}

export function BirthdayHero({
  onPrimaryClick,
  onSecondaryClick,
  className,
}: BirthdayHeroProps) {
  const { config, tokens } = useTheme();
  const [ageRevealed, setAgeRevealed] = useState(false);

  if (!isBirthdayConfig(config)) return null;

  const { celebrant, age, brand, ageReveal, copy, date, location } = config;

  return (
    <section
      id="home"
      className={cn(
        "relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-24 sm:pb-32 sm:pt-28",
        className,
      )}
      style={{ background: tokens.gradients.hero }}
      aria-label="Birthday invitation hero"
    >
      <div className="comic-web-grid pointer-events-none absolute inset-0 opacity-80" />

      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <WebCornerStrands />
        <CitySkyline />
      </motion.div>

      <div
        className="birthday-hero-glow pointer-events-none absolute inset-x-0 top-1/4 mx-auto h-64 w-64 rounded-full blur-3xl"
        style={{
          background: `radial-gradient(circle, ${tokens.colors.accent}55 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <ConfettiRain enhanced={ageRevealed} />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-5">
        <motion.div
          className="relative h-20 w-20 sm:h-24 sm:w-24"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          <Image
            src={SPIDER_EMBLEM_SRC}
            alt=""
            fill
            priority
            sizes="96px"
            className="object-contain mix-blend-screen"
          />
        </motion.div>

        <motion.p
          className="font-theme-display text-2xl text-accent sm:text-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          {brand}
        </motion.p>

        <motion.header
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-theme-display text-6xl tracking-wide text-primary-foreground sm:text-7xl">
            {celebrant.firstName}
          </h1>
          <p className="mt-2 font-theme-display text-3xl text-accent sm:text-4xl">
            {copy.title}
          </p>
          <p className="mx-auto mt-3 max-w-xs font-theme-body text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
            {copy.subtitle}
          </p>
        </motion.header>

        <motion.div
          className="flex flex-col items-center gap-0.5 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p className="font-theme-body text-sm font-medium text-primary-foreground/85">
            {date}
          </p>
          <p className="font-theme-body text-xs text-primary-foreground/50">
            {location}
          </p>
        </motion.div>

        <AgeRevealCard
          age={age}
          hint={ageReveal.hint}
          revealThreshold={ageReveal.revealThreshold}
          onRevealed={() => setAgeRevealed(true)}
        />

        {ageRevealed ? (
          <motion.div
            className="flex w-full flex-col items-center gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-xs text-center font-theme-body text-sm text-primary-foreground/70">
              {copy.revealMessage}
            </p>

            <div className="flex w-full max-w-sm flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onPrimaryClick}
                className="comic-cta-primary min-h-12 flex-1 px-6 py-3 font-theme-body text-sm font-bold tracking-wide text-primary-foreground transition-transform active:scale-[0.98]"
                style={{
                  borderRadius: tokens.radius.button,
                  background: tokens.gradients.button,
                  boxShadow: tokens.shadows.button,
                }}
              >
                <span>{copy.ctaPrimary}</span>
              </button>
              <button
                type="button"
                onClick={onSecondaryClick}
                className="min-h-12 flex-1 border-2 border-secondary bg-transparent px-6 py-3 font-theme-body text-sm font-bold tracking-wide text-primary-foreground transition-transform active:scale-[0.98]"
                style={{ borderRadius: tokens.radius.button }}
              >
                {copy.ctaSecondary}
              </button>
            </div>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
