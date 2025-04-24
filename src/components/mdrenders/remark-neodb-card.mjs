import { visit } from 'unist-util-visit';
import { toHtml } from 'hast-util-to-html';
import { h } from 'hastscript';

// Function to fetch data from the API
async function fetchResource(resourceType, resourceId) {
  const apiUrl = `https://neodb.social/api/${resourceType}/${resourceId}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch resource');
    }
    return await response.json();
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

        const promise = fetchResource(resourceType, resourceId).then((data) => {
          if (data) {
            const briefText =
              data.brief && data.brief.length > 200
                ? data.brief.slice(0, 500) + '...'
                : data.brief || '';

            // 白名单判断评分是否合法
            const isRatingNumber = typeof data.rating === 'number' && isFinite(data.rating) && data.rating > 0;
            const isRatingStringNumber = typeof data.rating === 'string' &&
              /^[0-9]+(\.[0-9]+)?$/.test(data.rating.trim());
            const hasValidRating = isRatingNumber || isRatingStringNumber;
            const ratingText = hasValidRating ? String(data.rating).trim() : '';

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
                  h('div.db-card-post', [
                    h('img', {
                      loading: 'lazy',
                      decoding: 'async',
                      referrerPolicy: 'no-referrer',
                      src: data.cover_image_url,
                    }),
                  ]),
                  h('div.db-card-content', [
                    h('div.db-card-title', data.title),
                    ...(hasValidRating
                      ? [
                          h('div.rating', [
                            h('span', ` rate: ${ratingText} / 10`),
                          ]),
                        ]
                      : [
                        h('div.rating', [
                          h('span', `  `),
                        ]),
                      ]),
                    h('div.db-card-abstract', briefText),
                  ]),
                ]
              ),
            ]);

            node.type = 'html';
            node.value = toHtml(cardElement);
          } else {
            node.type = 'html';
            node.value =
              '<p style="text-align: center;"><small>Failed to fetch resource data.</small></p>';
          }
        });

        promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
}