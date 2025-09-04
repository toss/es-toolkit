import path from 'node:path';
import { type DefaultTheme, defineConfig } from 'vitepress';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import { sortByText } from './libs/sortByText.mts';

const docsRoot = path.resolve(import.meta.dirname, '..');

// eslint-disable-next-line @typescript-eslint/naming-convention
export const zh_hans = defineConfig({
  lang: 'zh_hans',
  description: '一款先进的高性能 JavaScript 实用库，具有小巧的包体积和强大的类型注解。',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

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
    { text: 'Lodash 兼容性', link: '/zh_hans/reference/compat/array/castArray' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: '指南',
      items: [
        { text: '简介', link: '/zh_hans/intro' },
        { text: '安装和使用', link: '/zh_hans/usage' },
        { text: '包体积影响', link: '/zh_hans/bundle-size' },
        { text: '性能', link: '/zh_hans/performance' },
        { text: 'Lodash 兼容性', link: '/zh_hans/compatibility' },
      ],
    },
    {
      text: '参考',
      items: sortByText([
        {
          text: '数组工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'array'),
        },
        {
          text: '函数工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'function'),
        },
        {
          text: '数学工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'math'),
        },
        {
          text: '对象工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'object'),
        },
        {
          text: '谓词',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'predicate'),
        },
        {
          text: 'Promise 工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'promise'),
        },
        {
          text: '字符串工具',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'string'),
        },
        {
          text: '工具函数',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'util'),
        },
        {
          text: '错误',
          collapsed: true,
          items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'error'),
        },
      ]),
    },
    {
      text: 'Lodash 兼容性',
      items: [
        {
          text: '简介',
          link: '/zh_hans/compat/intro',
        },
        {
          text: '参考',
          items: sortByText([
            {
              text: '数组工具',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'array'),
            },
            {
              text: '函数工具',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'function'),
            },
            {
              text: '数学工具',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'math'),
            },
            {
              text: '对象工具',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'object'),
            },
            {
              text: '谓词',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'predicate'),
            },
            {
              text: '字符串工具',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'string'),
            },
            {
              text: '工具函数',
              collapsed: true,
              items: getSidebarItems(docsRoot, 'zh_hans', 'reference', 'compat', 'util'),
            },
          ]),
        },
      ],
    },
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
