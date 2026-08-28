import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { branding } from '@repo/shared-types';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport = {
  themeColor: branding.themeColor,
};

export const metadata: Metadata = {
  title: {
    default: `${branding.appName} — ${branding.tagline}`,
    template: `%s | ${branding.appName}`,
  },
  description: `Discover local stores and products near you. ${branding.tagline}`,
  keywords: ['local shopping', 'nearby stores', 'hyperlocal', 'e-commerce', 'shop local'],
  authors: [{ name: branding.appName }],
  openGraph: {
    title: `${branding.appName} — ${branding.tagline}`,
    description: `Discover local stores and products near you. ${branding.tagline}`,
    siteName: branding.appName,
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-surface-950 text-surface-100 antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
