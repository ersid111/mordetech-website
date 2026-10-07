import type { Metadata } from 'next';
import { site } from '@/content/site';

export function pageMeta({
  title, description, path, noIndex = false,
}: { title: string; description: string; path: string; noIndex?: boolean }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title, description, url, siteName: site.name, locale: 'en_IN', type: 'website',
      images: [{ url: `${site.url}/images/og-preview.png`, width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: 'summary_large_image', title, description },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/images/logo.svg`,
    description: site.description,
    foundingDate: site.founded,
    founder: { '@type': 'Person', name: site.people.founder.name, jobTitle: site.people.founder.role },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.locality,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    telephone: site.phone,
    email: site.email,
    areaServed: { '@type': 'Country', name: 'India' },
    knowsAbout: [
      'PLC programming', 'SCADA', 'HMI development', 'WinCC', 'Machine vision',
      'Predictive maintenance', 'Industrial IoT', 'OPC UA', 'MQTT', 'OEE', 'Energy monitoring',
    ],
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem', position: i + 1, name: t.name, item: `${site.url}${t.path}`,
    })),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name, description,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <>
      {payload.map((d, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }}
        />
      ))}
    </>
  );
}
