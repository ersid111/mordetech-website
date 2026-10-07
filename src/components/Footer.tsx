import Link from 'next/link';
import { footerNav } from '@/lib/nav';
import { site, whatsappHref, WA_DEFAULT } from '@/content/site';

export function Footer() {
  // Derived, never hardcoded: the previous site shipped "© 2025" into 2026.
  const year = new Date().getFullYear();

  return (
    <footer className="on-dark bg-ground text-ink-invert">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.svg" alt="" width={28} height={28} />
              <span className="font-display font-extrabold text-[1.1rem]">
                Morde<span className="text-blue-light">Tech</span>
              </span>
            </div>
            <p className="mt-3 text-step--1 text-ink-invert/65 max-w-[34ch]">
              Industrial automation and Industry 4.0 engineering for manufacturing plants.
            </p>
            <address className="mt-5 not-italic text-step--1 text-ink-invert/65 space-y-1.5">
              <div>{site.address.locality}, {site.address.city}, {site.address.region}, {site.address.countryName}</div>
              <div><a href={site.phoneHref} className="hover:text-blue-light">{site.phone}</a></div>
              <div><a href={`mailto:${site.email}`} className="hover:text-blue-light break-all">{site.email}</a></div>
            </address>
          </div>

          {Object.entries(footerNav).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <h2 className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-blue-light">{heading}</h2>
              <ul className="mt-3.5 space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-step--1 text-ink-invert/70 hover:text-blue-light">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-ground-edge pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-step--1 text-ink-invert/55 m-0">
            © {year} {site.legalName}. Founded by {site.people.founder.name}.
          </p>
          <div className="flex flex-wrap gap-5 text-step--1">
            <Link href="/privacy" className="text-ink-invert/65 hover:text-blue-light">Privacy</Link>
            <Link href="/terms" className="text-ink-invert/65 hover:text-blue-light">Terms</Link>
            <a href={whatsappHref(WA_DEFAULT)} target="_blank" rel="noopener noreferrer" className="text-ink-invert/65 hover:text-blue-light">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
