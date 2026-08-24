import type { MetadataRoute } from 'next';
import { builds, labs } from '@/lib/projects';
export default function sitemap(): MetadataRoute.Sitemap { const base = 'https://hariombuilds.com'; return [{ url: base }, { url: `${base}/builds` }, ...builds.map((p) => ({ url: `${base}/builds/${p.slug}` })), { url: `${base}/lab` }, ...labs.map((p) => ({ url: `${base}/lab/${p.slug}` })), { url: `${base}/about` }, { url: `${base}/start-a-project` }, { url: `${base}/privacy` }, { url: `${base}/terms` }]; }
