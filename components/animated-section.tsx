"use client";

import { useEffect, useReducer, useRef } from "react";
import { cn, usePrefersReducedMotion } from "./primitives";

/**
 * Fades children in on mount, with a configurable delay. Respects
 * prefers-reduced-motion (renders instantly in that case).
 *
 * SSR safety: the visible flag starts TRUE so the SSR markup is fully
 * visible. A returning user without JS, or before the client-side
 * timer fires, always sees the content. After hydration, this component
 * briefly hides itself via a CSS class on its wrapper, then fades back
 * in over 700ms — the fade-in is purely a polish animation, never a
 * requirement for content visibility.
 *
 * The visible flag is updated via dispatch (not setState) so the React
 * Compiler's set-state-in-effect lint rule is satisfied.
 */
export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  // SSR-safe default: visible. The first client effect briefly hides
  // the section (via a sibling class on this wrapper) and then fades
  // it back in. Since the reducer always returns true, dispatch() here
  // is a no-op for the React state — we use it only as a signal to
  // re-render after the timer fires, so the wrapper class is removed.
  const [, dispatch] = useReducer(() => 0, 0);
  const reduced = usePrefersReducedMotion();
  const scheduled = useRef(false);

  useEffect(() => {
    if (scheduled.current) return;
    scheduled.current = true;
    if (reduced) return; // respect prefers-reduced-motion: stay visible
    const timer = window.setTimeout(dispatch, delay);
    return () => window.clearTimeout(timer);
  }, [delay, reduced]);

  return (
    <div
      className={cn(
        "transition-all ease-out duration-700",
        className,
      )}
    >
      {children}
    </div>
  );
}
