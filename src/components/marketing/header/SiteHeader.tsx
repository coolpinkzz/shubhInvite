"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { BrandLogo } from "../BrandLogo";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { AUTH_LINKS, NAV_LINKS } from "./nav-config";
import { MobileNavDrawer } from "./MobileNavDrawer";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ease-luxury",
          scrolled
            ? "border-ivory-300/50 bg-ivory-50/90 shadow-soft backdrop-blur-xl"
            : "border-transparent bg-ivory-50/70 backdrop-blur-md",
        )}
      >
        <Container size="xl">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
            <BrandLogo priority />

            <nav
              aria-label="Primary"
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3.5 py-2 font-body text-body-sm font-medium text-maroon-900/70 transition-colors duration-300 hover:text-maroon-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href={AUTH_LINKS.login.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "md" }),
                  "text-maroon-900/80 hover:bg-maroon-800/5 hover:text-maroon-800",
                )}
              >
                {AUTH_LINKS.login.label}
              </Link>
              <Link
                href={AUTH_LINKS.getStarted.href}
                className={cn(
                  buttonVariants({ variant: "gold", size: "md" }),
                  "rounded-full",
                )}
              >
                {AUTH_LINKS.getStarted.label}
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-md text-maroon-800 transition-colors hover:bg-maroon-800/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </button>
          </div>
        </Container>
      </motion.header>

      <MobileNavDrawer open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
