# es-toolkit에 기여하기

우리는 커뮤니티의 모든 분들의 기여를 환영해요. 이 저장소의 모든 소통은 영어로 진행돼요.

> es-toolkit의 모든 기여자는 우리의 행동 강령을 준수해야 해요. 어떤 행동이 허용되고 허용되지 않는지 이해하려면 [전체 내용](./CODE_OF_CONDUCT.md)을 확인해 보세요.

## 1. 우리의 설계 원칙

우리는 성능, 구현의 단순함, 그리고 자세한 문서화를 중요하게 생각해요. 다양한 기능과 옵션을 지원하는 것을 목표로 하지 않아요. 우리의 목표는 성능이 뛰어나고 안정적으로 작동하는 핵심 유틸리티들만 제공하는 것이에요.

### 1.1 개발 범위

#### `es-toolkit`

es-toolkit은 현대적인 JavaScript 프로젝트에서 일반적으로 사용되는 고품질 유틸리티 함수 라이브러리에요.

우리는 JavaScript의 내장 메서드로는 만들기 어렵지만 자주 필요하고 유용한 함수들을 구현하는 데 집중해요.

예시로는 [`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html) 등이 있어요.

우리는 최신 JavaScript로 쉽게 대체할 수 있는 함수들은 구현하지 않아요. 예를 들어:

- `isArray` (`Array.isArray` 대신 사용)
- `isNaN` (`Number.isNaN` 대신 사용)
- `isNumber` (`typeof value === 'number'` 대신 사용)
- `min` (`Math.min()` 대신 사용)

#### `es-toolkit/compat`

[`lodash`](https://lodash.com/docs/4.17.15)를 사용하는 프로젝트가 es-toolkit로 쉽게 마이그레이션할 수 있도록 도와드리기 위해, `lodash`에서 제공하는 모든 함수를 구현해요.

### 1.2 성능

es-toolkit에서 제공하는 모든 함수는 다른 대안이 되는 라이브러리들보다 성능이 더 좋거나 최소한 비슷한 수준이어야 해요.

우리는 코드가 수정될 때마다 라이브러리의 성능을 측정해요. [vitest의 benchmark 기능](https://vitest.dev/api/#bench)을 사용하고 있어요. 벤치마크 코드는 [benchmark 디렉토리](https://github.com/toss/es-toolkit/tree/main/benchmarks)를 참고해 주세요.

새로운 기능이 추가될 때는 벤치마크 코드도 함께 추가해야 해요. 풀 리퀘스트를 열 때 쉬운 참고와 히스토리 추적을 위해 벤치마크 스크린샷도 함께 첨부해 주세요.

### 1.3 단순함

우리는 성능, 코드 가독성, 그리고 쉬운 유지보수를 위해 다양한 기능보다는 구현과 인터페이스의 단순함을 중요하게 생각해요. 우리 함수들은 모든 사용 사례에 맞는 복잡한 옵션을 제공하지 않아요.

이런 방식으로, 엣지 케이스를 지원하기 위한 복잡한 옵션이나 오버로딩을 완전히 활용하는 대신, 가장 일반적인 85% 사용 사례를 위한 가장 간단한 인터페이스와 구현을 제공하는 것을 목표로 해요.

우리는 같은 기능을 달성하는 여러 가지 접근 방식이 있다는 것을 인정해요. 성능 차이가 10% 미만이라면 우리 코딩 스타일 가이드라인을 따라 주세요:

<details>
<summary>
1. <code>reduce</code>보다 <code>for</code> 루프를 선호해요.
</summary>

대부분의 경우, `reduce`보다 `for` 루프를 사용하는 것을 선호해요. [immer](https://github.com/immerjs/immer)와 같은 도구 없이는 `reduce`로 불변성을 유지하는 것이 어려울 수 있고, 함수형 프로그래밍은 일반적으로 지역적 가변성을 허용하기 때문이에요.

예를 들어, `keyBy`를 `reduce` 대신 `for ... of` 루프를 사용해서 구현하는 것을 선호해요.

```typescript
export function keyBy<T, K extends PropertyKey>(arr: readonly T[], getKeyFromItem: (item: T) => K): Record<K, T> {
  const result = {} as Record<K, T>;

  for (const item of arr) {
    const key = getKeyFromItem(item);
    result[key] = item;
  }

  return result;
}
```

</details>

<details>
<summary>
2. 내장 JavaScript 함수와 연산자를 선호해요.
</summary>

`Array.isArray()`, `typeof value === 'string'`, `Number.isNaN()`과 같은 내장 JavaScript 함수, 메서드, 연산자를 사용하는 것을 선호해요. `es-toolkit`이나 다른 라이브러리의 `isArray()`, `isString()`, `isNaN()`과 같은 커스텀 함수는 사용하지 마세요.

이렇게 하면 코드를 더 간결하게 유지하고, 불필요한 함수 호출을 제거하며, 함수 간의 결합도를 줄일 수 있어요.

</details>

### 1.4 문서화

우리 함수들은 모두 쉽게 참고할 수 있도록 자세한 문서가 필요해요. 각 함수마다 JSDoc은 물론이고, 모든 기능에 대해 [문서 디렉토리](https://github.com/toss/es-toolkit/tree/main/docs)에 상세한 설명 문서도 있어야 해요.

우리의 주요 사용 언어는 영어이지만, 한국어, 일본어, 중국어 간체 문서도 지원하려고 노력하고 있어요. 외국어로 문서를 작성하는 데 어려움이 있다면 우리 기여자들에게 알려주세요. 필요한 번역을 도와드릴게요.

## 2. 코딩 규칙

다음은 `es-toolkit` 저장소에서 따르는 코딩 규칙이에요:

### 2.1 타입 매개변수에는 짧은 이름을 사용해요

- [difference](https://es-toolkit.dev/reference/array/difference.html)처럼 elements에는 `T`를 사용해요.
- [attempt](https://es-toolkit.dev/reference/util/attempt.html)처럼 errors에는 `E`를 사용해요.
- [groupBy](https://es-toolkit.dev/reference/array/groupBy.html)처럼 keys에는 `K`를 사용해요.

## 3. Issues

다음과 같은 방법으로 es-toolkit에 기여할 수 있어요:

- 우리의 [문서](https://es-toolkit.dev) 개선하기
- [Issues 탭에서 버그 신고하기](https://github.com/toss/es-toolkit/issues/new/choose)
- [새로운 기능이나 패키지 요청하기](https://github.com/toss/es-toolkit/issues/new/choose)
- [Issues 목록](https://github.com/toss/es-toolkit/issues)을 보고 수정할 것들 확인하기

## 4. Pull Requests

> [Pull Requests 열기](https://github.com/toss/es-toolkit/compare) <br/>

자신만의 Pull Requests를 올릴 수 있어요. Pull Requests의 제목은 다음 형식과 일치해야 해요:

```
<type>[function names]: <description>
```

> 우리는 모든 PR을 main으로 squash merge하기 때문에 히스토리의 커밋 수나 스타일에 대해서는 신경 쓰지 않아요. <br/>
> 본인이 편한 스타일대로 커밋하시면 돼요.

### 4.1 Type

**Type은 다음 중 하나여야 해요**

배포된 코드를 변경한 경우:

- feat - 새로운 기능 추가
- fix - 새로운 기능을 추가하지 않는 수정사항

배포된 코드를 변경하지 않은 경우:

- docs - 문서만 변경한 경우
- test - 테스트만 변경한 경우

기타:

- chore - 그 외 모든 것

### 4.2 Function Names

변경한 함수의 이름이에요. (예: debounce, throttle)
<br/>
여러 패키지에 걸쳐 변경한 경우, 패키지 범위를 작성하는 것은 선택사항이에요.

### 4.3 Description

PR이 무엇에 관한 것인지 명확하고 간결한 설명이 담겨야 해요.
