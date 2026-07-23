"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FLOATING_CHIPS = [
  { label: "AI Generated", icon: true, className: "left-0 top-[8%] sm:-left-4" },
  { label: "Wedding Invite", className: "right-0 top-[18%] sm:-right-6" },
  { label: "Birthday Invite", className: "left-0 bottom-[28%] sm:-left-8" },
  { label: "Save the Date", className: "right-0 bottom-[18%] sm:-right-4" },
  { label: "RSVP Ready", className: "left-1/2 top-0 -translate-x-1/2 sm:top-2" },
] as const;

interface HeroVisualProps {
  className?: string;
}

export function HeroVisual({ className }: HeroVisualProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px]",
        className,
      )}
    >
      {/* Ambient glow blobs */}
      <div
        className="pointer-events-none absolute -inset-12 -z-10 sm:-inset-16"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/4 size-48 -translate-x-1/2 rounded-full bg-gold-400/25 blur-3xl" />
        <div className="absolute bottom-1/4 right-0 size-40 rounded-full bg-maroon-700/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 size-36 rounded-full bg-rose-300/30 blur-3xl" />
      </div>

      {/* Floating chips */}
      {FLOATING_CHIPS.map((chip, index) => (
        <motion.div
          key={chip.label}
          className={cn(
            "absolute z-20 rounded-full border border-ivory-300/80 bg-ivory-50/95 px-3 py-1.5 shadow-elevated backdrop-blur-sm",
            chip.className,
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : {
                  opacity: 1,
                  y: [0, index % 2 === 0 ? -6 : 6, 0],
                }
          }
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  opacity: { delay: 0.4 + index * 0.08, duration: 0.5 },
                  y: {
                    delay: 0.8 + index * 0.1,
                    duration: 4 + index * 0.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
        >
          <span className="inline-flex items-center gap-1.5 font-body text-[0.6875rem] font-medium tracking-wide text-maroon-900/80">
            {"icon" in chip && chip.icon ? (
              <Sparkles
                className="size-3 text-gold-600"
                aria-hidden="true"
              />
            ) : null}
            {chip.label}
          </span>
        </motion.div>
      ))}

      {/* Phone mockup */}
      <motion.div
        className="relative z-10 mx-auto aspect-[9/19] w-full"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: reduceMotion ? 0 : 0.25,
          duration: reduceMotion ? 0 : 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={reduceMotion ? undefined : { y: -4 }}
      >
        <div className="absolute inset-0 rounded-[2.25rem] bg-charcoal-900 p-[0.6rem] shadow-luxury ring-1 ring-charcoal-800/40">
          {/* Notch */}
          <div
            className="absolute left-1/2 top-[0.85rem] z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-charcoal-950"
            aria-hidden="true"
          />

          {/* Screen */}
          <div className="relative h-full overflow-hidden rounded-[1.75rem] bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200">
            <div className="flex h-full flex-col items-center px-5 pb-6 pt-10 text-center">
              <p className="font-body text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-gold-600">
                You&apos;re Invited
              </p>

              <div className="mt-5 flex flex-1 flex-col items-center justify-center gap-3">
                <p className="font-display text-[1.625rem] leading-tight text-maroon-800">
                  Ananya
                </p>
                <span
                  className="font-accent text-2xl text-gold-500"
                  aria-hidden="true"
                >
                  &amp;
                </span>
                <p className="font-display text-[1.625rem] leading-tight text-maroon-800">
                  Rohan
                </p>

                <div
                  className="my-2 h-px w-16 bg-gradient-to-r from-transparent via-gold-500 to-transparent"
                  aria-hidden="true"
                />

                <p className="font-body text-[0.625rem] uppercase tracking-[0.2em] text-maroon-900/55">
                  Save the Date
                </p>
                <p className="font-display text-lg text-gold-600">
                  14 Feb 2027
                </p>
              </div>

              <div className="mt-auto w-full rounded-xl border border-gold-400/30 bg-ivory-50/80 px-3 py-2.5 shadow-soft backdrop-blur-sm">
                <p className="inline-flex items-center justify-center gap-1.5 font-body text-[0.625rem] font-medium text-maroon-800">
                  <Sparkles className="size-3 text-gold-600" aria-hidden="true" />
                  Generated with AI in seconds
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
