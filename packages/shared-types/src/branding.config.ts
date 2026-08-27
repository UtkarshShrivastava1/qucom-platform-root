const getEnv = (key: string): string | undefined => {
  const proc = (globalThis as unknown as { process?: { env?: Record<string, string | undefined> } }).process;
  if (proc?.env) {
    return proc.env[key];
  }
  return undefined;
};

export const branding = {
  appName: getEnv('NEXT_PUBLIC_APP_NAME') || 'LocalStore',
  tagline: getEnv('NEXT_PUBLIC_APP_TAGLINE') || 'Shop Local. Shop Smart.',
  domain: getEnv('NEXT_PUBLIC_APP_DOMAIN') || 'localhost',
  supportEmail: getEnv('NEXT_PUBLIC_SUPPORT_EMAIL') || 'support@example.com',
  logoUrl: getEnv('NEXT_PUBLIC_LOGO_URL') || '/logo.svg',
  themeColor: getEnv('NEXT_PUBLIC_THEME_COLOR') || '#6366f1',
} as const;

export type BrandingConfig = typeof branding;
