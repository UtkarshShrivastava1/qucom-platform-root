import { branding as sharedBranding } from '@repo/shared-types/branding.config';

export const branding = {
  appName: sharedBranding.appName,
  tagline: sharedBranding.tagline,
  domain: sharedBranding.domain,
  supportEmail: sharedBranding.supportEmail,
  logoUrl: sharedBranding.logoUrl,
  themeColor: sharedBranding.themeColor,
  merchantPortalTitle: `${sharedBranding.appName} Merchant Hub`,
} as const;
