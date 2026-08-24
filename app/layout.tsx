import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hariom Builds — Independent Software-Building Studio',
  description: 'Digital systems built around real business problems.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
