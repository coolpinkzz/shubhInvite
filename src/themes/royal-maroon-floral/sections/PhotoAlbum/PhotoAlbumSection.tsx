"use client";

import {
  ThemeSection,
  ThemeSectionContent,
} from "@/themes/shared/components";
import {
  PhotoAlbumCarousel,
  type AlbumPhoto,
} from "@/themes/royal-wedding/sections/Hero/photo-album-carousel";
import { FloatingPetals } from "@/themes/royal-wedding/sections/VenueLocation/FloatingPetals";

interface PhotoAlbumSectionProps {
  photos: readonly AlbumPhoto[];
  overline?: string;
  title?: string;
  className?: string;
}

export function PhotoAlbumSection({
  photos,
  overline = "Our Memories",
  title = "Photo Album",
  className,
}: PhotoAlbumSectionProps) {
  return (
    <ThemeSection
      id="gallery"
      className={className ?? "py-12 sm:py-16"}
      srTitle={title}
      bottomGlow
    >
      <FloatingPetals />

      <ThemeSectionContent>
        <PhotoAlbumCarousel photos={photos} overline={overline} title={title} />
      </ThemeSectionContent>
    </ThemeSection>
  );
}
