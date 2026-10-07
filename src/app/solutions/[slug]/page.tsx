import { notFound } from 'next/navigation';
import { Section, SectionHead, Button, Card } from '@/components/ui';
import { solutions, solutionBySlug } from '@/content/solutions';
import { pageMeta, JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from '@/lib/seo';
import { RoiCalculator } from '@/components/RoiCalculator';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};
  return pageMeta({ title: s.title, description: s.summary, path: `/solutions/${s.slug}` });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Solutions', path: '/solutions' },
            { name: s.nav, path: `/solutions/${s.slug}` },
          ]),
          serviceSchema(s.title, s.summary, `/solutions/${s.slug}`),
          ...(s.faqs?.length ? [faqSchema(s.faqs)] : []),
        ]}
      />

      <Section dark className="border-b-[3px] border-blue-light">
        <SectionHead as="h1" eyebrow="Solution" title={s.title} lede={s.summary} />
        <p className="mt-6 font-mono text-[0.8rem] text-blue-light m-0">{s.outcome}</p>
        <div className="mt-8"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>

      <Section>
        <SectionHead title="What this addresses" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {s.problems.map((p) => (
            <li key={p} className="flex gap-3 rounded-card border border-paper-edge bg-paper-raised p-5">
              <span aria-hidden="true" className="font-mono text-blue-deep">—</span>
              <span className="text-ink-soft">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead title="What we build" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {s.capabilities.map((c) => (
            <Card key={c.title} className="bg-paper">
              <h3 className="text-step-2">{c.title}</h3>
              <p className="mt-2.5 text-ink-soft m-0">{c.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead title="Technology" />
            <ul className="mt-6 flex flex-wrap gap-2">
              {s.stack.map((t) => (
                <li key={t} className="rounded-card border border-paper-edge bg-paper-raised px-3 py-1.5 font-mono text-[0.76rem] text-ink-soft">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHead title="How it integrates" />
            <ul className="mt-6 space-y-3">
              {s.integration.map((i) => (
                <li key={i} className="flex gap-3 text-ink-soft">
                  <span aria-hidden="true" className="text-blue-deep">✓</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {s.slug === 'ai-vision-inspection' && (
        <Section id="roi">
          <SectionHead
            title="Estimate the saving"
            lede="Enter your own figures. Every assumption behind the result is listed, and nothing is hidden inside the calculation."
          />
          <div className="mt-9"><RoiCalculator /></div>
        </Section>
      )}

      {s.faqs?.length ? (
        <Section className="bg-paper-raised border-y border-paper-edge">
          <SectionHead title="Common questions" />
          <div className="mt-8 max-w-prose divide-y divide-paper-edge">
            {s.faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="cursor-pointer list-none font-display text-[1.05rem] font-bold marker:hidden flex justify-between gap-4">
                  {f.q}
                  <span aria-hidden="true" className="text-blue-deep transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-ink-soft m-0">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      ) : null}

      <Section dark>
        <SectionHead title="Start with an assessment" lede="We walk the line with your team and tell you where the largest opportunity is — whether or not that is this solution." />
        <div className="mt-7"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>
    </>
  );
}
