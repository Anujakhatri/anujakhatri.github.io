// Client-side helpers and primitives shared across sections.

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** Tailwind-friendly class joiner. Drops falsy values. */
export function cn(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * `prefers-reduced-motion` as a reactive hook. Uses useSyncExternalStore so
 * the value is computed on the server (false) and on the client (real media
 * query) without needing setState in an effect.
 */
export function usePrefersReducedMotion() {
  const subscribe = useCallback((cb: () => void) => {
    if (typeof window === "undefined") return () => {};
    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    const listener = () => cb();
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);
  const getSnapshot = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

type Theme = "light" | "dark";

const THEME_EVENT = "ak-portfolio:theme-change";

function readCurrentTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  // Read the visitor's explicit preference FIRST so a returning visitor who
  // picked light isn't bounced back to dark on first paint. The .dark class
  // on <html> is the SSR-rendered default — we only fall back to that after
  // confirming there's no stored override.
  try {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // localStorage may be unavailable — fall through to classList.
  }
  if (document.documentElement.classList.contains("dark")) return "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore
  }
  // Notify other components in the same tree (e.g. compact theme toggle in
  // the mobile menu) that the theme has changed, so they re-read.
  window.dispatchEvent(new CustomEvent(THEME_EVENT));
}

const themeStore = {
  subscribe(cb: () => void) {
    if (typeof window === "undefined") return () => {};
    const listener = () => cb();
    window.addEventListener(THEME_EVENT, listener);
    window.addEventListener("storage", listener);
    return () => {
      window.removeEventListener(THEME_EVENT, listener);
      window.removeEventListener("storage", listener);
    };
  },
  getSnapshot: () => readCurrentTheme(),
  getServerSnapshot: () => "dark" as Theme,
};

function useThemeValue(): Theme {
  return useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );
}

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme provider. Wraps the tree in a context that exposes the current
 * theme and a toggle. State is derived from useSyncExternalStore so the
 * external DOM <-> localStorage values are the source of truth — no
 * setState-in-effect needed.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useThemeValue();
  const toggle = useCallback(() => {
    applyTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, toggle }),
    [theme, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return ctx;
}

/**
 * Skip-to-content link. Hidden by default; visible when focused.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only-focusable focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-[var(--radius)] focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-[var(--primary-fg)] focus:outline-none"
    >
      Skip to content
    </a>
  );
}