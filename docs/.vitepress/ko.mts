import { defineConfig, type DefaultTheme } from 'vitepress'

export const ko = defineConfig({
  lang: 'ko',
  description: '빠른 성능, 작은 번들 사이즈를 가지는 현대적인 JavaScript 유틸리티 라이브러리',

  themeConfig: {
    nav: nav(),

    sidebar: sidebar(),

    editLink: {
      pattern: 'https://github.com/toss/es-toolkit/edit/main/docs/:path',
      text: 'GitHub에서 수정하기'
    },

    footer: {
      message: 'MIT 라이선스에 따라 배포됩니다.',
      copyright: `Copyright © ${new Date().getFullYear()} Viva Republica, Inc.`
    }
  }
})

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: '홈', link: '/ko' },
    { text: '소개', link: '/ko/intro' },
    { text: '레퍼런스', link: '/ko/reference/array/chunk' },
  ]
}

function sidebar(): DefaultTheme.Sidebar {
  return [
    {
      text: '가이드',
      items: [
        { text: '소개', link: '/intro' },
        { text: '설치', link: '/installation' },
        { text: '번들 사이즈', link: '/bundle-size' },
        { text: '성능', link: '/performance' },
      ]
    },
    {
      text: '레퍼런스',
      items: [
        {
          text: '배열',
          items: [
            { text: 'chunk', link: '/reference/array/chunk' },
            { text: 'difference', link: '/reference/array/difference' },
            { text: 'differenceBy', link: '/reference/array/differenceBy' },
            { text: 'differenceWith', link: '/reference/array/differenceWith' },
            { text: 'drop', link: '/reference/array/drop' },
            { text: 'dropRight', link: '/reference/array/dropRight' },
            { text: 'dropWhile', link: '/reference/array/dropWhile' },
            { text: 'groupBy', link: '/reference/array/groupBy' },
            { text: 'intersection', link: '/reference/array/intersection' },
            { text: 'intersectionBy', link: '/reference/array/intersectionBy' },
            { text: 'intersectionWith', link: '/reference/array/intersectionWith' },
            { text: 'partition', link: '/reference/array/partition' },
            { text: 'sample', link: '/reference/array/sample' },
            { text: 'shuffle', link: '/reference/array/shuffle' },
            { text: 'take', link: '/reference/array/take' },
            { text: 'takeWhile', link: '/reference/array/takeWhile' },
            { text: 'takeRight', link: '/reference/array/takeRight' },
            { text: 'takeRightWhile', link: '/reference/array/takeRightWhile' },
            { text: 'union', link: '/reference/array/union' },
            { text: 'unionBy', link: '/reference/array/unionBy' },
            { text: 'unionWith', link: '/reference/array/unionWith' },
            { text: 'uniq', link: '/reference/array/uniq' },
            { text: 'xor', link: '/reference/array/xor' },
            { text: 'xorBy', link: '/reference/array/xorBy' },
            { text: 'xorWith', link: '/reference/array/xorWith' },
            { text: 'zip', link: '/reference/array/zip' },
            { text: 'zipWith', link: '/reference/array/zipWith' },
          ]
        },
        {
          text: '함수',
          items: [
            { text: 'debounce', link: '/reference/function/debounce' },
            { text: 'throttle', link: '/reference/function/throttle' },
            { text: 'once', link: '/reference/function/once' },
          ]
        },
        {
          text: '숫자',
          items: [
            { text: 'clamp', link: '/reference/math/clamp' },
            { text: 'round', link: '/reference/math/round' },
            { text: 'sum', link: '/reference/math/sum' },
          ]
        },
        {
          text: '객체',
          items: [
            { text: 'omit', link: '/reference/object/omit' },
            { text: 'omitBy', link: '/reference/object/omitBy' },
            { text: 'pick', link: '/reference/object/pick' },
            { text: 'pickBy', link: '/reference/object/pickBy' },
          ]
        },
        {
          text: '타입 가드',
          items: [
            { text: 'isNil', link: '/reference/predicate/isNil' },
            { text: 'isNotNil', link: '/reference/predicate/isNotNil' },
            { text: 'isNull', link: '/reference/predicate/isNull' },
            { text: 'isUndefined', link: '/reference/predicate/isUndefined' },
          ]
        },
        {
          text: 'Promise',
          items: [
            { text: 'delay', link: '/reference/promise/delay' },
          ]
        }
      ]
    }
  ]
}


export const search: DefaultTheme.LocalSearchOptions["locales"] = {
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
      }
    }
  }
}