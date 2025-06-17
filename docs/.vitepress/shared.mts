import { createRequire } from 'module';
import path from 'path';
import { defineConfig } from 'vitepress';
import { search as koSearch } from './ko.mts';
import { search as zh_hansSearch } from './zh_hans.mts';

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
      'script',
      {},
      `window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`
    ],
    [
      "script",
      {
        src: "/_vercel/insights/script.js",
        defer: "true",
      }
    ],
    [
      "script",
      {
        type: "module",
      },
      `
        import * as es from "https://cdn.jsdelivr.net/npm/es-toolkit@latest/+esm";
        import * as esCompat from "https://cdn.jsdelivr.net/npm/es-toolkit@latest/compat/+esm";
        window.es = es;
        window.esCompat = esCompat;
        setTimeout(() => {
          console.log(
            '%cTry es-toolkit in the console! 😃',
            'background: #0064FF; color: white; padding: 2px 4px; border-radius: 3px;'
          );
          console.log(
            '%cExample for es-toolkit',
            'background: #0064FF; color: white; padding: 2px 4px; border-radius: 3px;'
          );
          console.log('%ces.at([10, 20, 30, 40, 50], [1, 3, 4]);', 'font-weight: bold;');
          console.log('%c// [20, 40, 50]', 'font-weight: bold;');
          console.log(
            '%cExample for es-toolkit/compat',
            'background: #0064FF; color: white; padding: 2px 4px; border-radius: 3px;'
          );
          console.log('%cesCompat.concat([1, 2, 3], [4, 5, 6]);', 'font-weight: bold;');
          console.log('%c// [1, 2, 3, 4, 5, 6]', 'font-weight: bold;');
        }, 1000);
      `
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
          ...zh_hansSearch,
        },
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toss/es-toolkit' },
      {
        icon: 'npm',
        link: 'https://www.npmjs.com/package/es-toolkit',
        ariaLabel: 'npm',
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>JSR</title><path d="M3.692 5.538v3.693H0v7.384h7.385v1.847h12.923v-3.693H24V7.385h-7.385V5.538Zm1.846 1.847h1.847v7.384H1.846v-3.692h1.846v1.846h1.846zm3.693 0h5.538V9.23h-3.692v1.846h3.692v5.538H9.231V14.77h3.692v-1.846H9.231Zm7.384 1.846h5.539v3.692h-1.846v-1.846h-1.846v5.538h-1.847z"/></svg>',
        },
        link: 'https://jsr.io/@es-toolkit/es-toolkit',
        ariaLabel: 'JSR',
      },
      { icon: 'discord', link: 'https://discord.gg/vGXbVjP2nY' },
    ],
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
