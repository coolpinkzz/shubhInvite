"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import latkan from "@/assests/latkan.png";
import { cn } from "@/lib/utils";

export interface ThemeSectionHeaderProps {
  overline: string;
  title: string;
  subtitle?: string;
  titleId?: string;
  className?: string;
}

export function ThemeSectionHeader({
  overline,
  title,
  subtitle,
  titleId,
  className,
}: ThemeSectionHeaderProps) {
  return (
    <header className={cn("relative text-center", className)}>
      <div className="pointer-events-none absolute -top-2 left-0 right-0 flex justify-between px-2">
        <motion.div
          className="garland-swing"
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Image
            src={latkan}
            alt=""
            width={32}
            height={96}
            className="h-16 w-auto object-contain opacity-80"
            aria-hidden="true"
          />
        </motion.div>
        <motion.div
          className="garland-swing"
          style={{ animationDelay: "-2s" }}
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Image
            src={latkan}
            alt=""
            width={32}
            height={96}
            className="h-16 w-auto object-contain opacity-80"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <motion.p
        className="mb-2 font-theme-label text-[10px] font-semibold uppercase tracking-[0.2em] text-accent"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {overline}
      </motion.p>

      <motion.h2
        id={titleId}
        className="font-theme-display text-[42px] leading-tight text-primary sm:text-5xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle ? (
        <motion.p
          className="mx-auto mt-3 max-w-xs font-theme-body text-base italic leading-relaxed text-muted sm:max-w-sm"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {subtitle}
        </motion.p>
      ) : null}

      <motion.div
        className="mx-auto mt-6 flex max-w-[200px] flex-col items-center gap-2"
        initial={{ opacity: 0, scaleX: 0.6 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <div className="h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent" />
        <div className="flex items-center gap-2">
          <span className="size-1 rounded-full bg-accent" />
          <svg
            width="24"
            height="12"
            viewBox="0 0 24 12"
            fill="none"
            className="text-accent"
          >
            <path
              d="M12 0L14.5 4.5H22L16 7.5L18.5 12L12 9L5.5 12L8 7.5L2 4.5H9.5L12 0Z"
              fill="currentColor"
              opacity="0.8"
            />
          </svg>
          <span className="size-1 rounded-full bg-accent" />
        </div>
        <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      </motion.div>
    </header>
  );
}
