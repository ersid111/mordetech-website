import type { Industry } from './types';

export const industries: Industry[] = [
  {
    slug: 'cement-grinding',
    title: 'Cement and Grinding',
    nav: 'Cement & Grinding',
    summary: 'Continuous process, heavy energy load, and equipment that is expensive to stop.',
    pressures: ['Power and fuel as a dominant cost line', 'Mill and kiln availability', 'Quality consistency across varying feed', 'Dust and vibration hostile to instrumentation'],
    where: [
      { title: 'Energy per tonne', body: 'Sub-metering at mill and section level so specific energy consumption can be attributed and trended against output.' },
      { title: 'Equipment condition', body: 'Vibration and temperature monitoring on mills, crushers and fans, with thresholds learned per asset.' },
      { title: 'Process visibility', body: 'SCADA consolidation so control room staff see the section as one picture rather than several panels.' },
    ],
    constraints: 'Instrumentation is specified for dust, heat and vibration. Collection is read-only from the control system so monitoring can never interfere with a running kiln or mill.',
  },
  {
    slug: 'automotive-discrete',
    title: 'Automotive and Discrete Manufacturing',
    nav: 'Automotive & Discrete',
    summary: 'High volume, tight tolerance, and a customer who measures you on parts per million.',
    pressures: ['Defect escapes reaching the customer', 'Traceability demands from OEM customers', 'Cycle-time pressure on every station', 'Changeover frequency across variants'],
    where: [
      { title: 'In-line vision inspection', body: 'Surface, dimensional and presence checks at the station that creates the feature, with the image retained as evidence.' },
      { title: 'Traceability', body: 'Part-level records linking station, time, operator and inspection result, exportable for customer audit.' },
      { title: 'OEE by line and variant', body: 'Availability, performance and quality split by variant so changeover losses are visible.' },
    ],
    constraints: 'Work is planned around automotive quality-system expectations for documentation, change control and validation. Inspection is additive to existing poka-yoke and safety systems, never a replacement.',
  },
  {
    slug: 'chemical-process',
    title: 'Chemical and Process Industries',
    nav: 'Chemical & Process',
    summary: 'Continuous operation where a control change is a safety question first.',
    pressures: ['Safety and environmental compliance', 'Batch consistency and yield', 'Ageing control systems past support', 'Long qualification cycles for any change'],
    where: [
      { title: 'Control modernization', body: 'Migration of ageing controllers with the existing process logic captured and understood before anything is replaced.' },
      { title: 'Batch and parameter records', body: 'Automatic capture of process parameters per batch, removing manual logging from the operator.' },
      { title: 'Alarm rationalisation', body: 'Reducing alarm floods so that an alarm again means something requiring action.' },
    ],
    constraints: 'Safety instrumented functions are engineered and reviewed separately from process control. We do not place AI or analytics in any safety loop, and monitoring is read-only unless a control change is explicitly scoped and reviewed.',
  },
  {
    slug: 'food-beverage',
    title: 'Food and Beverage',
    nav: 'Food & Beverage',
    summary: 'Hygiene, shelf-life and packaging accuracy, at speed.',
    pressures: ['Foreign body and packaging defects', 'Washdown environments hostile to equipment', 'Date and label accuracy', 'Yield and giveaway control'],
    where: [
      { title: 'Packaging and label verification', body: 'Print, date-code, label presence and placement checked in line, with rejects handled through the existing diverter.' },
      { title: 'Fill and seal checks', body: 'Vision and sensor checks on fill level and seal integrity before the pack leaves the machine.' },
      { title: 'Line efficiency', body: 'OEE and downtime reasons across filling, capping and packing so the constraint is identifiable.' },
    ],
    constraints: 'Equipment is specified for washdown ratings appropriate to the zone. Nothing is mounted where it compromises cleaning access.',
  },
  {
    slug: 'pharma',
    title: 'Pharmaceutical',
    nav: 'Pharma',
    summary: 'Where the record matters as much as the result.',
    pressures: ['Validation and documentation burden', 'Data integrity expectations', 'Batch record accuracy', 'Change control on every system touching product'],
    where: [
      { title: 'Data capture for batch records', body: 'Automatic parameter capture with time stamps and user attribution, reducing manual transcription.' },
      { title: 'Packaging inspection', body: 'Label, leaflet and carton verification with retained evidence per pack.' },
      { title: 'Environmental and utility monitoring', body: 'Trending of utilities and environmental parameters with alerting on excursion.' },
    ],
    constraints: 'Work is scoped around your validation approach and change-control process. We do not claim the system is validated: validation is an outcome of your qualification activity, which we support with specifications, test evidence and documentation.',
  },
  {
    slug: 'industrial-oems',
    title: 'Industrial OEMs',
    nav: 'Industrial OEMs',
    summary: 'Machine builders who need control and connectivity as a product feature.',
    pressures: ['Customers asking for data access and dashboards', 'Supporting installed machines remotely', 'Consistency across machines shipped to different sites', 'Warranty cost from field failures'],
    where: [
      { title: 'Control platform for your machine', body: 'Repeatable PLC and HMI architecture across a product line so every machine behaves the same way.' },
      { title: 'Connectivity as a feature', body: 'OPC UA or MQTT interfaces your customers can connect to, documented as part of the machine.' },
      { title: 'Fleet telemetry', body: 'Condition and usage data from installed machines, supporting service and warranty analysis.' },
    ],
    constraints: 'Connectivity is designed so your customer controls what leaves their network. Remote access is engineered to their security policy, not assumed.',
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
