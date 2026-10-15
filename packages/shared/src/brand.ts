// Brand values that more than one app needs. The CSS tokens in packages/ui
// are the real source for styling, this is for places that can't read CSS
// (meta tags, manifests, emails).
export const brand = {
  name: 'Slide',
  orange: '#FC6C26',
  vanilla: '#FFF4D6',
  ink: '#1B1612',
} as const;

export type BrandColor = 'orange' | 'vanilla' | 'ink';
