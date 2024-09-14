import { type DefaultTheme, defineConfig } from 'vitepress';
import { sortByText } from './libs/sortByText.mts';
import { getSidebarItems } from './libs/getSidebarItems.mts';
import path from 'node:path';

const docsRoot = path.resolve(import.meta.dirname, '..');

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
        { text: '설치 및 사용 방법', link: '/ko/usage' },
        { text: '번들 사이즈', link: '/ko/bundle-size' },
        { text: '성능', link: '/ko/performance' },
        { text: 'Lodash와 호환성', link: '/ko/compatibility' },
      ],
    },
    {
      text: '레퍼런스',
      items: sortByText([
        {
          text: '배열',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'array'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'array'),
          ],
        },
        {
          text: '함수',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'function'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'function'),
          ],
        },
        {
          text: '숫자',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'math'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'math'),
          ],
        },
        {
          text: '객체',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'object'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'object'),
          ],
        },
        {
          text: '타입 가드',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'predicate'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'predicate'),
          ],
        },
        {
          text: 'Promise',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'promise'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'promise'),
          ],
        },
        {
          text: '문자열',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'string'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'string'),
          ],
        },
        {
          text: '유틸리티',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'util'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'util'),
          ],
        },
        {
          text: '에러',
          items: [
            ...getSidebarItems(docsRoot, 'ko', 'reference', 'error'),
            ...getSidebarItems.compat('ko', docsRoot, 'ko', 'reference', 'compat', 'error'),
          ],
        },
      ]),
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
