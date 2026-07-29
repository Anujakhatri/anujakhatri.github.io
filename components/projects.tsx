"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedSection } from "./animated-section";
import { SeeMoreButton } from "./see-more-button";
import { cn } from "./primitives";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  ExternalIcon,
  GitHubIcon,
  PackageIcon,
} from "@/lib/icons";
import type { Project } from "@/lib/site";

// Real project screenshots. Filenames are kebab-case to match the existing
// public/projects/ naming convention; extensions flipped from .svg (placeholder
// mocks) to .png (real screenshots).
const PROJECT_IMAGES: Record<number, { src: string; alt: string }> = {
  1: {
    src: "/projects/bugchetanaa.png",
    alt: "Screenshot of the BugChetana dashboard showing release quality score, Go/No-Go indicator, and module risk ranking",
  },
  2: {
    src: "/projects/healthcare-claims-api.png",
    alt: "Screenshot of the Healthcare Claims Investigation API upload summary view, showing validated ICD-10 and CPT code counts",
  },
  3: {
    src: "/projects/linkedin-generator-post.png",
    alt: "Screenshot of the LinkedIn Post Generator UI with a generated post draft and prompt input",
  },
  4: {
    src: "/projects/email-sender-automation.png",
    alt: "Screenshot of the email-sender-automation Python package interface and template rendering output",
  },
  5: {
    src: "/projects/custom-rate-limitor.png",
    alt: "Screenshot of the custom-rate-limiter middleware configuration panel showing per-client thresholds and sliding-window metrics",
  },
};

/** How many projects to show before the "See more" toggle appears. */
const INITIAL_VISIBLE = 3;

/**
 * Projects panel content. Designed to render inside the Showcase tab
 * container — no <section> wrapper, no heading, no muted background. The
 * Showcase owns those. Shows the first 3 cards initially; a "See more"
 * toggle reveals the remaining cards when there are more than 3.
 *
 * Card structure (collapsed):
 *   [image]                  ← clickable area; expands the card
 *   [title + short desc]     ← clickable area; expands the card
 *   [Live Demo | Details]    ← Live Demo is a real <a> link; Details is
 *                              the expand toggle. Two siblings, never nested.
 *
 * Card structure (expanded — behind Details):
 *   [long detail paragraph]
 *   [tech tag badges]
 *   [Source link]            ← moves into expanded state so the collapsed
 *                              face stays compact
 */
export function ProjectsPanel({ projects }: { projects: Project[] }) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? projects : projects.slice(0, INITIAL_VISIBLE);
  const hasMore = projects.length > INITIAL_VISIBLE;

  return (
    <div>
      <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => {
          const isExpanded = expandedId === project.id;
          const controlsId = `project-content-${project.id}`;
          const image = PROJECT_IMAGES[project.id];

          return (
            <AnimatedSection key={project.id} delay={50 + index * 120}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md focus-within:ring-2 focus-within:ring-[var(--primary)]">
                {/* Image — clickable to expand (focus ring stays on the
                    article via focus-within above). */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  aria-expanded={isExpanded}
                  aria-controls={controlsId}
                  className="block w-full text-left focus:outline-none"
                >
                  <div className="relative h-44 overflow-hidden bg-[var(--muted)]">
                    {image && (
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        loading={index < 3 ? "eager" : "lazy"}
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </button>

                {/* Title + short description — also clickable to expand,
                    so the entire upper card body is the expand target. */}
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : project.id)}
                  aria-expanded={isExpanded}
                  aria-controls={controlsId}
                  className="block w-full px-5 pt-5 text-left focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-[var(--fg)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-fg)]">
                    {project.description}
                  </p>
                </button>

                {/* Footer actions — Live Demo (real link) + Details (expand
                    toggle). Siblings, not nested, so each click only does
                    its own thing. */}
                <div className="flex items-center justify-between gap-3 px-5 pb-5 pt-4">
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} — ${project.id === 4 ? "View on PyPI" : "Live demo"} (opens in new tab)`}
                      className="group/live inline-flex items-center gap-1.5 rounded-[4px] text-sm font-semibold text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    >
                      <span className="relative">
                        {project.id === 4 ? "View on PyPI" : "Live Demo"}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover/live:scale-x-100 group-focus-visible/live:scale-x-100"
                        />
                      </span>
                      {project.id === 4 ? (
                        <PackageIcon className="transition-transform duration-300 ease-out group-hover/live:translate-x-0.5 group-focus-visible/live:translate-x-0.5" />
                      ) : (
                        <ExternalIcon className="transition-transform duration-300 ease-out group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 group-focus-visible/live:translate-x-0.5 group-focus-visible/live:-translate-y-0.5" />
                      )}
                    </a>
                  ) : (
                    // No live URL — keep the footer balanced by leaving an
                    // empty slot. aria-hidden so it doesn't confuse AT.
                    <span aria-hidden="true" />
                  )}
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    aria-expanded={isExpanded}
                    aria-controls={controlsId}
                    className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] px-3.5 py-1.5 text-sm font-semibold text-[var(--fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                  >
                    Details
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-flex transition-transform duration-300 ease-out",
                        isExpanded && "rotate-90",
                      )}
                    >
                      <ChevronRightIcon />
                    </span>
                  </button>
                </div>

                {/* Expanded panel — long detail, tech tags, Source link. */}
                <div
                  id={controlsId}
                  className={cn(
                    "grid transition-all ease-out duration-300",
                    isExpanded
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-[var(--border)] px-5 pb-5 pt-4">
                      <p className="text-sm leading-relaxed text-[var(--muted-fg)]">
                        {project.detail}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-semibold text-[var(--primary)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.repoUrl && (
                        <div className="mt-4">
                          <a
                            href={project.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} — Source on GitHub (opens in new tab)`}
                            className="group/repo inline-flex items-center gap-1.5 rounded-[4px] text-sm font-semibold text-[var(--muted-fg)] hover:text-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                          >
                            <span className="relative">
                              Source
                              <span
                                aria-hidden="true"
                                className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover/repo:scale-x-100 group-focus-visible/repo:scale-x-100"
                              />
                            </span>
                            <GitHubIcon className="transition-transform duration-300 ease-out group-hover/repo:translate-x-0.5 group-focus-visible/repo:translate-x-0.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          );
        })}
      </div>

      {hasMore && <SeeMoreButton expanded={showAll} onToggle={() => setShowAll((v) => !v)} />}
    </div>
  );
}