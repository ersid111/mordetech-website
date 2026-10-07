import Link from 'next/link';
import { Section, SectionHead, Button } from '@/components/ui';
import { industries } from '@/content/industries';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Industries — Cement, Automotive, Chemical, Food, Pharma, OEMs',
  description:
    'Industrial automation for cement, automotive, chemical and process, food and beverage, pharmaceutical plants and industrial OEMs.',
  path: '/industries',
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Industries', path: '/industries' }])} />
      <Section dark className="border-b-[3px] border-lime">
        <SectionHead
          as="h1"
          eyebrow="Industries"
          title="The constraints change more than the engineering does"
          lede="A vision system in a pharma packing hall and one on a stamping line solve similar problems under very different rules. What differs is the environment, the regulatory load, and what an hour of downtime costs."
        />
      </Section>

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="group rounded-card border border-paper-edge bg-paper-raised p-6 transition-colors hover:border-lime-deep"
            >
              <h2 className="text-step-2 group-hover:text-lime-deep transition-colors">{i.title}</h2>
              <p className="mt-2.5 text-ink-soft m-0">{i.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {i.pressures.slice(0, 2).map((p) => (
                  <li key={p} className="rounded-card border border-paper-edge px-2.5 py-1 font-mono text-[0.7rem] text-ink-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHead title="Your sector not listed?" lede="The underlying work — control, vision, data, condition monitoring — applies across discrete and process manufacturing. Tell us what you run." />
        <div className="mt-7"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>
    </>
  );
}
