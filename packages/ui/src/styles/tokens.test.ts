import { describe, expect, it } from 'vitest';
import css from './tokens.css?raw';

// pulls `--name: value;` pairs out of the first block that starts with `selector`
function tokens(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`no block for ${selector}`);
  const block = css.slice(start, css.indexOf('\n}', start));
  const out: Record<string, string> = {};
  for (const [, name, value] of block.matchAll(/--([\w-]+):\s*([^;]+);/g)) {
    if (name && value) out[name] = value.trim();
  }
  return out;
}

// follows `var(--other)` aliases until we land on a hex color
function resolve(all: Record<string, string>, name: string): string {
  let value = all[name];
  for (let hops = 0; value && hops < 5; hops++) {
    const alias = value.match(/^var\(--([\w-]+)\)$/);
    if (!alias?.[1]) break;
    value = all[alias[1]];
  }
  if (!value || !/^#[0-9a-f]{6}$/i.test(value))
    throw new Error(`--${name} is not a plain hex color`);
  return value;
}

function luminance(hex: string): number {
  const channel = (i: number) => {
    const c = parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(1) + 0.0722 * channel(2);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

const light = tokens(':root {');
// the dark block only overrides some tokens, the rest come from :root
const themes = {
  light,
  dark: { ...light, ...tokens(":root[data-theme='dark'] {") },
};

describe.each(Object.entries(themes))('%s theme contrast', (_name, all) => {
  const ratio = (fg: string, bg: string) => contrast(resolve(all, fg), resolve(all, bg));

  it('body text on the page and on surfaces is at least AA', () => {
    expect(ratio('ink', 'bg')).toBeGreaterThanOrEqual(7);
    expect(ratio('ink-2', 'bg')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('ink-2', 'surface')).toBeGreaterThanOrEqual(4.5);
  });

  it('the quietest text is still readable (captions, labels)', () => {
    expect(ratio('ink-3', 'bg')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('ink-3', 'surface')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('ink-3', 'vanilla')).toBeGreaterThanOrEqual(4.5);
  });

  it('error text is readable on the page and on surfaces', () => {
    expect(ratio('err', 'bg')).toBeGreaterThanOrEqual(4.5);
    expect(ratio('err', 'surface')).toBeGreaterThanOrEqual(4.5);
  });

  it('text on the orange button is at least AA', () => {
    expect(ratio('orange-ink', 'orange')).toBeGreaterThanOrEqual(4.5);
  });

  it('orange is visible against the page as a graphic', () => {
    expect(ratio('orange', 'bg')).toBeGreaterThanOrEqual(2.5);
  });
});

describe('brand colors', () => {
  it('keeps the two core colors exactly as designed', () => {
    expect(css).toMatch(/--brand-orange:\s*#fc6c26/i);
    expect(css).toMatch(/--brand-vanilla:\s*#fff4d6/i);
  });
});
