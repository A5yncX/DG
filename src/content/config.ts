import { defineCollection, z } from "astro:content";
import { getCollection } from "astro:content";

// 去重函数
function removeDuplicates(array: string[]) {
  if (!array.length) return array;
  const lowercaseItems = array.map((str) => str.toLowerCase());
  const distinctItems = new Set(lowercaseItems);
  return Array.from(distinctItems);
}

// 定义 posts 集合
const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().default(" "),
    pubDate: z.coerce.date(),
    image: z.string().default("/static/ogimage.png"),
    tags: z.array(z.string()).default([]).transform(removeDuplicates),
  }),
});

// 定义 pages 集合
const pages = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { posts, pages };

// 获取 posts 集合数据
export async function getBlogPosts() {
  const posts = await getCollection("posts");

  return posts.map((post) => {
    const fileName = post.id.split("/").pop(); // 提取文件名称部分
    const datePart = fileName?.split(".")[0] ?? "2001-08-06";
    const blog_slug = post.slug.split("/")[0];
    return {
      ...post,
      blog_slug,
      fileName: datePart,
      title: post.data.title,
    };
  });
}

// 获取 pages 集合数据
export async function getPageContent(fileName: string) {
  const pages = await getCollection("pages");
  const page = pages.find((page) => page.id === fileName);
  if (!page) {
    throw new Error(`Page '${fileName}' not found in the 'pages' collection.`);
  }

  return page;
}
