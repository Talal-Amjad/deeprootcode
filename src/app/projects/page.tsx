import { Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { ProjectExplorer, type ExplorerItem } from "@/components/projects/project-explorer";
import { FinalCta } from "@/components/sections/final-cta";
import { Accent } from "@/components/ui/section-heading";
import { Section } from "@/components/ui/section";
import { projectCategories, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Projects",
  description:
    "Explore the kinds of web applications, AI systems, automations, mobile apps and research prototypes Deep Root Code builds.",
  path: "/projects",
});

export default function ProjectsPage() {
  const items: ExplorerItem[] = projects.map((project, index) => ({
    slug: project.slug,
    category: project.category,
    searchText: [project.title, project.summary, project.category, ...project.technologies].join(" ").toLowerCase(),
    card: <ProjectCard project={project} index={index} className="w-full" />,
  }));
  const hasSamples = projects.some((project) => project.isSample);

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title={
          <>
            Built with care, <Accent>engineered to last.</Accent>
          </>
        }
        description="Web platforms, AI systems, automations, mobile apps and research tools — filter by category or search by technology."
      />

      <Section className="pt-12 sm:pt-16">
        {hasSamples && (
          <div className="mb-10 flex gap-3 rounded-xl border border-signal/25 bg-signal-soft p-5 text-sm leading-relaxed">
            <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-signal" />
            <p className="text-fg-muted">
              <strong className="font-semibold text-fg">About these examples:</strong> projects labelled &ldquo;Sample
              project&rdquo; are illustrative concepts that show the type of work we do and how we approach it. They
              are not completed client engagements, and will be replaced with real case studies as they become
              available.
            </p>
          </div>
        )}
        <ProjectExplorer items={items} categories={projectCategories} />
      </Section>

      <FinalCta
        title={
          <>
            Your project could be <Accent>next.</Accent>
          </>
        }
      />
    </>
  );
}
