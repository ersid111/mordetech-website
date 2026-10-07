# Changelog

## Rebuild — October 2026

The site was rebuilt on Next.js with server rendering. The sections below list
every defect found and how it was addressed.

### Defects fixed

**1. Raw template tokens in the served HTML**
`{{ lossText }}`, `{{ currentLoss }}`, `{{ indName }}`, `{{ kwhText }}` and
`{{ typed }}` were present in the markup of the live pages. CSS hid them from
most visitors, but they were in the source that crawlers, link previews and text
extraction read, and they were visible whenever CSS was slow.
*Root cause:* pages were templates rendered in the browser, so placeholders
shipped to every visitor.
*Fix:* pages are rendered on the server. HTML is finished before it is sent, so a
placeholder cannot reach a browser. Verified: 0 tokens across all 22 routes.

**2. Every page delivered twice**
`index.html` contained `<nav>` twice, `<footer>` four times and "Hinjewadi" five
times; `contact.html` repeated the address thirteen times. Page weight roughly
doubled.
*Root cause:* a prerendered snapshot had been added to give crawlers content, and
it coexisted with the client template it was meant to stand in for.
*Fix:* one rendering path. Verified: one DOM occurrence of the address; the four
`<nav>` elements are distinct labelled landmarks (primary plus three footer
groups).

**3. In-page anchors resolved to a hidden element**
`#industries`, `#roi-calc` and `#top` jumped to the invisible prerendered copy
rather than the live content, so "Calculate My ROI" went nowhere.
*Root cause:* duplicate `id` attributes across the snapshot and the live DOM;
`getElementById` and `:target` both take the first match.
*Fix:* removed with the duplication. Anchor targets also carry `scroll-margin-top`
so headings clear the sticky header.

**4. "Watch Live Demo" led nowhere meaningful**
It pointed at `#pipeline`, scrolling to the animation already on screen, while a
real demo page existed and was unlinked.
*Fix:* removed. `/demo` now redirects to `/solutions/industrial-iot-oee`, where
that material belongs.

**5. Footer copyright hardcoded to 2025**
*Fix:* derived from the current date in `Footer.tsx`.

**6. The contact form discarded every enquiry**
It validated, displayed "Message Sent!", and made no network call, while the page
claimed to be "powered by Formspree" and promised a reply within four business
hours.
*Fix:* a real form posting to `/api/lead`, validated with the same schema on
client and server. When no endpoint is configured it says so and directs the
visitor to WhatsApp or email. It cannot report success for an undelivered
message. Covered by 10 unit tests.

**7. Content invisible without JavaScript**
Pages shipped 7 bytes of body content; everything else was rendered client-side.
*Fix:* server rendering. The home page now serves 6,780 characters of text with
JavaScript disabled.

**8. Navigation differed on every page**
Five variants across the redesigned pages and a sixth on the legacy pages;
header height jumped between 73px and 80px.
*Fix:* one navigation model in `src/lib/nav.ts`, consumed by header, footer and
sitemap.

**9. Google Fonts was render-blocking**
With the font host unreachable, first contentful paint went from 284ms to
12,808ms — a real risk on the filtered networks common in industrial plants.
*Fix:* fonts are self-hosted at build time by `next/font`. No third-party request
on page load.

**10. Colour contrast below WCAG AA**
51 failures measured across eight pages, including a secondary button at 1.87:1.
*Root cause:* two design tokens, `ink.muted` at 4.05:1 and `lime.deep` at 2.89:1
on the page background.
*Fix:* tokens darkened to 5.17:1 and 5.11:1, and the ghost button given explicit
treatments for light and dark grounds. Verified: 0 failures.

**11. Stale build artefacts served publicly**
`outputDirectory` was `"."`, so every repository file was reachable — including a
2.2MB Next.js export carrying the old `mordetech-solutions.in` canonical tags,
indexable as duplicate content.
*Fix:* `.vercelignore` excludes `legacy/` and `tools/`.

**12. Unverifiable certification claims**
"Siemens Certified" appeared with no partner ID or tier; "IATF 16949 Ready" is
not a certification.
*Fix:* replaced with what can be evidenced — Siemens product training in TIA
Portal and SIMATIC, and working to customers' quality-system requirements.

### Claims removed pending verification

These were on the previous site and are **not** in the rebuild. Each needs owner
confirmation before it can return.

| Claim | Needed to restore it |
|---|---|
| 150+ projects · 13+ years · 99% uptime SLA · 40% average cost reduction | Sample size, period, and whether the SLA is contractual |
| 94.7% defect reduction · 0.02% defect rate · OEE 61%→83% · ROI in 11 months | Which project, how measured, over what period, customer approval |
| Testimonials from Rajesh Kulkarni and Amit Deshpande | Written permission to quote, and whether their companies may be named |
| "Tier-1 Automotive, Pune" · "Industrial Utility, Maharashtra" | Whether any client may be named |
| Germany expansion, 2021 | What exists there — entity, partner, or a single project |
| 4-hour SLA · response within 2 business hours | Whether this is operationally true including nights and weekends |
| ₹18–35L system investment in the ROI calculator | Replaced with user-entered figures and stated assumptions |
| Google Analytics in the privacy policy | GA was configured with a placeholder ID and never loaded; the policy now says no analytics are set |

### Added

- Thirteen route types where the previous site had anchors or thin pages:
  a solutions hub with four detail pages, an industries hub with six sector
  pages, a case-studies hub with a template, plus support and legal pages.
- ROI calculator with every assumption stated, input validation, an accessible
  live region, and 13 unit tests covering empty, invalid and high-value inputs.
- JSON-LD: ProfessionalService, Service, FAQPage and BreadcrumbList.
- Skip link, focus management in the mobile menu, labelled landmarks, and
  keyboard-operable disclosure components.
- Honeypot and minimum-fill-time spam protection, chosen over a CAPTCHA so that
  legitimate buyers are not taxed to stop bots.
- QA scripts under `tools/qa/` for links, contrast, interaction and performance.

### Verified at completion

| Gate | Result |
|---|---|
| Type check | clean |
| Lint | no warnings or errors |
| Unit tests | 23 passed |
| Build | 22 routes, all static except the lead API |
| Internal links | 22 unique, 0 broken, no accidental homepage redirects |
| Redirects | 6 sampled old URLs, all correct |
| Structure | 1 `h1`, canonical, schema and no heading-level jumps on every page |
| Contrast | 0 WCAG AA failures |
| Forms | validation, focus management, honeypot and failure states |
| Calculator | empty, invalid, and 273M-unit inputs |
| Keyboard | skip link first, visible focus, menu trap and Escape |
| Responsive | 320 / 390 / 768 / 1280 / 1920 — no horizontal overflow |
| Core Web Vitals | LCP 188–320ms, CLS 0 |

### Not verified

- **Cross-browser.** Only Chromium is installed in the build environment, so
  Firefox, Safari and Edge were not tested. No browser-specific APIs are used,
  but this needs a real check before launch.
- **The live domain.** mordetech.com is blocked from the build environment, so
  all testing ran against a local production server.
