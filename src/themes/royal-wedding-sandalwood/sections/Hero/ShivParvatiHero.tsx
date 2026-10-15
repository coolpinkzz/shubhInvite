"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import shivParvatiBg from "@/assests/shivParvatiBg.jpeg";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/themes/royal-wedding/components/material-icon";
import { CountdownTimer } from "@/themes/royal-wedding/sections/Hero/countdown-timer";
import { SaveToCalendar } from "@/themes/royal-wedding/sections/Hero/save-to-calendar";
import { ScratchRevealCard } from "@/themes/royal-wedding/sections/Hero/scratch-reveal-card";
import { hexToRgba } from "@/themes/shared/utils/color";
import { isWeddingConfig } from "@/types/theme";

const NAV_ITEMS = [
  { id: "home", icon: "looks", label: "Home" },
  { id: "events", icon: "calendar_month", label: "Events" },
  { id: "rsvp", icon: "mail", label: "RSVP" },
] as const;

type NavSectionId = (typeof NAV_ITEMS)[number]["id"];

function scrollToSection(id: NavSectionId) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

interface ShivParvatiHeroProps {
  /** Whose name is written first. Defaults to the bride. */
  nameOrder?: "bride" | "groom";
}

export function ShivParvatiHero({ nameOrder = "bride" }: ShivParvatiHeroProps) {
  const { config, tokens } = useTheme();
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");

  const handleNavClick = useCallback((id: NavSectionId) => {
    setActiveSection(id);
    scrollToSection(id);
  }, []);

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: 0 },
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  if (!isWeddingConfig(config)) {
    throw new Error("ShivParvatiHero requires a wedding theme configuration.");
  }

  const { couple, location, countdownTarget, scratchCard } = config;
  const [firstName, secondName] =
    nameOrder === "groom"
      ? [couple.groom, couple.bride]
      : [couple.bride, couple.groom];

  return (
    <div
      id="home"
      className="relative scroll-mt-4 bg-background pb-8"
    >
      <div className="relative mx-auto w-full max-w-[430px] md:max-w-[480px]">
        <Image
          src={shivParvatiBg}
          alt=""
          width={1536}
          height={2752}
          priority
          sizes="(max-width: 768px) 100vw, 480px"
          className="h-auto w-full"
        />

        {/* Sits in the open paper between the feet and the banana leaves. */}
        <div className="absolute inset-x-[14%] top-[43%] bottom-[15%] flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in">
            <p className="font-theme-label text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-muted sm:text-[11px]">
              You are invited
              <span className="mt-1 block tracking-[0.28em]">to the wedding of</span>
            </p>

            <h1 className="mt-3 flex flex-col items-center font-theme-display text-[clamp(1.85rem,7.2vw,2.65rem)] leading-[1.05] text-theme-primary md:text-[2.85rem]">
              <span className="text-balance">{firstName}</span>
              <span className="my-1 font-theme-body text-xl italic leading-none text-accent sm:text-2xl">
                &amp;
              </span>
              <span className="text-balance">{secondName}</span>
            </h1>

            <div
              className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden="true"
            />

            <p className="mt-4 flex items-center justify-center gap-1.5 font-theme-body text-sm italic text-muted sm:text-base">
              <MaterialIcon name="location_on" className="text-sm text-accent" />
              <span>{location}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[430px] px-5 pb-4 pt-6 text-center md:max-w-[480px]">
        <ScratchRevealCard
          weddingDate={scratchCard.weddingDate}
          revealThreshold={scratchCard.revealThreshold}
          onRevealed={() => setIsDateRevealed(true)}
        />
        {isDateRevealed ? (
          <>
            <CountdownTimer targetDate={countdownTarget} />
            <SaveToCalendar config={config} />
          </>
        ) : null}
      </div>

      <nav
        aria-label="Invitation sections"
        className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-[32px] border-t border-theme-outline/10 bg-surface/90 px-4 pb-4 pt-2 backdrop-blur-xl"
        style={{
          boxShadow: `0 -10px 30px ${hexToRgba(tokens.colors.primary, 0.08)}`,
        }}
      >
        {NAV_ITEMS.map(({ id, icon, label }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => handleNavClick(id)}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center transition-all active:scale-95",
                isActive
                  ? "rounded-full bg-theme-secondary-container px-4 py-1 text-theme-primary"
                  : "text-theme-subtle hover:text-theme-primary",
              )}
            >
              <MaterialIcon name={icon} />
              <span className="font-theme-label text-xs font-semibold">
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
