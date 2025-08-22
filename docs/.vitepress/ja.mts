import path from 'node:path';
import { type DefaultTheme, defineConfig } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';

const docsRoot = path.resolve(import.meta.dirname, '..');

export const ja = defineConfig({
  lang: 'ja',
  description: '高速なパフォーマンスと小さなバンドルサイズを持つ最先端のJavaScriptユーティリティライブラリ',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: 'GitHubで編集する',
    },

    footer: {
      message: 'MIT ライセンスの下で配布されています。',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'ホーム', link: '/ja' },
    { text: '導入', link: '/ja/intro' },
    { text: 'リファレンス', link: '/ja/reference/array/at' },
    { text: '互換性リファレンス', link: '/ja/reference/compat/array/castArray' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: 'ガイド',
      items: [
        { text: '紹介', link: '/ja/intro' },
        { text: 'インストールと使用方法', link: '/ja/usage' },
        { text: 'バンドルサイズ', link: '/ja/bundle-size' },
        { text: 'パフォーマンス', link: '/ja/performance' },
        { text: 'Lodash との互換性', link: '/ja/compatibility' },
      ],
    },
    {
      text: 'リファレンス',
      items: sortByText([
        {
          text: '配列',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'array'),
        },
        {
          text: '関数',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'function'),
        },
        {
          text: '数学',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'math'),
        },
        {
          text: 'オブジェクト',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'object'),
        },
        {
          text: '述語',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'predicate'),
        },
        {
          text: 'Promise',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'promise'),
        },
        {
          text: '文字列',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'string'),
        },
        {
          text: 'ユーティリティ',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'util'),
        },
        {
          text: 'エラー',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'error'),
        },
      ]),
    },
    {
      text: '互換性リファレンス',
      items: sortByText([
        {
          text: '配列',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'array'),
        },
        {
          text: '関数',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'function'),
        },
        {
          text: '数学',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'math'),
        },
        {
          text: 'オブジェクト',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'object'),
        },
        {
          text: '述語',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'predicate'),
        },
        {
          text: '文字列',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'string'),
        },
        {
          text: 'ユーティリティ',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'ja', 'reference', 'compat', 'util'),
        },
      ]),
    },
  ];
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  ja: {
    translations: {
      button: {
        buttonText: '検索',
        buttonAriaLabel: '検索',
      },
      modal: {
        backButtonTitle: '戻る',
        displayDetails: '詳細を表示',
        footer: {
          closeKeyAriaLabel: '閉じる',
          closeText: '閉じる',
          navigateDownKeyAriaLabel: '下へ',
          navigateText: '移動',
          navigateUpKeyAriaLabel: '上へ',
          selectKeyAriaLabel: '選択',
          selectText: '選択',
        },
        noResultsText: '検索結果が見つかりませんでした。',
        resetButtonTitle: 'すべてクリア',
      },
    },
  },
};
