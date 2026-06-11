import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://mordetech.com'),
  title: {
    default: 'MordeTech Solutions — Engineering Intelligent Automation',
    template: '%s | MordeTech Solutions',
  },
  description:
    'MordeTech Solutions — Siemens PLC automation, AI machine vision, SCADA/HMI, and IIoT systems for world-class manufacturers. Founded by Priyanka Morde. Pune, India.',
  keywords: [
    'PLC automation Pune',
    'SCADA system integrator India',
    'AI machine vision manufacturing',
    'industrial automation company Pune',
    'OPC UA integration',
    'IIoT solutions India',
    'Siemens TIA Portal',
    'AI quality inspection',
    'predictive maintenance',
    'smart factory India',
  ],
  authors: [{ name: 'Priyanka Morde', url: 'https://mordetech.com/about' }],
  creator: 'MordeTech Solutions Pvt. Ltd.',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://mordetech.com',
    siteName: 'MordeTech Solutions',
    title: 'MordeTech Solutions — Engineering Intelligent Automation',
    description:
      'World-class Siemens PLC automation, AI machine vision, and smart factory systems for the next era of manufacturing.',
    images: [
      {
        url: '/images/og-preview.svg',
        width: 1200,
        height: 630,
        alt: 'MordeTech Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MordeTech Solutions — Engineering Intelligent Automation',
    description:
      'World-class Siemens PLC automation, AI machine vision, and smart factory systems.',
    images: ['/images/og-preview.svg'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#020408',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'MordeTech Solutions Pvt. Ltd.',
              description:
                'Siemens PLC automation, AI machine vision, SCADA/HMI, and IIoT systems for world-class manufacturers.',
              url: 'https://mordetech.com',
              logo: 'https://mordetech.com/favicon.svg',
              founder: { '@type': 'Person', name: 'Priyanka Morde' },
              foundingDate: '2012',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Hinjewadi Phase 2',
                addressLocality: 'Pune',
                addressRegion: 'Maharashtra',
                postalCode: '411057',
                addressCountry: 'IN',
              },
              telephone: '+919404030215',
              email: 'mordetechsolutions@zohomail.in',
              openingHours: 'Mo-Sa 09:00-18:30',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body>
        <div id="cursor" />
        <div id="cursor-ring" />
        <div id="progress" />
        {children}
      </body>
    </html>
  )
}
