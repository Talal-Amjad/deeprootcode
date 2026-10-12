import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ProjectCategory[] = [
  "Web Applications",
  "AI & Machine Learning",
  "Automation",
  "Mobile Applications",
  "Research & Prototypes",
];

/**
 * ⚠️ SAMPLE CONTENT
 * Every project below is an illustrative example showing the kind of work we do.
 * None of them represent a completed client engagement. They are labelled "Sample project" on the site.
 *
 * To publish real work: replace an entry, set `isSample: false`, add a screenshot to /public/projects
 * via `image`, and add `liveUrl` / `sourceUrl` where they are public.
 */
export const projects: Project[] = [
  {
    slug: "operations-dashboard",
    title: "Operations Dashboard for a Logistics Team",
    category: "Web Applications",
    summary:
      "A role-based web app that replaces shared spreadsheets with live shipment tracking, task assignment and weekly reporting.",
    isSample: true,
    featured: true,
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Node.js"],
    mockup: "dashboard",
    objectives: [
      "Give dispatchers a single, real-time view of active shipments.",
      "Replace manual spreadsheet updates with structured data entry and validation.",
      "Produce weekly operational reports without manual assembly.",
    ],
    challenges: [
      "Several teams needed different views and permissions on the same data.",
      "Historic data in spreadsheets was inconsistent and needed cleaning before import.",
      "The interface had to stay fast with thousands of rows on screen.",
    ],
    solution:
      "A Next.js application with role-based access, a normalised PostgreSQL schema and server-rendered tables with filtering, saved views and CSV export. A scheduled job compiles the weekly report automatically.",
    implementation: [
      "Designed a relational schema for shipments, routes, assignees and status history.",
      "Built import scripts that clean and validate legacy spreadsheet data.",
      "Implemented role-based permissions enforced on the server for every query.",
      "Used virtualised tables and paginated queries to keep large views responsive.",
      "Added a scheduled reporting job that emails a summary each Monday.",
    ],
  },
  {
    slug: "policy-knowledge-assistant",
    title: "Policy Knowledge Assistant (RAG)",
    category: "AI & Machine Learning",
    summary:
      "An internal assistant that answers staff questions from company policies and procedures, with citations to the source documents.",
    isSample: true,
    featured: true,
    technologies: ["Python", "FastAPI", "LLM APIs", "Vector databases", "React"],
    mockup: "chat",
    objectives: [
      "Help staff find accurate answers in a large set of internal documents.",
      "Show the source of every answer so it can be verified.",
      "Keep sensitive documents restricted to the right groups.",
    ],
    challenges: [
      "Documents came in mixed formats, including scanned PDFs.",
      "Answers had to stay grounded in the documents rather than general model knowledge.",
      "Access control needed to apply to retrieval, not just the user interface.",
    ],
    solution:
      "A retrieval-augmented generation pipeline: documents are parsed, chunked and embedded; queries retrieve permitted passages only, and the model answers with inline citations. When the documents don't contain an answer, the assistant says so.",
    implementation: [
      "Built an ingestion pipeline with OCR for scanned files and structure-aware chunking.",
      "Stored embeddings with per-document access metadata to filter retrieval by user group.",
      "Created an evaluation set of real questions to measure answer accuracy and citation quality.",
      "Added a feedback button so incorrect answers can be reviewed and fixed at the source.",
    ],
  },
  {
    slug: "invoice-processing-automation",
    title: "Invoice Processing Automation",
    category: "Automation",
    summary:
      "A workflow that extracts invoice data from email attachments, validates it and posts approved entries to an accounting system.",
    isSample: true,
    featured: true,
    technologies: ["Python", "LLM APIs", "REST APIs", "PostgreSQL", "Redis"],
    mockup: "workflow",
    objectives: [
      "Remove manual re-typing of invoice details into accounting software.",
      "Flag duplicates and mismatched amounts before they are posted.",
      "Keep a clear audit trail of every automated step.",
    ],
    challenges: [
      "Invoices arrived in many layouts from different suppliers.",
      "Errors in financial data are costly, so uncertain extractions needed human review.",
    ],
    solution:
      "An automated pipeline that watches a shared inbox, extracts structured fields with an AI-assisted parser, checks them against purchase orders and routes low-confidence results to a review queue before posting.",
    implementation: [
      "Connected to the mailbox and accounting system through their official APIs.",
      "Combined rule-based checks with model-based extraction and confidence scoring.",
      "Built a lightweight review screen for flagged invoices.",
      "Logged each step with retry handling and alerts for failures.",
    ],
  },
  {
    slug: "field-inspection-app",
    title: "Field Inspection Mobile App",
    category: "Mobile Applications",
    summary:
      "A cross-platform app for inspectors to complete checklists, capture photos and sync reports — even with poor connectivity.",
    isSample: true,
    technologies: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    mockup: "mobile",
    objectives: [
      "Replace paper checklists with structured digital inspections.",
      "Work reliably in locations with limited mobile signal.",
      "Deliver completed reports to the office immediately after sync.",
    ],
    challenges: [
      "Inspections often happen offline, so data had to be stored safely on the device.",
      "Photos needed compressing without losing important detail.",
    ],
    solution:
      "A React Native app with offline-first storage and background sync, configurable checklist templates and automatic PDF report generation on the server.",
    implementation: [
      "Implemented a local queue that syncs inspections when a connection returns.",
      "Built checklist templates that office staff can edit without an app update.",
      "Generated branded PDF reports on the backend after each sync.",
    ],
  },
  {
    slug: "reproducible-nlp-experiments",
    title: "Reproducible NLP Experiment Pipeline",
    category: "Research & Prototypes",
    summary:
      "A research toolkit for running, tracking and comparing text classification experiments across datasets and model configurations.",
    isSample: true,
    technologies: ["Python", "PyTorch", "scikit-learn", "Jupyter"],
    mockup: "research",
    objectives: [
      "Make experiments easy to re-run with identical results.",
      "Compare baselines and new approaches under the same conditions.",
      "Keep the researcher in full control of the methodology and analysis.",
    ],
    challenges: [
      "Earlier experiments were spread across notebooks with undocumented settings.",
      "Datasets required consistent preprocessing and train/test splits.",
    ],
    solution:
      "A configuration-driven pipeline where each experiment is defined by a versioned config file, with fixed seeds, logged metrics and standard baselines for comparison.",
    implementation: [
      "Refactored notebook code into a tested, modular Python package.",
      "Added dataset preprocessing scripts with documented, deterministic splits.",
      "Logged metrics and configuration for every run to support later analysis.",
      "Wrote a walkthrough so the researcher could extend the pipeline independently.",
    ],
  },
  {
    slug: "mentorship-learning-platform",
    title: "Mentorship & Learning Platform",
    category: "Web Applications",
    summary:
      "A platform where learners book sessions, track progress through projects and receive structured code-review feedback.",
    isSample: true,
    technologies: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js"],
    mockup: "dashboard",
    objectives: [
      "Let learners book sessions and see their learning plan in one place.",
      "Give mentors a simple way to leave structured feedback on submissions.",
    ],
    challenges: [
      "Scheduling across time zones needed to be clear for both sides.",
      "Feedback had to be easy to write and easy to act on.",
    ],
    solution:
      "A MERN application with time-zone-aware booking, project milestones and a review workflow that links feedback directly to lines of submitted code.",
    implementation: [
      "Modelled learners, mentors, sessions and milestones in MongoDB.",
      "Built a booking flow that stores times in UTC and displays them locally.",
      "Created a review interface with inline comments and a resubmission loop.",
    ],
  },
];

/** Service page each project category links to (internal linking between portfolio and services). */
export const serviceForCategory: Record<ProjectCategory, string> = {
  "Web Applications": "web-development",
  "AI & Machine Learning": "ai-machine-learning",
  Automation: "business-process-automation",
  "Mobile Applications": "mobile-app-development",
  "Research & Prototypes": "research-development",
};

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);
