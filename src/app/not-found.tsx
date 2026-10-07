import Link from 'next/link';
import { Section, Button } from '@/components/ui';
import { primaryNav } from '@/lib/nav';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <Section dark className="min-h-[60vh] flex items-center">
      <div className="max-w-prose">
        <p className="eyebrow m-0">404</p>
        <h1 className="mt-3 text-step-4">That page is not here.</h1>
        <p className="mt-5 text-step-1 text-ink-invert/75">
          The link may be out of date, or the page may have moved during our site rebuild. These
          are the main sections:
        </p>
        <ul className="mt-7 flex flex-wrap gap-3 list-none p-0">
          {primaryNav.map((n) => (
            <li key={n.href}>
              <Link href={n.href} className="inline-flex rounded-card border border-ground-edge px-4 py-2.5 font-display text-[0.9rem] font-bold text-ink-invert hover:border-lime hover:text-lime">
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-9"><Button href="/contact">Book a Plant Assessment</Button></div>
      </div>
    </Section>
  );
}
