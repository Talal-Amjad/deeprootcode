import type { IconName } from "@/components/ui/icon";

type Item = { title: string; description: string; icon?: IconName };

/** Home: compact capability strip. */
export const capabilityAreas = [
  "Web & SaaS Development",
  "AI Solutions",
  "Intelligent Automation",
  "Mobile Applications",
  "Research & Development",
];

/** Home: "Why choose us" — working principles, not claims. */
export const principles: Item[] = [
  {
    title: "Strong Engineering Foundations",
    description:
      "Clear architecture, sensible data models and tested code — the parts users never see but always feel.",
    icon: "layers",
  },
  {
    title: "Practical Problem Solving",
    description: "We start from the problem you need solved, then choose the simplest approach that solves it well.",
    icon: "puzzle",
  },
  {
    title: "Maintainable & Scalable Code",
    description: "Readable, documented code that your team — or any developer — can understand and extend later.",
    icon: "branch",
  },
  {
    title: "Clear Communication",
    description: "Plain-language updates, honest estimates and early warnings when something changes.",
    icon: "messages",
  },
  {
    title: "Tailored Solutions",
    description: "No forced templates. Scope, stack and process are shaped around your goals and constraints.",
    icon: "target",
  },
  {
    title: "Continuous Learning",
    description: "We keep studying new tools and techniques, and adopt them only when they genuinely help.",
    icon: "lightbulb",
  },
];

/** Home + services: how we work. */
export const processSteps: Item[] = [
  { title: "Discover", description: "Understand the problem, the people involved and the requirements.", icon: "compass" },
  { title: "Plan", description: "Define scope, architecture and milestones you can track.", icon: "branch" },
  { title: "Build", description: "Develop the solution in reviewed, working increments.", icon: "hammer" },
  { title: "Validate", description: "Test functionality, quality and usability before release.", icon: "test" },
  { title: "Launch", description: "Deploy and prepare the solution for real-world use.", icon: "rocket" },
  { title: "Improve", description: "Support future improvements and scaling where agreed.", icon: "refresh" },
];

/** Research & Learning page + home section. */
export const researchOfferings: (Item & { id: string; audience: "research" | "learning" })[] = [
  {
    id: "research-implementation",
    title: "Research implementation support",
    description:
      "Turn a research design into working, well-documented code — from algorithms and simulations to data pipelines.",
    icon: "microscope",
    audience: "research",
  },
  {
    id: "ai-ml-projects",
    title: "AI/ML project development",
    description:
      "Model training, evaluation and integration for AI and machine learning projects, with reproducible experiment setups.",
    icon: "cpu",
    audience: "research",
  },
  {
    id: "prototypes-experiments",
    title: "Research prototypes & experiments",
    description:
      "Prototypes, experiment harnesses and research tools that let you test ideas quickly and present them clearly.",
    icon: "flask",
    audience: "research",
  },
  {
    id: "masters-phd",
    title: "Master's & PhD technical collaboration",
    description:
      "Technical collaboration on implementation and experimentation, with clear boundaries: your research, your analysis, your authorship.",
    icon: "graduation",
    audience: "research",
  },
  {
    id: "academic-projects",
    title: "Semester & final-year projects",
    description:
      "Mentoring through planning, architecture and implementation so you can build — and explain — your own project.",
    icon: "book",
    audience: "learning",
  },
  {
    id: "mentorship",
    title: "Programming mentorship",
    description: "Ongoing guidance from an experienced developer as you grow from fundamentals to real-world projects.",
    icon: "messages",
    audience: "learning",
  },
  {
    id: "learning-sessions",
    title: "Personalised learning sessions",
    description:
      "One-to-one sessions in web development, backend engineering, AI or automation, shaped around your goals.",
    icon: "presentation",
    audience: "learning",
  },
  {
    id: "code-review",
    title: "Code review & debugging",
    description: "Detailed reviews and live debugging sessions that explain not just the fix, but why it works.",
    icon: "bug",
    audience: "learning",
  },
];

export const integrityStatement =
  "Our research and academic services focus on technical collaboration, implementation, experimentation and mentoring. We don't write theses or papers on anyone's behalf, fabricate results, or produce work intended to be submitted dishonestly. We're happy to work within your institution's policies and to support appropriate disclosure of the help you receive.";

/** About page: core values. */
export const coreValues: Item[] = [
  {
    title: "Integrity",
    description: "We are honest about what we know, what we've built and what a project will realistically take.",
    icon: "shield",
  },
  {
    title: "Craft",
    description: "We care about the details — naming, structure, edge cases — because they decide how software ages.",
    icon: "hammer",
  },
  {
    title: "Clarity",
    description: "Simple explanations, clear documentation and code that reads well.",
    icon: "lightbulb",
  },
  {
    title: "Collaboration",
    description: "We work with you, not just for you, and share knowledge along the way.",
    icon: "network",
  },
];

export const clientTypes: Item[] = [
  {
    title: "Businesses",
    description: "Teams that need a new product, a better internal tool or fewer manual processes.",
    icon: "layers",
  },
  {
    title: "Startups & founders",
    description: "Early-stage teams turning an idea into a first version they can test with real users.",
    icon: "rocket",
  },
  {
    title: "Researchers",
    description: "Master's students, PhD candidates and research groups who need dependable implementation.",
    icon: "microscope",
  },
  {
    title: "Students & learners",
    description: "People building their skills, working on projects or preparing for technical roles.",
    icon: "graduation",
  },
];

/** Contact form select options. Edit freely; validation reads from these lists. */
export const budgetOptions = [
  "Not sure yet",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible / exploring",
] as const;

export const inquiryTypes = [
  "Research implementation",
  "AI/ML research project",
  "Master's / PhD collaboration",
  "Semester or final-year project",
  "One-to-one learning sessions",
  "Code review & debugging",
] as const;

/** General questions shown on the contact page (with FAQ structured data). Review answers before launch. */
export const generalFaqs = [
  {
    question: "How much does a software project cost?",
    answer:
      "It depends on scope, complexity and timeline. After understanding your requirements we suggest an approach and give a clear estimate. For uncertain ideas, a small discovery phase or prototype is often the most cost-effective first step.",
  },
  {
    question: "How long does it take to build a website or application?",
    answer:
      "A focused website or prototype can take a few weeks; larger web, mobile or AI products are usually delivered in stages over several months. We agree milestones up front so you can see working software early.",
  },
  {
    question: "Do you work with clients internationally?",
    answer:
      "Yes. We work remotely with clients in different countries and time zones, using clear written communication, regular updates and scheduled calls.",
  },
  {
    question: "Who owns the code you write?",
    answer:
      "Ownership is set out in our agreement with you. For client projects, our standard approach is that you own the code and deliverables once the work is paid for, with repositories and documentation handed over.",
  },
  {
    question: "Can we sign an NDA before sharing project details?",
    answer:
      "Yes. If your idea or data is sensitive, tell us in your first message and we can agree a non-disclosure agreement before you share specifics.",
  },
  {
    question: "Do you offer support after launch?",
    answer:
      "Yes, where agreed. We can provide maintenance, monitoring, bug fixes and new features after launch, or hand the project over to your own team with documentation.",
  },
];
