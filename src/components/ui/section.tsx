import { cn } from "@/lib/utils";
import { Container } from "./container";

/** Standard vertical rhythm for page sections. */
export function Section({
  id,
  labelledBy,
  className,
  containerClassName,
  children,
}: {
  id?: string;
  labelledBy?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-20 sm:py-28", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
