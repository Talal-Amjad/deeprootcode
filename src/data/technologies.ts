import type { TechnologyCategory } from "@/types";

/**
 * Technologies we work with, grouped for the technology section.
 * These describe capabilities, not certifications. Add a category or item here and it appears site-wide.
 */
export const technologyCategories: TechnologyCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "layers",
    description: "Interfaces that are fast, accessible and pleasant to use.",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5 & CSS3", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "server",
    description: "APIs and services with clear structure and solid foundations.",
    items: ["Ruby on Rails", "Django", "FastAPI", "Node.js", "Express.js"],
  },
  {
    id: "full-stack",
    title: "Full Stack",
    icon: "code",
    description: "End-to-end JavaScript applications on a single, cohesive stack.",
    items: ["MERN Stack", "MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    icon: "cpu",
    description: "From LLM features to custom models and data pipelines.",
    items: ["Python", "PyTorch", "scikit-learn", "LLM APIs", "Vector databases", "Jupyter", "Data processing", "Model integration"],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "smartphone",
    description: "One codebase, native-feeling apps on Android and iOS.",
    items: ["React Native", "Cross-platform development"],
  },
  {
    id: "data-infra",
    title: "Databases & Infrastructure",
    icon: "database",
    description: "Data storage, delivery and deployment you can rely on.",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "REST APIs", "Cloud deployment", "CI/CD"],
  },
];
