"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Phone } from "lucide-react";

import type { InviteSide } from "@/types/theme";

import { rsvpContacts } from "../../families";

const EASE = [0.16, 1, 0.3, 1] as const;

function contactsForSide(side?: InviteSide) {
  if (side === "groom") {
    return rsvpContacts.filter((contact) => contact.id === "groom");
  }
  if (side === "bride" || side === "bride-wedding") {
    return rsvpContacts.filter((contact) => contact.id === "bride");
  }
  return rsvpContacts;
}

interface RsvpFamilyContactProps {
  side?: InviteSide;
}

export function RsvpFamilyContact({ side }: RsvpFamilyContactProps) {
  const reducedMotion = useReducedMotion();
  const contacts = contactsForSide(side);

  return (
    <div className="space-y-4">
      {contacts.map((contact, index) => (
        <motion.article
          key={contact.id}
          className="rounded-[28px] border border-[#E8D5C6] bg-[#FFF8F3] px-5 pb-6 pt-7 text-center shadow-[0_18px_50px_-28px_rgba(90,40,30,0.35)] sm:px-6"
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, delay: index * 0.08, ease: EASE }}
        >
          <h2 className="font-theme-headline text-[13px] font-medium uppercase tracking-[0.32em] text-[#7A2F3B]">
            {contact.title}
          </h2>
          <div className="mt-3 h-px w-full bg-[#E6D3C6]" aria-hidden="true" />
          <ul className="mt-5 space-y-1.5">
            {contact.names.map((name) => (
              <li
                key={name}
                className="font-theme-headline text-[1.15rem] leading-snug text-[#3F3330]"
              >
                {name}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-col items-center gap-2.5 border-t border-[#E6D3C6] pt-4">
            {contact.phones.map((phone) => (
              <a
                key={phone.tel}
                href={`tel:${phone.tel}`}
                className="inline-flex min-h-11 items-center gap-2 font-theme-headline text-lg tracking-wide text-[#8E4034]"
              >
                <Phone
                  className="size-4 text-[#C6A15A]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                {phone.display}
              </a>
            ))}
          </div>
        </motion.article>
      ))}
    </div>
  );
}
