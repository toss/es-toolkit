import { type DefaultTheme, defineConfig } from 'vitepress';
import { buildFlavorSidebar, type SidebarLabels } from './libs/buildFlavorSidebar.mts';

const labels: SidebarLabels = {
  guide: '指南',
  reference: '参考',
  introduction: '简介',
  installation: '安装和使用',
  bundleSize: '包体积影响',
  performance: '性能',
  aiIntegration: 'AI 集成',
  categories: {
    array: '数组工具',
    function: '函数工具',
    map: 'Map 工具',
    math: '数学工具',
    object: '对象工具',
    predicate: '谓词',
    promise: 'Promise 工具',
    set: 'Set 工具',
    string: '字符串工具',
    util: '工具函数',
    error: '错误',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const zh_hans = defineConfig({
  lang: 'zh_hans',
  description: '一款先进的高性能 JavaScript 实用库，具有小巧的包体积和强大的类型注解。',

  themeConfig: {
    darkModeSwitchLabel: '深色模式',

    nav: nav(),

    sidebar: buildFlavorSidebar('zh_hans', labels),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '采用 MIT 许可证发布。',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '主页', link: '/zh_hans/' },
    { text: '简介', link: '/zh_hans/intro' },
    { text: '参考', link: '/zh_hans/reference/array/at' },
    { text: 'Lodash 兼容性', link: '/zh_hans/compat/intro' },
  ];
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  zh_hans: {
    translations: {
      button: {
        buttonText: '搜索',
        buttonAriaLabel: '搜索',
      },
      modal: {
        backButtonTitle: '返回',
        displayDetails: '显示详情',
        footer: {
          closeKeyAriaLabel: '关闭',
          closeText: '关闭',
          navigateDownKeyAriaLabel: '向下导航',
          navigateText: '导航',
          navigateUpKeyAriaLabel: '向上导航',
          selectKeyAriaLabel: '选择',
          selectText: '选择',
        },
        noResultsText: '未找到搜索结果。',
        resetButtonTitle: '重置',
      },
    },
  },
};
