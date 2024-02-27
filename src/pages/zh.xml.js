import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

  // 获取中文博客内容集合
  export async function GET(context) {
    const blog = await getCollection('blog', ({ id }) => id.startsWith('zh/'));
    return rss({
      title: 'Buzz’s Blog',
      description: 'A humble Astronaut’s guide to the stars',
      site: context.site,
      items: blog.map((post) => ({
        link: `/zh/blog/${post.title}/`,
        // 注意：这不会处理 MDX 文件中的组件或 JSX 表达式。
        content: sanitizeHtml(parser.render(post.body)),
        ...post.data,
      })),
    });
  }