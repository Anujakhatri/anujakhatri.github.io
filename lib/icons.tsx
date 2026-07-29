// Inline SVG icon set — line-style, no emoji. Mirrors codebuddy's icon
// vocabulary so the UI looks consistent. All icons inherit currentColor.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const baseProps: IconProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function CodeIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" {...baseProps} {...props}>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" {...baseProps} {...props}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" {...baseProps} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" {...baseProps} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" {...baseProps} {...props}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="m2 5 10 7 10-7" />
    </svg>
  );
}

export function GitHubIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.13-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.99 10.99 0 0 1 2.86-.39c.97 0 1.95.13 2.86.39 2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.39-5.25 5.67.41.35.79 1.05.79 2.12 0 1.53-.01 2.76-.01 3.14 0 .31.21.67.8.56C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-11.5-11.5z" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.56v-5.6c0-1.34-.02-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.96v5.7H9.31V9h3.42v1.56h.05c.48-.9 1.65-1.86 3.4-1.86 3.63 0 4.3 2.39 4.3 5.5v6.25zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      {...baseProps}
      className={className}
      {...props}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function ExternalIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M16.5 9.4 7.55 4.24" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function FrontendIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" x2="16" y1="21" y2="21" />
      <line x1="12" x2="12" y1="17" y2="21" />
    </svg>
  );
}

export function BackendIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <rect x="2" y="2" width="20" height="8" rx="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  );
}

export function ToolsIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" {...baseProps} {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function ProjectsIcon(props: IconProps) {
  // Three small rectangles — this section's "projects" affordance.
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      {...baseProps}
      {...props}
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

export function CertificateIcon(props: IconProps) {
  // Award ribbon — matches the "Certificates" tab.
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      {...baseProps}
      {...props}
    >
      <circle cx="12" cy="9" r="6" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </svg>
  );
}

export function StackIcon(props: IconProps) {
  // Three stacked layers — Tech Stack tab.
  return (
    <svg
      width={22}
      height={22}
      viewBox="0 0 24 24"
      {...baseProps}
      {...props}
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

// Pick the right tech icon for a category. Keeping this here so the data
// layer stays free of JSX (and stays portable to JSON later if needed).
import type { TechCategory } from "./site";

export function techIcon(category: TechCategory) {
  switch (category) {
    case "frontend":
      return <FrontendIcon />;
    case "backend":
      return <BackendIcon />;
    case "tools":
      return <ToolsIcon />;
  }
}