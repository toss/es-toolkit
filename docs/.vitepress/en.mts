import { type DefaultTheme, defineConfig } from 'vitepress';
import { buildFlavorSidebar, type SidebarLabels } from './libs/buildFlavorSidebar.mts';

const labels: SidebarLabels = {
  guide: 'Guide',
  reference: 'Reference',
  guideItems: {
    introduction: 'Introduction',
    installation: 'Installation & Usage',
    bundleSize: 'Impact on Bundle Size',
    performance: 'Performance',
    aiIntegration: 'AI Integration',
  },
  categories: {
    array: 'Array Utilities',
    function: 'Function Utilities',
    map: 'Map Utilities',
    math: 'Math Utilities',
    object: 'Object Utilities',
    predicate: 'Predicates',
    promise: 'Promise Utilities',
    set: 'Set Utilities',
    string: 'String Utilities',
    util: 'Utility Functions',
    error: 'Errors',
  },
};

export const en = defineConfig({
  lang: 'en',
  description:
    'A state-of-the-art, high-performance JavaScript utility library with a small bundle size and strong type annotations.',

  themeConfig: {
    darkModeSwitchLabel: 'Dark Mode',

    nav: nav(),

    sidebar: buildFlavorSidebar({ locale: '', labels }),

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
    { text: 'Lodash Compatibility', link: '/compat/intro' },
  ];
}
