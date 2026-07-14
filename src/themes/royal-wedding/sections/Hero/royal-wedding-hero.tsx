"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import goldCornerBorder from "@/assests/gold-corner-border.png";
import lordGanesha from "@/assests/lord_ganesha.svg";
import brideGroom from "@/assests/bride-groom.png";
import latkan from "@/assests/latkan.png";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { isWeddingConfig } from "@/types/theme";
import { MaterialIcon } from "@/themes/royal-wedding/components/material-icon";
import { hexToRgba } from "@/themes/shared/utils/color";
import { CountdownTimer } from "./countdown-timer";
import { GlowShader } from "./glow-shader";
import { PetalRain } from "./petal-rain";
import { PhotoAlbumCarousel } from "./photo-album-carousel";
import { ScratchRevealCard } from "./scratch-reveal-card";

const NAV_ITEMS = [
  { id: "home", icon: "looks", label: "Home" },
  { id: "events", icon: "calendar_month", label: "Events" },
  { id: "gallery", icon: "auto_awesome_mosaic", label: "Gallery" },
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

export function RoyalWeddingHero() {
  const { config, tokens } = useTheme();
  const { colors } = tokens;
  const [isDateRevealed, setIsDateRevealed] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("home");

  const handleNavClick = useCallback((id: NavSectionId) => {
    setActiveSection(id);
    scrollToSection(id);
  }, []);

  useEffect(() => {
    const sectionIds: NavSectionId[] = ["home", "gallery", "events", "rsvp"];

    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setActiveSection(id);
          }
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
    throw new Error("RoyalWeddingHero requires a wedding theme configuration.");
  }

  const { couple, location, countdownTarget, photoAlbum, scratchCard } = config;

  return (
    <div
      id="home"
      className="relative scroll-mt-4 overflow-x-hidden selection:bg-primary selection:text-[var(--theme-primary-container-foreground)]"
    >
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <PetalRain />

      <main className="relative flex min-h-screen flex-col items-center px-6">
        <div className="pointer-events-none absolute left-0 top-16 h-48 w-full opacity-20">
          <div
            className="mughal-arch h-full w-full border-b-[20px]"
            style={{ borderColor: hexToRgba(colors.primary, 0.1) }}
          />
        </div>

        <div className="pointer-events-none absolute left-0 -top-1 z-20 sm:left-2">
          <Image
            src={goldCornerBorder}
            alt=""
            width={160}
            height={160}
            className="h-28 w-28 -scale-x-100 rotate-180 object-contain opacity-90 mix-blend-screen sm:h-36 sm:w-36"
            aria-hidden="true"
          />
        </div>

        <div className="pointer-events-none absolute right-0 -top-1 z-20 sm:right-2">
          <Image
            src={goldCornerBorder}
            alt=""
            width={160}
            height={160}
            className="h-28 w-28 rotate-180 object-contain opacity-90 mix-blend-screen sm:h-36 sm:w-36"
            aria-hidden="true"
          />
        </div>

        <div className="garland-swing pointer-events-none absolute left-4 top-0 z-20 sm:left-8">
          <Image
            src={latkan}
            alt=""
            width={48}
            height={160}
            className="h-32 w-auto object-contain sm:h-40"
            aria-hidden="true"
          />
        </div>
        <div
          className="garland-swing pointer-events-none absolute right-4 top-0 z-20 sm:right-8"
          style={{ animationDelay: "-2s" }}
        >
          <Image
            src={latkan}
            alt=""
            width={48}
            height={160}
            className="h-32 w-auto object-contain sm:h-40"
            aria-hidden="true"
          />
        </div>

        <div className="z-30 mt-12 animate-fade-in text-center">
          <div className="mb-4 flex justify-center">
            <Image
              src={lordGanesha}
              alt="Lord Ganesha"
              width={64}
              height={64}
              priority
              className="h-16 w-16 object-contain"
            />
          </div>

          <p className="mb-2 font-theme-body text-lg uppercase tracking-widest text-muted">
            you are invited to the wedding of
          </p>

          <h1 className="mb-4 mt-3 flex flex-col items-center gap-0 font-theme-display text-[52px] leading-none text-theme-primary sm:text-[64px]">
            <span className="leading-normal">{couple.bride}</span>
            <span className="my-0.5 font-theme-body text-2xl leading-none text-muted sm:text-3xl">
              &amp;
            </span>
            <span className="leading-normal">{couple.groom}</span>
          </h1>

          <div className="floating-couple relative mx-auto mb-8 h-80 w-full max-w-md sm:h-96 md:max-w-xl md:h-[28rem] lg:max-w-2xl">
            <Image
              src={brideGroom}
              alt="Traditional Indian bride and groom illustration"
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 448px, 672px"
              className="object-contain"
              style={{
                filter: `drop-shadow(0 16px 40px ${hexToRgba(colors.primary, 0.25)})`,
              }}
            />
          </div>

          <div className="mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 font-theme-body text-base italic text-muted">
              <MaterialIcon name="location_on" className="text-sm" />
              <p>{location}</p>
            </div>
          </div>

          <ScratchRevealCard
            weddingDate={scratchCard.weddingDate}
            revealThreshold={scratchCard.revealThreshold}
            onRevealed={() => setIsDateRevealed(true)}
          />

          {isDateRevealed && <CountdownTimer targetDate={countdownTarget} />}
        </div>

        <div className="relative mt-auto w-full min-h-[400px] pt-8">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] w-full overflow-hidden rounded-t-[100px]">
            <div className="absolute inset-0 h-full w-full opacity-60">
              <GlowShader />
            </div>
          </div>

          <div
            id="gallery"
            className="relative z-40 mx-auto w-full max-w-md scroll-mt-24 px-2 md:max-w-xl lg:max-w-2xl"
          >
            <PhotoAlbumCarousel photos={photoAlbum} />
          </div>
        </div>
      </main>

      <nav
        aria-label="Invitation sections"
        className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-[32px] border-t border-theme-outline/10 bg-surface/90 px-4 pb-4 pt-2 backdrop-blur-xl"
        style={{ boxShadow: `0 -10px 30px ${hexToRgba(colors.primary, 0.08)}` }}
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
              <span
                className="font-theme-label text-xs"
                style={{ fontWeight: 600 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
