import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://castro.eus",
  integrations: [mdx(), sitemap(), tailwind()],
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
  prefetch: true,
});

