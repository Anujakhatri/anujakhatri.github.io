"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@/lib/icons";

/**
 * Standardised "See more / Show less" toggle used by every Showcase
 * panel (Projects, Certificates, Tech Stack). Identical chrome across
 * tabs: same border, padding, icon, label, hover treatment, focus ring,
 * and aria-expanded announcement.
 *
 * Renders nothing when there is nothing to toggle (the caller passes
 * `hasMore` and we only mount the button when there are hidden items).
 */
export function SeeMoreButton({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] px-5 py-2.5 text-sm font-semibold text-[var(--fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
      >
        {expanded ? (
          <>
            <ChevronUpIcon /> Show less
          </>
        ) : (
          <>
            <ChevronDownIcon /> See more
          </>
        )}
      </button>
    </div>
  );
}