const STAGES = [
  { n: '01', title: 'Sensors & instruments', body: 'Vibration, temperature, current, vision, flow — measured at the machine.' },
  { n: '02', title: 'PLC & SCADA', body: 'Control executes. Siemens S7, WinCC, existing safety interlocks untouched.' },
  { n: '03', title: 'Secure data layer', body: 'OPC UA and MQTT move data read-only to an edge gateway inside your network.' },
  { n: '04', title: 'Analytics & AI', body: 'Historian, OEE calculation, condition models, vision inference at the edge.' },
  { n: '05', title: 'Action on the floor', body: 'A reject diverted, a work order raised, a dashboard the shift meeting trusts.' },
];

export function SignalChain() {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        How plant data becomes a business result: sensors and instruments feed the PLC and SCADA
        layer, a secure data layer moves that data to analytics and AI, and the result becomes an
        action on the plant floor.
      </figcaption>
      <ol className="grid gap-px bg-ground-edge sm:grid-cols-2 lg:grid-cols-5 rounded-card overflow-hidden border border-ground-edge">
        {STAGES.map((s, i) => (
          <li key={s.n} className="bg-ground-raised p-5 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[0.7rem] text-lime">{s.n}</span>
              {i < STAGES.length - 1 && (
                <span aria-hidden="true" className="hidden lg:block h-px flex-1 bg-lime/30" />
              )}
            </div>
            <h3 className="mt-3 font-display text-[1rem] text-ink-invert">{s.title}</h3>
            <p className="mt-2 text-step--1 text-ink-invert/65 m-0">{s.body}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}
