import type { Solution } from './types';

export const solutions: Solution[] = [
  {
    slug: 'ai-vision-inspection',
    title: 'AI Vision Quality Inspection',
    nav: 'AI Vision Inspection',
    summary:
      'Cameras and trained models that judge every part at line speed, so defects are caught at the station that produced them.',
    outcome:
      'Catch the defect where it is made, not at final inspection or at the customer.',
    problems: [
      'Defects found at final inspection after value has already been added',
      'Sampling misses intermittent faults that only appear at speed',
      'Inspection consistency drops across shifts and operators',
      'No usable record of what failed, when, or on which station',
    ],
    capabilities: [
      { title: 'Surface and dimensional checks', body: 'Scratches, porosity, burrs, weld quality, print and label verification, presence and absence, dimensional gauging against tolerance.' },
      { title: 'Line-speed decisions', body: 'Inference runs on an industrial edge device beside the line. The verdict reaches the PLC in time to divert the part on the same cycle.' },
      { title: 'Trained on your parts', body: 'Models are built from images of your own production, including the defects your team actually sees, rather than a generic library.' },
      { title: 'Evidence for every call', body: 'Each decision stores the image and the reason, so quality can review borderline cases and argue from the record.' },
      { title: 'Operator-facing, not a black box', body: 'HMI screens show why a part failed. Operators can flag a wrong call, and those corrections feed the next training round.' },
    ],
    stack: ['Industrial cameras and controlled lighting', 'Edge inference hardware', 'PyTorch / ONNX', 'Siemens S7-1500 integration', 'OPC UA to MES or SCADA'],
    integration: [
      'The vision station is added alongside the existing line, not in place of it',
      'Reject handling is wired through the PLC so existing safety interlocks are untouched',
      'Runs locally; a network outage does not stop inspection',
    ],
    faqs: [
      { q: 'What is required for an AI vision proof of concept?', a: 'Sample parts covering good production and the defect types you care about, access to the station for mounting and lighting trials, and agreement on what counts as a defect. A proof of concept establishes whether the defect is reliably visible under production conditions before any line changes are committed.' },
      { q: 'Does production data leave the facility?', a: 'Not unless you choose it. Inference runs on an edge device inside the plant. Images and results stay on your network by default. If you want remote dashboards, we agree exactly what is sent and how it is secured before anything is configured.' },
    ],
  },
  {
    slug: 'smart-automation',
    title: 'Smart Automation: PLC, SCADA and Modernization',
    nav: 'Smart Automation',
    summary:
      'Siemens PLC and SCADA engineering, and migration of ageing control systems without losing the process knowledge built into them.',
    outcome: 'Modernize control without re-learning the plant.',
    problems: [
      'Controllers past support with no spares and no one left who wrote the logic',
      'Undocumented changes made over years of production',
      'HMI screens that operators have learned to work around',
      'Migration risk that keeps getting deferred',
    ],
    capabilities: [
      { title: 'PLC programming', body: 'Siemens TIA Portal and SIMATIC, structured and documented so the next engineer can read it. Logic is reviewed with the people who run the line.' },
      { title: 'Legacy migration', body: 'Existing logic is captured and understood before anything is replaced. The process knowledge in an old program is usually the most valuable thing in the cabinet.' },
      { title: 'SCADA and HMI', body: 'WinCC and WinCC Unified screens built around what the operator must decide, with alarm rationalisation so that alarms mean something again.' },
      { title: 'Commissioning discipline', body: 'FAT before it ships, SAT on site, operator and maintenance training, and documentation handed over as a deliverable rather than a promise.' },
      { title: 'Changeover planning', body: 'Cutover is planned around your shutdown window. Where possible the new system runs in parallel before it takes control.' },
    ],
    stack: ['Siemens TIA Portal', 'SIMATIC S7-1200 / S7-1500', 'WinCC and WinCC Unified', 'Allen-Bradley and Mitsubishi where required', 'OPC UA'],
    integration: [
      'Existing field devices and wiring are reused wherever they are sound',
      'Safety functions are engineered and reviewed separately from process logic',
      'You receive the source, the documentation and the rights to both',
    ],
    faqs: [
      { q: 'Can the system integrate with existing Siemens PLCs?', a: 'Yes. Most work is on plants that already run Siemens controllers, and the usual task is extending or modernizing what is there rather than replacing it. Allen-Bradley, Mitsubishi and Schneider controllers are also supported where a plant is mixed.' },
      { q: 'Will the plant need to stop for implementation?', a: 'Most of the work happens off-line: engineering, configuration and factory acceptance testing before anything reaches your floor. On-site work is planned around a shutdown window you choose, and the scope of that window is agreed in writing before commissioning.' },
    ],
  },
  {
    slug: 'industrial-iot-oee',
    title: 'Industrial IoT, OEE and Connected Operations',
    nav: 'IIoT & OEE',
    summary:
      'Machine data collected at the source and turned into numbers a shift meeting can act on.',
    outcome: 'One version of what the line actually did last shift.',
    problems: [
      'Production numbers assembled by hand, disputed in the meeting',
      'Downtime reasons recorded on paper, if at all',
      'Each machine an island with its own protocol',
      'Reports that arrive too late to change anything',
    ],
    capabilities: [
      { title: 'Collect at the source', body: 'Data is read from the controller, not re-keyed. Where a machine has no digital output, signals are instrumented directly.' },
      { title: 'OEE that survives scrutiny', body: 'Availability, performance and quality calculated from machine state with the definitions agreed up front, so the number is not re-argued every month.' },
      { title: 'Downtime with reasons', body: 'Stoppages captured automatically and attributed by the operator from a short, maintained list. Reason codes are only useful if they are quick to enter.' },
      { title: 'Dashboards per audience', body: 'The line sees the current shift. The plant head sees the week. Each view answers the question its reader actually has.' },
      { title: 'Your data, your platform', body: 'Built on open components. The historian and dashboards remain yours to run, extend or move.' },
    ],
    stack: ['OPC UA', 'MQTT', 'InfluxDB', 'Grafana', 'Edge gateways', 'Siemens and third-party PLC connectivity'],
    integration: [
      'Read-only from control systems by default; collection cannot disturb production',
      'Deployed on your network or your cloud account, not a tenancy we control',
      'Historian retention and backup agreed before go-live',
    ],
    faqs: [
      { q: 'Which industrial protocols do you support?', a: 'OPC UA and MQTT are the usual backbone. Siemens S7 communication, Modbus TCP and RTU, Profinet and Profibus via gateway, and file or database integration for older systems. Where a machine exposes nothing usable, we instrument the signals directly.' },
    ],
  },
  {
    slug: 'predictive-maintenance-energy',
    title: 'Predictive Maintenance and Energy Monitoring',
    nav: 'Predictive & Energy',
    summary:
      'Condition monitoring that raises a work order before a failure, and energy measurement detailed enough to act on.',
    outcome: 'Fewer surprises, and an energy bill you can attribute to a machine.',
    problems: [
      'Breakdowns discovered when the line stops',
      'Maintenance scheduled by calendar rather than condition',
      'Energy billed as one plant total with no way to attribute it',
      'No early signal between a healthy machine and a failed one',
    ],
    capabilities: [
      { title: 'Condition monitoring', body: 'Vibration, temperature, current and pressure trended per asset, with thresholds derived from that machine rather than a textbook.' },
      { title: 'Early warning, routed', body: 'A developing fault raises a maintenance notification with the evidence attached, not an alarm that someone has to notice.' },
      { title: 'Energy by machine', body: 'Sub-metering at the line or machine level so consumption can be attributed, compared across shifts, and tied to output.' },
      { title: 'Baseline and drift', body: 'Consumption per unit produced, tracked over time, so a drifting machine shows up as a cost rather than a feeling.' },
    ],
    stack: ['Vibration and current sensing', 'Edge collection', 'InfluxDB and Grafana', 'Sub-metering hardware', 'CMMS and work-order integration'],
    integration: [
      'Sensors are added without modifying the machine control',
      'Alerts route into your existing maintenance process rather than a new inbox',
      'Thresholds are tuned with maintenance before alerting is switched on',
    ],
    faqs: [
      { q: 'How do you validate a solution before commissioning?', a: 'Factory acceptance testing against an agreed specification, then site acceptance testing on your floor with your parts and your operators. For monitoring and vision systems we also run a shadow period where the system reports but does not act, so its judgement can be compared against reality before it is trusted.' },
    ],
  },
];

export const solutionBySlug = (slug: string) => solutions.find((s) => s.slug === slug);
