import { type DefaultTheme, defineConfig } from 'vitepress';
import { buildFlavorSidebar, type SidebarLabels } from './libs/buildFlavorSidebar.mts';

const labels: SidebarLabels = {
  guide: 'ガイド',
  reference: 'リファレンス',
  introduction: '紹介',
  installation: 'インストールと使用方法',
  bundleSize: 'バンドルサイズ',
  performance: 'パフォーマンス',
  aiIntegration: 'AI 連携',
  categories: {
    array: '配列',
    function: '関数',
    map: 'Map',
    math: '数学',
    object: 'オブジェクト',
    predicate: '述語',
    promise: 'Promise',
    set: 'Set',
    string: '文字列',
    util: 'ユーティリティ',
    error: 'エラー',
  },
};

export const ja = defineConfig({
  lang: 'ja',
  description: '高速なパフォーマンスと小さなバンドルサイズを持つ最先端のJavaScriptユーティリティライブラリ',

  themeConfig: {
    darkModeSwitchLabel: 'ダークモード',

    nav: nav(),

    sidebar: buildFlavorSidebar('ja', labels),

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
    { text: 'Lodash 互換性', link: '/ja/compat/intro' },
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
