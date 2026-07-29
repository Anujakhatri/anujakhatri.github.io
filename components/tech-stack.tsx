"use client";

import { useMemo, useState } from "react";
import { AnimatedSection } from "./animated-section";
import { SeeMoreButton } from "./see-more-button";
import { cn, usePrefersReducedMotion } from "./primitives";
import { techIcon } from "@/lib/icons";
import { FILTER_CATEGORIES, TECH, type TechCategory } from "@/lib/site";

type FilterKey = TechCategory | "all";

/** How many tech items to show before the "See more" toggle appears. */
const INITIAL_VISIBLE = 6;

export function TechStackPanel() {
  const [active, setActive] = useState<FilterKey>("all");
  const [showAll, setShowAll] = useState(false);
  const [prevActive, setPrevActive] = useState<FilterKey>(active);
  const reduced = usePrefersReducedMotion();

  if (prevActive !== active) {
    setPrevActive(active);
    setShowAll(false);
  }

  const filtered = useMemo(
    () => (active === "all" ? TECH : TECH.filter((t) => t.category === active)),
    [active],
  );

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_VISIBLE);
  const hasMore = filtered.length > INITIAL_VISIBLE;

  return (
    <div>
      <div
        className="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter technologies"
      >
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            type="button"
            role="tab"
            aria-selected={active === cat.key}
            onClick={() => setActive(cat.key)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
              active === cat.key
                ? "bg-[var(--primary)] text-[var(--primary-fg)]"
                : "border border-[var(--border)] bg-[var(--card)] text-[var(--muted-fg)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div
        className={cn(
          "mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
          !reduced && "transition-all duration-300",
        )}
        role="tabpanel"
        aria-live="polite"
      >
        {visible.map((tech, index) => (
          <AnimatedSection key={tech.name} delay={50 + index * 60}>
            <div className="group h-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--muted)] text-[var(--primary)]">
                    {techIcon(tech.category)}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-[var(--fg)]">
                    {tech.name}
                  </h3>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-fg)]">
                  {tech.category}
                </span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted-fg)]">
                {tech.blurb}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {hasMore && (
        <SeeMoreButton
          expanded={showAll}
          onToggle={() => setShowAll((v) => !v)}
        />
      )}
    </div>
  );
}