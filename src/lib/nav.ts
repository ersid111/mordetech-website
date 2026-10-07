export type NavItem = { href: string; label: string; children?: NavItem[] };

/** One source of truth for navigation. The header, footer and sitemap all read
 *  this, so a link cannot exist in one and be missing from another. */
export const primaryNav: NavItem[] = [
  {
    href: '/solutions',
    label: 'Solutions',
    children: [
      { href: '/solutions/ai-vision-inspection', label: 'AI Vision Inspection' },
      { href: '/solutions/smart-automation', label: 'Smart Automation' },
      { href: '/solutions/industrial-iot-oee', label: 'IIoT & OEE' },
      { href: '/solutions/predictive-maintenance-energy', label: 'Predictive & Energy' },
    ],
  },
  { href: '/industries', label: 'Industries' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/support', label: 'Support' },
  { href: '/about', label: 'About' },
];

export const footerNav = {
  Solutions: [
    { href: '/solutions/ai-vision-inspection', label: 'AI Vision Inspection' },
    { href: '/solutions/smart-automation', label: 'Smart Automation' },
    { href: '/solutions/industrial-iot-oee', label: 'IIoT & OEE' },
    { href: '/solutions/predictive-maintenance-energy', label: 'Predictive & Energy' },
  ],
  Industries: [
    { href: '/industries/cement-grinding', label: 'Cement & Grinding' },
    { href: '/industries/automotive-discrete', label: 'Automotive & Discrete' },
    { href: '/industries/chemical-process', label: 'Chemical & Process' },
    { href: '/industries/food-beverage', label: 'Food & Beverage' },
    { href: '/industries/pharma', label: 'Pharma' },
    { href: '/industries/industrial-oems', label: 'Industrial OEMs' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/support', label: 'Plant Support' },
    { href: '/contact', label: 'Contact' },
  ],
};
