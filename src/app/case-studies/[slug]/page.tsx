import { notFound } from 'next/navigation';
import { Section, SectionHead, Button, PendingNote } from '@/components/ui';
import { caseStudies, caseStudyBySlug } from '@/content/case-studies';
import { publishableMetrics } from '@/lib/content';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.challenge.slice(0, 155), path: `/case-studies/${c.slug}` });
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) notFound();

  // Only metrics that are both verified and sourced ever reach the page.
  const metrics = publishableMetrics(c.results);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Case Studies', path: '/case-studies' },
          { name: c.title, path: `/case-studies/${c.slug}` },
        ])}
      />

      <Section dark className="border-b-[3px] border-lime">
        <SectionHead as="h1" eyebrow={c.sector} title={c.title} />
        <dl className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-invert/50">Scope</dt>
            <dd className="mt-1.5 m-0 text-ink-invert/85">{c.scope}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-invert/50">Timeframe</dt>
            <dd className="mt-1.5 m-0 text-ink-invert/85">{c.timeframe}</dd>
          </div>
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-invert/50">Customer</dt>
            <dd className="mt-1.5 m-0 text-ink-invert/85">
              {c.clientApproved ? c.sector : 'Not named — approval pending'}
            </dd>
          </div>
        </dl>
      </Section>

      <Section>
        <div className="max-w-prose">
          <SectionHead title="The challenge" />
          <p className="mt-5 text-ink-soft">{c.challenge}</p>
        </div>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead title="What we did" />
        <ul className="mt-8 space-y-4 max-w-prose">
          {c.solution.map((s) => (
            <li key={s} className="flex gap-3 text-ink-soft">
              <span aria-hidden="true" className="text-lime-deep">✓</span>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHead title="Results" />
        {metrics.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-card border border-paper-edge bg-paper-raised p-6">
                <p className="font-display text-step-3 text-lime-deep m-0">{m.value}</p>
                <p className="mt-1.5 text-ink-soft m-0">{m.label}</p>
                <p className="mt-3 font-mono text-[0.7rem] text-ink-muted m-0">Source: {m.source}</p>
              </div>
            ))}
          </div>
        ) : (
          <PendingNote>
            Measured results for this project are not published yet. {c.clientNote} Rather than
            print a number we cannot attribute, this section stays empty until the customer signs
            off on the figures and how they were measured.
          </PendingNote>
        )}
      </Section>

      <Section dark>
        <SectionHead title="Have a similar problem?" lede="A plant assessment starts with walking your line, not with a proposal." />
        <div className="mt-7"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>
    </>
  );
}
