"use client";

import { useId, useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types";

export type ExplorerItem = {
  slug: string;
  category: ProjectCategory;
  /** Lower-cased text the search box matches against. */
  searchText: string;
  /** Card rendered on the server. */
  card: React.ReactNode;
};

const ALL = "All";

export function ProjectExplorer({ items, categories }: { items: ExplorerItem[]; categories: ProjectCategory[] }) {
  const [category, setCategory] = useState<ProjectCategory | typeof ALL>(ALL);
  const [query, setQuery] = useState("");
  const searchId = useId();

  const counts = useMemo(() => {
    const map = new Map<string, number>([[ALL, items.length]]);
    for (const item of items) map.set(item.category, (map.get(item.category) ?? 0) + 1);
    return map;
  }, [items]);

  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const visible = items.filter(
    (item) =>
      (category === ALL || item.category === category) && terms.every((term) => item.searchText.includes(term)),
  );

  const filters: (ProjectCategory | typeof ALL)[] = [ALL, ...categories.filter((c) => counts.has(c))];

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-2 px-1">
          {filters.map((filter) => {
            const active = filter === category;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(filter)}
                className={cn(
                  "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm transition-colors",
                  active
                    ? "border-fg bg-fg text-bg"
                    : "border-border bg-surface text-fg-muted hover:border-border-strong hover:text-fg",
                )}
              >
                {filter}
                <span className={cn("font-mono text-[0.7rem]", active ? "text-bg/70" : "text-fg-subtle")}>
                  {counts.get(filter) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <label htmlFor={searchId} className="sr-only">
            Search projects
          </label>
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-fg-subtle"
          />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name or technology"
            className="h-10 w-full rounded-full border border-border bg-surface pr-10 pl-10 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-fg-subtle hover:bg-surface-2 hover:text-fg"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          )}
        </div>
      </div>

      <p aria-live="polite" className="mt-6 font-mono text-xs text-fg-subtle">
        Showing {visible.length} of {items.length} projects
      </p>

      {visible.length > 0 ? (
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item) => (
            <li key={item.slug} className="flex">
              {item.card}
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-2xl border border-dashed border-border-strong px-6 py-16 text-center">
          <p className="font-medium text-fg">No projects match those filters.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(ALL);
            }}
            className="mt-3 text-sm font-medium text-accent-text hover:underline hover:underline-offset-4"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
