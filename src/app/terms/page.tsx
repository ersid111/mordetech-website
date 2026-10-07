import { Section, SectionHead } from '@/components/ui';
import { site } from '@/content/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Terms of Service',
  description: `Terms governing use of the ${site.legalName} website.`,
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <Section dark className="border-b-[3px] border-lime">
        <SectionHead as="h1" eyebrow="Legal" title="Terms of Service" />
        <p className="mt-4 font-mono text-[0.76rem] text-ink-invert/55 m-0">Last updated: October 2026</p>
      </Section>
      <Section>
        <div className="max-w-prose space-y-6 text-ink-soft">
          <p>These terms govern your use of <strong>{site.url.replace('https://', '')}</strong>, operated by {site.legalName}.</p>

          <h2 className="text-step-2 text-ink">1. Use of this website</h2>
          <p>Use it lawfully. Do not attempt to gain unauthorised access to it or its infrastructure, and do not scrape it automatically without permission.</p>

          <h2 className="text-step-2 text-ink">2. Intellectual property</h2>
          <p>The content, design and code of this website belong to {site.legalName}. Intellectual property in work we deliver to customers is governed by the agreement for that project; our standard position is that source code and documentation transfer to the customer on completion.</p>

          <h2 className="text-step-2 text-ink">3. Enquiries are not contracts</h2>
          <p>An enquiry or an estimate from this website does not form a contract. Work is governed by a separate written agreement covering scope, acceptance and commercial terms.</p>

          <h2 className="text-step-2 text-ink">4. Estimates and illustrative figures</h2>
          <p>The ROI calculator produces an estimate from figures you enter. It is illustrative only, shows gross savings before system and running costs, and is not a quotation or a performance guarantee. Actual results depend on your process, your parts and conditions established during a proof of concept.</p>

          <h2 className="text-step-2 text-ink">5. No warranty on the website</h2>
          <p>This website is provided as is. We do not warrant uninterrupted or error-free access. This does not limit obligations under any project agreement.</p>

          <h2 className="text-step-2 text-ink">6. Safety</h2>
          <p>Nothing on this website should be read as suggesting that automation, analytics or AI replaces safety interlocks, engineering review, or human responsibility for safe plant operation.</p>

          <h2 className="text-step-2 text-ink">7. Governing law</h2>
          <p>These terms are governed by the laws of India, subject to the exclusive jurisdiction of the courts of {site.address.city}, {site.address.region}.</p>

          <h2 className="text-step-2 text-ink">8. Contact</h2>
          <p><a href={`mailto:${site.email}`} className="text-steel underline">{site.email}</a> · <a href={site.phoneHref} className="text-steel underline">{site.phone}</a></p>
        </div>
      </Section>
    </>
  );
}
