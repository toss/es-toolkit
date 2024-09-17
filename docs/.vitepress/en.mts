import path from 'node:path';
import { type DefaultTheme, defineConfig } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';

const docsRoot = path.resolve(import.meta.dirname, '..');

export const en = defineConfig({
  lang: 'en',
  description:
    'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'Introduction', link: '/intro' },
    { text: 'Reference', link: '/reference/array/chunk' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: 'Guide',
      items: [
        { text: 'Introduction', link: '/intro' },
        { text: 'Installation & Usage', link: '/usage' },
        { text: 'Impact on Bundle Size', link: '/bundle-size' },
        { text: 'Performance', link: '/performance' },
        { text: 'Compatibility with Lodash', link: '/compatibility' },
      ],
    },
    {
      text: 'Reference',
      items: sortByText([
        {
          text: 'Array Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'array'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'array'),
          ],
        },
        {
          text: 'Function Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'function'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'function'),
          ],
        },
        {
          text: 'Math Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'math'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'math'),
          ],
        },
        {
          text: 'Object Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'object'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'object'),
          ],
        },
        {
          text: 'Predicates',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'predicate'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'predicate'),
          ],
        },
        {
          text: 'Promise Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'promise'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'promise'),
          ],
        },
        {
          text: 'String Utilities',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'string'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'string'),
          ],
        },
        {
          text: 'Utility Functions',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'util'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'util'),
          ],
        },
        {
          text: 'Errors',
          items: [
            ...getSidebarItems(docsRoot, 'reference', 'error'),
            ...getSidebarItems.compat('en', docsRoot, 'reference', 'compat', 'error'),
          ],
        },
      ]),
    },
  ];
}
