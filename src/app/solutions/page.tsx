import Link from 'next/link';
import { Section, SectionHead, Button } from '@/components/ui';
import { solutions } from '@/content/solutions';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Solutions — PLC, SCADA, AI Vision, IIoT and Predictive Maintenance',
  description:
    'AI vision quality inspection, Siemens PLC and SCADA engineering, industrial IoT and OEE, and predictive maintenance with energy monitoring.',
  path: '/solutions',
});

export default function SolutionsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Solutions', path: '/solutions' }])} />
      <Section dark className="border-b-[3px] border-lime">
        <SectionHead
          as="h1"
          eyebrow="Solutions"
          title="Built for the plant you already have"
          lede="None of this requires replacing your control system. Each capability is added to what is running, integrated through it, and handed over with the documentation and source."
        />
      </Section>

      <Section>
        <div className="grid gap-6">
          {solutions.map((s) => (
            <article key={s.slug} className="rounded-card border border-paper-edge bg-paper-raised p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h2 className="text-step-3">
                  <Link href={`/solutions/${s.slug}`} className="text-ink hover:text-lime-deep transition-colors">
                    {s.title}
                  </Link>
                </h2>
                <p className="font-mono text-[0.76rem] text-lime-deep m-0">{s.outcome}</p>
              </div>
              <p className="mt-3 text-ink-soft max-w-prose">{s.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {s.stack.slice(0, 5).map((t) => (
                  <li key={t} className="rounded-card border border-paper-edge px-2.5 py-1 font-mono text-[0.72rem] text-ink-muted">
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-6"><Button href={`/solutions/${s.slug}`} variant="ghost">Read more</Button></div>
            </article>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHead title="Not sure which applies?" lede="A plant assessment identifies where the largest opportunity actually is, which is often not where it is assumed to be." />
        <div className="mt-7"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>
    </>
  );
}
