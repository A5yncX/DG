import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [
	sitemap(), 
	starlight({
		title: 'AsyncX的图书馆',
	  })
	]
});