// Where "sign in" and "get started" go. Until the app is deployed there's nothing to sign in to,
// so early access goes to the contact page and the sign in link doesn't show at all.
const appUrl = import.meta.env.PUBLIC_APP_URL?.replace(/\/$/, '');

export const hasApp = Boolean(appUrl);

export function appLink(path: '/sign-in' | '/sign-up'): string {
  return appUrl ? `${appUrl}${path}` : '/contact';
}

/** The main call to action, wherever it appears. */
export const cta = hasApp
  ? { label: 'Get started', short: 'Get started', href: appLink('/sign-up') }
  : { label: 'Request early access', short: 'Early access', href: '/contact' };

export const nav = [
  { label: 'Features', href: '/features' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'Docs', href: '/help' },
] as const;
