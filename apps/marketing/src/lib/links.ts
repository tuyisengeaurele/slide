// Where "sign in" and "start free" go. Until the app is deployed there's nothing to
// link to, so we send people to the contact page instead of a dead end.
const appUrl = import.meta.env.PUBLIC_APP_URL?.replace(/\/$/, '');

export function appLink(path: '/sign-in' | '/sign-up'): string {
  return appUrl ? `${appUrl}${path}` : '/contact';
}

export const nav = [
  { label: 'Features', href: '/features' },
  { label: 'How it works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Security', href: '/security' },
  { label: 'Docs', href: '/help' },
] as const;
