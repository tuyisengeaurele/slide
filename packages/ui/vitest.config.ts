import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    // by default vitest swaps css for an empty string, and the token test needs the real text
    css: { include: [/tokens\.css/] },
  },
});
