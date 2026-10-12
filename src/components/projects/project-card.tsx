import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge, SampleBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({
  project,
  layout = "stacked",
  index = 0,
  className,
}: {
  project: Project;
  /** "wide" places the visual beside the text on large screens. */
  layout?: "stacked" | "wide";
  index?: number;
  className?: string;
}) {
  const wide = layout === "wide";

  return (
    <article
      data-reveal
      style={{ ["--reveal-delay" as string]: `${(index % 3) * 80}ms` }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-md",
        wide && "lg:grid lg:grid-cols-12",
        className,
      )}
    >
      <ProjectVisual
        project={project}
        className={cn(
          "aspect-[400/260] border-b border-border transition-transform",
          wide && "lg:col-span-7 lg:aspect-auto lg:h-full lg:min-h-80 lg:border-r lg:border-b-0",
        )}
        sizes={wide ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
      />

      <div className={cn("flex flex-1 flex-col p-6 sm:p-7", wide && "lg:col-span-5 lg:justify-center lg:p-10")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="eyebrow">{project.category}</span>
          {project.isSample && <SampleBadge />}
        </div>

        <h3 className={cn("mt-4 font-semibold text-fg", wide ? "text-2xl sm:text-3xl" : "text-xl")}>
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-ring"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, wide ? 6 : 4).map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>

        <span className="mt-auto inline-flex items-center gap-1 pt-7 text-sm font-medium text-fg transition-colors group-hover:text-accent-text">
          View project details
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </span>
      </div>
    </article>
  );
}
