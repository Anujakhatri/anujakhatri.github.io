"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { SeeMoreButton } from "./see-more-button";
import { CertificateIcon } from "@/lib/icons";
import { CERTIFICATES, type Certificate } from "@/lib/certificates";

/** Shared grid sizing for every Showcase card panel. */
const CARD_GRID = "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

/** Certificates panel shows this many before the "See more" toggle appears. */
const CERTS_INITIAL_VISIBLE = 3;

/**
 * Certificates panel. Empty-state placeholder rendered when CERTIFICATES
 * is empty (the data file is intentionally a fallback hook — drop entries
 * in and they render automatically). When entries exist, render a card
 * grid where each card is a thumbnail-first link to the PDF.
 *
 * Card interaction pattern (matching the reference layout):
 *   - Thumbnail fills the top of the card (object-cover, like Projects)
 *   - On hover: thumbnail dims, "View Certificate" + icon overlay fade in
 *   - The whole card is one link to the PDF (target=_blank)
 *   - Title + issuer + date are visible below the thumbnail at all times
 *     (so the card reads without relying on hover)
 */
export function CertificatesPanel() {
  const [showAll, setShowAll] = useState(false);

  if (CERTIFICATES.length === 0) {
    return (
      <div className="rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--card)] p-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--primary)]">
          <CertificateIcon />
        </div>
        <h3 className="mt-4 font-display text-lg font-semibold text-[var(--fg)]">
          Certificates coming soon
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted-fg)]">
          This tab is reserved for future certifications. Add entries to{" "}
          <code className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-xs font-mono text-[var(--fg)]">
            lib/certificates.ts
          </code>{" "}
          and they&rsquo;ll appear here.
        </p>
      </div>
    );
  }

  const visible = showAll
    ? CERTIFICATES
    : CERTIFICATES.slice(0, CERTS_INITIAL_VISIBLE);
  const hasMore = CERTIFICATES.length > CERTS_INITIAL_VISIBLE;

  return (
    <div>
      <ul className={CARD_GRID}>
        {visible.map((cert, index) => (
          <AnimatedSection key={cert.id} delay={50 + index * 120}>
            <li className="h-full">
              <CertificateCard cert={cert} eager={index < 3} />
            </li>
          </AnimatedSection>
        ))}
      </ul>
      {hasMore && (
        <SeeMoreButton
          expanded={showAll}
          onToggle={() => setShowAll((v) => !v)}
        />
      )}
    </div>
  );
}

/**
 * Single certificate card — a thumbnail-first link to the PDF. Mirrors the
 * Projects card's outer treatment (radius, border, shadow, hover lift) so
 * both grids feel like siblings.
 */
function CertificateCard({ cert, eager }: { cert: Certificate; eager: boolean }) {
  // Pre-format the displayed date (e.g. "Oct 13, 2025") once. The raw ISO
  // stays on the <time dateTime={...}> for parsers.
  const displayDate = new Date(cert.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a
      href={cert.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${cert.title} — ${cert.issuer} — view PDF (opens in new tab)`}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
    >
      <div className="relative h-44 overflow-hidden">
        <Image
          src={cert.thumbnailUrl}
          alt={cert.altText}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {/* Dim layer + overlay. Uses the existing --primary token so the
            hover treatment matches the rest of the site (no purple). */}
        <div
          className="absolute inset-0 bg-[var(--bg)]/60 opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 text-[var(--primary-fg)] opacity-0 transition group-hover:opacity-100"
          aria-hidden="true"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] text-[var(--primary-fg)]">
            <CertificateIcon />
          </span>
          <span className="text-sm font-semibold tracking-wide">
            View Certificate
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--fg)]">{cert.title}</h3>
        <p className="mt-1 text-sm font-medium text-[var(--primary)]">
          {cert.issuer}
        </p>
        <p className="mt-1 text-xs text-[var(--muted-fg)]">
          <time dateTime={cert.date}>{displayDate}</time>
        </p>
      </div>
    </a>
  );
}
