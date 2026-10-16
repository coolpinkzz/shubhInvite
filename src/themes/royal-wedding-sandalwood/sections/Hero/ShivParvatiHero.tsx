"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import ganeshjiTop from "@/assests/ganeshjiTop.png";
import shivParvatiBg from "@/assests/shivParvatiBg.jpeg";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { MaterialIcon } from "@/themes/royal-wedding/components/material-icon";
import { CountdownTimer } from "@/themes/royal-wedding/sections/Hero/countdown-timer";
import {
  PetalRain,
  type PetalRainProps,
} from "@/themes/royal-wedding/sections/Hero/petal-rain";
import { SaveToCalendar } from "@/themes/royal-wedding/sections/Hero/save-to-calendar";
import { ScratchRevealCard } from "@/themes/royal-wedding/sections/Hero/scratch-reveal-card";
import { hexToRgba } from "@/themes/shared/utils/color";
import { isWeddingConfig } from "@/types/theme";

import { families } from "../../families";

const NAV_ITEMS = [
  { id: "home", icon: "looks", label: "Home" },
  { id: "events", icon: "calendar_month", label: "Events" },
  { id: "rsvp", icon: "mail", label: "RSVP" },
] as const;

type NavSectionId = (typeof NAV_ITEMS)[number]["id"];
type CoupleRole = "bride" | "groom";

function parentLine(role: CoupleRole) {
  const family = families.find((entry) => entry.id === role);
  if (!family) return "";
  const relation = role === "bride" ? "D/o" : "S/o";
  return `${relation} Sri ${family.father} & Smt. ${family.mother}`;
}

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
  petals?: PetalRainProps["options"];
}

export function ShivParvatiHero({
  nameOrder = "bride",
  petals,
}: ShivParvatiHeroProps) {
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

  const { couple, countdownTarget, scratchCard } = config;
  const firstRole: CoupleRole = nameOrder === "groom" ? "groom" : "bride";
  const secondRole: CoupleRole = firstRole === "bride" ? "groom" : "bride";
  const firstName = couple[firstRole];
  const secondName = couple[secondRole];

  return (
    <div id="home" className="relative scroll-mt-4 bg-background">
      <PetalRain options={petals} />

      <div className="relative mx-auto w-full">
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
        <div className="absolute inset-x-[11%] top-[45%] bottom-[11%] flex flex-col items-center justify-center text-center">
          <div className="animate-fade-in flex w-full flex-col items-center gap-4">
            <Image
              src={ganeshjiTop}
              alt="Lord Ganesha"
              width={512}
              height={512}
              className="h-[3rem] w-auto sm:h-[3.5rem]"
            />

            <p className="mt-0.5 text-[0.875rem] leading-none sm:text-[1.55rem]">
              || Shree Ganeshaya Namaha ||
            </p>

            <p className="mt-2 max-w-[17.5rem] rounded-2xl border border-white/70 bg-white/55 px-3 py-2 font-theme-body text-[11px] italic leading-snug text-muted shadow-[0_8px_24px_-16px_rgba(91,6,23,0.45)] sm:text-xs">
              Together with our families, we solicit your gracious presence and
              blessings on the auspicious occasion of the wedding celebration of
            </p>

            <h1 className="mt-2 flex flex-col items-center gap-1.5">
              <span className="font-theme-display text-[clamp(2.15rem,8vw,2.75rem)] leading-none text-[#C23B6E]">
                {firstName}
              </span>
              <span className="mt-1 max-w-[16.5rem] font-theme-body text-[10px] font-normal italic leading-tight text-muted sm:text-[11px]">
                {parentLine(firstRole)}
              </span>
              <span className="my-1 font-theme-display text-[1.85rem] leading-none text-[#C23B6E] sm:text-[2rem]">
                with
              </span>
              <span className="font-theme-display text-[clamp(2.15rem,8vw,2.75rem)] leading-none text-[#C23B6E]">
                {secondName}
              </span>
              <span className="mt-1 max-w-[16.5rem] font-theme-body text-[10px] font-normal italic leading-tight text-muted sm:text-[11px]">
                {parentLine(secondRole)}
              </span>
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-[#F7F3EB] px-5 pb-10 pt-8 text-center">
        <div className="mx-auto w-full max-w-[430px] md:max-w-[480px]">
          <ScratchRevealCard
            variant="plaque"
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
