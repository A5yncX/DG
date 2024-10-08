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
              h('a.db-card-subject', { // Wrap the subject in an anchor tag
                href: `https://neodb.social/${resourceType}/${resourceId}`,
                target: '_blank',
                rel: 'noreferrer',
                style: 'text-decoration: none; display: flex; align-items: flex-start;', // Flex styles for layout
              }, [
                h('div.db-card-post', [
                  h('img', {
                    loading: 'lazy',
                    decoding: 'async',
                    referrerPolicy: 'no-referrer',
                    src: data.cover_image_url,
                  }),
                ]),
                h('div.db-card-content', [
                  h('div.db-card-title', data.title), // Title without anchor
                  h('div.rating', [
                    // h('span.rating_nums', data.rating),
                    h('span', ` rate: ${data.rating} / 10`), // 显示满分为10的评分信息
                  ]),
                  h('div.db-card-abstract', briefText), // 使用修改后的 briefText
                ]),
                h('div.db-card-cate', data.category),
              ]),
            ]);

            // Set the node's value to the generated HAST element
            node.type = 'html'; // Change the node type to html
            node.value = toHtml(cardElement); // Convert HAST to HTML
          } else {
            // Fallback message in case of failure
            node.type = 'html';
            node.value = '<p style="text-align: center;"><small>Failed to fetch resource data.</small></p>';
          }
        });

        promises.push(promise);
      }
    });

    // Wait for all API requests to finish
    await Promise.all(promises);
  };
}