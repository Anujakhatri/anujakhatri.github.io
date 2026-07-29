// Site-wide constants and content. Single source of truth so metadata,
// nav links, footer, contact, and resume sections stay in sync.

export const SITE_URL = "https://anujakhatri.dev";

export const PROFILE = {
  name: "Anuja Khatri",
  title: "Full Stack Developer",
  email: "khatrianuja20@gmail.com",
  github: "https://github.com/Anujakhatri",
  linkedin: "https://linkedin.com/in/anuja-khatri",
  brand: "Anuja.eng",
};

export const HERO = {
  tagline: "Full Stack Developer",
};

export type TechCategory = "frontend" | "backend" | "tools";

export interface TechItem {
  name: string;
  category: TechCategory;
  blurb: string;
}

export const TECH: TechItem[] = [
  // Backend — languages & frameworks
  { name: "Python", category: "backend", blurb: "Primary backend language across APIs, scripting, and ML pipelines." },
  { name: "Django", category: "backend", blurb: "MVC web framework for opinionated, batteries-included backends." },
  { name: "Django REST Framework", category: "backend", blurb: "Production REST APIs with serializers, viewsets, and custom permissions." },
  { name: "FastAPI", category: "backend", blurb: "Async-first Python framework with Pydantic validation and OpenAPI docs." },
  { name: "Node.js", category: "backend", blurb: "Server-side JavaScript for services and tooling." },
  { name: "Express.js", category: "backend", blurb: "Minimal HTTP framework for Node.js APIs." },

  // Backend — data
  { name: "PostgreSQL", category: "backend", blurb: "Primary relational store; query optimization and indexing." },
  { name: "SQL", category: "backend", blurb: "Query optimization, indexing, and schema design." },

  // Backend — auth, security, ML/LLM
  { name: "JWT", category: "backend", blurb: "Stateless token auth for distributed services." },
  { name: "Session Auth", category: "backend", blurb: "Server-side sessions for traditional web apps." },
  { name: "RBAC", category: "backend", blurb: "Role-based access control for multi-tenant APIs." },
  { name: "HTTPS", category: "backend", blurb: "TLS termination and secure transport configuration." },
  { name: "LLM API Integration", category: "backend", blurb: "OpenAI and GroqCloud integrations for AI-powered features." },
  { name: "XGBoost / Random Forest", category: "backend", blurb: "Classification models for prediction and ranking tasks." },
  { name: "Pydantic", category: "backend", blurb: "Strict, typed runtime validation for request/response models." },

  // Tools
  { name: "Docker", category: "tools", blurb: "Containerized local and production environments." },
  { name: "Docker Compose", category: "tools", blurb: "Multi-container orchestration for dev and CI." },
  { name: "GitHub Actions CI/CD", category: "tools", blurb: "Automated test, lint, and deploy pipelines." },
  { name: "Git", category: "tools", blurb: "Version control, branching, and PR workflows." },
  { name: "Postman", category: "tools", blurb: "API exploration, testing, and documentation." },

  // Frontend
  { name: "React", category: "frontend", blurb: "Component-driven UIs with hooks and context." },
  { name: "JavaScript (ES6+)", category: "frontend", blurb: "Modern syntax, async patterns, and module systems." },
  { name: "HTML / CSS", category: "frontend", blurb: "Semantic markup and accessible styling foundations." },
  { name: "Tailwind CSS", category: "frontend", blurb: "Utility-first styling for fast iteration." },
  { name: "Bootstrap", category: "frontend", blurb: "Component library for responsive layouts." },
];

export const FILTER_CATEGORIES: { key: TechCategory | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
];

