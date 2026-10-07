# MordeTech Solutions — website

Next.js 15 (App Router) + TypeScript + Tailwind. Every page is generated as
static HTML at build time; only the lead API runs on demand.

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
npm run check          # typecheck + lint + tests
```

## Why it is built this way

The previous site rendered itself in the browser from a template that shipped to
every visitor. That single decision produced most of its defects: raw `{{ token }}`
placeholders in the served HTML, duplicated DOM in crawl output, in-page anchors
that resolved to a hidden copy of the page, and content invisible to anything
that does not execute JavaScript.

Server rendering removes that class of problem rather than patching instances of
it. A placeholder cannot reach the browser because the HTML is finished before it
is sent.

## Layout

```
src/
  app/            routes; each folder is a URL
    api/lead/     form submission endpoint (the only server-rendered route)
  components/     Header, Footer, LeadForm, RoiCalculator, SignalChain, ui
  content/        all copy and business facts — edit here, not in components
  lib/            nav model, SEO helpers, validation schema, ROI calculation
legacy/           the previous static site, kept for reference, never deployed
tools/qa/         audit scripts (link, contrast, interaction, performance)
```

## Editing content

Everything a non-developer would change lives in `src/content/`:

| File | Contains |
|---|---|
| `site.ts` | Phone, email, address, founder, company facts |
| `solutions.ts` | The four solution pages: copy, capabilities, stack, FAQs |
| `industries.ts` | The six industry pages |
| `case-studies.ts` | Case studies, including result and approval status |
| `types.ts` | The shape each of the above must follow |

Adding an industry means adding one object to `industries.ts`. The page, the
navigation entry, the sitemap entry and the schema all follow automatically —
there is no second place to update.

### Publishing a case-study result

Results are withheld by default. A number appears only when it is both verified
and sourced:

```ts
results: [
  { value: '94%', label: 'Reduction in defect escape rate',
    verified: true, source: 'Customer QA report, March 2025',
    note: 'Approved by email 12 Mar 2025' },
],
clientApproved: true,
```

`publishableMetrics()` filters out anything missing `verified` or `source`, so
forgetting to confirm a figure means it does not render — rather than rendering
unconfirmed. This is deliberate: the previous site published figures with no
sample size, period or sign-off.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `LEAD_WEBHOOK_URL` | Yes, for the form to deliver | Any endpoint accepting a JSON POST: a Formspree form, a CRM webhook, or your own handler |

Set it in Vercel under Settings → Environment Variables. **Until it is set the
form validates and then tells the visitor it is not connected, directing them to
WhatsApp or email.** It never reports success for a message that went nowhere.

You already have a Formspree account — `legacy/careers.html` posts to form
`xlgoyvzn`. Create a second form there for sales enquiries so applications and
leads stay separate, and use its URL here.

## Replacing the hero visual

`src/components/HeroVisual.tsx` draws an inline SVG: a process signal settling
into a tolerance band. It is there because no production photography was
supplied, and a stock photo implying a customer would be worse than none.

To use a real photograph, replace that component with a `next/image` of a control
panel, vision station or plant floor at roughly 520×300, and keep the caption
row beneath it or delete it.

## Deployment

Vercel detects Next.js from `vercel.json`. Push to `main` and it builds.
`.vercelignore` keeps `legacy/` and `tools/` out of the deployment — without it
every repository file is publicly served, which is how the previous site exposed
a stale Next.js export carrying outdated canonical tags.

## Redirects

Old URLs 301 to their new homes in `next.config.ts`. Both extensionless and
`.html` forms are covered, so inbound links and search rankings survive.

| Old | New |
|---|---|
| `/ai-solutions` | `/solutions/ai-vision-inspection` |
| `/services` | `/solutions` |
| `/demo` | `/solutions/industrial-iot-oee` |
| `/case-study-1..3` | `/case-studies/<slug>` |
| `/news`, `/sustainability`, `/careers` | `/about` |
| `*.html` | extensionless equivalent |

## Quality gates

```bash
npm run check                                    # types, lint, 23 unit tests
node tools/qa/audit.mjs                          # links, headings, schema, redirects
node tools/qa/contrast.mjs                       # WCAG AA contrast
node tools/qa/interaction.mjs                    # form, calculator, keyboard, responsive
node tools/qa/perf.mjs                           # Core Web Vitals
```

The QA scripts need a running server and a Chromium binary:

```bash
npm start &
CHROMIUM_PATH=/path/to/chrome node tools/qa/audit.mjs
```

## Outstanding content approvals

See `CHANGELOG.md` → "Claims removed pending verification". Several figures,
testimonials and certification claims from the previous site are not present
because they could not be evidenced. Each is listed with what is needed to
restore it.
