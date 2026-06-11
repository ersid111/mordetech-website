/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#020408',
        bg2:     '#060d18',
        cyan:    '#00d4ff',
        blue:    '#0066ff',
        purple:  '#7b2fff',
        green:   '#00ff88',
        red:     '#ff4d4d',
        muted:   '#4a6a8a',
        text2:   '#a0bdd0',
      },
      fontFamily: {
        sans:    ['var(--font-display)', 'DM Sans', 'sans-serif'],
        mono:    ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
        display: ['var(--font-display)', 'DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'grid': `
          linear-gradient(to right, rgba(0,130,220,0.045) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0,130,220,0.045) 1px, transparent 1px)
        `,
        'grad-cyan': 'linear-gradient(135deg, #00d4ff, #0066ff)',
        'grad-brand': 'linear-gradient(135deg, #00d4ff, #0066ff, #7b2fff)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
        blink: {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0 },
        },
        gradShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        treeGlow: {
          '0%,100%': {
            filter: 'drop-shadow(0 0 14px rgba(0,212,255,.65)) drop-shadow(0 0 32px rgba(0,102,255,.28))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 30px rgba(0,212,255,1)) drop-shadow(0 0 60px rgba(0,102,255,.55)) drop-shadow(0 0 90px rgba(123,47,255,.32))',
          },
        },
        ringCW: {
          from: { transform: 'translate(-50%,-50%) rotate(0deg)' },
          to:   { transform: 'translate(-50%,-50%) rotate(360deg)' },
        },
        orb: {
          '0%,100%': { transform: 'translate(-50%,-50%) scale(1)', opacity: '.65' },
          '50%':     { transform: 'translate(-50%,-50%) scale(1.5)', opacity: '1' },
        },
        kRise: {
          '0%':   { transform: 'translateY(0) scale(1)', opacity: '.9' },
          '85%':  { opacity: '.2' },
          '100%': { transform: 'translateY(-380px) scale(.1)', opacity: '0' },
        },
      },
      animation: {
        float:     'float 4s ease-in-out infinite',
        blink:     'blink 1.4s infinite',
        gradShift: 'gradShift 4s ease-in-out infinite',
        treeGlow:  'treeGlow 4s ease-in-out infinite',
        ringCW:    'ringCW 32s linear infinite',
        ringCCW:   'ringCW 21s linear infinite reverse',
        orb:       'orb 4s ease-in-out infinite',
        kRise:     'kRise linear infinite',
      },
    },
  },
  plugins: [],
}
