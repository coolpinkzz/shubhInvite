"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ThemeSection, ThemeSectionContent } from "@/themes/shared/components";
import type { AlbumPhoto } from "@/themes/royal-wedding/sections/Hero/photo-album-carousel";
import { cn } from "@/lib/utils";
import { ConfettiRain } from "../../components/ConfettiRain";

interface PhotoAlbumSectionProps {
  photos: readonly AlbumPhoto[];
  overline?: string;
  title?: string;
  className?: string;
}

const PANEL_ROTATIONS = [-1.5, 1.2, -0.8, 1.6];

export function PhotoAlbumSection({
  photos,
  overline = "Origin Story",
  title = "Photo Album",
  className,
}: PhotoAlbumSectionProps) {
  return (
    <ThemeSection
      id="photo-album"
      className={className ?? "py-12"}
      srTitle={title}
      bottomGlow
    >
      <ConfettiRain className="opacity-25" />

      <ThemeSectionContent>
        <header className="mb-8 text-center">
          <p className="font-theme-body text-[11px] font-bold uppercase tracking-[0.28em] text-accent">
            {overline}
          </p>
          <h2 className="mt-2 font-theme-display text-4xl text-primary sm:text-5xl">
            {title}
          </h2>
        </header>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {photos.map((photo, index) => (
            <motion.figure
              key={photo.src}
              className={cn("comic-panel overflow-hidden")}
              style={{
                rotate: PANEL_ROTATIONS[index % PANEL_ROTATIONS.length],
              }}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              {photo.caption ? (
                <figcaption className="comic-caption-bar">
                  {photo.caption}
                </figcaption>
              ) : null}
            </motion.figure>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
