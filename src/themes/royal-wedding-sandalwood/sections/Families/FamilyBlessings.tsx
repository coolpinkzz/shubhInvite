"use client";

import { motion } from "framer-motion";

import {
  ThemeCard,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";

import { families } from "../../families";

const EASE = [0.16, 1, 0.3, 1] as const;

export function FamilyBlessings() {
  return (
    <ThemeSection id="family" className="scroll-mt-24 py-16" srTitle="Our Families">
      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="With Their Blessings"
          title="Our Families"
          subtitle="Manoranjan and Susri Sangita invite you, with the love of their parents."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {families.map((family, index) => (
            <motion.article
              key={family.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
            >
              <ThemeCard className="h-full text-center">
                <p className="font-theme-label text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {family.title}
                </p>
                <p className="mt-4 font-theme-label text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {family.fatherLabel}
                </p>
                <p className="mt-1 text-balance font-theme-display text-[clamp(1.55rem,6vw,1.85rem)] leading-tight text-theme-primary">
                  {family.father}
                </p>
                <p className="my-2 font-theme-body text-xl italic text-muted">&amp;</p>
                <p className="font-theme-label text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                  {family.motherLabel}
                </p>
                <p className="mt-1 text-balance font-theme-display text-[clamp(1.55rem,6vw,1.85rem)] leading-tight text-theme-primary">
                  {family.mother}
                </p>
              </ThemeCard>
            </motion.article>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
