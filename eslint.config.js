import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import react from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['**/dist/**', '**/.astro/**', '**/node_modules/**', '**/coverage/**', 'brand/**'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,mjs,astro}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    // astro generates this file with a triple-slash reference, that's the supported way
    files: ['**/env.d.ts'],
    rules: { '@typescript-eslint/triple-slash-reference': 'off' },
  },
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': react, 'jsx-a11y': jsxA11y },
    rules: {
      ...react.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      // scrollable regions have to be focusable or keyboard users can't scroll them
      'jsx-a11y/no-noninteractive-tabindex': ['error', { roles: ['tabpanel', 'region'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
