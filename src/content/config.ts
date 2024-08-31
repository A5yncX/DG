import { defineCollection, z } from 'astro:content';
import { getCollection } from "astro:content";


function removeDuplicates(array: string[]) {
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
		tags: z.array(z.string()).default([]).transform(removeDuplicates),
		categories: z.array(z.string()).default([]).transform(removeDuplicates),
	}),
});

export const collections = {
	blog,
	// docs: defineCollection({ schema: docsSchema() }),
};

export async function getBlogPosts() {
	const posts = await getCollection('blog');

	return posts.map((post) => {
		const fileName = post.id.split('/').pop(); // 提取文件名称部分
        const datePart = fileName.split('.')[0]; // 获取日期部分
		const blog_slug = post.slug.split('/')[0];
		return {
			...post,
			blog_slug,
			fileName: datePart,
			title: post.data.title
		}
	})
}