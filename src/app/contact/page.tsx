import { Section, SectionHead } from '@/components/ui';
import { LeadForm } from '@/components/LeadForm';
import { site, whatsappHref } from '@/content/site';
import { pageMeta, JsonLd, breadcrumbSchema, faqSchema } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Book a Plant Assessment',
  description:
    'Arrange a plant assessment with MordeTech Solutions. Talk to us about automation, AI vision inspection, OEE or predictive maintenance. Pune, India.',
  path: '/contact',
});

const FAQS = [
  { q: 'What happens in a plant assessment?', a: 'We walk the line with your team and look at where quality is lost, where availability goes, and what data already exists in your control systems. You get our read on the largest opportunity, whether or not you engage us for the work.' },
  { q: 'Can the system integrate with existing Siemens PLCs?', a: 'Yes. Most of our work is on plants already running Siemens controllers, and the usual task is extending or modernizing what is there rather than replacing it. Allen-Bradley, Mitsubishi and Schneider are supported where a plant is mixed.' },
  { q: 'Will the plant need to stop for implementation?', a: 'Most work happens off-line: engineering, configuration and factory acceptance testing before anything reaches your floor. On-site work is planned around a shutdown window you choose, and its scope is agreed in writing before commissioning.' },
  { q: 'Does production data leave the facility?', a: 'Not unless you choose it. Collection and inference run on the edge inside your plant. If you want remote dashboards, we agree exactly what is sent and how it is secured before anything is configured.' },
  { q: 'Who owns the code and the data?', a: 'You do. Source code, PLC programs, SCADA screens, models and design documents are handed over on completion, and your process data is yours throughout.' },
  { q: 'Which industrial protocols do you support?', a: 'OPC UA and MQTT are the usual backbone, alongside Siemens S7 communication, Modbus TCP and RTU, and Profinet or Profibus via gateway. Where a machine exposes nothing usable, we instrument the signals directly.' },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]),
          faqSchema(FAQS),
        ]}
      />

      <Section dark className="border-b-[3px] border-blue-light">
        <SectionHead
          as="h1"
          eyebrow="Get in touch"
          title="Book a plant assessment"
          lede="Tell us what you make and what is going wrong. We will come back with what we would look at first."
        />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div><LeadForm /></div>

          <aside className="space-y-5">
            <div className="rounded-card border border-paper-edge bg-paper-raised p-6">
              <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-blue-deep m-0">Direct</h2>
              <ul className="mt-4 space-y-3.5 m-0 list-none p-0">
                <li>
                  <a href={site.phoneHref} className="font-display text-[1.1rem] font-bold text-ink hover:text-blue-deep">
                    {site.phone}
                  </a>
                  <p className="text-step--1 text-ink-muted m-0">Phone and WhatsApp</p>
                </li>
                <li>
                  <a href={`mailto:${site.email}`} className="text-blue-deep underline break-all">{site.email}</a>
                  <p className="text-step--1 text-ink-muted m-0">Email</p>
                </li>
                <li>
                  <a href={whatsappHref('Hello MordeTech — I would like to arrange a plant assessment.')}
                     target="_blank" rel="noopener noreferrer"
                     className="inline-flex items-center rounded-card bg-ground px-4 py-2.5 font-display text-[0.9rem] font-bold text-white hover:bg-ground-raised">
                    Message on WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div className="rounded-card border border-paper-edge bg-paper-raised p-6">
              <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-blue-deep m-0">Office</h2>
              <address className="mt-3 not-italic text-ink-soft">
                {site.legalName}<br />
                {site.address.locality}<br />
                {site.address.city}, {site.address.region}<br />
                {site.address.countryName}
              </address>
            </div>
          </aside>
        </div>
      </Section>

      <Section className="bg-paper-raised border-y border-paper-edge">
        <SectionHead title="Questions we are usually asked" />
        <div className="mt-8 max-w-prose divide-y divide-paper-edge">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="cursor-pointer list-none font-display text-[1.05rem] font-bold flex justify-between gap-4">
                {f.q}
                <span aria-hidden="true" className="text-blue-deep transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink-soft m-0">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
    </>
  );
}
