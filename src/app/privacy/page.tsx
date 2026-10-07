import { Section, SectionHead } from '@/components/ui';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: `How ${site.legalName} collects, uses and protects personal information submitted through this website.`,
  path: '/privacy',
});

export default function PrivacyPage() {
  const updated = 'October 2026';
  return (
    <>
      <Section dark className="border-b-[3px] border-blue-light">
        <SectionHead as="h1" eyebrow="Legal" title="Privacy Policy" />
        <p className="mt-4 font-mono text-[0.76rem] text-ink-invert/55 m-0">Last updated: {updated}</p>
      </Section>
      <Section>
        <div className="prose-custom max-w-prose space-y-6 text-ink-soft">
          <p>{site.legalName} (&ldquo;MordeTech&rdquo;, &ldquo;we&rdquo;) protects the personal information you share with us. This policy explains what we collect through <strong>{site.url.replace('https://', '')}</strong> and what we do with it.</p>

          <h2 className="text-step-2 text-ink">1. What we collect</h2>
          <p>Only what you submit: your name, company, email address, phone number, the area of interest you select, and the message you write. We do not require an account and we do not collect anything else about you.</p>

          <h2 className="text-step-2 text-ink">2. How we use it</h2>
          <p>To respond to your enquiry and, if it leads to work, to carry out that work. We do not sell, rent or trade your information.</p>

          <h2 className="text-step-2 text-ink">3. How it reaches us</h2>
          <p>Form submissions are posted to our website server, validated, and forwarded to the inbox or system configured to receive enquiries. Where that forwarding uses a third-party form service, their handling of the message applies in addition to this policy.</p>

          <h2 className="text-step-2 text-ink">4. Analytics and cookies</h2>
          <p>This website sets no analytics or advertising cookies. We do not track you across sites. If that changes, this policy will be updated and consent requested before any tracking begins.</p>

          <h2 className="text-step-2 text-ink">5. Retention</h2>
          <p>Enquiry correspondence is kept for as long as it is commercially relevant, and deleted on request.</p>

          <h2 className="text-step-2 text-ink">6. Your rights</h2>
          <p>You may ask what we hold about you, ask for it to be corrected or deleted, and withdraw consent at any time. Email <a href={`mailto:${site.email}`} className="text-blue-deep underline">{site.email}</a>.</p>

          <h2 className="text-step-2 text-ink">7. Customer production data</h2>
          <p>This policy covers the website. Production and process data from systems we build is governed by the agreement for that project: it stays within your facility unless you specifically ask for it to be sent elsewhere, and it remains yours throughout.</p>

          <h2 className="text-step-2 text-ink">8. Contact</h2>
          <p>{site.legalName}, {site.address.locality}, {site.address.city}, {site.address.region}, {site.address.countryName}. <a href={`mailto:${site.email}`} className="text-blue-deep underline">{site.email}</a> · <a href={site.phoneHref} className="text-blue-deep underline">{site.phone}</a></p>
        </div>
      </Section>
    </>
  );
}
