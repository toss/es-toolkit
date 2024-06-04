import { defineConfig, type DefaultTheme } from 'vitepress';

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
      ],
    },
    {
      text: '레퍼런스',
      items: [
        {
          text: '배열',
          items: [
            { text: 'chunk', link: '/ko/reference/array/chunk' },
            { text: 'difference', link: '/ko/reference/array/difference' },
            { text: 'differenceBy', link: '/ko/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/ko/reference/array/differenceWith' },
            { text: 'drop', link: '/ko/reference/array/drop' },
            { text: 'dropRight', link: '/ko/reference/array/dropRight' },
            { text: 'dropWhile', link: '/ko/reference/array/dropWhile' },
            { text: 'dropRightWhile', link: '/ko/reference/array/dropRightWhile' },
            { text: 'groupBy', link: '/ko/reference/array/groupBy' },
            { text: 'intersection', link: '/ko/reference/array/intersection' },
            { text: 'intersectionBy', link: '/ko/reference/array/intersectionBy' },
            { text: 'intersectionWith', link: '/ko/reference/array/intersectionWith' },
            { text: 'partition', link: '/ko/reference/array/partition' },
            { text: 'sample', link: '/ko/reference/array/sample' },
            { text: 'shuffle', link: '/ko/reference/array/shuffle' },
            { text: 'take', link: '/ko/reference/array/take' },
            { text: 'takeWhile', link: '/ko/reference/array/takeWhile' },
            { text: 'takeRight', link: '/ko/reference/array/takeRight' },
            { text: 'takeRightWhile', link: '/ko/reference/array/takeRightWhile' },
            { text: 'union', link: '/ko/reference/array/union' },
            { text: 'unionBy', link: '/ko/reference/array/unionBy' },
            { text: 'unionWith', link: '/ko/reference/array/unionWith' },
            { text: 'uniq', link: '/ko/reference/array/uniq' },
            { text: 'xor', link: '/ko/reference/array/xor' },
            { text: 'xorBy', link: '/ko/reference/array/xorBy' },
            { text: 'xorWith', link: '/ko/reference/array/xorWith' },
            { text: 'zip', link: '/ko/reference/array/zip' },
            { text: 'zipWith', link: '/ko/reference/array/zipWith' },
          ],
        },
        {
          text: '함수',
          items: [
            { text: 'debounce', link: '/ko/reference/function/debounce' },
            { text: 'throttle', link: '/ko/reference/function/throttle' },
            { text: 'once', link: '/ko/reference/function/once' },
          ],
        },
        {
          text: '숫자',
          items: [
            { text: 'clamp', link: '/ko/reference/math/clamp' },
            { text: 'round', link: '/ko/reference/math/round' },
            { text: 'sum', link: '/ko/reference/math/sum' },
          ],
        },
        {
          text: '객체',
          items: [
            { text: 'omit', link: '/ko/reference/object/omit' },
            { text: 'omitBy', link: '/ko/reference/object/omitBy' },
            { text: 'pick', link: '/ko/reference/object/pick' },
            { text: 'pickBy', link: '/ko/reference/object/pickBy' },
          ],
        },
        {
          text: '타입 가드',
          items: [
            { text: 'isNil', link: '/ko/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/ko/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/ko/reference/predicate/isNull' },
            { text: 'isUndefined', link: '/ko/reference/predicate/isUndefined' },
          ],
        },
        {
          text: 'Promise',
          items: [{ text: 'delay', link: '/ko/reference/promise/delay' }],
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
