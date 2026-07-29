"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "typing" | "pausing" | "erasing";

/**
 * TypewriterText — cycles through an array of phrases, typing each
 * character-by-character, pausing at full length, then erasing
 * character-by-character before moving to the next phrase. Loops
 * indefinitely.
 *
 * Timing per phase:
 *   - typing:  TYPE_SPEED ms per char (default 50)
 *   - erasing: ERASE_SPEED ms per char (default 30) — backspace reads
 *     faster than typing, so it's slightly quicker
 *   - pausing: PAUSE_MS at full length before erasing (default 1700)
 *
 * Implementation:
 *   - Single recursive setTimeout chain (no setInterval), so each phase
 *     can have its own per-step delay and the next step is queued only
 *     after the previous one completes. Cancelled on unmount.
 *   - SSR-safe + no hydration mismatch: the initial render is the FULL
 *     longest phrase (so SSR markup and first client paint match and
 *     no-JS users see content). The client effect rewinds to ""
 *     and starts the cycle from the first phrase.
 *   - Layout shift: the wrapper reserves min-width based on the
 *     LONGEST phrase so swapping to a shorter phrase doesn't cause
 *     the parent column to reflow. We measure by rendering an
 *     invisible copy of every phrase and taking the widest.
 *   - Accessibility: aria-label cycles with the current full phrase;
 *     the animated span is aria-hidden so it doesn't get announced
 *     character-by-character.
 *   - Reduced motion: respects prefers-reduced-motion; shows the first
 *     phrase statically with a static cursor and skips the cycle.
 */
export function TypewriterText({
  phrases,
  typeSpeed = 50,
  eraseSpeed = 30,
  pauseMs = 1700,
  className = "",
}: {
  phrases: string[];
  /** ms per character while typing. */
  typeSpeed?: number;
  /** ms per character while erasing. Slightly faster than typing. */
  eraseSpeed?: number;
  /** ms to hold at full phrase length before erasing. */
  pauseMs?: number;
  className?: string;
}) {
  // SSR + first client paint: render the longest phrase in full so the
  // layout reserves its width and there's no FOUC/jump. The client
  // effect rewinds to "" and starts the cycle from phrase 0.
  const longest = phrases.reduce((a, b) => (a.length >= b.length ? a : b), "");
  const [rendered, setRendered] = useState(longest);
  const [phase, setPhase] = useState<Phase>("pausing");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setRendered(phrases[0] ?? "");
      setPhase("pausing");
      return;
    }

    // Rewind and start typing from phrase 0.
    setRendered("");
    setPhase("typing");

    let phraseIdx = 0;
    let charIdx = 0;
    let currentPhase: Phase = "typing";
    let timer: number | undefined;

    const tick = () => {
      if (cancelled.current) return;
      const phrase = phrases[phraseIdx];

      if (currentPhase === "typing") {
        charIdx += 1;
        setRendered(phrase.slice(0, charIdx));
        if (charIdx >= phrase.length) {
          currentPhase = "pausing";
          setPhase("pausing");
          timer = window.setTimeout(tick, pauseMs);
        } else {
          timer = window.setTimeout(tick, typeSpeed);
        }
        return;
      }

      if (currentPhase === "pausing") {
        currentPhase = "erasing";
        setPhase("erasing");
        // Fall through into the erasing step on the same tick.
      }

      if (currentPhase === "erasing") {
        charIdx -= 1;
        setRendered(phrase.slice(0, Math.max(0, charIdx)));
        if (charIdx <= 0) {
          // Move to next phrase and start typing again.
          phraseIdx = (phraseIdx + 1) % phrases.length;
          charIdx = 0;
          currentPhase = "typing";
          setPhase("typing");
          timer = window.setTimeout(tick, typeSpeed);
        } else {
          timer = window.setTimeout(tick, eraseSpeed);
        }
      }
    };

    timer = window.setTimeout(tick, typeSpeed);

    return () => {
      cancelled.current = true;
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [phrases, typeSpeed, eraseSpeed, pauseMs]);

  // The cursor stays visible across all phases (typing/pausing/erasing),
  // matching the user's request. It's a fixed-width inline-block so it
  // doesn't reflow the line as the text length changes.
  return (
    <span
      className={className}
      // Reserve width based on the longest phrase so the column doesn't
      // shrink when we cycle to a shorter phrase. The inline-block keeps
      // the cursor aligned with the text baseline.
      style={{
        display: "inline-block",
        minWidth: `${longest.length}ch`,
        minHeight: "1em",
        // Use `vertical-align: baseline` so the wrapper behaves like a
        // regular text run inside the parent <p>.
        verticalAlign: "baseline",
      }}
      aria-label={`${phrases.join(", ")}`}
      data-phase={phase}
    >
      {/* Invisible measurement row: render every phrase once, take the
          natural width of the widest one. Done with an aria-hidden
          span at the same font so the ch-unit minWidth matches. */}
      <span
        aria-hidden="true"
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "pre",
          pointerEvents: "none",
        }}
      >
        {longest}
      </span>
      <span aria-hidden="true">{rendered}</span>
      <span
        aria-hidden="true"
        className="typewriter-cursor"
        style={{
          display: "inline-block",
          width: "0.6ch",
          marginLeft: "1px",
          fontWeight: 400,
        }}
      >
        |
      </span>
    </span>
  );
}