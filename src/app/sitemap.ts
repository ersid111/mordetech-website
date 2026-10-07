import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { solutions } from '@/content/solutions';
import { industries } from '@/content/industries';
import { caseStudies } from '@/content/case-studies';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: 'weekly' | 'monthly' | 'yearly' = 'monthly') => ({
    url: `${site.url}${path}`, lastModified: now, changeFrequency, priority,
  });

  return [
    entry('/', 1.0, 'weekly'),
    entry('/solutions', 0.9),
    ...solutions.map((s) => entry(`/solutions/${s.slug}`, 0.9)),
    entry('/industries', 0.8),
    ...industries.map((i) => entry(`/industries/${i.slug}`, 0.7)),
    entry('/case-studies', 0.8),
    ...caseStudies.map((c) => entry(`/case-studies/${c.slug}`, 0.6)),
    entry('/about', 0.7),
    entry('/support', 0.7),
    entry('/contact', 0.9),
    entry('/privacy', 0.2, 'yearly'),
    entry('/terms', 0.2, 'yearly'),
  ];
}
