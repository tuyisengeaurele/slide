import { defineConfig } from 'astro/config';

export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  devToolbar: { enabled: false },
  build: {
    // small enough that an extra request costs more than the bytes
    inlineStylesheets: 'auto',
  },
});
