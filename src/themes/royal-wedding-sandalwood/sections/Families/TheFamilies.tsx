"use client";

import { motion, useReducedMotion } from "framer-motion";

import type { InviteSide } from "@/types/theme";

import { GoldDivider } from "../../components/GoldDivider";
import { families } from "../../families";

const EASE = [0.16, 1, 0.3, 1] as const;

type FamilyId = "bride" | "groom";

const CARD_LABEL: Record<FamilyId, string> = {
  bride: "Bride's Family",
  groom: "Groom's Family",
};

function cardOrderForSide(side?: InviteSide): readonly FamilyId[] {
  return side === "groom" ? ["groom", "bride"] : ["bride", "groom"];
}

interface TheFamiliesProps {
  side?: InviteSide;
}

export function TheFamilies({ side }: TheFamiliesProps) {
  const reducedMotion = useReducedMotion();
  const cards = cardOrderForSide(side)
    .map((id) => families.find((family) => family.id === id))
    .filter((family): family is (typeof families)[number] => family !== undefined);

  return (
    <section
      id="family"
      aria-labelledby="family-title"
      className="bg-[#F7F4EC] px-5 pb-8 pt-16 text-center sm:px-6 sm:pb-10 sm:pt-20"
    >
      <div className="mx-auto w-full max-w-[26rem]">
        <motion.header
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="font-theme-label text-[11px] font-medium uppercase tracking-[0.32em] text-[#6E8B62]">
            With Love
          </p>
          <h2
            id="family-title"
            className="mt-2 font-theme-display text-[clamp(3.15rem,12vw,4.15rem)] leading-none text-[#8B2942]"
          >
            The Families
          </h2>
          <GoldDivider className="mt-6" />
        </motion.header>

        <div className="mt-10 space-y-5">
          {cards.map((family, index) => (
            <motion.article
              key={family.id}
              className="rounded-[1.35rem] border border-[#D7C4A4] bg-[#FFFDF8] px-6 py-8"
              initial={reducedMotion ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
            >
              <p className="font-theme-label text-[11px] font-medium uppercase tracking-[0.26em] text-[#6E8B62]">
                {CARD_LABEL[family.id]}
              </p>
              <GoldDivider className="my-4 w-[7.25rem]" />
              <p className="font-theme-headline text-[1.2rem] leading-snug text-[#3A312C] sm:text-[1.3rem]">
                Sri {family.father}
              </p>
              <p className="mt-1.5 font-theme-headline text-[1.2rem] leading-snug text-[#3A312C] sm:text-[1.3rem]">
                Smt. {family.mother}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
