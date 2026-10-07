import type { Config } from 'tailwindcss';

/**
 * Design tokens. Every colour, type step and radius used in the site is declared
 * here; components never hardcode a hex value. Changing the brand is a change to
 * this file, not a find-and-replace across pages.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep navy foundation. Reads as engineering and scale rather than
        // startup; the restraint is what makes it feel global.
        ground: { DEFAULT: '#0A1826', raised: '#11263A', edge: '#1D3348' },
        paper: { DEFAULT: '#F7F8FA', raised: '#FFFFFF', edge: '#DDE3EA' },
        ink: { DEFAULT: '#0F1C28', soft: '#33424F', muted: '#5A6875', invert: '#E9EEF3' },
        // One accent. `DEFAULT` is the fill (white on it measures 5.98:1),
        // `deep` is the text-safe variant on paper, `light` the variant on navy.
        blue: { DEFAULT: '#0B62BF', deep: '#0A56A8', light: '#7FB4F0', wash: '#E8F0FA' },
        // Copper is reserved for figures and data labels, never for chrome.
        copper: { DEFAULT: '#8A4F20', light: '#E0A271', wash: '#F8EFE6' },
        signal: { ok: '#2F6B46', warn: '#8A5A12', crit: '#9B2420' },
      },
      fontFamily: {
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'step--1': ['0.84rem', { lineHeight: '1.5' }],
        'step-0': ['1rem', { lineHeight: '1.65' }],
        'step-1': ['1.15rem', { lineHeight: '1.55' }],
        'step-2': ['clamp(1.35rem,2.2vw,1.6rem)', { lineHeight: '1.3' }],
        'step-3': ['clamp(1.7rem,3.2vw,2.2rem)', { lineHeight: '1.2' }],
        'step-4': ['clamp(2.1rem,4.6vw,3rem)', { lineHeight: '1.12' }],
        'step-5': ['clamp(2.5rem,6vw,4rem)', { lineHeight: '1.06' }],
      },
      maxWidth: { prose: '68ch', shell: '1140px' },
      borderRadius: { card: '4px' },
    },
  },
  plugins: [],
};
export default config;
