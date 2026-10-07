import Link from 'next/link';
import { Section, SectionHead, Button, Card } from '@/components/ui';
import { SignalChain } from '@/components/SignalChain';
import { HeroVisual } from '@/components/HeroVisual';
import { solutions } from '@/content/solutions';
import { industries } from '@/content/industries';
import { caseStudies } from '@/content/case-studies';
import { site, whatsappHref } from '@/content/site';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Industrial Automation & Industry 4.0 for Manufacturing Plants',
  description:
    'Siemens PLC and SCADA engineering, AI vision inspection, OEE and predictive maintenance for manufacturing plants. Pune, India.',
  path: '/',
});

const PROBLEMS = [
  { title: 'Quality escapes', body: 'A defect found at final inspection has already absorbed every operation after the one that caused it. Found at the customer, it costs the relationship as well.' },
  { title: 'Unplanned downtime', body: 'The stoppage itself is rarely the expensive part. It is the shift that cannot be recovered, the order that moves, and the overtime to catch up.' },
  { title: 'Fragmented plant data', body: 'Production numbers assembled by hand are disputed in the meeting. Time goes into agreeing what happened instead of deciding what to do.' },
  { title: 'Rising energy cost', body: 'Energy billed as one plant total cannot be attributed, so there is no way to tell an efficient line from a drifting one.' },
];

const DELIVERY = [
  { n: '01', title: 'Discover', body: 'Walk the floor, watch a shift, agree what the real constraint is before proposing anything.' },
  { n: '02', title: 'Engineer', body: 'Design and build off-line. Logic, screens and models developed against an agreed specification.' },
  { n: '03', title: 'Integrate', body: 'Install into the existing line. Safety functions reviewed separately and left intact.' },
  { n: '04', title: 'Validate', body: 'Factory acceptance before shipment, site acceptance on your floor with your parts and operators.' },
  { n: '05', title: 'Support', body: 'Training, documentation and source handed over. Support arrangements agreed, not assumed.' },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }])} />

      {/* Hero */}
      <section className="on-dark bg-ground text-ink-invert border-b-[3px] border-lime">
        <div className="shell py-20 sm:py-28 grid items-center gap-14 lg:grid-cols-[1.08fr_1fr]">
          <div>
          <p className="eyebrow m-0">Industrial automation &amp; Industry 4.0 · {site.address.city}, India</p>
          <h1 className="mt-5 text-step-5 max-w-[16ch]">Make every shift more predictable.</h1>
          <p className="mt-6 text-step-1 text-ink-invert/75 max-w-[58ch]">
            MordeTech combines control engineering, machine vision and plant data so manufacturers
            can see what their lines are doing — and reduce the defects, downtime and energy cost
            that follow from not knowing.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact">Book a Plant Assessment</Button>
            <Button href="/solutions" variant="ghost">Explore Solutions</Button>
          </div>
          <p className="mt-7 font-mono text-[0.76rem] text-ink-invert/50 m-0">
            Siemens PLC &amp; SCADA · AI vision inspection · OPC UA · MQTT · OEE · Predictive maintenance
          </p>
          </div>
          <HeroVisual />
        </div>
      </section>

      {/* Problems */}
      <Section>
        <SectionHead
          eyebrow="What this costs you"
          title="Four problems that show up on the P&L"
          lede="Every plant has these. The difference is whether you can see them early enough to act."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {PROBLEMS.map((p) => (
            <Card key={p.title}>
              <h3 className="text-step-2">{p.title}</h3>
              <p className="mt-2.5 text-ink-soft m-0">{p.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Solutions */}
      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead
          eyebrow="What we build"
          title="Four capabilities, one plant"
          lede="Each is useful alone. Together they give a plant one consistent picture of itself."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {solutions.map((s) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              className="group rounded-card border border-paper-edge bg-paper p-6 transition-colors hover:border-lime-deep"
            >
              <h3 className="text-step-2 group-hover:text-lime-deep transition-colors">{s.nav}</h3>
              <p className="mt-1.5 font-mono text-[0.76rem] text-lime-deep m-0">{s.outcome}</p>
              <p className="mt-3 text-ink-soft m-0">{s.summary}</p>
              <p className="mt-4 font-display text-[0.9rem] font-bold text-steel m-0">Read more →</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Architecture */}
      <Section dark>
        <SectionHead
          eyebrow="How it fits together"
          title="From machine signal to business result"
          lede="Nothing here replaces your control system or your safety functions. It reads what the plant already knows and puts it where a decision gets made."
        />
        <div className="mt-10"><SignalChain /></div>
        <p className="mt-6 font-mono text-[0.76rem] text-ink-invert/50 max-w-prose">
          Protocols: OPC UA · MQTT · Siemens S7 · Modbus TCP/RTU · Profinet &amp; Profibus via gateway
        </p>
      </Section>

      {/* Industries */}
      <Section>
        <SectionHead
          eyebrow="Where we work"
          title="Industries"
          lede="The engineering differs less than the constraints do. What changes is the environment, the regulatory load and what a stoppage costs."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((i) => (
            <Link
              key={i.slug}
              href={`/industries/${i.slug}`}
              className="rounded-card border border-paper-edge bg-paper-raised p-5 transition-colors hover:border-lime-deep"
            >
              <h3 className="font-display text-[1.05rem]">{i.nav}</h3>
              <p className="mt-2 text-step--1 text-ink-soft m-0">{i.summary}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Case studies */}
      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead
          eyebrow="Selected work"
          title="What the engineering actually involved"
          lede="Scope and approach, described plainly. Measured results and customer names are published only once the customer has approved them in writing."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="rounded-card border border-paper-edge bg-paper p-6 transition-colors hover:border-lime-deep"
            >
              <p className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-lime-deep m-0">{c.sector}</p>
              <h3 className="mt-2.5 font-display text-[1.08rem] leading-snug">{c.title}</h3>
              <p className="mt-3 text-step--1 text-ink-soft m-0 line-clamp-4">{c.challenge}</p>
              <p className="mt-4 font-display text-[0.9rem] font-bold text-steel m-0">Read the case →</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Delivery */}
      <Section>
        <SectionHead
          eyebrow="How we work"
          title="Delivery method"
          lede="Industrial projects fail at integration and adoption far more often than at engineering. The method is built around that."
        />
        <ol className="mt-10 grid gap-px bg-paper-edge sm:grid-cols-2 lg:grid-cols-5 rounded-card overflow-hidden border border-paper-edge">
          {DELIVERY.map((d) => (
            <li key={d.n} className="bg-paper-raised p-5">
              <span className="font-mono text-[0.7rem] text-lime-deep">{d.n}</span>
              <h3 className="mt-2.5 font-display text-[1rem]">{d.title}</h3>
              <p className="mt-2 text-step--1 text-ink-soft m-0">{d.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Conversion */}
      <Section dark>
        <div className="max-w-[62ch]">
          <p className="eyebrow m-0">Next step</p>
          <h2 className="mt-3 text-step-4">Find the largest opportunity in your plant.</h2>
          <p className="mt-5 text-step-1 text-ink-invert/75">
            A plant assessment is a structured walk of your line with your team: where quality is
            lost, where availability goes, and what data already exists. You get our read on the
            biggest opportunity, whether or not you engage us for the work.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact">Book a Plant Assessment</Button>
            <Button href={whatsappHref('Hello MordeTech — I would like to arrange a plant assessment.')} variant="secondary" external>
              WhatsApp the team
            </Button>
            <a href={site.phoneHref} className="inline-flex items-center px-5 py-3 font-display text-[0.95rem] font-bold text-ink-invert/80 hover:text-lime">
              {site.phone}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
