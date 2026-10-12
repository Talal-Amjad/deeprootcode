import { TriangleAlert } from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { PageHeader } from "./page-header";

/** Shared layout for policy pages with readable long-form typography. */
export function LegalPage({
  title,
  path,
  intro,
  children,
}: {
  title: string;
  path: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader eyebrow="Legal" title={title} description={intro} breadcrumbs={[{ name: title, path }]} />
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <div
            role="note"
            className="mb-12 flex gap-3 rounded-xl border border-amber-600/30 bg-amber-500/[0.07] p-5 text-sm leading-relaxed text-fg dark:border-amber-400/30"
          >
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-300" />
            <p>
              <strong className="font-semibold">Draft for review.</strong> This page is an initial template. Items in
              [square brackets] must be completed, and the full text should be reviewed by a qualified legal
              professional for your jurisdiction before you rely on it.
            </p>
          </div>
          <p className="mb-10 font-mono text-xs text-fg-subtle">Last updated: {siteConfig.legal.lastUpdated}</p>
          <div className="text-fg-muted [&_a]:text-accent-text [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-fg [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-fg [&_li]:mt-2 [&_li]:leading-relaxed [&_p]:mt-4 [&_p]:leading-relaxed [&_strong]:text-fg [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-fg-subtle">
            {children}
          </div>
        </div>
      </Container>
    </>
  );
}
