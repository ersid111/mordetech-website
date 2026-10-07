import { Section, SectionHead, Button, Card, PendingNote } from '@/components/ui';
import { pageMeta, JsonLd, breadcrumbSchema, serviceSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Plant Support and Annual Maintenance',
  description:
    'Support for the systems we commission: remote monitoring, scheduled site visits, software updates and emergency response. Scoped per plant.',
  path: '/support',
});

const INCLUDES = [
  { title: 'Remote support', body: 'Diagnosis and configuration changes without waiting for a site visit, over an access route your IT team approves.' },
  { title: 'Scheduled visits', body: 'Planned on-site checks at an agreed interval, timed around your production calendar rather than ours.' },
  { title: 'Software updates', body: 'Updates to the systems we supplied, tested before they reach your production environment.' },
  { title: 'Emergency response', body: 'A defined response path for production-stopping faults, with the commitment stated in your agreement.' },
  { title: 'Operator refreshers', body: 'Training for new staff and after changes, because turnover is the most common reason a good system stops being used well.' },
  { title: 'Documentation upkeep', body: 'Drawings and specifications updated as the system changes, so the handover pack stays true.' },
];

export default function SupportPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Support', path: '/support' }]),
          serviceSchema('Plant Support and Annual Maintenance', 'Support and maintenance for commissioned industrial automation systems.', '/support'),
        ]}
      />

      <Section dark className="border-b-[3px] border-blue-light">
        <SectionHead
          as="h1"
          eyebrow="Support"
          title="A system is only as good as its second year"
          lede="Commissioning is the start. What determines whether a system still earns its place in year three is how it is supported, updated and taught to new staff."
        />
      </Section>

      <Section>
        <SectionHead title="What support covers" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INCLUDES.map((i) => (
            <Card key={i.title}>
              <h3 className="text-step-2">{i.title}</h3>
              <p className="mt-2.5 text-ink-soft m-0">{i.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <div className="max-w-prose">
          <SectionHead title="How agreements are scoped" />
          <p className="mt-5 text-ink-soft">
            Support is scoped per plant: which systems are covered, what response time applies to
            which severity, how access is arranged, and what sits outside the agreement. Response
            commitments are written into the agreement rather than advertised, because a figure that
            is not contractual is not a commitment.
          </p>
          <PendingNote>
            Pricing is not published. Every plant differs in scope, coverage hours and access
            arrangements, so an agreement is quoted after we understand what is being covered.
          </PendingNote>
        </div>
        <div className="mt-9"><Button href="/contact">Discuss a support agreement</Button></div>
      </Section>
    </>
  );
}
