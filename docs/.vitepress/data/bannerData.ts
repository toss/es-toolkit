export interface Banner {
  title: string;
  description: string;
  link: string;
}

export const KO_BANNER_DATA: Banner[] = [
  {
    title: '🛠️ frontend-fundamentals',
    description: '프론트엔드 코드를 더 잘 짜는 방법을 고민하고 있나요? 실무에서 비롯한 원칙과 예시들을 모아봤어요.',
    link: 'https://frontend-fundamentals.com/',
  },
  {
    title: '🇰🇷 es-hangul',
    description: '조사 붙이기, 초성 검색 같은 한글 작업을 쉽게 처리해주는 라이브러리예요.',
    link: 'https://github.com/toss/es-hangul',
  },
  {
    title: '⏳ suspensive',
    description: 'React Suspense를 실무에서 더 쉽게 활용하고 싶으신가요? 비동기 데이터 로딩을 간결하게 처리해보세요.',
    link: 'https://github.com/toss/suspensive',
  },
  {
    title: '🧩 use-funnel',
    description:
      '회원가입이나 결제처럼 여러 단계로 이뤄진 화면, 관리하기 복잡하죠? useFunnel 훅으로 깔끔하게 정리해보세요.',
    link: 'https://github.com/toss/use-funnel',
  },
  {
    title: '✨ overlay-kit',
    description: '오버레이, 매번 같은 코드를 반복하고 계신가요? 선언적인 코드로 모달/팝오버 컴포넌트를 작성해보세요.',
    link: 'https://github.com/toss/overlay-kit',
  },
];

export const EN_BANNER_DATA: Banner[] = [
  {
    title: '🛠️ frontend-fundamentals',
    description: 'Your compass for better code. Four core principles for writing easily modifiable frontend code.',
    link: 'https://frontend-fundamentals.com/en/',
  },
  {
    title: '⏳ suspensive',
    description: 'Make React Suspense easy. Less code, more power for async operations.',
    link: 'https://github.com/toss/suspensive',
  },
  {
    title: '🧩 use-funnel',
    description: 'Multi-step flows made simple. Perfect for funnels such as signup, checkout, and onboarding flows.',
    link: 'https://github.com/toss/use-funnel',
  },
  {
    title: '✨ overlay-kit',
    description: 'Modals and popovers with declarative API and type safety. Build rich UIs without breaking your flow.',
    link: 'https://github.com/toss/overlay-kit',
  },
];
