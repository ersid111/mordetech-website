'use client';

import { Section, Button } from '@/components/ui';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <Section dark className="min-h-[60vh] flex items-center">
      <div className="max-w-prose">
        <p className="eyebrow m-0">Something went wrong</p>
        <h1 className="mt-3 text-step-4">This page failed to load.</h1>
        <p className="mt-5 text-step-1 text-ink-invert/75">
          The error has been logged. You can retry, or reach us directly — that route does not
          depend on this page working.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-card bg-lime px-5 py-3 font-display font-bold text-ground hover:bg-lime/90"
          >
            Try again
          </button>
          <Button href="/contact" variant="secondary">Contact us</Button>
        </div>
      </div>
    </Section>
  );
}
