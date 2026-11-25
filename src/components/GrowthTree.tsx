/**
 * Hero animation: the plant's signal chain drawn as a growing tree.
 *
 * The company mark is a tree whose branches carry circular nodes, so this
 * animates the brand rather than decorating around it. Each part carries
 * meaning: roots are instruments on the machine, the trunk is control, the
 * branches are data moving, the nodes are measurement points, the canopy is
 * the decision that comes back.
 *
 * Pure SVG and CSS, no JavaScript and no video: a few KB rather than several
 * megabytes, sharp at any size, and it cannot block rendering. The whole
 * sequence runs once over about four seconds and then rests — nothing loops,
 * because a permanently moving page undercuts the calm this brand needs.
 *
 * Under prefers-reduced-motion every element is shown in its final state with
 * no animation at all (see globals.css).
 */
export function GrowthTree() {
  // Branch tips carry the nodes, so the two lists stay in step.
  const branches = [
    { d: 'M260,322 C230,306 198,296 166,288', node: null },
    { d: 'M260,328 C290,312 322,302 354,294', node: null },
    { d: 'M260,272 C234,252 210,234 192,212', node: null },
    { d: 'M260,266 C286,246 310,228 328,206', node: null },
    { d: 'M260,226 C243,202 229,182 223,158', node: [223, 158] },
    { d: 'M260,220 C277,196 291,176 297,152', node: [297, 152] },
    { d: 'M260,188 C251,166 245,146 245,126', node: [245, 126] },
    { d: 'M260,186 C269,164 275,146 276,124', node: [276, 124] },
  ] as const;

  // Twigs off the lower branches, so the canopy reads as a tree rather than a fork.
  const twigs = [
    { d: 'M166,288 C152,276 143,262 140,246', node: [140, 246] },
    { d: 'M354,294 C368,282 377,268 380,252', node: [380, 252] },
    { d: 'M192,212 C180,200 173,186 171,172', node: [171, 172] },
    { d: 'M328,206 C340,194 347,180 349,166', node: [349, 166] },
  ] as const;

  const roots = [
    'M260,362 C234,376 206,384 174,388',
    'M260,362 C286,376 314,384 346,388',
    'M260,362 C257,380 254,394 253,408',
  ] as const;

  return (
    <figure className="m-0 growth">
      <figcaption className="sr-only">
        An illustration of a plant&rsquo;s signal chain drawn as a tree: instruments on the
        machine form the roots, control systems the trunk, data streams the branches, and
        measurement points the nodes, leading to insight returned to the floor.
      </figcaption>

      <svg viewBox="0 0 520 430" className="w-full h-auto" role="presentation" focusable="false">
        <defs>
          {/* userSpaceOnUse, not the default objectBoundingBox: the trunk is a
              perfectly vertical line, so its bounding box has zero width and a
              bounding-box gradient collapses — the stroke would not paint. */}
          <linearGradient id="gt-trunk" gradientUnits="userSpaceOnUse" x1="260" y1="366" x2="260" y2="104">
            <stop offset="0%" stopColor="#3E6E9E" />
            <stop offset="55%" stopColor="#0B62BF" />
            <stop offset="100%" stopColor="#A8CEF7" />
          </linearGradient>
          <pattern id="gt-grid" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="#1D3348" strokeWidth="1" />
          </pattern>
        </defs>

        <rect width="520" height="430" fill="url(#gt-grid)" />

        {/* Registration brackets, taken from the logo's frame. */}
        <g stroke="#1D3348" strokeWidth="1.5" fill="none">
          <path d="M14,46 V14 H46" /><path d="M474,14 H506 V46" />
          <path d="M506,384 V416 H474" /><path d="M46,416 H14 V384" />
        </g>

        {/* Floor line the roots sit in. */}
        <line x1="62" y1="362" x2="458" y2="362" stroke="#1D3348" strokeWidth="1.5" className="gt-floor" />

        {roots.map((d, i) => (
          <path key={d} d={d} fill="none" stroke="#3E6E9E" strokeWidth="2.6" strokeLinecap="round"
            className="gt-draw gt-root" style={{ animationDelay: `${0.15 + i * 0.12}s` }} />
        ))}

        <path d="M260,366 L260,182" fill="none" stroke="url(#gt-trunk)" strokeWidth="5"
          strokeLinecap="round" className="gt-draw gt-trunk" />

        {branches.map((b, i) => (
          <path key={b.d} d={b.d} fill="none" stroke="url(#gt-trunk)" strokeWidth="2.9"
            strokeLinecap="round" className="gt-draw gt-branch"
            style={{ animationDelay: `${1.5 + i * 0.14}s` }} />
        ))}

        <path d="M260,182 L260,104" fill="none" stroke="#A8CEF7" strokeWidth="3"
          strokeLinecap="round" className="gt-draw gt-crown" />

        {twigs.map((t, i) => (
          <path key={t.d} d={t.d} fill="none" stroke="#7FB4F0" strokeWidth="2.1"
            strokeLinecap="round" className="gt-draw gt-twig"
            style={{ animationDelay: `${2.5 + i * 0.12}s` }} />
        ))}

        {[...branches.filter((b) => b.node), ...twigs].map((b, i) => (
          <circle key={`n${i}`} cx={b.node![0]} cy={b.node![1]} r="5.5" fill="#0A1826"
            stroke="#A8CEF7" strokeWidth="2.2" className="gt-node"
            style={{ animationDelay: `${3.1 + i * 0.1}s` }} />
        ))}

        {/* The measured result, returned. Copper marks data, as everywhere else. */}
        <circle cx="260" cy="104" r="7" fill="#E0A271" className="gt-node gt-fruit"
          style={{ animationDelay: '4.1s' }} />
      </svg>

      <ol className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-ink-invert/50 list-none p-0 m-0">
        <li><span className="text-blue-light">01</span> Instruments</li>
        <li><span className="text-blue-light">02</span> PLC &amp; SCADA</li>
        <li><span className="text-blue-light">03</span> Data streams</li>
        <li><span className="text-copper-light">04</span> Insight returned</li>
      </ol>
    </figure>
  );
}
