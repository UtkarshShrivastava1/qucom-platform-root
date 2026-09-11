import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { branding } from '@repo/shared-types';
import { Providers } from './providers';
import { CartDrawer } from '../components/cart/CartDrawer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Header } from '@/components/layout/Header';
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
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/40 via-white to-white text-surface-900 antialiased min-h-[100dvh] relative overflow-x-hidden">
        <Providers>
          <Header />
          {children}
          <CartDrawer />
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
