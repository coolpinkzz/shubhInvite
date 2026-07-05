"use client";

import Image from "next/image";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { MaterialIcon } from "@/themes/royal-wedding/components/material-icon";
import { hexToRgba } from "@/themes/shared/utils/color";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export interface AlbumPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoAlbumCarouselProps {
  photos: readonly AlbumPhoto[];
  className?: string;
  autoPlayMs?: number;
  overline?: string;
  title?: string;
}

const SWIPE_THRESHOLD = 48;

export function PhotoAlbumCarousel({
  photos,
  className,
  autoPlayMs = 5000,
  overline = "Our Memories",
  title = "Photo Album",
}: PhotoAlbumCarouselProps) {
  const { tokens } = useTheme();
  const { colors, shadows } = tokens;
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (index === activeIndex || photos.length === 0) return;
      const forward = (index - activeIndex + photos.length) % photos.length;
      const backward = (activeIndex - index + photos.length) % photos.length;
      setDirection(forward <= backward ? 1 : -1);
      setActiveIndex(index);
    },
    [activeIndex, photos.length],
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % photos.length);
  }, [photos.length]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  }, [photos.length]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  };

  useEffect(() => {
    if (photos.length <= 1 || autoPlayMs <= 0) return;

    const timer = window.setInterval(goNext, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, goNext, photos.length]);

  if (photos.length === 0) return null;

  const activePhoto = photos[activeIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <div className={cn("relative w-full", className)}>
      <p className="mb-4 text-center font-theme-label text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        {overline}
      </p>
      <h2 className="mb-6 text-center font-theme-display text-3xl text-theme-primary">
        {title}
      </h2>

      <div className="relative mx-auto w-full max-w-sm">
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl",
            "border border-accent/40 p-1.5",
            "before:pointer-events-none before:absolute before:inset-2 before:z-10 before:rounded-xl before:border before:border-primary/10",
          )}
          style={{ boxShadow: shadows.hero }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface">
            <AnimatePresence
              initial={false}
              custom={direction}
              mode="popLayout"
            >
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, 384px"
                  className="object-cover"
                  priority={activeIndex === 0}
                  draggable={false}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent"
                  style={{
                    backgroundImage: `linear-gradient(to top, ${hexToRgba(colors.primary, 0.5)}, transparent)`,
                  }}
                />
                {activePhoto.caption ? (
                  <p className="absolute bottom-0 left-0 right-0 px-4 pb-4 text-center font-theme-body text-sm italic text-white/95">
                    {activePhoto.caption}
                  </p>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/30 bg-surface/95 p-2 text-theme-primary shadow-lg backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        >
          <MaterialIcon name="chevron_left" className="text-xl" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 translate-x-1/2 rounded-full border border-accent/30 bg-surface/95 p-2 text-theme-primary shadow-lg backdrop-blur-sm transition-transform hover:scale-105 active:scale-95"
        >
          <MaterialIcon name="chevron_right" className="text-xl" />
        </button>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {photos.map((photo, index) => (
          <button
            key={photo.src + index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to photo ${index + 1}`}
            aria-current={index === activeIndex ? "true" : undefined}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              index === activeIndex
                ? "w-6 bg-accent"
                : "w-2 bg-[var(--theme-outline)]/40 hover:bg-accent/50",
            )}
          />
        ))}
      </div>

      <p className="mt-3 text-center font-theme-label text-[11px] font-medium tracking-wide text-theme-subtle">
        {activeIndex + 1} / {photos.length}
      </p>
    </div>
  );
}
