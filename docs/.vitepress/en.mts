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
    { text: 'Reference', link: '/reference/array/at' },
    { text: 'Compat Reference', link: '/reference/compat/array/castArray' },
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
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'array'),
        },
        {
          text: 'Function Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'function'),
        },
        {
          text: 'Math Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'math'),
        },
        {
          text: 'Object Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'object'),
        },
        {
          text: 'Predicates',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'predicate'),
        },
        {
          text: 'Promise Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'promise'),
        },
        {
          text: 'String Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'string'),
        },
        {
          text: 'Utility Functions',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'util'),
        },
        {
          text: 'Errors',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'error'),
        },
      ]),
    },
    {
      text: 'Compat Reference',
      items: sortByText([
        {
          text: 'Array Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'array'),
        },
        {
          text: 'Function Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'function'),
        },
        {
          text: 'Math Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'math'),
        },
        {
          text: 'Object Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'object'),
        },
        {
          text: 'Predicates',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'predicate'),
        },
        {
          text: 'String Utilities',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'string'),
        },
        {
          text: 'Utility Functions',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'reference', 'compat', 'util'),
        },
      ]),
    },
  ];
}
