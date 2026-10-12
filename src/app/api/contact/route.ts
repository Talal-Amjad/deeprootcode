import { NextResponse, type NextRequest } from "next/server";
import { siteConfig } from "@/config/site";
import { deliverContactMessage } from "@/lib/contact-delivery";
import { antiSpamSchema, contactSchema, getFieldErrors, type ContactResponse } from "@/lib/validation";

const MAX_BODY_BYTES = 20_000;
const MIN_FILL_TIME_MS = 3_000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

/**
 * Best-effort in-memory rate limiter. On serverless platforms each instance has its own memory,
 * so for stricter guarantees swap this for a shared store (e.g. Upstash Redis) — see README.
 */
const submissions = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (submissions.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) {
    submissions.set(key, recent);
    return true;
  }
  recent.push(now);
  submissions.set(key, recent);
  if (submissions.size > 5_000) submissions.clear();
  return false;
}

function json(body: ContactResponse, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true; // non-browser clients; validation and rate limiting still apply
  try {
    return new URL(origin).host === request.headers.get("host");
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) {
    return json({ ok: false, error: "Requests from other origins are not allowed." }, 403);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return json({ ok: false, error: "Your message is too large to send." }, 413);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Spam checks: pretend success so bots get no signal.
  const spam = antiSpamSchema.safeParse(payload);
  const filledTooFast = spam.success && spam.data.startedAt && Date.now() - spam.data.startedAt < MIN_FILL_TIME_MS;
  if (!spam.success || spam.data.website || filledTooFast) {
    return json({ ok: true, delivery: "sent" });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return json({ ok: false, error: "Too many messages in a short time. Please try again in a few minutes." }, 429);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: "Please correct the highlighted fields.", fieldErrors: getFieldErrors(parsed.error) },
      422,
    );
  }

  const result = await deliverContactMessage(parsed.data);
  if (result.ok) return json({ ok: true, delivery: result.delivery });

  const fallback = siteConfig.contactEmail ? ` Please email us directly at ${siteConfig.contactEmail}.` : "";
  if (result.reason === "not_configured") {
    return json({ ok: false, error: `The contact form isn't connected yet.${fallback}` }, 503);
  }
  return json({ ok: false, error: `We couldn't send your message right now. Please try again shortly.${fallback}` }, 502);
}
