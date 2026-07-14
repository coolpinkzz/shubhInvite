"use client";

import { ThemeSection, ThemeSectionContent } from "@/themes/shared/components";
import {
  PhotoAlbumCarousel,
  type AlbumPhoto,
} from "@/themes/royal-wedding/sections/Hero/photo-album-carousel";

import { FloralPetals } from "@/themes/baby-reveal/components/BabyReveal/FloralPetals";

interface PhotoAlbumSectionProps {
  photos: readonly AlbumPhoto[];
  overline?: string;
  title?: string;
  className?: string;
}

export function PhotoAlbumSection({
  photos,
  overline = "Our Journey",
  title = "Mom & Dad",
  className,
}: PhotoAlbumSectionProps) {
  return (
    <ThemeSection
      id="photo-album"
      className={className ?? "py-8"}
      srTitle={title}
      bottomGlow
    >
      <FloralPetals className="pointer-events-none absolute inset-0 overflow-hidden opacity-60" />

      <ThemeSectionContent>
        <PhotoAlbumCarousel photos={photos} overline={overline} title={title} />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
