# Lodash와의 호환성

```tsx
// es-toolkit/compat은 lodash와 100% 동일한 동작을 제공하도록 목표하고 있어요
import { chunk } from 'es-toolkit/compat';

// es-toolkit은 원래 chunk의 size로 0을 지원하지 않았어요
chunk([1, 2, 3, 4], 0);
// es-toolkit/compat은 lodash와 같은 []을 반환해요
```

`lodash`와 최대 호환성을 위해서는 `es-toolkit/compat` 라이브러리를 사용하세요.

`es-toolkit`은 매끄러운 마이그레이션을 보장하기 위해, 두 라이브러리 사이의 동작 차이가 없는 `es-toolkit/compat` 라이브러리를 개발하고 있어요. `lodash`와 동일한 API와 기능을 제공하여, 수월하게 마이그레이션을 할 수 있도록 도와줄 예정이에요.

`es-toolkit/compat`은 실제 `lodash` 테스트 코드를 이용해서 테스트돼요.

`es-toolkit/compat`은 원래 `es-toolkit`에 비해 런타임 퍼포먼스나 번들 크기가 최적은 아닐 수 있어요. 마이그레이션 중에 사용하는 도구로 생각해 주시고, 새로운 기능은 `es-toolkit`로 개발해주세요.

## 설계 원칙

::: info
`es-toolkit/compat` 설계 원칙의 방향성은 변경될 수 있어요.
:::

`es-toolkit/compat`은 다음과 같은 기능들에 대해서 `lodash`와 100% 동일한 기능을 제공하는 것을 목표로 해요.

- `lodash`의 테스트 케이스로 작성된 기능
- `@types/lodash` 또는 `@types/lodash-es`의 타입에서 추론할 수 있는 기능

아래와 같은 기능은 `es-toolkit/compat`에서 지원하지 않아요.

- 암시적 타입 변환: 빈 문자열을 0 또는 false로 변환하는 것과 같은 동작
- 어떤 경우에 특화된 구현: [sortedUniq](https://lodash.com/docs/4.17.15#sortedUniq)와 같이 정렬된 배열만 받는 함수
- JavaScript 내장 객체의 프로토타입이 바뀐 경우에 대응하는 코드
- JavaScript Realm에 대응하는 코드
- 메서드 체이닝: `_(arr).map(...).filter(...)`와 같은 메서드 체이닝

## 구현 상태

::: info
아래 이모지로 현재 구현 상태를 나타내고 있어요.

- ✅: 완료 (구현됐고, lodash 테스트 코드를 모두 통과해요.)
- 📝: 리뷰 중 (구현됐지만, lodash 테스트 코드로 테스트되지는 않았어요.)
- ❌: 아직 구현되지 않음

"리뷰 중"으로 표시되었더라고 하더라도, 이미 lodash와 100% 동일한 기능을 제공하고 있을 수도 있어요.
:::

<CompatibilityStatus lang="ko"/>
