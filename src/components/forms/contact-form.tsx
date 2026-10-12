"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { TriangleAlert, CircleCheck, LoaderCircle, Send } from "lucide-react";
import { buttonClasses } from "@/components/ui/button";
import { budgetOptions, inquiryTypes, timelineOptions } from "@/data/content";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  getFieldErrors,
  type ContactField,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/validation";
import { CONTACT_CATEGORIES, type ContactCategory } from "@/types";

type Variant = "general" | "research";
type Status = { state: "idle" | "submitting" } | { state: "success"; logged: boolean } | { state: "error"; message: string };

const MESSAGE_MAX = 5000;
const FIELD_ORDER: ContactField[] = ["name", "email", "organization", "service", "inquiryType", "budget", "timeline", "message"];

/** Research inquiries map onto a contact category so the backend stays uniform. */
function categoryForInquiry(inquiry: string): ContactCategory {
  return inquiry === "One-to-one learning sessions" || inquiry === "Code review & debugging"
    ? "Training & Mentorship"
    : "Research & Academic Projects";
}

const subscribeToNothing = () => () => {};

export function ContactForm({
  variant = "general",
  serviceBySlug = {},
}: {
  variant?: Variant;
  /** Maps ?service=<slug> to a category so links like /contact?service=web-development preselect it. */
  serviceBySlug?: Record<string, ContactCategory>;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const startedAt = useRef(0);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [messageLength, setMessageLength] = useState(0);

  // Read ?service= after hydration without opting the page out of static rendering.
  const presetService = useSyncExternalStore(
    subscribeToNothing,
    () => serviceBySlug[new URLSearchParams(window.location.search).get("service") ?? ""] ?? "",
    () => "",
  );

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
  }, [status]);

  const isResearch = variant === "research";
  const id = (field: string) => `${uid}-${field}`;

  function readForm() {
    const data = new FormData(formRef.current ?? undefined);
    const get = (key: string) => String(data.get(key) ?? "");
    const inquiryType = get("inquiryType");
    return {
      values: {
        name: get("name"),
        email: get("email"),
        organization: get("organization"),
        service: isResearch ? categoryForInquiry(inquiryType) : get("service"),
        inquiryType: isResearch ? inquiryType : "",
        budget: get("budget"),
        timeline: get("timeline"),
        message: get("message"),
      },
      website: get("website"),
    };
  }

  function validateField(field: ContactField) {
    const { values } = readForm();
    const result = contactSchema.safeParse(values);
    const fieldError = result.success ? undefined : getFieldErrors(result.error)[field];
    setErrors((current) => ({ ...current, [field]: fieldError }));
  }

  function focusFirstError(fieldErrors: ContactFieldErrors) {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first) document.getElementById(id(first))?.focus();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "submitting") return;

    const { values, website } = readForm();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = getFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus({ state: "idle" });
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website, startedAt: startedAt.current }),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (result?.ok) {
        formRef.current?.reset();
        setMessageLength(0);
        setStatus({ state: "success", logged: result.delivery === "logged" });
        return;
      }

      if (result?.fieldErrors) {
        setErrors(result.fieldErrors);
        focusFirstError(result.fieldErrors);
      }
      setStatus({ state: "error", message: result?.error ?? "Something went wrong. Please try again." });
    } catch {
      setStatus({ state: "error", message: "We couldn't reach the server. Check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-2xl border border-border bg-surface p-8 sm:p-10">
        <span className="inline-flex size-12 items-center justify-center rounded-full bg-signal-soft text-signal">
          <CircleCheck aria-hidden="true" className="size-6" />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="text-2xl font-semibold text-fg focus:outline-none">
          Thank you — your message is on its way.
        </h3>
        <p className="max-w-lg leading-relaxed text-fg-muted">
          We&apos;ll read it carefully and reply to the email address you provided. If we need more detail, we&apos;ll
          ask a few follow-up questions before suggesting next steps.
        </p>
        {status.logged && (
          <p className="rounded-lg border border-dashed border-border-strong px-3 py-2 font-mono text-xs text-fg-muted">
            Development mode: no email provider is configured, so this submission was logged to the server console
            instead of being sent.
          </p>
        )}
        <button
          type="button"
          onClick={() => setStatus({ state: "idle" })}
          className="mt-2 text-sm font-medium text-accent-text hover:underline hover:underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={status.state === "error" ? id("form-error") : undefined}
      className="relative flex flex-col gap-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      {/* Honeypot — hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("website")}>Website</label>
        <input id={id("website")} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("name")} label="Full name" error={errors.name} required>
          <input
            id={id("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            onBlur={() => validateField("name")}
            {...describe(id("name"), errors.name)}
            className={inputClasses(errors.name)}
          />
        </Field>

        <Field id={id("email")} label="Email address" error={errors.email} required>
          <input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            required
            maxLength={200}
            onBlur={() => validateField("email")}
            {...describe(id("email"), errors.email)}
            className={inputClasses(errors.email)}
          />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          id={id("organization")}
          label={isResearch ? "University or institution" : "Company or institution"}
          error={errors.organization}
        >
          <input
            id={id("organization")}
            name="organization"
            type="text"
            autoComplete="organization"
            maxLength={150}
            {...describe(id("organization"), errors.organization)}
            className={inputClasses(errors.organization)}
          />
        </Field>

        {isResearch ? (
          <Field id={id("inquiryType")} label="What do you need help with?" error={errors.inquiryType}>
            <select
              id={id("inquiryType")}
              name="inquiryType"
              defaultValue=""
              {...describe(id("inquiryType"), errors.inquiryType)}
              className={inputClasses(errors.inquiryType)}
            >
              <option value="">Choose an option</option>
              {inquiryTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        ) : (
          <Field id={id("service")} label="Service" error={errors.service} required>
            <select
              key={presetService}
              id={id("service")}
              name="service"
              required
              defaultValue={presetService}
              onBlur={() => validateField("service")}
              onChange={() => errors.service && validateField("service")}
              {...describe(id("service"), errors.service)}
              className={inputClasses(errors.service)}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {CONTACT_CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id("budget")} label="Budget" error={errors.budget}>
          <select
            id={id("budget")}
            name="budget"
            defaultValue=""
            {...describe(id("budget"), errors.budget)}
            className={inputClasses(errors.budget)}
          >
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("timeline")} label="Timeline" error={errors.timeline}>
          <select
            id={id("timeline")}
            name="timeline"
            defaultValue=""
            {...describe(id("timeline"), errors.timeline)}
            className={inputClasses(errors.timeline)}
          >
            <option value="">Not decided</option>
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field
        id={id("message")}
        label={isResearch ? "Your research topic, project requirements or learning goals" : "Project description"}
        hint={
          isResearch
            ? "Share the topic, what you've done so far, where you need support and any deadlines or institutional guidelines."
            : "What are you building or improving? Who is it for, what exists today, and what would success look like?"
        }
        error={errors.message}
        required
        counter={`${messageLength.toLocaleString()} / ${MESSAGE_MAX.toLocaleString()}`}
      >
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          required
          maxLength={MESSAGE_MAX}
          onBlur={() => validateField("message")}
          onInput={(event) => setMessageLength(event.currentTarget.value.length)}
          {...describe(id("message"), errors.message, true)}
          className={cn(inputClasses(errors.message), "h-auto min-h-36 resize-y py-3 leading-relaxed")}
        />
      </Field>

      {status.state === "error" && (
        <div
          id={id("form-error")}
          role="alert"
          className="flex gap-3 rounded-xl border border-red-600/30 bg-red-600/[0.06] p-4 text-sm text-fg dark:border-red-400/30 dark:bg-red-400/[0.08]"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-red-700 dark:text-red-300" />
          <p>{status.message}</p>
        </div>
      )}

      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-fg-subtle">
          We only use your details to respond to this enquiry. See our{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-fg">
            Privacy Policy
          </a>
          .
        </p>
        <button type="submit" disabled={submitting} className={buttonClasses({ size: "lg", className: "shrink-0" })}>
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              {isResearch ? "Send inquiry" : "Send message"}
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </button>
      </div>
      <p aria-live="polite" className="sr-only">
        {submitting ? "Sending your message" : ""}
      </p>
    </form>
  );
}

/* ------------------------------------------------------------------ */

function describe(fieldId: string, error: string | undefined, hasHint = false) {
  const describedBy = [error && `${fieldId}-error`, hasHint && `${fieldId}-hint`].filter(Boolean).join(" ");
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy || undefined,
  } as const;
}

function inputClasses(error?: string) {
  return cn(
    "block h-11 w-full rounded-lg border bg-bg px-3.5 text-[0.95rem] text-fg transition-colors placeholder:text-fg-subtle focus:outline-none focus-visible:outline-none",
    error
      ? "border-red-600/70 focus:border-red-600 focus:ring-2 focus:ring-red-600/20 dark:border-red-400/70 dark:focus:border-red-400"
      : "border-border-strong hover:border-fg-subtle focus:border-accent focus:ring-2 focus:ring-accent/20",
  );
}

function Field({
  id,
  label,
  hint,
  error,
  required,
  counter,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  counter?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-0.5 text-accent-text">
              *
            </span>
          ) : (
            <span className="ml-1.5 font-normal text-fg-subtle">(optional)</span>
          )}
        </label>
        {counter && (
          <span aria-hidden="true" className="font-mono text-[0.7rem] text-fg-subtle">
            {counter}
          </span>
        )}
      </div>
      {hint && (
        <p id={`${id}-hint`} className="-mt-1 text-xs leading-relaxed text-fg-subtle">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-red-700 dark:text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}
