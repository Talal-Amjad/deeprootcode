import type { IconName } from "@/components/ui/icon";

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Short name used in compact lists (capability strip, footer). */
  shortTitle: string;
  icon: IconName;
  summary: string;
  overview: string;
  capabilities: string[];
  problems: string[];
  deliverables: string[];
  /** Names that match entries in data/technologies.ts. */
  technologies: string[];
  approach: { title: string; description: string }[];
  /** Value pre-selected in the contact form's service field. */
  contactCategory: ContactCategory;
  ctaLabel: string;
};

export type TechnologyCategory = {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  items: string[];
};

export type ProjectCategory =
  | "Web Applications"
  | "AI & Machine Learning"
  | "Automation"
  | "Mobile Applications"
  | "Research & Prototypes";

/** Visual used when a project has no screenshot yet. */
export type ProjectMockupKind = "dashboard" | "chat" | "workflow" | "mobile" | "research";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  /**
   * true for illustrative sample projects. Samples are labelled everywhere they appear.
   * Set to false (or remove the project) once you replace it with real work.
   */
  isSample: boolean;
  featured?: boolean;
  technologies: string[];
  mockup: ProjectMockupKind;
  /** Optional real screenshot in /public/projects. Overrides the generated mockup. */
  image?: { src: string; alt: string; width: number; height: number };
  objectives: string[];
  challenges: string[];
  solution: string;
  implementation: string[];
  liveUrl?: string;
  sourceUrl?: string;
};

export const CONTACT_CATEGORIES = [
  "Web Development",
  "AI & Machine Learning",
  "Automation",
  "Mobile Development",
  "Backend / API Development",
  "Research & Academic Projects",
  "Training & Mentorship",
  "Other",
] as const;

export type ContactCategory = (typeof CONTACT_CATEGORIES)[number];
