export interface Banner {
  title: string;
  description: string;
  link: string;
}

export const BANNER_DATA: Banner[] = [
  {
    title: '🎙️ 조건부 렌더링, 어떻게 처리하시나요?',
    description:
      '논리 연산자(&&)와 삼항 연산자(?:)를 활용하는 전통적인 방식, 혹은 <If /> 같은 선언적인 컴포넌트를 사용하는 방식. 어떤 접근법이 효과적일까요?',
    link: 'https://github.com/toss/frontend-fundamentals/discussions/4',
  },
  {
    title: '[🏟️ 3월 콜로세움] 처음 커리어 시작은 대기업에서 vs 스타트업에서 어디가 좋을까?',
    description: 'UpVote을 많이 받은 코멘트 작성자에게는 Frontend Fundamentals 굿즈를 보내드려요.',
    link: 'https://github.com/toss/frontend-fundamentals/discussions/172',
  },
  {
    title: '토스에서 Desktop Frontend Engineer를 모시고 있어요.',
    description: '수많은 기능을 어떻게 우아한 코드로 구현할 수 있을까요? 함께 개발해요!',
    link: 'https://toss.im/career/job-detail?job_id=4664498003',
  },
  {
    title: '🎙️ if문의 return이 간단한 한 줄이라면 어떻게 사용하시나요?',
    description:
      '간단한 조건문에서 return을 한 줄로 작성할지, 중괄호 {}를 사용할지 고민되시나요? 가독성, 코드 일관성, 유지보수성, Diff 최소화 등의 측면에서 다양한 의견이 오갔습니다.',
    link: 'https://github.com/toss/frontend-fundamentals/discussions/41',
  },
];
