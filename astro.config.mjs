import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: "https://castro.eus",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'catppuccin-latte',
    },
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en", "eu"],
  },
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "hover",
  },
});
