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
            { text: 'countBy', link: '/reference/array/countBy' },
            { text: 'compact', link: '/reference/array/compact' },
            { text: 'difference', link: '/reference/array/difference' },
            { text: 'differenceBy', link: '/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/reference/array/differenceWith' },
            { text: 'drop', link: '/reference/array/drop' },
            { text: 'dropWhile', link: '/reference/array/dropWhile' },
            { text: 'dropRight', link: '/reference/array/dropRight' },
            { text: 'dropRightWhile', link: '/reference/array/dropRightWhile' },
            { text: 'fill', link: '/reference/array/fill' },
            { text: 'toFilled', link: '/reference/array/toFilled' },
            { text: 'flatten', link: '/reference/array/flatten' },
            { text: 'flattenDeep', link: '/reference/array/flattenDeep' },
            { text: 'forEachRight', link: '/reference/array/forEachRight' },
            { text: 'groupBy', link: '/reference/array/groupBy' },
            { text: 'intersection', link: '/reference/array/intersection' },
            { text: 'intersectionBy', link: '/reference/array/intersectionBy' },
            { text: 'intersectionWith', link: '/reference/array/intersectionWith' },
            { text: 'keyBy', link: '/reference/array/keyBy' },
            { text: 'minBy', link: '/reference/array/minBy' },
            { text: 'maxBy', link: '/reference/array/maxBy' },
            { text: 'orderBy', link: '/reference/array/orderBy' },
            { text: 'partition', link: '/reference/array/partition' },
            { text: 'sample', link: '/reference/array/sample' },
            { text: 'sampleSize', link: '/reference/array/sampleSize' },
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
            { text: 'unzip', link: '/reference/array/unzip' },
            { text: 'unzipWith', link: '/reference/array/unzipWith' },
            { text: 'without', link: '/reference/array/without' },
            { text: 'xor', link: '/reference/array/xor' },
            { text: 'xorBy', link: '/reference/array/xorBy' },
            { text: 'xorWith', link: '/reference/array/xorWith' },
            { text: 'zip', link: '/reference/array/zip' },
            { text: 'zipObject', link: '/reference/array/zipObject' },
            { text: 'zipWith', link: '/reference/array/zipWith' },
            { text: 'head', link: '/reference/array/head' },
            { text: 'tail', link: '/reference/array/tail' },
            { text: 'last', link: '/reference/array/last' },
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
            { text: 'inRange', link: '/reference/math/inRange' },
            { text: 'mean', link: '/reference/math/mean' },
            { text: 'meanBy', link: '/reference/math/meanBy' },
            { text: 'random', link: '/reference/math/random' },
            { text: 'randomInt', link: '/reference/math/randomInt' },
            { text: 'range', link: '/reference/math/range' },
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
            { text: 'invert', link: '/reference/object/invert' },
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
        {
          text: 'String Utilities',
          items: [
            { text: 'snakeCase', link: '/reference/string/snakeCase' },
            { text: 'kebabCase', link: '/reference/string/kebabCase' },
            { text: 'lowerCase', link: '/reference/string/lowerCase' },
            { text: 'capitalize', link: '/reference/string/capitalize' },
          ],
        },
      ],
    },
  ];
}
