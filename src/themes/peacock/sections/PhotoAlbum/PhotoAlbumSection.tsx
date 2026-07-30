"use client";

import {
  ThemeSection,
  ThemeSectionContent,
} from "@/themes/shared/components";
import {
  PhotoAlbumCarousel,
  type AlbumPhoto,
} from "@/themes/royal-wedding/sections/Hero/photo-album-carousel";

import { FloatingFeathers } from "../../components/FloatingFeathers";
import { GoldDivider } from "../../components/GoldDivider";

interface PhotoAlbumSectionProps {
  photos: readonly AlbumPhoto[];
  overline?: string;
  title?: string;
  className?: string;
}

export function PhotoAlbumSection({
  photos,
  overline = "Cherished Moments",
  title = "Gallery",
  className,
}: PhotoAlbumSectionProps) {
  return (
    <ThemeSection
      id="gallery"
      className={className ?? "bg-[#FFFDF8] py-12 sm:py-16"}
      srTitle={title}
      bottomGlow
    >
      <FloatingFeathers count={2} className="opacity-50" />

      <ThemeSectionContent>
        <div className="mx-auto mb-6 max-w-xs">
          <GoldDivider />
        </div>
        <PhotoAlbumCarousel photos={photos} overline={overline} title={title} />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
