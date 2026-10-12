import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbSchema, type Crumb } from "@/lib/seo";

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. The last crumb is the current page. */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];

  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <JsonLd data={breadcrumbSchema(trail)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-muted">
        {trail.map((crumb, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1.5">
              {isLast ? (
                <span aria-current="page" className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.path} className="transition-colors hover:text-fg">
                    {crumb.name}
                  </Link>
                  <ChevronRight aria-hidden="true" className="size-3.5 text-fg-subtle" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
