/**
 * Approved business facts. These were confirmed with the owner and are safe to
 * publish. Anything NOT in this file, and not carrying `verified: true` in the
 * content files, must not appear as a statement of fact on the site.
 */
export const site = {
  name: 'MordeTech Solutions',
  legalName: 'MordeTech Solutions Pvt. Ltd.',
  url: 'https://mordetech.com',
  founded: '2012',
  tagline: 'Industrial automation and Industry 4.0 for manufacturing plants',
  description:
    'Siemens PLC and SCADA engineering, AI vision inspection, and plant data systems that reduce defects, downtime and energy cost.',
  phone: '+91 94040 30215',
  phoneHref: 'tel:+919404030215',
  email: 'mordetechsolutions@zohomail.in',
  address: {
    locality: 'Hinjewadi Phase 2',
    city: 'Pune',
    region: 'Maharashtra',
    country: 'IN',
    countryName: 'India',
  },
  people: {
    founder: { name: 'Priyanka Morde', role: 'Founder & Director' },
    engineeringLead: { name: 'Amrut Dhappadhule', role: 'Software Development Lead' },
  },
} as const;

export function whatsappHref(message: string): string {
  return `https://wa.me/919404030215?text=${encodeURIComponent(message)}`;
}

export const WA_DEFAULT =
  'Hello MordeTech — I would like to discuss automation for my plant.';
