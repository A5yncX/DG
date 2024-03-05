import { defineCollection, z } from 'astro:content';
import { getCollection } from "astro:content";

// import { docsSchema } from '@astrojs/starlight/schema';

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		pin: z.boolean().optional(), //置顶
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		lang: z.string().optional(),
		author: z.string().optional(),
		tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
	}),
});

export const collections = {
	blog,
	// docs: defineCollection({ schema: docsSchema() }),
};

export async function getBlogPosts() {
	const posts = await getCollection('blog');

	return posts.map((post) => {
		const blog_slug = post.slug.split('/')[0];
		return {
			...post,
			blog_slug,
			title: post.data.title
		}
	})
}