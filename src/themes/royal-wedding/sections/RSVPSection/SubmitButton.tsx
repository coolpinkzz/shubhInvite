"use client";

import { motion } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "loading" | "success";

interface SubmitButtonProps {
  state: SubmitState;
  disabled?: boolean;
  className?: string;
}

const LABELS: Record<SubmitState, string> = {
  idle: "Send My RSVP",
  loading: "Sending...",
  success: "Thank You ❤️",
};

export function SubmitButton({ state, disabled, className }: SubmitButtonProps) {
  const isLoading = state === "loading";
  const isSuccess = state === "success";

  return (
    <motion.button
      type="submit"
      disabled={disabled || isLoading || isSuccess}
      whileTap={!disabled && !isLoading ? { scale: 0.97 } : undefined}
      whileHover={
        !disabled && !isLoading
          ? { boxShadow: "0 12px 40px rgba(212, 175, 55, 0.45)" }
          : undefined
      }
      className={cn(
        "relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-4",
        "bg-gradient-to-r from-[#D4AF37] via-[#E8C547] to-[#D4AF37]",
        "font-[family-name:var(--font-rw-label)] text-xs font-semibold uppercase tracking-[0.14em] text-[#7A1F2B]",
        "shadow-[0_8px_32px_rgba(212,175,55,0.35)]",
        "transition-shadow duration-300",
        "disabled:cursor-not-allowed disabled:opacity-80",
        className,
      )}
    >
      <motion.span
        className="absolute inset-0 bg-white/20"
        initial={{ x: "-100%", opacity: 0 }}
        whileTap={{ x: "100%", opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.5 }}
        aria-hidden="true"
      />

      {isLoading ? (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <Heart className="size-4 fill-[#7A1F2B]/20" aria-hidden="true" />
      )}
      <span>{LABELS[state]}</span>
    </motion.button>
  );
}
