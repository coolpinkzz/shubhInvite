"use client";

import {
  createContext,
  useMemo,
  type CSSProperties,
  type ReactNode,
} from "react";

import type {
  AnyThemeContentConfig,
  ThemeId,
  ThemeTokenOverrides,
  ThemeTokens,
} from "@/types/theme";
import {
  mergeThemeTokens,
  tokensToCssVars,
} from "@/themes/shared/utils/tokens-to-css-vars";

export interface ThemeContextValue {
  themeId: ThemeId;
  tokens: ThemeTokens;
  config: AnyThemeContentConfig;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  themeId: ThemeId;
  tokens: ThemeTokens;
  config: AnyThemeContentConfig;
  overrides?: ThemeTokenOverrides;
  className?: string;
  children: ReactNode;
}

export function ThemeProvider({
  themeId,
  tokens,
  config,
  overrides,
  className,
  children,
}: ThemeProviderProps) {
  const resolvedTokens = useMemo(
    () => mergeThemeTokens(tokens, overrides),
    [tokens, overrides],
  );

  const cssVars = useMemo(
    () => tokensToCssVars(resolvedTokens),
    [resolvedTokens],
  );

  const contextValue = useMemo(
    () => ({ themeId, tokens: resolvedTokens, config }),
    [themeId, resolvedTokens, config],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <div
        data-theme={themeId}
        className={className}
        style={cssVars as CSSProperties}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
