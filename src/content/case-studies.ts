import type { CaseStudy } from './types';

/**
 * Results are withheld until the customer approves publication. The numbers that
 * were on the previous site (94% defect reduction, OEE 61 to 83, and similar)
 * are intentionally absent: they had no stated sample size, period or customer
 * sign-off. Set `verified: true` with a `source`, and `clientApproved: true`,
 * once the owner confirms each one. Until then the page shows the engineering
 * scope, which stands on its own, and says plainly that figures are pending.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'ai-vision-stamping-line',
    title: 'AI vision inspection on a high-speed stamping line',
    sector: 'Automotive supplier',
    scope: 'Vision station, edge inference, PLC reject integration, operator HMI',
    timeframe: 'Pending confirmation',
    challenge:
      'Surface defects on stamped parts were being found at final inspection, after several further operations had already added cost to parts that would be scrapped. Manual sampling could not cover every part at line speed, and intermittent faults passed through between samples.',
    solution: [
      'Industrial cameras and controlled lighting mounted at the forming station',
      'A model trained on images of the line’s own good production and its real defect types',
      'Inference on an edge device beside the line, with the verdict returned to the PLC within the cycle',
      'Reject handling wired through the existing PLC so safety interlocks were untouched',
      'Operator HMI showing the reason for each rejection, with a route to flag incorrect calls',
    ],
    results: [],
    clientApproved: false,
    clientNote: 'Customer name and measured results awaiting written approval.',
  },
  {
    slug: 'oee-predictive-press-shop',
    title: 'OEE visibility and vibration-based predictive maintenance in a press shop',
    sector: 'Mid-size press shop',
    scope: 'Machine data collection, OEE dashboards, vibration monitoring, maintenance alerting',
    timeframe: 'Pending confirmation',
    challenge:
      'Production figures were assembled by hand and disputed at the shift meeting. Downtime reasons were recorded on paper when there was time. Press failures were discovered when a line stopped, and maintenance was scheduled by calendar rather than condition.',
    solution: [
      'Data collected directly from the controllers rather than re-keyed',
      'OEE calculated from machine state with definitions agreed with production before go-live',
      'Automatic downtime capture with a short operator-maintained reason list',
      'Vibration and temperature monitoring on the presses with per-asset thresholds',
      'Alerts routed into the existing maintenance process as work notifications',
    ],
    results: [],
    clientApproved: false,
    clientNote: 'Customer name and measured results awaiting written approval.',
  },
  {
    slug: 'legacy-plc-scada-migration',
    title: 'Legacy PLC migration and SCADA modernization',
    sector: 'Process plant',
    scope: 'Controller migration, SCADA rebuild, alarm rationalisation, FAT and SAT',
    timeframe: 'Pending confirmation',
    challenge:
      'Controllers were past support with no spares available, and the engineers who wrote the original logic had left. Years of undocumented changes meant the program was the only remaining record of how the process actually ran, and the migration risk had been deferred repeatedly.',
    solution: [
      'Existing logic captured and documented before any replacement was designed',
      'Process behaviour reviewed with the operators who run the plant daily',
      'New controllers engineered in TIA Portal with structured, commented code',
      'SCADA screens rebuilt around operator decisions, with alarms rationalised',
      'Factory acceptance testing before shipment, then site acceptance testing during an agreed shutdown window',
      'Source code, documentation and rights handed over on completion',
    ],
    results: [],
    clientApproved: false,
    clientNote: 'Customer name and measured results awaiting written approval.',
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((c) => c.slug === slug);
