import { createRequire } from 'module';
import path from 'path';
import { defineConfig } from 'vitepress';
import { search as koSearch } from './ko.mts';

const require = createRequire(import.meta.url);

export const shared = defineConfig({
  title: 'es-toolkit',

  lastUpdated: true,
  metaChunk: true,

  /* prettier-ignore */
  head: [
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "100x100",
        href: "/favicon-100x100.png",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://static.toss.im/tps/main.css"
      }
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://static.toss.im/tps/others.css"
      }
    ],
    [
      "meta",
      {
        property: "og:image",
        content: "/og.png",
      },
    ],
  ],

  themeConfig: {
    logo: {
      dark: '/logo_white.png',
      light: '/logo_black.png',
    },

    siteTitle: false,

    search: {
      provider: 'local',
      options: {
        locales: {
          ...koSearch,
        },
      },
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/toss/es-toolkit' }],
  },

  vite: {
    resolve: {
      alias: {
        vue: path.dirname(
          require.resolve('vue/package.json', {
            paths: [require.resolve('vitepress')],
          })
        ),
        'vue/server-renderer': path.dirname(
          require.resolve('vue/server-renderer', {
            paths: [require.resolve('vitepress')],
          })
        ),
      },
    },
  },
});
