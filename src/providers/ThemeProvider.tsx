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
import { EnvelopeIntro } from "@/themes/shared/components/EnvelopeIntro";
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

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
    setIntroMusicReady(true);
  }, []);

  useEffect(() => {
    if (!intro) return;

    const skipOnReducedMotion = intro.skipOnReducedMotion ?? true;
    if (!skipOnReducedMotion) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      setIntroComplete(true);
      setIntroMusicReady(true);
      return;
    }

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
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
          className={introComplete ? undefined : "pointer-events-none invisible"}
        >
          {children}
        </div>

        {!introComplete && intro ? (
          <EnvelopeIntro
            src={intro.src}
            emblemSrc={intro.emblemSrc}
            onStart={handleIntroStart}
            onComplete={handleIntroComplete}
          />
        ) : null}

        {music ? (
          <ThemeMusicControl
            ref={musicControlRef}
            music={music}
            autoplay={musicAutoplay}
            className={introComplete ? undefined : "pointer-events-none opacity-0"}
          />
        ) : null}
      </div>
    </ThemeContext.Provider>
  );
}
