import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Small monospace label, e.g. "02 — Services". */
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2";
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Heading = "h2",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-2xl items-center text-center" : "max-w-2xl",
        className,
      )}
    >
      {eyebrow && (
        <p className="eyebrow flex items-center gap-2">
          <span aria-hidden="true" className="inline-block h-px w-6 bg-accent" />
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className={cn(
          "font-semibold text-fg",
          Heading === "h1"
            ? "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
            : "text-3xl leading-[1.1] sm:text-4xl",
        )}
      >
        {title}
      </Heading>
      {description && <p className="text-base leading-relaxed text-fg-muted sm:text-lg">{description}</p>}
      {children}
    </div>
  );
}

/** Serif italic accent for a word or two inside a heading. */
export function Accent({ children }: { children: React.ReactNode }) {
  return (
    <em className="font-serif text-[1.08em] font-normal tracking-normal text-accent-text italic">{children}</em>
  );
}
