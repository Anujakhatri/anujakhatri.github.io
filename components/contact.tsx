"use client";

import { useId, useState } from "react";
import { AnimatedSection } from "./animated-section";
import { MailIcon } from "@/lib/icons";
import { PROFILE } from "@/lib/site";


export function Contact() {
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `Portfolio contact from ${name || "a visitor"}`;
    const body = `From: ${name} <${email}>\n\n${message}`;
    const href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="bg-[var(--muted)] px-6 py-20 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <AnimatedSection delay={100}>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2
                id="contact-title"
                className="text-3xl font-bold tracking-tight text-[var(--fg)] md:text-4xl"
              >
                Let&rsquo;s work together
              </h2>
              <p className="mt-4 text-[var(--muted-fg)]">
                Have a project, role, or idea in mind? Reach out — I respond
                within a few days.
              </p>
              <ul
                className="mt-6 space-y-3"
                aria-label="Contact links"
              >
                <li>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="flex items-center gap-3 rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    <MailIcon /> {PROFILE.email}
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    github.com/Anujakhatri
                  </a>
                </li>
                <li>
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[4px] text-[var(--muted-fg)] transition hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                  >
                    linkedin.com/in/anuja-khatri
                  </a>
                </li>
              </ul>
            </div>

            <AnimatedSection delay={200}>
              <form
                onSubmit={onSubmit}
                className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm md:p-8"
                aria-describedby="contact-form-note"
              >
                <p
                  id="contact-form-note"
                  className="mb-4 text-xs text-[var(--muted-fg)]"
                >
                  Submitting opens your mail client — submission isn&rsquo;t
                  wired to a backend yet.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={nameId}
                      className="mb-1 block text-sm font-semibold text-[var(--fg)]"
                    >
                      Name
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={emailId}
                      className="mb-1 block text-sm font-semibold text-[var(--fg)]"
                    >
                      Email
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      placeholder="youremail@gmail.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={messageId}
                      className="mb-1 block text-sm font-semibold text-[var(--fg)]"
                    >
                      Message
                    </label>
                    <textarea
                      id={messageId}
                      name="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full resize-none rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg)] px-4 py-2.5 text-sm text-[var(--fg)] placeholder:text-[var(--muted-fg)] focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-[var(--primary-fg)] transition hover:bg-[var(--accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2"
                  >
                    <MailIcon />
                    Send via email
                  </button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}