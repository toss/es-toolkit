import { defineConfig } from 'vitepress'
import { createRequire } from 'module';
import path from 'path';

const require = createRequire(import.meta.url);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "es-toolkit",
  description: "A state-of-the-art, high-performance JavaScript utility library featuring robust type annotations and straightforward implementations.",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Introduction', link: '/intro' },
      { text: 'Reference', link: '/reference/array/chunk' },
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/intro' },
          { text: 'Installation', link: '/installation' },
          { text: 'Impact on Bundle Size', link: '/bundle-size' },
        ]
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
              { text: 'dropRight', link: '/reference/array/dropRight' },
              { text: 'dropWhile', link: '/reference/array/dropWhile' },
              { text: 'groupBy', link: '/reference/array/groupBy' },
              { text: 'intersection', link: '/reference/array/intersection' },
              { text: 'intersectionBy', link: '/reference/array/intersectionBy' },
              { text: 'intersectionWith', link: '/reference/array/intersectionWith' },
              { text: 'partition', link: '/reference/array/partition' },
              { text: 'sample', link: '/reference/array/sample' },
              { text: 'shuffle', link: '/reference/array/shuffle' },
              { text: 'take', link: '/reference/array/take' },
              { text: 'zip', link: '/reference/array/zip' },
            ]
          },
          {
            text: 'Function Utilities',
            items: [
              { text: 'debounce', link: '/reference/function/debounce' },
              { text: 'throttle', link: '/reference/function/throttle' },
              { text: 'once', link: '/reference/function/once' },
            ]
          },
          {
            text: 'Math Utilities',
            items: [
              { text: 'clamp', link: '/reference/math/clamp' },
              { text: 'sum', link: '/reference/math/sum' },
            ]
          },
          {
            text: 'Object Utilities',
            items: [
              { text: 'omit', link: '/reference/object/omit' },
              { text: 'omitBy', link: '/reference/object/omitBy' },
              { text: 'pick', link: '/reference/object/pick' },
              { text: 'pickBy', link: '/reference/object/pickBy' },
            ]
          },
          {
            text: 'Predicates',
            items: [
              { text: 'isNil', link: '/reference/predicate/isNil' },
              { text: 'isNotNil', link: '/reference/predicate/isNotNil' },
              { text: 'isNull', link: '/reference/predicate/isNull' },
              { text: 'isUndefined', link: '/reference/predicate/isUndefined' },
            ]
          },
          {
            text: 'Promise Utilities',
            items: [
              { text: 'delay', link: '/reference/promise/delay' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toss/es-toolkit' }
    ]
  },
  vite: {
    resolve: {
      alias: {
        'vue': path.dirname(require.resolve('vue/package.json', {
          paths: [require.resolve('vitepress')],
        })),
        'vue/server-renderer': path.dirname(require.resolve('vue/server-renderer', {
          paths: [require.resolve('vitepress')],
        })),
      }
    }
  }
})
