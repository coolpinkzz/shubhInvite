"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { HERO_CTAS } from "../header/nav-config";
import { HeroVisual } from "./HeroVisual";
import { TrustRow } from "./TrustRow";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

export function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200 texture-noise"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 top-20 size-72 rounded-full bg-gold-300/20 blur-3xl sm:size-96" />
        <div className="absolute -right-20 top-40 size-64 rounded-full bg-maroon-700/10 blur-3xl sm:size-80" />
        <div className="absolute bottom-0 left-1/3 size-56 rounded-full bg-rose-200/40 blur-3xl" />
      </div>

      <Container size="xl" className="relative">
        <div className="grid items-center gap-10 pb-14 pt-8 sm:gap-12 sm:pb-16 sm:pt-10 lg:grid-cols-2 lg:gap-14 lg:pb-20 lg:pt-12 xl:gap-16">
          {/* Copy column */}
          <div className="flex flex-col items-start text-left">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              <Badge
                variant="gold"
                size="lg"
                className="mb-5 inline-flex gap-1.5 normal-case tracking-wide"
              >
                <Sparkles className="size-3.5" aria-hidden="true" />
                AI-Powered Invitation Creator
              </Badge>
            </motion.div>

            <motion.div
              custom={0.1}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              <Heading
                id="hero-heading"
                level="displayLg"
                color="primary"
                className="max-w-[18ch] sm:max-w-[20ch] lg:max-w-none"
              >
                Create Beautiful Digital Invitations in{" "}
                <span className="text-gold-gradient">Seconds</span> with AI
              </Heading>
            </motion.div>

            <motion.div
              custom={0.2}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
            >
              <Text
                size="lg"
                color="muted"
                className="mt-5 max-w-xl text-pretty text-maroon-900/65"
              >
                Generate elegant invitations for weddings, birthdays,
                engagements, baby showers, housewarming ceremonies, and every
                special celebration using AI. No design experience required.
              </Text>
            </motion.div>

            <motion.div
              custom={0.3}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={HERO_CTAS.primary.href}
                  className={cn(
                    buttonVariants({ variant: "gold", size: "xl" }),
                    "w-full rounded-full sm:w-auto",
                  )}
                >
                  {HERO_CTAS.primary.label}
                </Link>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href={HERO_CTAS.secondary.href}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "xl" }),
                    "w-full rounded-full border-maroon-800/25 text-maroon-800 hover:border-gold-500 hover:text-maroon-900 sm:w-auto",
                  )}
                >
                  <Play className="size-4 fill-current" aria-hidden="true" />
                  {HERO_CTAS.secondary.label}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              custom={0.4}
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              animate="visible"
              className="mt-8 hidden w-full lg:block"
            >
              <TrustRow />
            </motion.div>
          </div>

          {/* Visual column */}
          <motion.div
            custom={0.2}
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="flex justify-center lg:justify-end"
          >
            <HeroVisual />
          </motion.div>

          {/* Trust on mobile — below visual */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            className="lg:hidden"
          >
            <TrustRow />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
