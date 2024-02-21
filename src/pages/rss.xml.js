import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
// import { getLangFromUrl, useTranslations } from "../i18n/utils";

// const lang = getLangFromUrl(Astro.url);
// const t = useTranslations(lang);

// export async function getStaticPaths() {
//   return ["zh", "en"].map((lang) => { //yuyan
//     return { params: { lang } };
//   });
// }

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			// link: `${lang}/blog/${post.title}/`,
		})),
	});
}
