import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/ui/icon";
import { cn, pad } from "@/lib/utils";
import type { Service } from "@/types";

/**
 * Service tile for hairline grids. The whole tile is clickable via the title link's
 * stretched pseudo-element, keeping a single, well-labelled link for assistive tech.
 */
export function ServiceCard({
  service,
  index,
  featured = false,
  className,
}: {
  service: Service;
  index: number;
  featured?: boolean;
  className?: string;
}) {
  const capabilities = featured ? service.capabilities : service.capabilities.slice(0, 3);

  return (
    <article
      data-reveal
      style={{ ["--reveal-delay" as string]: `${(index % 4) * 70}ms` }}
      className={cn(
        "group relative flex flex-col bg-surface p-6 transition-colors duration-300 hover:bg-bg sm:p-8",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-11 items-center justify-center rounded-lg border border-border bg-bg text-fg transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent-text">
          <Icon name={service.icon} className="size-5" />
        </span>
        <span className="font-mono text-xs text-fg-subtle">{pad(index + 1)}</span>
      </div>

      <h3 className={cn("mt-6 font-semibold text-fg", featured ? "text-2xl" : "text-xl")}>
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-sm focus-visible:after:outline-2 focus-visible:after:outline-offset-[-4px] focus-visible:after:outline-ring"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-fg-muted">{service.summary}</p>

      <ul
        className={cn(
          "mt-6 grid gap-x-6 gap-y-2 text-sm text-fg-muted",
          featured && "sm:grid-cols-2",
        )}
      >
        {capabilities.map((capability) => (
          <li key={capability} className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent" />
            {capability}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-1 pt-8 text-sm font-medium text-fg transition-colors group-hover:text-accent-text">
        Learn more
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </article>
  );
}
