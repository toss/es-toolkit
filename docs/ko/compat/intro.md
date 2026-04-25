# es-toolkit/compat

`es-toolkit/compat`은 [Lodash](https://lodash.com)와 똑같은 인터페이스와 동작을 제공하는 모듈이에요. 기존에 Lodash로 쓰던 코드를 그대로 두고 천천히 `es-toolkit`으로 옮겨갈 수 있도록 만들어졌어요.

기존에 Lodash를 쓰고 있던 프로젝트가 아니라면 [`es-toolkit`](/ko/intro)을 사용해 주세요.

::: tip ✅ 1.39.3 버전부터 Lodash와 100% 호환성을 보장해요
Lodash가 직접 쓰는 테스트 코드를 그대로 통과해요. 동작은 같으면서 더 가볍고 빨라요.
:::

```ts
// lodash와 같은 호출 형태를 es-toolkit/compat에서 그대로 사용할 수 있어요
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3, 4], 0);
// []을 반환해요. lodash와 동일해요.
```

## 마이그레이션 흐름

기존 코드에서 Lodash를 걷어낼 때는 다음 순서를 추천해요.

1. `lodash` / `lodash-es`의 import 경로를 `es-toolkit/compat`으로 바꿔주세요. 호출하는 코드는 그대로 두면 돼요.
2. 시간을 두고 호출하는 부분을 정리해 가며 import를 [`es-toolkit`](/ko/intro)으로 바꿔주세요. 다 옮기고 나면 번들이 더 작고 더 빨라져요.

## `es-toolkit`과의 차이점

- **API 모양**: Lodash와 1:1로 일치해요. 자동 타입 변환, 여러 가지 인자 형태, 더 이상 권장되지 않는 함수까지 그대로 들어 있어요. [`es-toolkit`](/ko/intro)은 타입이 안전하고 깔끔한 형태만 제공해요.
- **번들 크기와 속도**: [`es-toolkit`](/ko/intro)보다 살짝 크고 살짝 느려요. Lodash와 동작을 맞추기 위한 추가 처리가 들어가기 때문이에요.
- **권장되지 않는 함수**: Lodash에서 더 이상 권장하지 않는 함수도 호환을 위해 `compat`에는 남아있지만 [`es-toolkit`](/ko/intro)에는 들어가지 않아요. 마이그레이션 중에 같이 정리해 주세요.

함수별 자세한 문서는 [호환성 레퍼런스](/ko/compat/reference/array/castArray)에서 확인할 수 있어요.

## 설계 원칙

::: info
`es-toolkit/compat` 설계 원칙의 방향성은 변경될 수 있어요.
:::

`es-toolkit/compat`은 다음과 같은 기능들에 대해서 `lodash`와 100% 동일한 기능을 제공하는 것을 목표로 해요.

- `lodash`의 테스트 케이스로 작성된 기능
- `@types/lodash` 또는 `@types/lodash-es`의 타입에서 추론할 수 있는 기능
- `lodash`에서 `es-toolkit`으로 코드를 마이그레이션하는 동안 발견된 기능 차이점 ([이슈 페이지](https://github.com/toss/es-toolkit/issues)에 제보해 주세요.)

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
