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
          { text: 'Installation', link: '/installation' }
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
            ]
          },
          {
            text: 'Predicates',
            items: [
              { text: 'isNil', link: '/reference/predicate/isNil' },
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
