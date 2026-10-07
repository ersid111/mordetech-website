import Link from 'next/link';
import type { ReactNode } from 'react';

export function Section({
  children, className = '', dark = false, id,
}: { children: ReactNode; className?: string; dark?: boolean; id?: string }) {
  return (
    <section id={id} className={`${dark ? 'on-dark bg-ground text-ink-invert' : ''} py-16 sm:py-20 ${className}`}>
      <div className="shell">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow, title, lede, as: As = 'h2',
}: { eyebrow?: string; title: string; lede?: string; as?: 'h1' | 'h2' }) {
  return (
    <div className="max-w-prose">
      {eyebrow && <p className="eyebrow m-0">{eyebrow}</p>}
      <As className={`${eyebrow ? 'mt-3' : ''} ${As === 'h1' ? 'text-step-5' : 'text-step-3'}`}>{title}</As>
      {lede && <p className="lede mt-4">{lede}</p>}
    </div>
  );
}

export function Button({
  href, children, variant = 'primary', external = false,
}: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; external?: boolean }) {
  const base =
    'inline-flex items-center justify-center rounded-card px-5 py-3 font-display text-[0.95rem] font-bold transition-colors';
  const styles = {
    primary: 'bg-blue text-white hover:bg-blue/90',
    secondary: 'bg-ground text-white hover:bg-ground-raised',
    ghost: 'btn-ghost',
  }[variant];

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={`${base} ${styles}`}>{children}</Link>;
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-card border border-paper-edge bg-paper-raised p-6 ${className}`}>
      {children}
    </div>
  );
}

/** Shown wherever a figure or client name is pending owner approval, so the gap
 *  is explicit rather than quietly filled with something unverified. */
export function PendingNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-card border border-dashed border-paper-edge bg-paper px-4 py-3 font-mono text-[0.76rem] text-ink-muted m-0">
      {children}
    </p>
  );
}
