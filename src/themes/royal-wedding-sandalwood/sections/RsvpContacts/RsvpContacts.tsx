"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

import {
  ThemeCard,
  ThemeSection,
  ThemeSectionContent,
  ThemeSectionHeader,
} from "@/themes/shared/components";

import { rsvpContacts } from "../../families";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RsvpContacts() {
  return (
    <ThemeSection
      id="rsvp-contacts"
      className="scroll-mt-24 pb-4 pt-16"
      srTitle="RSVP contacts"
    >
      <ThemeSectionContent>
        <ThemeSectionHeader
          overline="Reach the Families"
          title="Kindly Confirm"
          subtitle="A call or message to either family is as welcome as a note below."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {rsvpContacts.map((contact, index) => (
            <motion.article
              key={contact.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
            >
              <ThemeCard className="h-full">
                <p className="font-theme-label text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {contact.title}
                </p>
                <ul className="mt-4 space-y-1">
                  {contact.names.map((name) => (
                    <li
                      key={name}
                      className="font-theme-body text-[15px] leading-snug text-foreground"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-col gap-2 border-t border-accent/15 pt-4">
                  {contact.phones.map((phone) => (
                    <a
                      key={phone.tel}
                      href={`tel:${phone.tel}`}
                      className="inline-flex items-center gap-2 font-theme-headline text-lg text-theme-primary"
                    >
                      <Phone
                        className="size-4 text-accent"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                      {phone.display}
                    </a>
                  ))}
                </div>
              </ThemeCard>
            </motion.article>
          ))}
        </div>
      </ThemeSectionContent>
    </ThemeSection>
  );
}
