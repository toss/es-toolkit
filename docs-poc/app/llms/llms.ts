import { source } from '@/lib/source';

export async function loader() {
  const pages = source.getPages('en');

  const toc = pages.map(page => `- [${page.data.title}](${page.url}.mdx)`).join('\n');

  const content = `# es-toolkit

> State-of-the-art JavaScript utility library

es-toolkit is a modern JavaScript utility library that offers a collection of powerful functions for everyday use.

Compared to alternatives like lodash, es-toolkit provides a significantly smaller bundle size (up to 97% less) and 2-3 times faster runtime performance. This is achieved through a modern implementation that leverages the latest JavaScript features.

es-toolkit comes with built-in TypeScript types and has been rigorously tested, ensuring 100% test coverage for maximum reliability.

## Table of Contents

${toc}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
