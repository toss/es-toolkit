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
    { text: 'リファレンス', link: '/ja/reference/array/chunk' },
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
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'array'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'array'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'array'),
          ],
        },
        {
          text: '関数',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'function'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'function'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'function'),
          ],
        },
        {
          text: '数学',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'math'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'math'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'math'),
          ],
        },
        {
          text: 'オブジェクト',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'object'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'object'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'object'),
          ],
        },
        {
          text: '述語',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'predicate'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'predicate'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'predicate'),
          ],
        },
        {
          text: 'Promise',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'promise'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'promise'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'promise'),
          ],
        },
        {
          text: '文字列',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'string'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'string'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'string'),
          ],
        },
        {
          text: 'ユーティリティ',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'util'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'util'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'util'),
          ],
        },
        {
          text: 'エラー',
          items: [
            ...getSidebarItems(docsRoot, 'ja', 'reference', 'error'),
            ...getSidebarItems.compat('ja', docsRoot, 'ja', 'reference', 'compat', 'error'),
            ...getSidebarItems.fp('ja', docsRoot, 'ja', 'reference', 'fp', 'error'),
          ],
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
