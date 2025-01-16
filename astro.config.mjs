// @ts-check
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";

import tailwind from "@astrojs/tailwind";
import { SITE_URL } from "./src/consts";

import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from "./src/components/mdrenders/remark-callout-directives-customized.mjs"
import remarkNeoDB from "./src/components/mdrenders/remark-neodb-card.mjs"
import { remarkModifiedTime } from './src/components/mdrenders/remark-modified-time.mjs';

import astroExpressiveCode from 'astro-expressive-code'

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  build: {
    format: "file",
  },
  integrations: [
    astroExpressiveCode({
    // Replace the default themes with a custom set of bundled themes:
    // "dracula" (a dark theme) and "solarized-light"
    themes: ['andromeeda','dracula'],
  }),
  sitemap(), tailwind(), pagefind()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
    },
    remarkPlugins: [remarkFigureCaption, remarkNeoDB, remarkDirective, remarkCalloutDirectives, remarkModifiedTime],
  },
}
);