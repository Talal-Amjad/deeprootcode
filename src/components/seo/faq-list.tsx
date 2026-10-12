import { Plus } from "lucide-react";
import type { Faq } from "@/lib/seo";

/** Accessible, JS-free accordion. Answers stay in the HTML so search engines can read them. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {faqs.map((faq) => (
        <details key={faq.question} data-reveal className="group py-1">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-lg font-medium text-fg marker:hidden [&::-webkit-details-marker]:hidden">
            <h3 className="font-medium">{faq.question}</h3>
            <Plus
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-fg-subtle transition-transform duration-300 group-open:rotate-45 group-open:text-accent-text"
            />
          </summary>
          <p className="max-w-3xl pb-6 leading-relaxed text-fg-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
