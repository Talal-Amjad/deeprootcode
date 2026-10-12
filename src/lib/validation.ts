import { z } from "zod";
import { budgetOptions, inquiryTypes, timelineOptions } from "@/data/content";
import { CONTACT_CATEGORIES } from "@/types";

/** Optional <select>: either one of the options or an empty string. */
const optionalChoice = <T extends readonly [string, ...string[]]>(options: T) =>
  z.union([z.enum(options), z.literal("")]).optional();

/**
 * Contact form schema — shared by the client (instant feedback) and the API route (authoritative check).
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your full name." })
    .max(100, { error: "Name must be 100 characters or fewer." }),
  email: z
    .string()
    .trim()
    .max(200, { error: "Email must be 200 characters or fewer." })
    .pipe(z.email({ error: "Please enter a valid email address." })),
  organization: z.string().trim().max(150, { error: "Must be 150 characters or fewer." }).optional(),
  service: z.enum(CONTACT_CATEGORIES, { error: "Please choose the service you're interested in." }),
  inquiryType: optionalChoice(inquiryTypes),
  budget: optionalChoice(budgetOptions),
  timeline: optionalChoice(timelineOptions),
  message: z
    .string()
    .trim()
    .min(20, { error: "Please tell us a little more — at least 20 characters." })
    .max(5000, { error: "Message must be 5,000 characters or fewer." }),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** Anti-spam fields sent alongside the form data; never shown to users. */
export const antiSpamSchema = z.object({
  /** Honeypot — real users never see or fill this field. */
  website: z.string().optional(),
  /** Timestamp (ms) when the form was rendered; very fast submissions are likely bots. */
  startedAt: z.number().optional(),
});

export function getFieldErrors(error: z.ZodError<ContactInput>): ContactFieldErrors {
  const flattened = z.flattenError(error).fieldErrors as Partial<Record<ContactField, string[]>>;
  const result: ContactFieldErrors = {};
  for (const [field, messages] of Object.entries(flattened) as [ContactField, string[] | undefined][]) {
    if (messages?.[0]) result[field] = messages[0];
  }
  return result;
}

/** Shape of every response from POST /api/contact. */
export type ContactResponse =
  | { ok: true; delivery: "sent" | "logged" }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };
