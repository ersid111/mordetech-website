import Link from 'next/link'
import Image from 'next/image'

const cols = [
  {
    title: 'Solutions',
    links: [
      { href: '/ai-solutions', label: 'AI Vision QC' },
      { href: '/ai-solutions', label: 'Predictive Maintenance' },
      { href: '/ai-solutions', label: 'Process Optimization' },
      { href: '/services',     label: 'PLC Programming' },
      { href: '/services',     label: 'SCADA / HMI' },
      { href: '/services',     label: 'IIoT Integration' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about',          label: 'About Us'              },
      { href: '/support',        label: 'Support Plans (AMC)'   },
      { href: '/case-study-1',   label: 'Case Studies'          },
      { href: '/sustainability',  label: 'Sustainability'        },
      { href: '/careers',        label: 'Careers'               },
      { href: '/news',           label: 'News'                  },
      { href: '/privacy',        label: 'Privacy Policy'        },
      { href: '/terms',          label: 'Terms of Service'      },
    ],
  },
  {
    title: 'Contact',
    links: [
      { href: 'tel:+919404030215',                   label: '+91 94040 30215'                 },
      { href: 'mailto:mordetechsolutions@zohomail.in', label: 'mordetechsolutions@zohomail.in' },
      {
        href: 'https://maps.google.com/?q=Hinjewadi+Phase+2+Pune+Maharashtra',
        label: 'Hinjewadi, Pune, India',
        external: true,
      },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg">
      <div className="max-w-[1200px] mx-auto px-6 md:px-[60px] py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <Image src="/images/logo.svg" alt="MordeTech Logo" width={32} height={32} />
              <span className="font-display font-[800] text-[1.2rem] tracking-[-0.02em] bg-grad-cyan bg-clip-text text-transparent">
                Morde<em className="not-italic" style={{ WebkitTextFillColor: '#7b2fff' }}>Tech</em>
              </span>
            </Link>
            <p className="text-muted text-[0.92rem] leading-[1.7] mb-6 max-w-[240px]">
              Engineering Intelligent Automation. Siemens PLC, AI Vision & IIoT for world-class manufacturers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:mordetechsolutions@zohomail.in"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-cyan hover:border-cyan/30 transition-all font-mono text-sm"
                aria-label="Email"
              >
                @
              </a>
              <a
                href="https://wa.me/919404030215"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-muted hover:text-[#25D366] hover:border-[#25D366]/30 transition-all text-sm"
                aria-label="WhatsApp"
              >
                W
              </a>
            </div>
          </div>

          {/* Nav cols */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <h5 className="font-mono text-[0.75rem] text-muted uppercase tracking-[0.15em] mb-5">
                {title}
              </h5>
              <ul className="flex flex-col gap-3">
                {links.map(({ href, label, external }) => (
                  <li key={label}>
                    {external ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-text2 text-[0.9rem] hover:text-cyan transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        href={href}
                        className="text-text2 text-[0.9rem] hover:text-cyan transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/[0.06] py-5 px-6 md:px-[60px]">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-muted text-[0.85rem]">
            © 2025 MordeTech Solutions Pvt. Ltd. Founded by Priyanka Morde. All rights reserved.
          </p>
          <div className="flex items-center gap-2 font-mono text-[0.72rem] text-muted/60 tracking-[0.06em]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-blink" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}
