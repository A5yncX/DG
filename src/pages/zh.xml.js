import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

  // 获取中文博客内容集合
  export async function GET(context) {
    const blog = await getCollection('blog', ({ id }) => id.startsWith('zh/'));

    blog.sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));
    return rss({
      title: 'AsyncX | 嘿!我是AX!',
      description: 'AsyncX的博客-i18n多语言/内容聚合/编程/哲学/爱好',
      // image: '/favicon.svg',
      site: context.site,
      items: blog.map((post) => ({
        title: post.data.title,
        link: `/zh/blog/${post.data.title}`,
        // 注意：这不会处理 MDX 文件中的组件或 JSX 表达式。
        content: sanitizeHtml(parser.render(post.body), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
        ...post.data,
      })),
      customData:`
      <language>zh-CN</language>
      `
    });
  }