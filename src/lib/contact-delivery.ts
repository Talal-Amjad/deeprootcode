import { siteConfig } from "@/config/site";
import type { ContactInput } from "./validation";

/**
 * Contact delivery — provider-independent.
 * Server-only: imported exclusively by src/app/api/contact/route.ts.
 *
 * Providers are chosen from environment variables (see .env.example):
 *   1. Resend      → RESEND_API_KEY + CONTACT_TO_EMAIL + CONTACT_FROM_EMAIL
 *   2. Webhook     → CONTACT_WEBHOOK_URL (Zapier, Make, n8n, Slack, your own API…)
 *   3. Console log → development only, so the form can be tested locally
 * To add another provider, implement a `deliver` function and add it to `resolveProvider`.
 */

export type DeliveryResult = { ok: true; delivery: "sent" | "logged" } | { ok: false; reason: string };

type Provider = { name: string; deliver: (input: ContactInput) => Promise<DeliveryResult> };

function env(name: string): string {
  return process.env[name]?.trim() ?? "";
}

function resolveProvider(): Provider | null {
  const resendKey = env("RESEND_API_KEY");
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");
  if (resendKey && to && from) {
    return { name: "resend", deliver: (input) => sendWithResend(input, { apiKey: resendKey, to, from }) };
  }

  const webhook = env("CONTACT_WEBHOOK_URL");
  if (webhook) {
    return { name: "webhook", deliver: (input) => sendToWebhook(input, webhook) };
  }

  if (process.env.NODE_ENV !== "production") {
    return { name: "console", deliver: logToConsole };
  }

  return null;
}

export async function deliverContactMessage(input: ContactInput): Promise<DeliveryResult> {
  const provider = resolveProvider();
  if (!provider) return { ok: false, reason: "not_configured" };

  try {
    return await provider.deliver(input);
  } catch (error) {
    console.error(`[contact] ${provider.name} delivery failed`, error);
    return { ok: false, reason: "delivery_failed" };
  }
}

/* ------------------------------------------------------------------ */

function summaryLines(input: ContactInput): [string, string][] {
  return [
    ["Name", input.name],
    ["Email", input.email],
    ["Company / institution", input.organization || "—"],
    ["Service", input.service],
    ...(input.inquiryType ? ([["Inquiry type", input.inquiryType]] as [string, string][]) : []),
    ["Budget", input.budget || "—"],
    ["Timeline", input.timeline || "—"],
  ];
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildEmail(input: ContactInput) {
  const lines = summaryLines(input);
  const subject = `New enquiry: ${input.service} — ${input.name}`.replace(/[\r\n]+/g, " ").slice(0, 180);
  const text = `${lines.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${input.message}\n\n— Sent from the ${siteConfig.name} website`;
  const html = `
    <div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#14161a">
      <h2 style="font-size:18px;margin:0 0 16px">New enquiry from the ${escapeHtml(siteConfig.name)} website</h2>
      <table style="border-collapse:collapse;margin-bottom:16px">
        ${lines
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#52565c;vertical-align:top">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:0 0 4px;color:#52565c">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>`;
  return { subject, text, html };
}

async function sendWithResend(
  input: ContactInput,
  config: { apiKey: string; to: string; from: string },
): Promise<DeliveryResult> {
  const { subject, text, html } = buildEmail(input);
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: config.from,
      to: config.to.split(",").map((address) => address.trim()),
      reply_to: input.email,
      subject,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("[contact] Resend responded with", response.status, await response.text().catch(() => ""));
    return { ok: false, reason: "delivery_failed" };
  }
  return { ok: true, delivery: "sent" };
}

async function sendToWebhook(input: ContactInput, url: string): Promise<DeliveryResult> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: `${siteConfig.name} website`,
      submittedAt: new Date().toISOString(),
      ...input,
      ...buildEmail(input),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    console.error("[contact] Webhook responded with", response.status);
    return { ok: false, reason: "delivery_failed" };
  }
  return { ok: true, delivery: "sent" };
}

async function logToConsole(input: ContactInput): Promise<DeliveryResult> {
  console.info(
    "\n[contact] No delivery provider configured — submission logged (development only):\n",
    buildEmail(input).text,
    "\n",
  );
  return { ok: true, delivery: "logged" };
}
