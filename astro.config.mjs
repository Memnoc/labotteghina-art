// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// SITE_URL / BASE_PATH are set by the GitHub Pages workflow;
// local dev falls back to root.
const site = process.env.SITE_URL ?? 'http://localhost:4321';
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site,
  base,
  integrations: [react(), sitemap()],
  image: {
    responsiveStyles: true,
  },
});
