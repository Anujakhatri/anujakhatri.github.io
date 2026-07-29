import { GitHubIcon, LinkedInIcon, MailIcon } from "@/lib/icons";
import { PROFILE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--card)] px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-[var(--muted-fg)]">
          &copy; {new Date().getFullYear()} {PROFILE.name}. Built with Next.js,
          Tailwind CSS, and attention to detail.
        </p>
        <ul className="flex items-center gap-4" aria-label="Social links">
          <li>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="block rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              className="block rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <MailIcon />
            </a>
          </li>
          <li>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="block rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
            >
              <LinkedInIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}