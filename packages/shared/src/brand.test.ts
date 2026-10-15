import { describe, expect, it } from 'vitest';
import { brand } from './brand';

describe('brand', () => {
  it('keeps the two core colors as full hex values', () => {
    expect(brand.orange).toBe('#FC6C26');
    expect(brand.vanilla).toBe('#FFF4D6');
  });

  it('uses 6-digit hex for every color', () => {
    for (const value of [brand.orange, brand.vanilla, brand.ink]) {
      expect(value).toMatch(/^#[0-9A-F]{6}$/);
    }
  });
});
