"use client";

import { motion } from "framer-motion";

import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { isBirthdayConfig } from "@/types/theme";
import { FloatingBalloons } from "../../components/FloatingBalloons";

interface BirthdayFooterProps {
  className?: string;
}

export function BirthdayFooter({ className }: BirthdayFooterProps) {
  const { config, tokens } = useTheme();

  if (!isBirthdayConfig(config)) return null;

  const { parents, celebrant, copy, brand } = config;

  return (
    <footer
      id="footer"
      className={cn(
        "relative overflow-hidden px-5 pb-20 pt-12 text-center",
        className,
      )}
      style={{ background: tokens.gradients.hero }}
      aria-label="Invitation closing message"
    >
      <div className="comic-web-grid pointer-events-none absolute inset-0 opacity-60" />
      <FloatingBalloons className="opacity-80" />

      <motion.div
        className="relative z-10 mx-auto flex max-w-md flex-col items-center gap-5"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="font-theme-body text-[10px] font-bold uppercase tracking-[0.24em] text-accent">
          With Love From
        </p>

        <div className="space-y-1">
          <p className="font-theme-display text-3xl text-primary-foreground sm:text-4xl">
            {parents.mother}
          </p>
          <p className="font-theme-body text-sm text-primary-foreground/50">&</p>
          <p className="font-theme-display text-3xl text-primary-foreground sm:text-4xl">
            {parents.father}
          </p>
        </div>

        <div className="comic-web-divider my-1" aria-hidden="true" />

        <p className="font-theme-body text-sm leading-relaxed text-primary-foreground/70 sm:text-base">
          {copy.footerMessage}
        </p>

        <p className="mt-2 font-theme-display text-xl text-[var(--web-gold)]">
          Thank you for celebrating {celebrant.firstName}
        </p>

        <p className="font-theme-body text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground/45">
          {brand}
        </p>
      </motion.div>
    </footer>
  );
}
