import { redirect } from "next/navigation";

/**
 * Index for /showcase — sends the visitor straight to the default tab
 * (/showcase/projects). Under static export, Next emits a meta-refresh
 * HTML file at this path so the redirect works without a server.
 */
export default function ShowcaseIndex(): never {
  redirect("/showcase/projects");
}