export interface Project {
  id: number;
  title: string;
  description: string;
  detail: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "BugChetana — AI-Powered Bug Prediction Platform",
    description:
      "AI-powered bug tracking platform that predicts bug severity and type before release and monitors real-time release quality using historical data and code metrics.",
    detail:
      "Trained XGBoost / Random Forest models to classify bugs by severity and type; integrated Groq API (Llama 3) for grounded AI fix suggestions plus a sarcastic “Roast Mode” commentary layer. Implemented multi-role auth (Email/Password, GitHub OAuth, Google OAuth via django-allauth) issuing JWTs, with RBAC across Developer, QA, and Release Manager roles via DRF custom permissions. Built a React dashboard with release quality score, Go/No-Go indicator, quality trend charts, module risk ranking, and per-bug detail views.",
    tags: [
      "Django REST Framework",
      "React",
      "PostgreSQL",
      "Docker",
      "JWT / RBAC",
      "XGBoost",
      "Groq API",
    ],
    liveUrl: "https://bug-chetana-ai.vercel.app",
    repoUrl: "https://github.com/Anujakhatri/BugChetana",
  },
  {
    id: 2,
    title: "Healthcare Claims Investigation API",
    description:
      "REST API that ingests, validates, and manages healthcare insurance claims submitted in bulk via CSV, simulating a real-world hospital claims pipeline.",
    detail:
      "Implemented Pydantic v2 validation for ICD-10 and CPT code formats and service-date rules, returning structured per-upload summaries. Designed JWT-based auth (python-jose, bcrypt) with RBAC distinguishing Admin and Read-Only permissions. Built a compliant audit logging module recording uploader identity, timestamp, and record counts. Containerized with Docker, automated via GitHub Actions CI/CD.",
    tags: ["FastAPI", "SQLAlchemy", "PostgreSQL", "JWT", "Docker", "GitHub Actions"],
    repoUrl:
      "https://github.com/Anujakhatri/ai-integration/tree/main/healthcare_claims_api",
  },
  {
    id: 3,
    title: "LinkedIn Post Generator",
    description:
      "FastAPI backend integrated with LLM APIs for automated, AI-powered professional content generation.",
    detail:
      "FastAPI service that orchestrates LLM API calls to draft LinkedIn posts from user prompts, with Pydantic request/response schemas and async request handling.",
    tags: ["FastAPI", "Pydantic", "LLM API Integration", "Async Python"],
    liveUrl: "https://linkedin-post-generation.streamlit.app/",
    repoUrl: "https://github.com/Anujakhatri/Linkedin-post-generation",
  },
  {
    id: 4,
    title: "email-sender-automation",
    description:
      "Published Python package on PyPI featuring automated email sending, template support, and scheduled delivery.",
    detail:
      "Python package published to PyPI that wraps common email-sending workflows with template rendering and scheduled delivery, distributed as an installable library.",
    tags: ["Python", "PyPI", "Package Development"],
    liveUrl: "https://pypi.org/project/email-sender-automation/",
    repoUrl: "https://github.com/Anujakhatri/email-sender-automation",
  },
  {
    id: 5,
    title: "custom-rate-limiter",
    description:
      "Production-ready Express middleware implementing API rate limiting with a sliding window algorithm and configurable per-client thresholds.",
    detail:
      "Express middleware that enforces per-client API rate limits using a sliding window algorithm, with configurable thresholds and pluggable storage backends.",
    tags: ["Node.js", "Express.js", "API Security", "Sliding Window Algorithm"],
    liveUrl: "https://anujakhatri.github.io/custom-rate-limiter/",
    repoUrl: "https://github.com/Anujakhatri/custom-rate-limiter",
  },
];

export interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

export const EXPERIENCE: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Code Rush",
    period: "Feb 2026 — Present",
    highlights: [
      "Engineered full-stack features for Bugchetana using React and Django / Node.js, part of a public-sector digital transformation initiative.",
      "Designed scalable REST APIs with Django REST Framework, including input validation, error handling, and structured JSON serialization.",
      "Optimized PostgreSQL queries using select_related and indexed lookups, reducing average response time on bug endpoints.",
      "Maintained collaborative Git workflows including feature branching, PR reviews, and merge conflict resolution.",
    ],
  },
  {
    role: "Web Development Intern",
    company: "Nobel Learning PBC",
    period: "Jul 2025 — Nov 2025",
    highlights: [
      "Designed and delivered a chocolate factory management website using HTML, CSS, Bootstrap, and WordPress.",
      "Troubleshot live production infrastructure issues; mentored the next student cohort in web development fundamentals.",
    ],
  },
  {
    role: "Active Contributor, 60-Day Engineering Challenge",
    company: "Leapfrog Technology Inc.",
    period: "May 2025 — Jul 2025",
    highlights: [
      "Built fraud detection and house price prediction models using Python and Scikit-learn.",
    ],
  },
  {
    role: "Operations Lead",
    company: "Code For Change",
    period: "Jan 2023 — Dec 2024",
    highlights: [
      "Led operational workflows for 50+ team members; organized Tech Conclave (400+ attendees) and CodeFest (170+ teams).",
    ],
  },
];

export interface Education {
  degree: string;
  school: string;
  period: string;
}

export const EDUCATION: Education[] = [
  {
    degree: "B.E. Computer Engineering",
    school: "Lumbini Engineering College, Pokhara University",
    period: "Nov 2019 — Nov 2024",
  },
];

export const SKILLS: string[] = [
  "Django REST Framework",
  "FastAPI & Pydantic",
  "JWT Authentication",
  "RBAC",
  "PostgreSQL & SQL Optimization",
  "Docker & CI/CD",
  "ML & LLM API Integration",
  "REST API Design & Versioning",
];