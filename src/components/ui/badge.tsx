import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "signal";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-surface text-fg-muted",
  accent: "border-accent/25 bg-accent-soft text-accent-text",
  signal: "border-signal/25 bg-signal-soft text-signal",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] leading-5 tracking-wide",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks illustrative content so it is never mistaken for real client work. */
export function SampleBadge({ className }: { className?: string }) {
  return (
    <Badge tone="signal" className={className}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-signal" />
      Sample project
    </Badge>
  );
}
