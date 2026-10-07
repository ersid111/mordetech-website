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
        ground: { DEFAULT: '#10161D', raised: '#19222B', edge: '#243039' },
        paper: { DEFAULT: '#F4F5F2', raised: '#FFFFFF', edge: '#DDE1DB' },
        // muted is darkened from #6B7A84, which measured 4.05:1 on paper — below AA.
        ink: { DEFAULT: '#131A20', soft: '#39464F', muted: '#5C6971', invert: '#E8EDEF' },
        // Single accent, from machine guarding and hi-vis workwear.
        // `deep` is the text-safe lime: the bright accent measures 2.89:1 on paper,
        // so it is used for fills and on dark grounds only, never for body text.
        lime: { DEFAULT: '#B4DE28', deep: '#5A7005', wash: '#F0F7D8' },
        steel: { DEFAULT: '#3E6E8E', light: '#7FB2D0', wash: '#E6EEF3' },
        signal: { ok: '#3C6B45', warn: '#A8630A', crit: '#A32018' },
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
