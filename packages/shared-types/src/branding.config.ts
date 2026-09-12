const getEnv = (key: string): string | undefined => {
  const proc = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
  if (proc?.env) {
    return proc.env[key];
  }
  return undefined;
};

export const branding = {
  appName: getEnv('NEXT_PUBLIC_APP_NAME') || 'Viztore',
  tagline: getEnv('NEXT_PUBLIC_APP_TAGLINE') || 'Making Local Stores Viable.',
  domain: getEnv('NEXT_PUBLIC_APP_DOMAIN') || 'seller.viztore.com',
  supportEmail: getEnv('NEXT_PUBLIC_SUPPORT_EMAIL') || 'support@viztore.com',
  logoUrl: getEnv('NEXT_PUBLIC_LOGO_URL') || '/logo.svg',
  themeColor: getEnv('NEXT_PUBLIC_THEME_COLOR') || '#0038ed',
} as const;

export type BrandingConfig = typeof branding;
