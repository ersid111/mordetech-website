import type { Metric } from '@/content/types';

/**
 * Only verified metrics reach the page. This is a filter rather than a warning
 * so that an unverified figure cannot be published by forgetting to check a
 * flag — the default outcome of adding an unconfirmed number is that it does
 * not render at all.
 */
export function publishableMetrics(metrics: Metric[]): Metric[] {
  return metrics.filter((m) => m.verified && m.source);
}

export function hasPublishableResults(metrics: Metric[]): boolean {
  return publishableMetrics(metrics).length > 0;
}
