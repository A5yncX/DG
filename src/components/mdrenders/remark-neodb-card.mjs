import { visit } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html'; // Import the utility for converting HAST to HTML
import { h } from 'hastscript'; // Import the hyperscript function for creating HAST nodes

// Function to fetch data from the API using the native fetch
async function fetchResource(resourceType, resourceId) {
  const apiUrl = `https://neodb.social/api/${resourceType}/${resourceId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch resource');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching resource:', error);
    return null;
  }
}

export default function fetchAndInjectContent() {
  return async (tree) => {
    const promises = [];

    visit(tree, 'text', (node) => {
      const match = node.value.match(/\+\+(.*?)\/(.*?)\+\+/);
      if (match) {
        const resourceType = match[1];
        const resourceId = match[2];

        // Fetch resource data from the API and inject into markdown
        const promise = fetchResource(resourceType, resourceId).then((data) => {
          if (data) {
            const briefText = data.brief.length > 200 ? data.brief.slice(0, 500) + '...' : data.brief;
            // Create a HAST element for raw HTML
            const cardElement = h('div.db-card', [
              h(
                'a.db-card-subject',
                {
                  href: `https://neodb.social/${resourceType}/${resourceId}`,
                  target: '_blank',
                  rel: 'noreferrer',
                  style: 'text-decoration: none; display: flex; align-items: flex-start;',
                },
                [
                  h(
                    'div.db-card-post',
                    {},
                    [
                      h('img', {
                        loading: 'lazy',
                        decoding: 'async',
                        referrerPolicy: 'no-referrer',
                        src: data.cover_image_url,
                      }),
                    ]
                  ),
                  h('div.db-card-content', [
                    // 标题部分
                    h('div.db-card-title', data.title),
                    // 在标题后插入 cate 元素，正常文档流排列
                    // h(
                    //   'div.db-card-cate',
                    //   { style: 'font-size: 0.875rem; margin-top: 0.25rem;' },
                    //   `[${data.category}]`
                    // ),
                    h('div.rating', [
                      h('span', ` rate: ${data.rating} / 10`),
                    ]),
                    h('div.db-card-abstract', briefText),
                  ]),
                ]
              ),
            ]);
            
            // 将 node 转换为 HTML 类型，并插入生成的 card 元素
            node.type = 'html';
            node.value = toHtml(cardElement);
          } else {
            // 请求失败时的降级显示
            node.type = 'html';
            node.value = '<p style="text-align: center;"><small>Failed to fetch resource data.</small></p>';
          }
        });

        promises.push(promise);
      }
    });

    // 等待所有 API 请求完成
    await Promise.all(promises);
  };
}
