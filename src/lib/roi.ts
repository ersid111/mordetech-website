/**
 * AI vision ROI estimate.
 *
 * Deliberately simple and fully stated, because an industrial buyer will check
 * the arithmetic. Every assumption is an input or is returned in `assumptions`;
 * nothing is hidden in the function. The previous site hard-coded an investment
 * range inside the calculation and printed a payback figure derived from it
 * without saying so.
 */
export type RoiInput = {
  /** Parts produced per shift. */
  unitsPerShift: number;
  shiftsPerDay: number;
  workingDaysPerYear: number;
  /** Share of production currently escaping as defects, in percent (0–100). */
  defectRatePercent: number;
  /** Cost of a single defective unit: scrap, rework, and handling. */
  costPerDefect: number;
  /** Share of current defects the system is expected to catch, in percent. */
  detectionRatePercent: number;
};

export type RoiResult = {
  annualUnits: number;
  annualDefects: number;
  defectsCaught: number;
  annualSaving: number;
  assumptions: string[];
};

export class RoiInputError extends Error {}

const FIELD_LABELS: Record<keyof RoiInput, string> = {
  unitsPerShift: 'Units per shift',
  shiftsPerDay: 'Shifts per day',
  workingDaysPerYear: 'Working days per year',
  defectRatePercent: 'Current defect rate',
  costPerDefect: 'Cost per defective unit',
  detectionRatePercent: 'Expected detection rate',
};

export function calculateRoi(input: RoiInput): RoiResult {
  for (const [key, value] of Object.entries(input) as [keyof RoiInput, number][]) {
    if (!Number.isFinite(value)) throw new RoiInputError(`${FIELD_LABELS[key]} must be a number.`);
    if (value < 0) throw new RoiInputError(`${FIELD_LABELS[key]} cannot be negative.`);
  }
  if (input.defectRatePercent > 100) throw new RoiInputError('Current defect rate cannot exceed 100%.');
  if (input.detectionRatePercent > 100) throw new RoiInputError('Expected detection rate cannot exceed 100%.');
  if (input.shiftsPerDay > 3) throw new RoiInputError('Shifts per day cannot exceed 3.');
  if (input.workingDaysPerYear > 366) throw new RoiInputError('Working days per year cannot exceed 366.');

  const annualUnits = input.unitsPerShift * input.shiftsPerDay * input.workingDaysPerYear;
  const annualDefects = annualUnits * (input.defectRatePercent / 100);
  const defectsCaught = annualDefects * (input.detectionRatePercent / 100);
  const annualSaving = defectsCaught * input.costPerDefect;

  return {
    annualUnits,
    annualDefects,
    defectsCaught,
    annualSaving,
    assumptions: [
      `${input.unitsPerShift.toLocaleString('en-IN')} units per shift × ${input.shiftsPerDay} shift(s) × ${input.workingDaysPerYear} days`,
      `${input.defectRatePercent}% of production is currently defective`,
      `The system catches ${input.detectionRatePercent}% of those defects`,
      `Each defect caught avoids ₹${input.costPerDefect.toLocaleString('en-IN')} of scrap, rework and handling`,
      'Savings are gross: system cost, installation and running cost are not deducted',
    ],
  };
}

export function formatInr(value: number): string {
  if (!Number.isFinite(value)) return '—';
  const rounded = Math.round(value);
  if (rounded >= 10_000_000) return `₹${(rounded / 10_000_000).toFixed(2)} Cr`;
  if (rounded >= 100_000) return `₹${(rounded / 100_000).toFixed(2)} L`;
  return `₹${rounded.toLocaleString('en-IN')}`;
}
