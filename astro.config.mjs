import { defineConfig } from 'astro/config';
import remarkFigureCaption from '@microflash/remark-figure-caption';
import remarkDirective from 'remark-directive';
import remarkCalloutDirectives from "./src/components/mdrenders/remark-callout-directives-customized.js"
import { remarkReadingTime } from './src/components/mdrenders/remark-reading-time.mjs';
import sitemap from '@astrojs/sitemap';

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: 'https://blog.asyncx.top',
  integrations: [sitemap(), 
    expressiveCode({
      themes: ['material-theme-ocean'],
      styleOverrides: {
        // You can also override styles
        borderRadius: '10px',
        borderWidth: '1px',
        frames: {
        },
      },
      defaultProps: {
        // Enable word wrap by default
        wrap: true,
        // Disable wrapped line indentation for terminal languages
        overridesByLang: {
          // 'bash,ps,sh': { preserveIndent: false },
        },
      },
    })
  ],
  markdown: {
    remarkPlugins: [remarkFigureCaption, remarkDirective, remarkCalloutDirectives, remarkReadingTime],
  }
});