export interface Banner {
  title: string;
  description: string;
  link: string;
}

export const BANNER_DATA: Banner[] = [
  {
    title: '🛠️ frontend-fundamentals',
    description: '프론트엔드 코드를 더 잘 짜는 방법을 고민하고 있나요? 실제 경험에서 나온 원칙과 예시들을 모아봤어요.',
    link: 'https://github.com/toss/frontend-fundamentals',
  },
  {
    title: '🇰🇷 es-hangul',
    description: '조사 붙이기, 초성 검색 같은 한글 작업을 쉽게 처리해주는 라이브러리예요.',
    link: 'https://github.com/toss/es-hangul',
  },
  {
    title: '⏳ suspensive',
    description: 'React Suspense 쓰고 싶은데 어렵게 느껴지셨나요? 실제 서비스에 바로 적용할 수 있게 도와드려요.',
    link: 'https://github.com/toss/suspensive',
  },
  {
    title: '🧩 use-funnel',
    description:
      '회원가입이나 결제처럼 여러 단계로 이뤄진 화면, 관리하기 복잡하죠? use-funnel 훅을 통해 깔끔하게 정리해보세요.',
    link: 'https://github.com/toss/use-funnel',
  },
  {
    title: '✨ overlay-kit',
    description:
      '모달 만들기, 매번 같은 코드를 반복하고 계신가요? 접근성까지 신경 쓴 모달/팝오버 컴포넌트를 소개합니다.',
    link: 'https://github.com/toss/overlay-kit',
  },
];
