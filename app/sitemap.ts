import type { MetadataRoute } from 'next';
import { builds, labs } from '@/lib/projects';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://hariomsbuild.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/builds`, changeFrequency: 'monthly', priority: 0.8 },
    ...builds.map((p) => ({ url: `${base}/builds/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.7 })),
    { url: `${base}/lab`, changeFrequency: 'monthly', priority: 0.7 },
    ...labs.map((p) => ({ url: `${base}/lab/${p.slug}`, changeFrequency: 'monthly' as const, priority: 0.5 })),
    { url: `${base}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/start-a-project`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
