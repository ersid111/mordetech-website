'use client';

import { useState } from 'react';
import { calculateRoi, formatInr, RoiInputError, type RoiInput, type RoiResult } from '@/lib/roi';
import { whatsappHref } from '@/content/site';

const DEFAULTS: RoiInput = {
  unitsPerShift: 1200,
  shiftsPerDay: 2,
  workingDaysPerYear: 300,
  defectRatePercent: 2,
  costPerDefect: 150,
  detectionRatePercent: 90,
};

const FIELDS: { key: keyof RoiInput; label: string; suffix?: string; step?: string; max?: number }[] = [
  { key: 'unitsPerShift', label: 'Units produced per shift' },
  { key: 'shiftsPerDay', label: 'Shifts per day', max: 3 },
  { key: 'workingDaysPerYear', label: 'Working days per year', max: 366 },
  { key: 'defectRatePercent', label: 'Current defect rate', suffix: '%', step: '0.1', max: 100 },
  { key: 'costPerDefect', label: 'Cost per defective unit', suffix: '₹' },
  { key: 'detectionRatePercent', label: 'Defects the system catches', suffix: '%', step: '1', max: 100 },
];

export function RoiCalculator() {
  // Strings, not numbers: an emptied number input yields '', and coercing that
  // to 0 would silently show a confident ₹0 instead of asking for the value.
  const [raw, setRaw] = useState<Record<keyof RoiInput, string>>(
    Object.fromEntries(Object.entries(DEFAULTS).map(([k, v]) => [k, String(v)])) as Record<keyof RoiInput, string>,
  );
  const [result, setResult] = useState<RoiResult | null>(() => calculateRoi(DEFAULTS));
  const [error, setError] = useState<string | null>(null);

  function recompute(next: Record<keyof RoiInput, string>) {
    const missing = FIELDS.find((f) => next[f.key].trim() === '');
    if (missing) {
      setResult(null);
      setError(`Enter a value for “${missing.label}”.`);
      return;
    }
    try {
      const parsed = Object.fromEntries(
        Object.entries(next).map(([k, v]) => [k, Number(v)]),
      ) as unknown as RoiInput;
      setResult(calculateRoi(parsed));
      setError(null);
    } catch (e) {
      setResult(null);
      setError(e instanceof RoiInputError ? e.message : 'Please check the values entered.');
    }
  }

  function onChange(key: keyof RoiInput, value: string) {
    const next = { ...raw, [key]: value };
    setRaw(next);
    recompute(next);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      <div>
        <div className="grid gap-5 sm:grid-cols-2">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label htmlFor={f.key} className="block font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink-muted">
                {f.label}{f.suffix ? ` (${f.suffix})` : ''}
              </label>
              <input
                id={f.key}
                name={f.key}
                type="number"
                inputMode="decimal"
                min={0}
                max={f.max}
                step={f.step ?? '1'}
                value={raw[f.key]}
                onChange={(e) => onChange(f.key, e.target.value)}
                className="mt-2 w-full rounded-card border border-paper-edge bg-paper-raised px-3.5 py-2.5 text-ink focus-visible:border-lime-deep"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-paper-edge bg-paper-raised p-6">
        <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted m-0">
          Estimated annual saving
        </h3>

        {/* Announced to screen readers when the figure changes, rather than
            silently updating a number the user cannot see. */}
        <div aria-live="polite" aria-atomic="true">
          {result ? (
            <>
              <p className="mt-2 font-display text-step-4 text-lime-deep m-0">
                {formatInr(result.annualSaving)}
              </p>
              <dl className="mt-5 space-y-2 text-step--1">
                <Row label="Units per year" value={result.annualUnits.toLocaleString('en-IN')} />
                <Row label="Defects per year" value={Math.round(result.annualDefects).toLocaleString('en-IN')} />
                <Row label="Defects caught" value={Math.round(result.defectsCaught).toLocaleString('en-IN')} />
              </dl>
            </>
          ) : (
            <p role="alert" className="mt-2 text-signal-crit m-0">{error}</p>
          )}
        </div>

        {result && (
          <details className="mt-6">
            <summary className="cursor-pointer font-mono text-[0.72rem] uppercase tracking-[0.1em] text-steel">
              Assumptions used
            </summary>
            <ul className="mt-3 space-y-1.5 text-step--1 text-ink-soft">
              {result.assumptions.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </details>
        )}

        <p className="mt-6 text-step--1 text-ink-muted m-0">
          This is an estimate from the figures you entered, not a quotation. It shows gross savings
          only — system cost, installation and running cost are not deducted. Real detection rates
          depend on whether the defect is reliably visible under your production conditions, which
          is what a proof of concept establishes.
        </p>

        <a
          href={whatsappHref('Hello MordeTech — I used the ROI calculator and would like to discuss a vision proof of concept.')}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center rounded-card bg-steel px-5 py-3 font-display text-[0.92rem] font-bold text-white hover:bg-steel/90"
        >
          Discuss a proof of concept
        </a>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-paper-edge pb-1.5">
      <dt className="text-ink-muted m-0">{label}</dt>
      <dd className="font-mono text-ink m-0">{value}</dd>
    </div>
  );
}
