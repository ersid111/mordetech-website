import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },

  // The previous site's URLs keep their search ranking. Permanent so engines
  // transfer signals rather than treating these as temporary.
  async redirects() {
    return [
      { source: '/ai-solutions', destination: '/solutions/ai-vision-inspection', permanent: true },
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/solutions.html', destination: '/solutions', permanent: true },
      { source: '/demo', destination: '/solutions/industrial-iot-oee', permanent: true },
      { source: '/case-study-1', destination: '/case-studies/ai-vision-stamping-line', permanent: true },
      { source: '/case-study-2', destination: '/case-studies/oee-predictive-press-shop', permanent: true },
      { source: '/case-study-3', destination: '/case-studies/legacy-plc-scada-migration', permanent: true },
      { source: '/news', destination: '/about', permanent: true },
      { source: '/sustainability', destination: '/about', permanent: true },
      { source: '/careers', destination: '/about', permanent: true },
      // Old extension-bearing URLs.
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/services.html', destination: '/solutions', permanent: true },
      { source: '/ai-solutions.html', destination: '/solutions/ai-vision-inspection', permanent: true },
      { source: '/support.html', destination: '/support', permanent: true },
      { source: '/privacy.html', destination: '/privacy', permanent: true },
      { source: '/terms.html', destination: '/terms', permanent: true },
      { source: '/case-studies.html', destination: '/case-studies', permanent: true },
      { source: '/demo.html', destination: '/solutions/industrial-iot-oee', permanent: true },
      { source: '/news.html', destination: '/about', permanent: true },
      { source: '/careers.html', destination: '/about', permanent: true },
      { source: '/sustainability.html', destination: '/about', permanent: true },
      { source: '/solutions.html', destination: '/solutions', permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
