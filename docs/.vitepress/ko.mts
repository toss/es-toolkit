import { type DefaultTheme, defineConfig } from 'vitepress';

export const ko = defineConfig({
  lang: 'ko',
  description: '빠른 성능, 작은 번들 사이즈를 가지는 현대적인 JavaScript 유틸리티 라이브러리',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: 'GitHub에서 수정하기',
    },

    footer: {
      message: 'MIT 라이선스에 따라 배포됩니다.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '홈', link: '/ko' },
    { text: '소개', link: '/ko/intro' },
    { text: '레퍼런스', link: '/ko/reference/array/chunk' },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: '가이드',
      items: [
        { text: '소개', link: '/ko/intro' },
        { text: '설치', link: '/ko/installation' },
        { text: '번들 사이즈', link: '/ko/bundle-size' },
        { text: '성능', link: '/ko/performance' },
        { text: 'Lodash와 호환성', link: '/ko/compatibility' },
      ],
    },
    {
      text: '레퍼런스',
      items: [
        {
          text: '배열',
          items: [
            { text: 'chunk', link: '/ko/reference/array/chunk' },
            { text: 'countBy', link: '/ko/reference/array/countBy' },
            { text: 'compact', link: '/ko/reference/array/compact' },
            { text: 'difference', link: '/ko/reference/array/difference' },
            { text: 'differenceBy', link: '/ko/reference/array/differenceBy' },
            {
              text: 'differenceWith',
              link: '/ko/reference/array/differenceWith',
            },
            { text: 'drop', link: '/ko/reference/array/drop' },
            { text: 'dropWhile', link: '/ko/reference/array/dropWhile' },
            { text: 'dropRight', link: '/ko/reference/array/dropRight' },
            {
              text: 'dropRightWhile',
              link: '/ko/reference/array/dropRightWhile',
            },
            { text: 'fill', link: '/ko/reference/array/fill' },
            { text: 'toFilled', link: '/ko/reference/array/toFilled' },
            { text: 'flatMap', link: '/ko/reference/array/flatMap' },
            { text: 'flatten', link: '/ko/reference/array/flatten' },
            { text: 'flattenDeep', link: '/ko/reference/array/flattenDeep' },
            { text: 'forEachRight', link: '/reference/array/forEachRight' },
            { text: 'groupBy', link: '/ko/reference/array/groupBy' },
            { text: 'intersection', link: '/ko/reference/array/intersection' },
            {
              text: 'intersectionBy',
              link: '/ko/reference/array/intersectionBy',
            },
            {
              text: 'intersectionWith',
              link: '/ko/reference/array/intersectionWith',
            },
            { text: 'keyBy', link: '/ko/reference/array/keyBy' },
            { text: 'minBy', link: '/ko/reference/array/minBy' },
            { text: 'maxBy', link: '/ko/reference/array/maxBy' },
            { text: 'orderBy', link: '/ko/reference/array/orderBy' },
            { text: 'partition', link: '/ko/reference/array/partition' },
            { text: 'sample', link: '/ko/reference/array/sample' },
            { text: 'sampleSize', link: '/ko/reference/array/sampleSize' },
            { text: 'shuffle', link: '/ko/reference/array/shuffle' },
            { text: 'take', link: '/ko/reference/array/take' },
            { text: 'takeWhile', link: '/ko/reference/array/takeWhile' },
            { text: 'takeRight', link: '/ko/reference/array/takeRight' },
            {
              text: 'takeRightWhile',
              link: '/ko/reference/array/takeRightWhile',
            },
            { text: 'union', link: '/ko/reference/array/union' },
            { text: 'unionBy', link: '/ko/reference/array/unionBy' },
            { text: 'unionWith', link: '/ko/reference/array/unionWith' },
            { text: 'unzip', link: '/ko/reference/array/unzip' },
            { text: 'unzipWith', link: '/ko/reference/array/unzipWith' },
            { text: 'uniq', link: '/ko/reference/array/uniq' },
            { text: 'uniqBy', link: '/ko/reference/array/uniqBy' },
            { text: 'uniqWith', link: '/ko/reference/array/uniqWith' },
            { text: 'without', link: '/ko/reference/array/without' },
            { text: 'xor', link: '/ko/reference/array/xor' },
            { text: 'xorBy', link: '/ko/reference/array/xorBy' },
            { text: 'xorWith', link: '/ko/reference/array/xorWith' },
            { text: 'zip', link: '/ko/reference/array/zip' },
            { text: 'zipObject', link: '/ko/reference/array/zipObject' },
            { text: 'zipWith', link: '/ko/reference/array/zipWith' },
            { text: 'head', link: '/ko/reference/array/head' },
            { text: 'tail', link: '/ko/reference/array/tail' },
            { text: 'last', link: '/ko/reference/array/last' },
            { text: 'initial', link: '/ko/reference/array/initial' },
          ],
        },
        {
          text: '함수',
          items: [
            { text: 'debounce', link: '/ko/reference/function/debounce' },
            { text: 'throttle', link: '/ko/reference/function/throttle' },
            { text: 'negate', link: '/reference/function/negate' },
            { text: 'once', link: '/ko/reference/function/once' },
            { text: 'noop', link: '/ko/reference/function/noop' },
          ],
        },
        {
          text: '숫자',
          items: [
            { text: 'clamp', link: '/ko/reference/math/clamp' },
            { text: 'inRange', link: '/ko/reference/math/inRange' },
            { text: 'mean', link: '/ko/reference/math/mean' },
            { text: 'meanBy', link: '/ko/reference/math/meanBy' },
            { text: 'random', link: '/ko/reference/math/random' },
            { text: 'randomInt', link: '/ko/reference/math/randomInt' },
            { text: 'round', link: '/ko/reference/math/round' },
            { text: 'range', link: '/ko/reference/math/range' },
            { text: 'sum', link: '/ko/reference/math/sum' },
            { text: 'sumBy', link: '/ko/reference/math/sumBy' },
          ],
        },
        {
          text: '객체',
          items: [
            { text: 'clone', link: '/ko/reference/object/clone' },
            { text: 'omit', link: '/ko/reference/object/omit' },
            { text: 'omitBy', link: '/ko/reference/object/omitBy' },
            { text: 'pick', link: '/ko/reference/object/pick' },
            { text: 'pickBy', link: '/ko/reference/object/pickBy' },
            { text: 'invert', link: '/ko/reference/object/invert' },
          ],
        },
        {
          text: '타입 가드',
          items: [
            { text: 'isEqual', link: '/ko/reference/predicate/isEqual' },
            { text: 'isNil', link: '/ko/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/ko/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/ko/reference/predicate/isNull' },
            {
              text: 'isUndefined',
              link: '/ko/reference/predicate/isUndefined',
            },
          ],
        },
        {
          text: 'Promise',
          items: [{ text: 'delay', link: '/ko/reference/promise/delay' }],
        },
        {
          text: '문자열',
          items: [
            { text: 'camelCase', link: '/ko/reference/string/camelCase' },
            { text: 'snakeCase', link: '/ko/reference/string/snakeCase' },
            { text: 'kebabCase', link: '/ko/reference/string/kebabCase' },
            { text: 'lowerCase', link: '/ko/reference/string/lowerCase' },
            { text: 'capitalize', link: '/ko/reference/string/capitalize' },
          ],
        },
      ],
    },
  ];
}

export const search: DefaultTheme.LocalSearchOptions['locales'] = {
  ko: {
    translations: {
      button: {
        buttonText: '검색',
        buttonAriaLabel: '검색',
      },
      modal: {
        backButtonTitle: '뒤로가기',
        displayDetails: '더보기',
        footer: {
          closeKeyAriaLabel: '닫기',
          closeText: '닫기',
          navigateDownKeyAriaLabel: '아래로',
          navigateText: '이동',
          navigateUpKeyAriaLabel: '위로',
          selectKeyAriaLabel: '선택',
          selectText: '선택',
        },
        noResultsText: '검색 결과를 찾지 못했어요.',
        resetButtonTitle: '모두 지우기',
      },
    },
  },
};
