import { defineConfig } from 'astro/config';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from "./src/components/mdrenders/remark-callout-directives-customized.js"
import sitemap from '@astrojs/sitemap';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.asyncx.top',
  integrations: [sitemap(), 
    // expressiveCode()
  ],
  markdown: {
    remarkPlugins: [remarkFigureCaption, remarkDirective, remarkCalloutDirectives],
  }
});