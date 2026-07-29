"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CodeIcon, MenuIcon, CloseIcon, SunIcon, MoonIcon } from "@/lib/icons";
import { PROFILE } from "@/lib/site";
import { useTheme } from "./primitives";

interface NavItem {
  label: string;
  /** Path-only href, e.g. "/showcase". */
  href: string;
  /** When true, this item is "active" for the exact href AND any nested
   *  route underneath it (e.g. /showcase matches /showcase/projects). */
  matchNested?: boolean;
}

const NAV_ITEMS: ReadonlyArray<NavItem> = [
  { label: "Home", href: "/" },
  { label: "Showcase", href: "/showcase", matchNested: true },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Normalize so trailing-slash variants match the canonical form. */
function normalize(path: string): string {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path;
}

/** An item is active when the current pathname equals its href (after
 *  normalizing for trailing slashes), or when matchNested is true and the
 *  pathname starts with the href followed by a `/`. */
function isActive(item: NavItem, pathname: string): boolean {
  const path = normalize(pathname);
  const href = normalize(item.href);
  if (path === href) return true;
  if (item.matchNested) return path.startsWith(`${href}/`);
  return false;
}

export function Navbar() {
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--card)]/80 px-6 py-4 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link
          href="/"
          aria-label={`${PROFILE.name} — home`}
          className="flex items-center gap-2 rounded-[var(--radius)] text-lg font-bold text-[var(--fg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-fg)]">
            <CodeIcon />
          </span>
          {PROFILE.brand}
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Primary navigation"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item, pathname);
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-[var(--radius)] text-sm font-semibold text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                    : "rounded-[var(--radius)] text-sm font-medium text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                }
              >
                {item.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] text-[var(--muted-fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] text-[var(--muted-fg)] transition hover:border-[var(--primary)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius)] border border-[var(--border)] text-[var(--fg)] transition hover:border-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className="mx-auto mt-4 max-w-5xl rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-4 shadow-lg md:hidden"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item, pathname);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={
                      active
                        ? "block rounded-[var(--radius)] bg-[var(--muted)] px-3 py-2 text-sm font-semibold text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                        : "block rounded-[var(--radius)] px-3 py-2 text-sm font-medium text-[var(--muted-fg)] transition hover:bg-[var(--muted)] hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    }
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
