import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alvesdmateus.github.io',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: true,
      // Keep interaction scripts external to honor script-src 'self'.
      assetsInlineLimit: 0,
    },
  },
});
