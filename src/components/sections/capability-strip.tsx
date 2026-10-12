import { capabilityAreas } from "@/data/content";
import { pad } from "@/lib/utils";

/** Compact list of practice areas — deliberately no client logos or numbers. */
export function CapabilityStrip() {
  return (
    <section aria-label="Areas of work" className="border-y border-border bg-surface">
      <div className="container-page">
        <ul className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-5 lg:divide-x">
          {capabilityAreas.map((area, index) => (
            <li
              key={area}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${index * 60}ms` }}
              className="flex items-center gap-3 py-5 sm:py-6 lg:justify-center lg:px-4"
            >
              <span className="font-mono text-xs text-accent-text">{pad(index + 1)}</span>
              <span className="text-sm font-medium text-fg">{area}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
