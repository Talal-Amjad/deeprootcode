import { siteConfig } from "@/config/site";
import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { technologyCategories } from "@/data/technologies";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/** /llms.txt — a plain-text site summary for AI assistants and answer engines (https://llmstxt.org). */
export function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.description}`,
    "",
    "## Services",
    ...services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`),
    "",
    "## Technologies",
    ...technologyCategories.map((c) => `- ${c.title}: ${c.items.join(", ")}`),
    "",
    "## Pages",
    `- [Projects](${absoluteUrl("/projects")}): ${
      projects.some((p) => p.isSample) ? "Portfolio, including illustrative sample projects (clearly labelled)." : "Portfolio and case studies."
    }`,
    `- [Research & Learning](${absoluteUrl("/research-learning")}): Research implementation support and programming mentorship, with academic integrity.`,
    `- [About](${absoluteUrl("/about")}): Mission, approach and values.`,
    `- [Contact](${absoluteUrl("/contact")}): Project enquiries and FAQ.`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
