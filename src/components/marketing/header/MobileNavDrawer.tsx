"use client";

import { useEffect, useId, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { BrandLogo } from "../BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AUTH_LINKS, NAV_LINKS } from "./nav-config";

interface MobileNavDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNavDrawer({ open, onClose }: MobileNavDrawerProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[60] lg:hidden" role="presentation">
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-charcoal-950/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <motion.aside
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col bg-ivory-50 shadow-luxury"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 36,
              duration: reduceMotion ? 0 : undefined,
            }}
          >
            <div className="flex items-center justify-between border-b border-ivory-300/60 px-5 py-4">
              <BrandLogo className="max-w-[11rem]" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-md text-maroon-800 transition-colors hover:bg-maroon-800/5 hover:text-maroon-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close navigation"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col gap-1 px-4 py-6"
            >
              <p id={titleId} className="sr-only">
                Site navigation
              </p>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-lg px-4 py-3.5 font-body text-body-md font-medium text-maroon-900/80 transition-colors hover:bg-maroon-800/5 hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-3 border-t border-ivory-300/60 px-5 py-5">
              <Link
                href={AUTH_LINKS.login.href}
                onClick={onClose}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg", fullWidth: true }),
                  "justify-center text-maroon-900/80 hover:bg-maroon-800/5 hover:text-maroon-800",
                )}
              >
                {AUTH_LINKS.login.label}
              </Link>
              <Link
                href={AUTH_LINKS.getStarted.href}
                onClick={onClose}
                className={cn(
                  buttonVariants({ variant: "gold", size: "lg", fullWidth: true }),
                  "rounded-full justify-center",
                )}
              >
                {AUTH_LINKS.getStarted.label}
              </Link>
            </div>
          </motion.aside>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
