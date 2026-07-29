"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn } from "./primitives";
import {
  CertificateIcon,
  ProjectsIcon,
  StackIcon,
} from "@/lib/icons";

interface TabDef {
  href: string;
  label: string;
  icon: ReactNode;
}

const TABS: TabDef[] = [
  { href: "/showcase/projects", label: "Projects", icon: <ProjectsIcon /> },
  { href: "/showcase/certificates", label: "Certificates", icon: <CertificateIcon /> },
  { href: "/showcase/tech-stack", label: "Tech Stack", icon: <StackIcon /> },
];

/** Normalize so trailing-slash variants match the canonical form. */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/**
 * Showcase sub-section tabs. Real <Link>s (not buttons + router.push) so
 * right-click "open in new tab", middle-click, and browser back/forward
 * all just work, and the URLs are crawlable. Active state derives from
 * usePathname() against each tab's href.
 *
 * Note: the previous hash-based tablist used WAI-ARIA tabs keyboard
 * navigation (←/→/Home/End). With tabs as real links that's no longer
 * the right pattern; the links themselves stay keyboard-focusable via
 * Tab.
 */
export function ShowcaseTabs() {
  const pathname = usePathname();
  const current = normalize(pathname);

  return (
    <div
      role="tablist"
      aria-label="Showcase sections"
      className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3"
    >
      {TABS.map((tab) => {
        const isActive = current === normalize(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "flex flex-col items-center justify-center gap-2 rounded-[var(--radius)] border px-4 py-5 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2",
              isActive
                ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-fg)] shadow-sm"
                : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-fg)] hover:border-[var(--primary)] hover:text-[var(--primary)]",
            )}
          >
            <span aria-hidden="true">{tab.icon}</span>
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
