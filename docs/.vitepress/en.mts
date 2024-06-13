import { defineConfig, type DefaultTheme } from 'vitepress';

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
        { text: 'Installation', link: '/installation' },
        { text: 'Impact on Bundle Size', link: '/bundle-size' },
        { text: 'Performance', link: '/performance' },
      ],
    },
    {
      text: 'Reference',
      items: [
        {
          text: 'Array Utilities',
          items: [
            { text: 'chunk', link: '/reference/array/chunk' },
            { text: 'difference', link: '/reference/array/difference' },
            { text: 'differenceBy', link: '/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/reference/array/differenceWith' },
            { text: 'drop', link: '/reference/array/drop' },
            { text: 'dropWhile', link: '/reference/array/dropWhile' },
            { text: 'dropRight', link: '/reference/array/dropRight' },
            { text: 'dropRightWhile', link: '/reference/array/dropRightWhile' },
            { text: 'groupBy', link: '/reference/array/groupBy' },
            { text: 'intersection', link: '/reference/array/intersection' },
            { text: 'intersectionBy', link: '/reference/array/intersectionBy' },
            { text: 'intersectionWith', link: '/reference/array/intersectionWith' },
            { text: 'partition', link: '/reference/array/partition' },
            { text: 'sample', link: '/reference/array/sample' },
            { text: 'shuffle', link: '/reference/array/shuffle' },
            { text: 'take', link: '/reference/array/take' },
            { text: 'takeWhile', link: '/reference/array/takeWhile' },
            { text: 'takeRight', link: '/reference/array/takeRight' },
            { text: 'takeRightWhile', link: '/reference/array/takeRightWhile' },
            { text: 'union', link: '/reference/array/union' },
            { text: 'unionBy', link: '/reference/array/unionBy' },
            { text: 'unionWith', link: '/reference/array/unionWith' },
            { text: 'uniq', link: '/reference/array/uniq' },
            { text: 'uniqBy', link: '/reference/array/uniqBy' },
            { text: 'uniqWith', link: '/reference/array/uniqWith' },
            { text: 'xor', link: '/reference/array/xor' },
            { text: 'xorBy', link: '/reference/array/xorBy' },
            { text: 'xorWith', link: '/reference/array/xorWith' },
            { text: 'zip', link: '/reference/array/zip' },
            { text: 'zipWith', link: '/reference/array/zipWith' },
          ],
        },
        {
          text: 'Function Utilities',
          items: [
            { text: 'debounce', link: '/reference/function/debounce' },
            { text: 'throttle', link: '/reference/function/throttle' },
            { text: 'once', link: '/reference/function/once' },
            { text: 'noop', link: '/reference/function/noop' },
          ],
        },
        {
          text: 'Math Utilities',
          items: [
            { text: 'clamp', link: '/reference/math/clamp' },
            { text: 'round', link: '/reference/math/round' },
            { text: 'sum', link: '/reference/math/sum' },
          ],
        },
        {
          text: 'Object Utilities',
          items: [
            { text: 'omit', link: '/reference/object/omit' },
            { text: 'omitBy', link: '/reference/object/omitBy' },
            { text: 'pick', link: '/reference/object/pick' },
            { text: 'pickBy', link: '/reference/object/pickBy' },
          ],
        },
        {
          text: 'Predicates',
          items: [
            { text: 'isNil', link: '/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/reference/predicate/isNull' },
            { text: 'isUndefined', link: '/reference/predicate/isUndefined' },
          ],
        },
        {
          text: 'Promise Utilities',
          items: [{ text: 'delay', link: '/reference/promise/delay' }],
        },
      ],
    },
  ];
}
