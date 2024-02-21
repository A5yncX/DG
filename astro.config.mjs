import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
build: {
		format: "file",
	},
  site: 'https://example.com',
  integrations: [
	pagefind(),
	sitemap(), 
	]
});