import { describe, expect, it } from 'vitest';
import { appLink, cta, hasApp, nav } from './links';

describe('appLink', () => {
  it('sends people to the contact page while there is no app to sign in to', () => {
    expect(appLink('/sign-up')).toBe('/contact');
    expect(appLink('/sign-in')).toBe('/contact');
  });
});

describe('nav', () => {
  it('only links to internal pages', () => {
    for (const item of nav) {
      expect(item.href.startsWith('/')).toBe(true);
    }
  });

  it('has no duplicate links', () => {
    const hrefs = nav.map((item) => item.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });
});

describe('cta', () => {
  it('asks for early access while there is no app to sign up to', () => {
    expect(cta.label).toBe('Request early access');
    expect(cta.href).toBe('/contact');
  });

  it('does not offer sign in without an app', () => {
    expect(hasApp).toBe(false);
  });
});
