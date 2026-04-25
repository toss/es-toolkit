import { type DefaultTheme, defineConfig } from 'vitepress';
import { buildFlavorSidebar, type SidebarLabels } from './libs/buildFlavorSidebar.mts';

const labels: SidebarLabels = {
  guide: '가이드',
  reference: '레퍼런스',
  introduction: '소개',
  installation: '설치 및 사용 방법',
  bundleSize: '번들 사이즈',
  performance: '성능',
  aiIntegration: 'AI 활용',
  categories: {
    array: '배열',
    function: '함수',
    map: 'Map',
    math: '숫자',
    object: '객체',
    predicate: '타입 가드',
    promise: 'Promise',
    set: 'Set',
    string: '문자열',
    util: '유틸리티',
    error: '에러',
  },
};

export const ko = defineConfig({
  lang: 'ko',
  description: '빠른 성능, 작은 번들 사이즈를 가지는 현대적인 JavaScript 유틸리티 라이브러리',

  themeConfig: {
    darkModeSwitchLabel: '다크 모드',

    nav: nav(),

    sidebar: buildFlavorSidebar('ko', labels),

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
    { text: '레퍼런스', link: '/ko/reference/array/at' },
    { text: 'Lodash 호환성', link: '/ko/compat/intro' },
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
