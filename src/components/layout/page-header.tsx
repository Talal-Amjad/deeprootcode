import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

/** Header used by every interior page: grid backdrop, h1, intro and optional actions. */
export function PageHeader({
  eyebrow,
  title,
  description,
  back,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  back?: { href: string; label: string };
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden border-b border-border pt-16 sm:-mt-[4.5rem] sm:pt-[4.5rem]">
      <div aria-hidden="true" className="bg-grid mask-fade-b pointer-events-none absolute inset-0" />
      <LogoMark className="pointer-events-none absolute top-24 -right-16 hidden size-[26rem] text-fg opacity-[0.05] lg:block" />

      <Container className="relative pt-14 pb-16 sm:pt-20 sm:pb-20">
        {back && <BackLink href={back.href} label={back.label} />}
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={description} className="max-w-3xl">
          {children && <div className="mt-4 flex flex-col gap-3 sm:flex-row">{children}</div>}
        </SectionHeading>
      </Container>
    </section>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group mb-8 inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
    >
      <ArrowLeft aria-hidden="true" className="size-4 transition-transform group-hover:-translate-x-0.5" />
      {label}
    </Link>
  );
}
