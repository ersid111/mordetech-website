import Link from 'next/link';
import { Section, SectionHead, Button, PendingNote } from '@/components/ui';
import { caseStudies } from '@/content/case-studies';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Case Studies — Industrial Automation Projects',
  description:
    'Engineering scope and approach from AI vision inspection, OEE and predictive maintenance, and legacy PLC migration projects.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  const anyPending = caseStudies.some((c) => !c.clientApproved);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }])} />
      <Section dark className="border-b-[3px] border-blue-light">
        <SectionHead
          as="h1"
          eyebrow="Selected work"
          title="What the engineering actually involved"
          lede="Described by scope and approach rather than by headline percentages. Measured results and customer names appear only once the customer has approved them in writing."
        />
      </Section>

      <Section>
        <div className="grid gap-6">
          {caseStudies.map((c) => (
            <article key={c.slug} className="rounded-card border border-paper-edge bg-paper-raised p-7">
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-blue-deep m-0">{c.sector}</p>
              <h2 className="mt-2.5 text-step-3">
                <Link href={`/case-studies/${c.slug}`} className="text-ink hover:text-blue-deep transition-colors">
                  {c.title}
                </Link>
              </h2>
              <p className="mt-3 text-ink-soft max-w-prose">{c.challenge}</p>
              <p className="mt-4 font-mono text-[0.74rem] text-ink-muted m-0">Scope: {c.scope}</p>
              <div className="mt-6"><Button href={`/case-studies/${c.slug}`} variant="ghost">Read the case</Button></div>
            </article>
          ))}
        </div>

        {anyPending && (
          <PendingNote>
            Results and customer names for these projects are withheld pending written customer
            approval. They are not omitted because they are poor — they are omitted because an
            unverifiable number is worth less than an honest gap.
          </PendingNote>
        )}
      </Section>
    </>
  );
}
