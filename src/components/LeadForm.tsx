'use client';

import { useEffect, useRef, useState } from 'react';
import { validateLead } from '@/lib/lead-schema';
import { site, whatsappHref } from '@/content/site';
import { solutions } from '@/content/solutions';

type Status = 'idle' | 'submitting' | 'sent' | 'error';

const FIELD =
  'w-full rounded-card border border-paper-edge bg-paper-raised px-3.5 py-2.5 text-ink placeholder:text-ink-muted/70 focus-visible:border-blue-deep';

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const renderedAt = useRef(0);
  const liveRef = useRef<HTMLDivElement>(null);

  // Set on mount rather than render, so a prerendered page cannot bake in a
  // stale timestamp that would make every submission look instantaneous.
  useEffect(() => { renderedAt.current = Date.now(); }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.renderedAt = String(renderedAt.current);

    const local = validateLead(payload);
    if (!local.ok) {
      setErrors(local.errors);
      setStatus('error');
      // Move focus to the first field with a problem so a keyboard or screen
      // reader user is not left guessing what failed.
      const firstKey = Object.keys(local.errors)[0];
      (form.elements.namedItem(firstKey) as HTMLElement | null)?.focus?.();
      return;
    }

    setErrors({});
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus('sent');
        form.reset();
      } else {
        setErrors(data.errors ?? { form: 'Something went wrong. Please try WhatsApp or email.' });
        setStatus('error');
        liveRef.current?.focus();
      }
    } catch {
      setErrors({ form: 'We could not reach the server. Please try WhatsApp or email.' });
      setStatus('error');
      liveRef.current?.focus();
    }
  }

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-card border border-signal-ok/40 bg-paper-raised p-7">
        <h3 className="text-step-2 text-signal-ok">Message received</h3>
        <p className="mt-3 text-ink-soft m-0">
          Thank you — we have your enquiry and will come back to you by email or phone. If it is
          urgent, WhatsApp reaches us fastest.
        </p>
      </div>
    );
  }

  const err = (k: string) => errors[k];

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div
        ref={liveRef}
        tabIndex={-1}
        role="alert"
        aria-live="assertive"
        className={err('form') ? 'rounded-card border border-signal-crit/40 bg-paper-raised p-4 text-signal-crit' : 'sr-only'}
      >
        {err('form') ?? ''}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" required error={err('name')}>
          <input id="name" name="name" type="text" autoComplete="name" required
            aria-invalid={!!err('name')} aria-describedby={err('name') ? 'name-error' : undefined}
            className={FIELD} />
        </Field>
        <Field id="company" label="Company" error={err('company')}>
          <input id="company" name="company" type="text" autoComplete="organization" className={FIELD} />
        </Field>
        <Field id="email" label="Email" required error={err('email')}>
          <input id="email" name="email" type="email" autoComplete="email" required
            aria-invalid={!!err('email')} aria-describedby={err('email') ? 'email-error' : undefined}
            className={FIELD} />
        </Field>
        <Field id="phone" label="Phone" required error={err('phone')}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required
            aria-invalid={!!err('phone')} aria-describedby={err('phone') ? 'phone-error' : undefined}
            className={FIELD} />
        </Field>
      </div>

      <Field id="interest" label="What is this about?" error={err('interest')}>
        <select id="interest" name="interest" className={FIELD} defaultValue="">
          <option value="">Not sure yet</option>
          {solutions.map((s) => <option key={s.slug} value={s.nav}>{s.nav}</option>)}
          <option value="Plant assessment">Plant assessment</option>
          <option value="Support / AMC">Support / AMC</option>
        </select>
      </Field>

      <Field id="message" label="The plant and the problem" required error={err('message')}
        hint="What you make, the line involved, and what is going wrong. A couple of sentences is plenty.">
        <textarea id="message" name="message" rows={5} required
          aria-invalid={!!err('message')} aria-describedby={`message-hint${err('message') ? ' message-error' : ''}`}
          className={FIELD} />
      </Field>

      {/* Honeypot. Hidden from sight and from assistive technology, so only a
          script fills it. Not display:none, which some bots detect. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="inline-flex items-center justify-center rounded-card bg-blue px-6 py-3.5 font-display font-bold text-white hover:bg-blue/90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Sending…' : 'Request a plant assessment'}
      </button>

      <p className="text-step--1 text-ink-muted m-0">
        Prefer to talk?{' '}
        <a href={whatsappHref('Hello MordeTech — I would like to arrange a plant assessment.')}
           target="_blank" rel="noopener noreferrer" className="text-blue-deep underline">WhatsApp us</a>{' '}
        or call <a href={site.phoneHref} className="text-blue-deep underline">{site.phone}</a>.
      </p>
    </form>
  );
}

function Field({
  id, label, required, error, hint, children,
}: {
  id: string; label: string; required?: boolean; error?: string; hint?: string; children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-muted">
        {label}{required && <span className="text-signal-crit"> *</span>}
      </label>
      {hint && <p id={`${id}-hint`} className="mt-1 mb-2 text-step--1 text-ink-muted m-0">{hint}</p>}
      <div className={hint ? '' : 'mt-2'}>{children}</div>
      {error && <p id={`${id}-error`} className="mt-1.5 text-step--1 text-signal-crit m-0">{error}</p>}
    </div>
  );
}
