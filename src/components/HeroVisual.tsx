/**
 * Hero visual.
 *
 * A quiet instrument motif rather than a stock photograph or a fake dashboard:
 * a sampled signal settling into tolerance, drawn as inline SVG so it costs no
 * request, shifts no layout, and stays sharp at any size.
 *
 * TO REPLACE WITH REAL PHOTOGRAPHY: swap this component for a next/image of a
 * control panel, vision station or plant floor, keeping the same aspect ratio.
 * See README → "Replacing the hero visual".
 */
export function HeroVisual() {
  // A deterministic trace: noisy early, tightening after the correction point.
  const points: string[] = [];
  const W = 520, H = 300, mid = H / 2;
  for (let i = 0; i <= 104; i++) {
    const x = (i / 104) * W;
    const settle = i < 46 ? 1 : Math.max(0.12, 1 - (i - 46) / 34);
    const wobble =
      Math.sin(i * 0.9) * 26 * settle +
      Math.sin(i * 2.3) * 11 * settle +
      Math.sin(i * 0.31) * 7 * settle;
    points.push(`${x.toFixed(1)},${(mid + wobble).toFixed(1)}`);
  }

  return (
    <div aria-hidden="true" className="relative select-none">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="presentation" focusable="false">
        <defs>
          <linearGradient id="trace" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F4F6E" />
            <stop offset="58%" stopColor="#5B9DE8" />
            <stop offset="100%" stopColor="#7FB4F0" />
          </linearGradient>
          <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="#1D3348" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width={W} height={H} fill="url(#grid)" />

        {/* Tolerance band: the window the process is meant to stay inside. */}
        <rect x="0" y={mid - 16} width={W} height="32" fill="#E0A271" opacity="0.08" />
        <line x1="0" y1={mid - 16} x2={W} y2={mid - 16} stroke="#E0A271" strokeWidth="1" strokeDasharray="4 5" opacity="0.45" />
        <line x1="0" y1={mid + 16} x2={W} y2={mid + 16} stroke="#E0A271" strokeWidth="1" strokeDasharray="4 5" opacity="0.45" />

        <polyline points={points.join(' ')} fill="none" stroke="url(#trace)" strokeWidth="2.25" strokeLinejoin="round" strokeLinecap="round" />

        {/* The moment the correction lands. */}
        <line x1={(46 / 104) * W} y1="26" x2={(46 / 104) * W} y2={H - 26} stroke="#E0A271" strokeWidth="1" opacity="0.4" />
        <circle cx={(46 / 104) * W} cy={mid} r="4" fill="#E0A271" />
        <circle cx={W - 6} cy={mid} r="3.5" fill="#E0A271" />
      </svg>

      <div className="mt-4 flex flex-wrap gap-x-7 gap-y-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink-invert/45">
        <span><span className="text-blue-light">—</span> Process signal</span>
        <span><span className="text-blue-light">▮</span> Tolerance band</span>
        <span><span className="text-blue-light">|</span> Correction applied</span>
      </div>
    </div>
  );
}
