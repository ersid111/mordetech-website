import { describe, it, expect } from 'vitest';
import { calculateRoi, formatInr, RoiInputError, type RoiInput } from '@/lib/roi';

const base: RoiInput = {
  unitsPerShift: 1000,
  shiftsPerDay: 2,
  workingDaysPerYear: 300,
  defectRatePercent: 2,
  costPerDefect: 150,
  detectionRatePercent: 90,
};

describe('calculateRoi', () => {
  it('computes the chain from units to saving', () => {
    const r = calculateRoi(base);
    expect(r.annualUnits).toBe(600_000);
    expect(r.annualDefects).toBe(12_000);
    expect(r.defectsCaught).toBe(10_800);
    expect(r.annualSaving).toBe(1_620_000);
  });

  it('returns zero rather than NaN when inputs are zero', () => {
    const r = calculateRoi({ ...base, unitsPerShift: 0 });
    expect(r.annualUnits).toBe(0);
    expect(r.annualSaving).toBe(0);
  });

  it('handles a zero defect rate without dividing anywhere', () => {
    const r = calculateRoi({ ...base, defectRatePercent: 0 });
    expect(r.annualDefects).toBe(0);
    expect(r.annualSaving).toBe(0);
  });

  it('scales linearly at high volume without precision loss', () => {
    const r = calculateRoi({ ...base, unitsPerShift: 250_000, shiftsPerDay: 3, workingDaysPerYear: 365 });
    expect(r.annualUnits).toBe(273_750_000);
    expect(Number.isFinite(r.annualSaving)).toBe(true);
  });

  it('states every assumption it used', () => {
    const r = calculateRoi(base);
    expect(r.assumptions.length).toBeGreaterThanOrEqual(5);
    expect(r.assumptions.join(' ')).toContain('not deducted');
  });

  it.each([
    ['negative units', { unitsPerShift: -1 }],
    ['defect rate above 100', { defectRatePercent: 101 }],
    ['detection rate above 100', { detectionRatePercent: 150 }],
    ['more than 3 shifts', { shiftsPerDay: 4 }],
    ['more than 366 days', { workingDaysPerYear: 400 }],
  ])('rejects %s', (_label, patch) => {
    expect(() => calculateRoi({ ...base, ...patch } as RoiInput)).toThrow(RoiInputError);
  });

  it('rejects NaN, which is what an empty number input produces', () => {
    expect(() => calculateRoi({ ...base, costPerDefect: Number.NaN })).toThrow(RoiInputError);
  });
});

describe('formatInr', () => {
  it('uses lakh and crore at Indian thresholds', () => {
    expect(formatInr(1_620_000)).toBe('₹16.20 L');
    expect(formatInr(25_000_000)).toBe('₹2.50 Cr');
    expect(formatInr(4_500)).toBe('₹4,500');
  });
  it('does not print NaN', () => {
    expect(formatInr(Number.NaN)).toBe('—');
  });
});
