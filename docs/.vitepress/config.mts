import { defineConfig } from 'vitepress'

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
  }
})
