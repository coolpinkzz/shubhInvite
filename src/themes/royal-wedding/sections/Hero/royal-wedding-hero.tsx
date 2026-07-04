"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import goldCornerBorder from "@/assests/gold-corner-border.png";
import lordGanesha from "@/assests/lord_ganesha.svg";
import brideGroom from "@/assests/bride-groom.png";
import latkan from "@/assests/latkan.png";
import { MaterialIcon } from "@/themes/royal-wedding/components/material-icon";
import { royalWeddingConfig } from "@/themes/royal-wedding/config";
import { CountdownTimer } from "./countdown-timer";
import { GlowShader } from "./glow-shader";
import { PetalRain } from "./petal-rain";
import { PhotoAlbumCarousel } from "./photo-album-carousel";
import { ScratchRevealCard } from "./scratch-reveal-card";

export function RoyalWeddingHero() {
  const { couple, location, brand, countdownTarget, photoAlbum } =
    royalWeddingConfig;
  const [headerShadow, setHeaderShadow] = useState(false);
  const [isDateRevealed, setIsDateRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderShadow(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="royal-wedding relative overflow-x-hidden selection:bg-[var(--rw-primary-container)] selection:text-[var(--rw-on-primary-container)]">
      <div
        className="event-schedule-pattern pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
      />

      <PetalRain />

      {/* Top App Bar */}
      {/* <header
        className={`fixed top-0 z-50 flex h-16 w-full items-center justify-between rounded-b-[40px] border-b border-[var(--rw-outline)]/20 bg-[var(--rw-surface)]/80 px-6 backdrop-blur-md transition-shadow ${
          headerShadow
            ? "shadow-xl shadow-[rgba(91,6,23,0.08)]"
            : "shadow-[0_20px_40px_-15px_rgba(91,6,23,0.05)]"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="cursor-pointer text-[var(--rw-primary)] transition-opacity hover:opacity-80 active:scale-95"
            aria-label="Open menu"
          >
            <MaterialIcon name="menu" />
          </button>
          <span className="font-[family-name:var(--font-rw-display)] text-2xl text-[var(--rw-primary)]">
            {brand}
          </span>
        </div>
        <MaterialIcon
          name="temple_hindu"
          className="text-[var(--rw-primary)]"
        />
      </header> */}

      <main className="relative flex min-h-screen flex-col items-center px-6">
        {/* Decorative Arch */}
        <div className="pointer-events-none absolute left-0 top-16 h-48 w-full opacity-20">
          <div className="mughal-arch h-full w-full border-b-[20px] border-[var(--rw-primary)]/10" />
        </div>

        {/* Gold corner border — top left */}
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

        {/* Gold corner border — top right */}
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

        {/* Latkans */}
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

        {/* Hero Content */}
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

          <p className="mb-2 font-[family-name:var(--font-rw-body)] text-lg uppercase tracking-widest text-[var(--rw-secondary)]">
            you are invited to the wedding of
          </p>

          <h1 className="mb-4 mt-3 flex flex-col items-center gap-0 font-[family-name:var(--font-rw-display)] text-[52px] leading-none text-[var(--rw-primary)] sm:text-[64px]">
            <span className="leading-normal">{couple.bride}</span>
            <span className="my-0.5 font-[family-name:var(--font-rw-body)] text-2xl leading-none text-[var(--rw-secondary)] sm:text-3xl">
              &amp;
            </span>
            <span className="leading-normal">{couple.groom}</span>
          </h1>

          <div className="floating-couple relative mx-auto mb-8 h-80 w-full max-w-md sm:h-96">
            <Image
              src={brideGroom}
              alt="Traditional Indian bride and groom illustration"
              fill
              sizes="(max-width: 640px) 90vw, 448px"
              className="object-contain drop-shadow-[0_16px_40px_rgba(91,6,23,0.25)]"
            />
          </div>

          <div className="mb-10 space-y-2">
            <div className="flex items-center justify-center gap-2 font-[family-name:var(--font-rw-body)] text-base italic text-[var(--rw-secondary)]">
              <MaterialIcon name="location_on" className="text-sm" />
              <p>{location}</p>
            </div>
          </div>

          <ScratchRevealCard
            weddingDate={royalWeddingConfig.scratchCard.weddingDate}
            revealThreshold={royalWeddingConfig.scratchCard.revealThreshold}
            onRevealed={() => setIsDateRevealed(true)}
          />

          {isDateRevealed && <CountdownTimer targetDate={countdownTarget} />}
        </div>

        {/* Photo Album */}
        <div className="relative mt-auto w-full min-h-[400px] pt-8">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[500px] w-full overflow-hidden rounded-t-[100px]">
            <div className="absolute inset-0 h-full w-full opacity-60">
              <GlowShader />
            </div>
          </div>

          <div className="relative z-40 mx-auto w-full max-w-md px-2">
            <PhotoAlbumCarousel photos={photoAlbum} />
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 z-50 flex w-full items-center justify-around rounded-t-[32px] border-t border-[var(--rw-outline)]/10 bg-[var(--rw-surface)]/90 px-4 pb-4 pt-2 shadow-[0_-10px_30px_rgba(91,6,23,0.08)] backdrop-blur-xl">
        <button
          type="button"
          className="flex flex-col items-center justify-center rounded-full bg-[var(--rw-secondary-container)] px-4 py-1 text-[var(--rw-primary)] transition-all active:scale-95"
        >
          <MaterialIcon name="looks" />
          <span
            className="font-[family-name:var(--font-rw-label)] text-xs"
            style={{ fontWeight: 600 }}
          >
            Home
          </span>
        </button>
        {(
          [
            ["calendar_month", "Events"],
            ["auto_awesome_mosaic", "Gallery"],
            ["mail", "RSVP"],
          ] as const
        ).map(([icon, label]) => (
          <button
            key={label}
            type="button"
            className="flex flex-col items-center justify-center text-[var(--rw-on-surface-variant)] transition-colors hover:text-[var(--rw-primary)] active:scale-95"
          >
            <MaterialIcon name={icon} />
            <span
              className="font-[family-name:var(--font-rw-label)] text-xs"
              style={{ fontWeight: 600 }}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
