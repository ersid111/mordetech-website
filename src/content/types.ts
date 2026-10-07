/**
 * `verified` is deliberately required, not optional. A number or claim cannot be
 * added to the site without someone deciding whether it has been confirmed, and
 * unverified entries are filtered out of rendering rather than shown with a
 * caveat. See `assertPublishable` in src/lib/content.ts.
 */
export type Verification = {
  verified: boolean;
  /** Who confirmed it and when, or what is still outstanding. */
  note: string;
};

export type Metric = Verification & {
  value: string;
  label: string;
  /** Where the figure comes from. Required when verified. */
  source?: string;
};

export type Solution = {
  slug: string;
  title: string;
  nav: string;
  summary: string;
  outcome: string;
  problems: string[];
  capabilities: { title: string; body: string }[];
  stack: string[];
  integration: string[];
  faqs?: { q: string; a: string }[];
};

export type Industry = {
  slug: string;
  title: string;
  nav: string;
  summary: string;
  pressures: string[];
  where: { title: string; body: string }[];
  constraints: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  sector: string;
  scope: string;
  timeframe: string;
  challenge: string;
  solution: string[];
  /** Empty until the customer approves publication of the numbers. */
  results: Metric[];
  clientApproved: boolean;
  clientNote: string;
};
