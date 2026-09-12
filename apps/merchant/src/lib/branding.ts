import { branding as sharedBranding } from '@repo/shared-types/branding.config';

export const branding = {
  appName: (import.meta as any).env?.VITE_APP_NAME || sharedBranding.appName || 'Viztore',
  tagline: (import.meta as any).env?.VITE_APP_TAGLINE || sharedBranding.tagline || 'Making Local Stores Viable.',
  domain: (import.meta as any).env?.VITE_APP_DOMAIN || sharedBranding.domain || 'seller.viztore.com',
  supportEmail: (import.meta as any).env?.VITE_SUPPORT_EMAIL || sharedBranding.supportEmail || 'support@viztore.com',
  logoUrl: sharedBranding.logoUrl,
  themeColor: sharedBranding.themeColor || '#0038ed',
  merchantPortalTitle: `${(import.meta as any).env?.VITE_APP_NAME || sharedBranding.appName || 'Viztore'} Merchant Hub`,
} as const;
