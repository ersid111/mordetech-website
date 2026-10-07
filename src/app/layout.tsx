import type { Metadata } from 'next';
import { Barlow, Source_Sans_3, DM_Mono } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { JsonLd, organizationSchema } from '@/lib/seo';
import { site } from '@/content/site';
import './globals.css';

// Self-hosted at build time by next/font: no third-party request on page load,
// and no layout shift from a late-arriving font file.
const display = Barlow({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-display', display: 'swap' });
const body = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-body', display: 'swap' });
const mono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Industrial Automation & Industry 4.0 | Pune`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  formatDetection: { telephone: true, email: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport = { themeColor: '#10161D', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:left-4 focus:top-4 focus:rounded-card focus:bg-lime focus:px-4 focus:py-2.5 focus:font-display focus:font-bold focus:text-ground"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        <JsonLd data={organizationSchema()} />
      </body>
    </html>
  );
}
