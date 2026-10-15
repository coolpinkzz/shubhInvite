"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

import type {
  AnyThemeContentConfig,
  ThemeId,
  ThemeIntroConfig,
  ThemeMusicConfig,
  ThemeTokenOverrides,
  ThemeTokens,
} from "@/types/theme";
import { cn } from "@/lib/utils";
import {
  EnvelopeIntro,
  INTRO_REVEAL_MS,
} from "@/themes/shared/components/EnvelopeIntro";
import { LottieIntro } from "@/themes/shared/components/LottieIntro";
import {
  ThemeMusicControl,
  type ThemeMusicControlHandle,
} from "@/themes/shared/components/ThemeMusicControl";
import {
  mergeThemeTokens,
  tokensToCssVars,
} from "@/themes/shared/utils/tokens-to-css-vars";

export interface ThemeContextValue {
  themeId: ThemeId;
  tokens: ThemeTokens;
  config: AnyThemeContentConfig;
  music?: ThemeMusicConfig;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  themeId: ThemeId;
  tokens: ThemeTokens;
  config: AnyThemeContentConfig;
  music?: ThemeMusicConfig;
  intro?: ThemeIntroConfig;
  overrides?: ThemeTokenOverrides;
  className?: string;
  children: ReactNode;
}

export function ThemeProvider({
  themeId,
  tokens,
  config,
  music,
  intro,
  overrides,
  className,
  children,
}: ThemeProviderProps) {
  const musicControlRef = useRef<ThemeMusicControlHandle>(null);
  const [introComplete, setIntroComplete] = useState(!intro);
  /** Invitation stays hidden until the intro begins to fade, then eases in. */
  const [revealed, setRevealed] = useState(!intro);
  /** Music waits for the intro video to start (or skips wait when there is no intro). */
  const [introMusicReady, setIntroMusicReady] = useState(!intro);

  const resolvedTokens = useMemo(
    () => mergeThemeTokens(tokens, overrides),
    [tokens, overrides],
  );

  const cssVars = useMemo(
    () => tokensToCssVars(resolvedTokens),
    [resolvedTokens],
  );

  const contextValue = useMemo(
    () => ({ themeId, tokens: resolvedTokens, config, music }),
    [themeId, resolvedTokens, config, music],
  );

  const handleIntroStart = useCallback(() => {
    setIntroMusicReady(true);
    // Play in the same flow as video start so a tap can unlock audio.
    musicControlRef.current?.play();
  }, []);

  const handleIntroReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setRevealed(true);
    setIntroComplete(true);
    setIntroMusicReady(true);
  }, []);

  useEffect(() => {
    if (!intro) return;

    const skipOnReducedMotion = intro.skipOnReducedMotion ?? true;
    if (!skipOnReducedMotion) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setRevealed(true);
      setIntroComplete(true);
      setIntroMusicReady(true);
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setRevealed(true);
        setIntroComplete(true);
        setIntroMusicReady(true);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [intro]);

  const musicAutoplay = introMusicReady && (music?.autoplay ?? true);

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        data-theme={themeId}
        className={className}
        style={cssVars as CSSProperties}
      >
        <div
          aria-hidden={!introComplete}
          // Stay painted under the intro. `visibility: hidden` skips that
          // paint, so the video fade reveals a blank page before the hero.
          inert={!introComplete}
          className={cn(
            intro &&
              "transition-opacity ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            !introComplete && "pointer-events-none",
            revealed ? "opacity-100" : "opacity-0",
          )}
          style={
            intro ? { transitionDuration: `${INTRO_REVEAL_MS}ms` } : undefined
          }
        >
          {children}
        </div>

        {!introComplete && intro ? (
          intro.lottieSrc ? (
            <LottieIntro
              src={intro.lottieSrc}
              emblemSrc={intro.emblemSrc}
              onStart={handleIntroStart}
              onReveal={handleIntroReveal}
              onComplete={handleIntroComplete}
            />
          ) : (
            <EnvelopeIntro
              src={intro.src}
              posterSrc={intro.posterSrc}
              emblemSrc={intro.emblemSrc}
              onStart={handleIntroStart}
              onReveal={handleIntroReveal}
              onComplete={handleIntroComplete}
            />
          )
        ) : null}

        {music ? (
          <ThemeMusicControl
            ref={musicControlRef}
            music={music}
            autoplay={musicAutoplay}
            className={cn(
              "transition-opacity duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
              !introComplete && "pointer-events-none",
              revealed ? "opacity-100" : "opacity-0",
            )}
          />
        ) : null}
      </div>
    </ThemeContext.Provider>
  );
}
