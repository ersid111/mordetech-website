'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { primaryNav } from '@/lib/nav';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Close on route change so the menu never persists across navigation.
  // Adjusted during render rather than in an effect: setting state inside an
  // effect would commit the open menu first and then close it, which React
  // flags as a cascading render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Escape closes and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Trap focus inside the open panel; without this, tabbing walks the page
  // behind the overlay, which is disorienting with a screen reader.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusables[0]?.focus();
    const onTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    panel.addEventListener('keydown', onTab);
    return () => panel.removeEventListener('keydown', onTab);
  }, [open]);

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <header className="on-dark sticky top-0 z-50 bg-ground/95 backdrop-blur border-b border-ground-edge">
      <div className="shell flex items-center justify-between gap-6 h-[72px]">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label={`MordeTech Solutions — home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.svg" alt="" width={30} height={30} className="block" />
          <span className="font-display font-extrabold text-[1.2rem] tracking-tight text-ink-invert">
            Morde<span className="text-lime">Tech</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(item.href) ? 'page' : undefined}
                  className={`font-mono text-[0.76rem] uppercase tracking-[0.1em] transition-colors hover:text-lime ${
                    isCurrent(item.href) ? 'text-lime' : 'text-ink-invert/65'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block shrink-0">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-card bg-lime px-4 py-2.5 font-display text-[0.86rem] font-bold text-ground hover:bg-lime/90 transition-colors"
          >
            Book a Plant Assessment
          </Link>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden inline-flex items-center gap-2 rounded-card border border-ground-edge px-3 py-2.5 text-ink-invert"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="font-mono text-[0.72rem] uppercase tracking-[0.1em]">{open ? 'Close' : 'Menu'}</span>
          <span aria-hidden="true" className="text-lime">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div id="mobile-menu" ref={panelRef} className="lg:hidden border-t border-ground-edge bg-ground">
          <nav aria-label="Primary mobile" className="shell py-5">
            <ul className="flex flex-col">
              {primaryNav.map((item) => (
                <li key={item.href} className="border-b border-ground-edge/60 last:border-0">
                  <Link
                    href={item.href}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    className={`block py-3.5 font-display text-[1.05rem] ${
                      isCurrent(item.href) ? 'text-lime' : 'text-ink-invert'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex w-full items-center justify-center rounded-card bg-lime px-4 py-3.5 font-display font-bold text-ground"
            >
              Book a Plant Assessment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
