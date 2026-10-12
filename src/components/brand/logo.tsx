import { cn } from "@/lib/utils";

/**
 * Deep Root Code mark: a root node branching downward — read both as a root system
 * and as a tree data structure (in computer science, trees grow from the root down).
 * Uses currentColor for the branches and the accent token for the root node, so it adapts to both themes.
 * A standalone SVG version lives in src/app/icon.svg.
 */
export function LogoMark({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={cn("shrink-0", className)}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <path
        d="M16 9v6m0 0c0 4.5-8 3.5-8 9m8-9v9.5m0-9.5c0 4.5 8 3.5 8 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="6" r="3.25" fill="var(--accent)" />
      <circle cx="8" cy="26.5" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="16" cy="27" r="2.25" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="24" cy="26.5" r="2.25" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

/** Mark + typographic wordmark. */
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-fg", className)}>
      <LogoMark className="size-7" />
      <span className={cn("leading-none", compact && "sr-only sm:not-sr-only")}>
        <span className="text-[1.05rem] font-semibold tracking-[-0.03em]">Deep Root</span>
        <span className="ml-1 font-mono text-[0.95rem] font-medium tracking-tight text-fg-muted">Code</span>
      </span>
    </span>
  );
}
