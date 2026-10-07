import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section, SectionHead, Button, Card } from '@/components/ui';
import { industries, industryBySlug } from '@/content/industries';
import { solutions } from '@/content/solutions';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) return {};
  // The on-page summary is written to be read, not to hit a character count.
  // Pad it with the sector's actual pressures so the description is useful in a
  // search result without rewriting the page copy.
  const description = `${i.summary} ${i.pressures.slice(0, 2).join('. ')}.`.slice(0, 160);
  return pageMeta({
    title: `${i.title} — Industrial Automation`,
    description,
    path: `/industries/${i.slug}`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = industryBySlug(slug);
  if (!i) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
          { name: i.nav, path: `/industries/${i.slug}` },
        ])}
      />

      <Section dark className="border-b-[3px] border-lime">
        <SectionHead as="h1" eyebrow="Industry" title={i.title} lede={i.summary} />
        <div className="mt-8"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>

      <Section>
        <SectionHead title="What presses on this sector" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {i.pressures.map((p) => (
            <li key={p} className="flex gap-3 rounded-card border border-paper-edge bg-paper-raised p-5">
              <span aria-hidden="true" className="font-mono text-lime-deep">—</span>
              <span className="text-ink-soft">{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead title="Where we typically help" />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {i.where.map((w) => (
            <Card key={w.title} className="bg-paper">
              <h3 className="text-step-2">{w.title}</h3>
              <p className="mt-2.5 text-ink-soft m-0">{w.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-prose">
          <SectionHead title="Working within your constraints" />
          <p className="mt-5 text-ink-soft">{i.constraints}</p>
        </div>
        <div className="mt-10">
          <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-lime-deep">Related solutions</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {solutions.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="rounded-card border border-paper-edge bg-paper-raised px-4 py-2.5 font-display text-[0.9rem] font-bold text-steel hover:border-lime-deep"
              >
                {s.nav}
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
