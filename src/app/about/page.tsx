import { Section, SectionHead, Button, Card, PendingNote } from '@/components/ui';
import { site } from '@/content/site';
import { pageMeta, JsonLd, breadcrumbSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'About MordeTech Solutions',
  description:
    'Founded in 2012 in Pune, MordeTech Solutions builds industrial automation and Industry 4.0 systems for manufacturing plants. Engineering-led, documentation-first.',
  path: '/about',
});

const VALUES = [
  { title: 'The plant comes first', body: 'A solution that production works around is a failed solution. We design for the operator on the night shift, not the demo.' },
  { title: 'Documentation is a deliverable', body: 'Source code, drawings and specifications are handed over, not promised. The next engineer should not need us to read the system.' },
  { title: 'Safety stays separate', body: 'Analytics and AI inform decisions. They are never placed in a safety loop, and they never replace engineering review or operator responsibility.' },
  { title: 'Your data is yours', body: 'Systems run on your network or your cloud account. Where data moves, you decide what moves and see how it is secured.' },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }])} />

      <Section dark className="border-b-[3px] border-lime">
        <SectionHead
          as="h1"
          eyebrow="About"
          title="Engineers who have run the commissioning"
          lede={`${site.legalName} was founded in ${site.founded} in ${site.address.city}, building automation and plant data systems for manufacturers.`}
        />
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div className="max-w-prose">
            <SectionHead title="Why the company exists" />
            <p className="mt-5 text-ink-soft">
              Plants rarely lack data. They lack data in a form anyone can act on before the shift
              ends. Control systems know what happened; the knowledge stays in the cabinet, and the
              shift meeting argues about numbers assembled by hand.
            </p>
            <p className="text-ink-soft">
              MordeTech was founded to close that gap with engineering rather than dashboards —
              starting at the controller, respecting what is already running, and handing over
              systems a plant can maintain without us.
            </p>
          </div>

          <div className="space-y-5">
            <Card>
              <h3 className="text-step-2">{site.people.founder.name}</h3>
              <p className="font-mono text-[0.74rem] text-lime-deep mt-1 m-0">{site.people.founder.role}</p>
              <p className="mt-3 text-ink-soft m-0">
                Founded MordeTech in {site.founded} after years in industrial automation, having seen
                how often good engineering fails at adoption rather than at design.
              </p>
            </Card>
            <Card>
              <h3 className="text-step-2">{site.people.engineeringLead.name}</h3>
              <p className="font-mono text-[0.74rem] text-lime-deep mt-1 m-0">{site.people.engineeringLead.role}</p>
              <p className="mt-3 text-ink-soft m-0">
                Leads the software side: edge collection, vision pipelines, dashboards and the
                integrations that connect them to the control layer.
              </p>
            </Card>
          </div>
        </div>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead title="How we work" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {VALUES.map((v) => (
            <Card key={v.title} className="bg-paper">
              <h3 className="text-step-2">{v.title}</h3>
              <p className="mt-2.5 text-ink-soft m-0">{v.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section>
        <div className="max-w-prose">
          <SectionHead title="Credentials" />
          <p className="mt-5 text-ink-soft">
            Our engineers hold Siemens product training in TIA Portal and SIMATIC. We work to
            automotive and pharmaceutical customers&rsquo; quality-system requirements for
            documentation, change control and validation support.
          </p>
          <PendingNote>
            Formal certifications, partner-programme status and customer references are listed only
            once verified. If you need evidence for a supplier-onboarding pack, ask and we will send
            exactly what we hold.
          </PendingNote>
        </div>
        <div className="mt-9"><Button href="/contact">Book a Plant Assessment</Button></div>
      </Section>
    </>
  );
}
