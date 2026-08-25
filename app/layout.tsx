import type { Metadata, Viewport } from 'next';
import './globals.css';
import './accessibility.css';
import './light-theme.css';
import './builds/builds.css';
import './core-fix.css';
import { SiteAnalytics } from '@/components/analytics';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hariomsbuild.vercel.app';
const logoSrc = '/assets/02_Compact_Logo.png';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#080908',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Hariom Builds — Independent Software-Building Studio', template: '%s | Hariom Builds' },
  description: 'Digital systems built around real business problems. Websites, automation, systems and practical AI for businesses.',
  applicationName: 'Hariom Builds',
  alternates: { canonical: '/' },
  icons: { icon: logoSrc, shortcut: logoSrc, apple: logoSrc },
  openGraph: {
    type: 'website',
    siteName: 'Hariom Builds',
    title: 'Hariom Builds — Independent Software-Building Studio',
    description: 'Digital systems built around real business problems.',
    url: siteUrl,
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: 'Hariom Builds — Independent Software-Building Studio' }],
  },
  twitter: { card: 'summary_large_image', title: 'Hariom Builds', description: 'Digital systems built around real business problems.', images: ['/og.svg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Hariom Builds',
    url: siteUrl,
    logo: `${siteUrl}${logoSrc}`,
    description: 'Independent software-building studio focused on practical digital systems.',
    serviceType: ['Web Development', 'Automation', 'Software Systems', 'AI Development'],
  };

  return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /><SiteAnalytics /></body></html>;
}
