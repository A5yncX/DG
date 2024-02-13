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
		logo: {
			src: './public/favicon.svg',
			replacesTitle: false,
		  },
		customCss: [
			// 你的自定义 CSS 文件的相对路径
			'./src/styles/starlight.css',
		],
	  }
	  )
	]
});