import { getProject, projects } from "@/data/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Deep Root Code project";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `${project.category}${project.isSample ? " · Sample project" : ""}` : "Project",
    title: project?.title ?? "Projects",
    subtitle: project?.technologies.join(" · ") ?? "",
  });
}
