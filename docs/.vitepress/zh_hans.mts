import { type DefaultTheme, defineConfig } from 'vitepress';

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
    { text: '参考', link: '/zh_hans/reference/array/chunk' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: '指南',
      items: [
        { text: '简介', link: '/zh_hans/intro' },
        { text: '安装', link: '/zh_hans/installation' },
        { text: '包体积影响', link: '/zh_hans/bundle-size' },
        { text: '性能', link: '/zh_hans/performance' },
        { text: '与 Lodash 兼容性', link: '/zh_hans/compatibility' },
      ],
    },
    {
      text: '参考',
      items: [
        {
          text: '数组工具',
          items: [
            { text: 'chunk', link: '/zh_hans/reference/array/chunk' },
            { text: 'concat (兼容性)', link: '/zh_hans/reference/compat/array/concat' },
            { text: 'countBy', link: '/zh_hans/reference/array/countBy' },
            { text: 'compact', link: '/zh_hans/reference/array/compact' },
            { text: 'difference', link: '/zh_hans/reference/array/difference' },
            { text: 'differenceBy', link: '/zh_hans/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/zh_hans/reference/array/differenceWith' },
            { text: 'drop', link: '/zh_hans/reference/array/drop' },
            { text: 'dropWhile', link: '/zh_hans/reference/array/dropWhile' },
            { text: 'dropRight', link: '/zh_hans/reference/array/dropRight' },
            { text: 'dropRightWhile', link: '/zh_hans/reference/array/dropRightWhile' },
            { text: 'fill', link: '/zh_hans/reference/array/fill' },
            { text: 'toFilled', link: '/zh_hans/reference/array/toFilled' },
            { text: 'flatMap', link: '/zh_hans/reference/array/flatMap' },
            { text: 'flatten', link: '/zh_hans/reference/array/flatten' },
            { text: 'flattenDeep', link: '/zh_hans/reference/array/flattenDeep' },
            { text: 'forEachRight', link: '/zh_hans/reference/array/forEachRight' },
            { text: 'groupBy', link: '/zh_hans/reference/array/groupBy' },
            { text: 'intersection', link: '/zh_hans/reference/array/intersection' },
            { text: 'intersectionBy', link: '/zh_hans/reference/array/intersectionBy' },
            { text: 'intersectionWith', link: '/zh_hans/reference/array/intersectionWith' },
            { text: 'keyBy', link: '/zh_hans/reference/array/keyBy' },
            { text: 'minBy', link: '/zh_hans/reference/array/minBy' },
            { text: 'maxBy', link: '/zh_hans/reference/array/maxBy' },
            { text: 'min (兼容性)', link: '/zh_hans/reference/compat/array/min' },
            { text: 'max (兼容性)', link: '/zh_hans/reference/compat/array/max' },
            { text: 'orderBy', link: '/zh_hans/reference/array/orderBy' },
            { text: 'partition', link: '/zh_hans/reference/array/partition' },
            { text: 'sample', link: '/zh_hans/reference/array/sample' },
            { text: 'sampleSize', link: '/zh_hans/reference/array/sampleSize' },
            { text: 'shuffle', link: '/zh_hans/reference/array/shuffle' },
            { text: 'take', link: '/zh_hans/reference/array/take' },
            { text: 'takeWhile', link: '/zh_hans/reference/array/takeWhile' },
            { text: 'takeRight', link: '/zh_hans/reference/array/takeRight' },
            { text: 'takeRightWhile', link: '/zh_hans/reference/array/takeRightWhile' },
            { text: 'union', link: '/zh_hans/reference/array/union' },
            { text: 'unionBy', link: '/zh_hans/reference/array/unionBy' },
            { text: 'unionWith', link: '/zh_hans/reference/array/unionWith' },
            { text: 'uniq', link: '/zh_hans/reference/array/uniq' },
            { text: 'uniqBy', link: '/zh_hans/reference/array/uniqBy' },
            { text: 'uniqWith', link: '/zh_hans/reference/array/uniqWith' },
            { text: 'unzip', link: '/zh_hans/reference/array/unzip' },
            { text: 'unzipWith', link: '/zh_hans/reference/array/unzipWith' },
            { text: 'without', link: '/zh_hans/reference/array/without' },
            { text: 'xor', link: '/zh_hans/reference/array/xor' },
            { text: 'xorBy', link: '/zh_hans/reference/array/xorBy' },
            { text: 'xorWith', link: '/zh_hans/reference/array/xorWith' },
            { text: 'zip', link: '/zh_hans/reference/array/zip' },
            { text: 'zipObject', link: '/zh_hans/reference/array/zipObject' },
            { text: 'zipObjectDeep (兼容性)', link: '/zh_hans/reference/compat/array/zipObjectDeep' },
            { text: 'zipWith', link: '/zh_hans/reference/array/zipWith' },
            { text: 'head', link: '/zh_hans/reference/array/head' },
            { text: 'tail', link: '/zh_hans/reference/array/tail' },
            { text: 'last', link: '/zh_hans/reference/array/last' },
            { text: 'initial', link: '/zh_hans/reference/array/initial' },
          ],
        },
        {
          text: '函数工具',
          items: [
            { text: 'debounce', link: '/zh_hans/reference/function/debounce' },
            { text: 'throttle', link: '/zh_hans/reference/function/throttle' },
            { text: 'negate', link: '/zh_hans/reference/function/negate' },
            { text: 'once', link: '/zh_hans/reference/function/once' },
            { text: 'noop', link: '/zh_hans/reference/function/noop' },
          ],
        },
        {
          text: '数学工具',
          items: [
            { text: 'clamp', link: '/zh_hans/reference/math/clamp' },
            { text: 'inRange', link: '/zh_hans/reference/math/inRange' },
            { text: 'mean', link: '/zh_hans/reference/math/mean' },
            { text: 'meanBy', link: '/zh_hans/reference/math/meanBy' },
            { text: 'random', link: '/zh_hans/reference/math/random' },
            { text: 'randomInt', link: '/zh_hans/reference/math/randomInt' },
            { text: 'range', link: '/zh_hans/reference/math/range' },
            { text: 'round', link: '/zh_hans/reference/math/round' },
            { text: 'sum', link: '/zh_hans/reference/math/sum' },
            { text: 'sumBy', link: '/zh_hans/reference/math/sumBy' },
          ],
        },
        {
          text: '对象工具',
          items: [
            { text: 'clone', link: '/zh_hans/reference/object/clone' },
            { text: 'invert', link: '/zh_hans/reference/object/invert' },
            { text: 'flattenObject', link: '/zh_hans/reference/object/flattenObject' },
            { text: 'omit', link: '/zh_hans/reference/object/omit' },
            { text: 'omitBy', link: '/zh_hans/reference/object/omitBy' },
            { text: 'pick', link: '/zh_hans/reference/object/pick' },
            { text: 'pickBy', link: '/zh_hans/reference/object/pickBy' },
            { text: 'get (兼容性)', link: '/zh_hans/reference/compat/object/get' },
            { text: 'set (兼容性)', link: '/zh_hans/reference/compat/object/set' },
          ],
        },
        {
          text: '谓词',
          items: [
            { text: 'isEqual', link: '/zh_hans/reference/predicate/isEqual' },
            { text: 'isLength', link: '/zh_hans/reference/predicate/isLength' },
            { text: 'isPlainObject', link: '/zh_hans/reference/predicate/isPlainObject' },
            { text: 'isNil', link: '/zh_hans/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/zh_hans/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/zh_hans/reference/predicate/isNull' },
            { text: 'isUndefined', link: '/zh_hans/reference/predicate/isUndefined' },
          ],
        },
        {
          text: 'Promise 工具',
          items: [
            { text: 'delay', link: '/zh_hans/reference/promise/delay' },
            { text: 'timeout', link: '/zh_hans/reference/promise/timeout' },
            { text: 'withTimeout', link: '/zh_hans/reference/promise/withTimeout' },
          ],
        },
        {
          text: '字符串工具',
          items: [
            { text: 'camelCase', link: '/zh_hans/reference/string/camelCase' },
            { text: 'snakeCase', link: '/zh_hans/reference/string/snakeCase' },
            { text: 'kebabCase', link: '/zh_hans/reference/string/kebabCase' },
            { text: 'lowerCase', link: '/zh_hans/reference/string/lowerCase' },
            { text: 'capitalize', link: '/zh_hans/reference/string/capitalize' },
            { text: 'startsWith (兼容性)', link: '/zh_hans/reference/string/startsWith' },
            { text: 'endsWith (兼容性)', link: '/zh_hans/reference/string/endsWith' },
          ],
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
