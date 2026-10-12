# Deep Root Code — Website

Marketing and portfolio website for **Deep Root Code**, a software development agency (web, AI, automation, mobile, research & learning).

Built with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS 4**, **Lucide** icons and **Zod** validation. No UI kit, animation library or theme library: animations use CSS and one `IntersectionObserver`, and theming uses an inline script plus a small toggle component.

---

## Quick start

Requirements: **Node.js 20.9+** and npm.

```bash
npm install
cp .env.example .env.local    # then edit values (all optional for local dev)
npm run dev                   # http://localhost:3000
```

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run dev`       | Development server with hot reload                  |
| `npm run build`     | Production build                                    |
| `npm start`         | Serve the production build (`npm run build` first)  |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | TypeScript, no emit                                 |
| `npm run check`     | Lint + typecheck + build                            |

---

## Before launch: what is real vs. placeholder

| Item | Status | Where to change it |
| --- | --- | --- |
| Website copy (home, services, about, research & learning) | ✅ Ready to use | `src/data/*.ts`, page files in `src/app` |
| **Portfolio projects** | ⚠️ **Illustrative samples**, labelled "Sample project" on the site | `src/data/projects.ts` |
| Contact email | ⚙️ Hidden until configured | `NEXT_PUBLIC_CONTACT_EMAIL` |
| Social links | ⚙️ Hidden until configured | `social` in `src/config/site.ts` |
| Contact form delivery | ⚙️ Needs credentials (Resend or webhook) | Environment variables (see below) |
| Production URL | ⚙️ Required for SEO | `NEXT_PUBLIC_SITE_URL` |
| Privacy Policy & Terms | ⚠️ **Drafts**: complete `[bracketed]` items and get legal review | `src/app/privacy`, `src/app/terms`, `legal` in `src/config/site.ts` |

The site never shows invented clients, testimonials, metrics, awards, founding dates or team members, and the structured data only contains facts from your configuration.

---

## Environment variables

Copy `.env.example` to `.env.local` locally, and add the same variables in your hosting provider.

| Variable | Required | Exposed to browser | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | Yes | Canonical URLs, sitemap, Open Graph, JSON-LD. No trailing slash, e.g. `https://deeprootcode.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | No | Yes | Public email shown in footer/contact page. Empty = hidden |
| `RESEND_API_KEY` | Option A | **No** | Resend API key |
| `CONTACT_TO_EMAIL` | Option A | **No** | Inbox(es) that receive enquiries (comma-separated) |
| `CONTACT_FROM_EMAIL` | Option A | **No** | Sender on a Resend-verified domain, e.g. `Deep Root Code <website@yourdomain.com>` |
| `CONTACT_WEBHOOK_URL` | Option B | **No** | Any HTTPS endpoint that accepts a JSON POST |

Only `NEXT_PUBLIC_*` variables reach the browser. API keys stay on the server.

> `NEXT_PUBLIC_*` values are inlined at **build time**, so redeploy after changing them.

---

## Contact form

**Flow:** `ContactForm` (client) → validates with the shared Zod schema in `src/lib/validation.ts` → `POST /api/contact` → validates again on the server → `deliverContactMessage()` in `src/lib/contact-delivery.ts`.

It's used on `/contact` (general enquiries; `?service=<service-slug>` preselects a service) and on `/research-learning#inquiry` (research and learning variant).

### Delivery providers (pick one)

Provider selection happens automatically in this order:

1. **Resend.** Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
   1. Create an account at [resend.com](https://resend.com) and verify your sending domain (DNS records).
   2. Create an API key with "sending access".
   3. Add the three variables and redeploy. Replies go straight to the visitor (`reply_to` is set).
2. **Webhook.** Set `CONTACT_WEBHOOK_URL` to Zapier, Make, n8n, a Slack workflow or your own API. The payload contains the validated fields plus pre-formatted `subject`, `text` and `html`.
3. **Not configured.**
   - In **development** submissions are logged to the terminal, and the success screen says no email was sent.
   - In **production** the API returns `503`, and visitors see an honest "the contact form isn't connected yet" message (including your email if configured). The form never pretends to send.

To add another provider (Postmark, SES, a CRM…), write a `deliver` function in `src/lib/contact-delivery.ts` and register it in `resolveProvider()`.

### Security & spam protection

- Zod validation on client **and** server (length limits, email format, allow-listed select values)
- Honeypot field and minimum fill time (bots receive a fake success)
- Same-origin check and a 20 KB body limit
- Per-IP rate limit (5 submissions / 10 minutes). It is in-memory and best-effort; on serverless hosts each instance has its own memory, so for strict limits replace `isRateLimited` in `src/app/api/contact/route.ts` with a shared store such as Upstash Redis or Vercel KV
- All user content is HTML-escaped in emails, and the subject line is stripped of newlines
- If spam becomes a problem, add Cloudflare Turnstile or hCaptcha, verifying the token in the route before delivery

---

## Customising

### Brand & company details: `src/config/site.ts`
Name, tagline, description, social links, CTA labels/links, legal placeholders and brand colour references.

### Colours, typography & theme: `src/app/globals.css`
All colours are CSS variables on `:root` (light) and `[data-theme="dark"]` (dark), exposed to Tailwind via `@theme inline` (`bg-surface`, `text-fg-muted`, `text-accent-text`…). Every text/background pair was checked for WCAG AA contrast, so re-check if you change them.

Fonts (loaded with `next/font`, self-hosted at build time): **Geist** (UI), **Geist Mono** (labels, code), **Instrument Serif** italic (accent words in headings via `<Accent>`).

### Logo
- React component: `src/components/brand/logo.tsx` (`LogoMark`, `Logo`)
- Favicon: `src/app/icon.svg` · iOS icon: `src/app/apple-icon.tsx` · Social image: `src/app/opengraph-image.tsx`

The mark is a root node branching downward, which reads both as a root system and as a tree data structure. It is a simple vector, easy to reuse for social avatars and documents.

### Content (no component changes needed)
| File | Controls |
| --- | --- |
| `src/data/services.ts` | 8 services: cards, `/services`, and each `/services/[slug]` page |
| `src/data/projects.ts` | Portfolio grid, filters, featured projects, `/projects/[slug]` pages |
| `src/data/technologies.ts` | Technology categories and items |
| `src/data/content.ts` | Principles, process steps, research offerings, values, form options |

Icons are referenced by name; add new ones in `src/components/ui/icon.tsx`.

### Updating the portfolio
1. Open `src/data/projects.ts`.
2. Replace a sample entry (or add a new one) and set `isSample: false`.
3. Optional screenshot: put it in `public/projects/` and add
   `image: { src: "/projects/my-app.png", alt: "…", width: 1600, height: 1040 }`. Without an image, a themed illustrative mockup is drawn based on `mockup`.
4. Add `liveUrl` / `sourceUrl` when public. The buttons appear automatically.
5. Set `featured: true` on up to three projects for the home page.
6. When no samples remain, the sample notices disappear automatically.

---

## Deployment

### Vercel (recommended)
1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import it at [vercel.com/new](https://vercel.com/new). The framework (Next.js) is detected automatically.
3. Add environment variables (at least `NEXT_PUBLIC_SITE_URL`, plus a delivery provider).
4. Deploy, then add your custom domain and update `NEXT_PUBLIC_SITE_URL` to match, and redeploy.

### Any Node host
```bash
npm ci
npm run build
npm start            # PORT=8080 npm start to change the port
```
Every page is statically pre-rendered; only `/api/contact` runs on the server.

### After deploying
- Visit `/sitemap.xml` and `/robots.txt` and confirm they use your production domain.
- Submit the sitemap in Google Search Console.
- Send a test message through `/contact` and confirm it arrives.
- Check link previews with a social card validator (the image comes from `opengraph-image.tsx`).

---

## Project structure

```text
src/
├── app/                      # Routes (App Router)
│   ├── layout.tsx            # Fonts, theme script, metadata, JSON-LD, header/footer
│   ├── page.tsx              # Home
│   ├── about/ services/ services/[slug]/ projects/ projects/[slug]/
│   ├── research-learning/ contact/ privacy/ terms/
│   ├── api/contact/route.ts  # Contact form endpoint
│   ├── sitemap.ts robots.ts manifest.ts opengraph-image.tsx apple-icon.tsx icon.svg
│   └── globals.css           # Design tokens, utilities, animations
├── components/
│   ├── brand/                # Logo
│   ├── forms/                # Contact form
│   ├── layout/               # Header, footer, page header, theme toggle, reveal observer
│   ├── navigation/           # Desktop links, mobile menu
│   ├── projects/             # Cards, mockups, filterable explorer
│   ├── sections/             # Home page sections and hero visual
│   ├── services/             # Service card
│   └── ui/                   # Button, badge, section, container, icons
├── config/site.ts            # Central brand configuration
├── data/                     # Services, projects, technologies, copy
├── lib/                      # Validation, delivery, metadata, utils
└── types/                    # Shared TypeScript types
```

## Accessibility & performance notes

- Semantic landmarks, a skip link, a single `h1` per page, labelled navigation regions
- Keyboard-accessible mobile menu (modal dialog with focus trap, Escape to close, focus restored)
- Visible focus rings; form fields with linked labels, hints and errors (`aria-invalid`, `aria-describedby`), and focus moves to the first invalid field
- `prefers-reduced-motion` disables reveal, hero and pulse animations
- Theme follows the OS on first visit, persists in `localStorage`, and is applied before paint (no flash)
- Server Components by default; client JS is limited to the header behaviour, theme toggle, mobile menu, reveal observer, project filters and forms
