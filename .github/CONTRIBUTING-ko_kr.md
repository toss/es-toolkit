# es-toolkit에 기여하기

어떤 분들의 기여도 환영해요! 이 저장소에서 모든 소통은 영어로 진행돼요. 한국어는 보조 언어로 사용돼요.

> es-toolkit에 기여할 때, [행동 강령(Code of conduct)](./CODE_OF_CONDUCT.md)을 준수해 주세요. 허용되는 행동과 허용되지 않는 행동을 준수해 주세요.

## 1. 설계 원칙

es-toolkit 프로젝트는 성능, 구현의 단순함, 그리고 꼼꼼한 문서화가 중요해요. 다양한 기능과 옵션을 지원하기보다, 성능이 뛰어나고 안정적으로 작동하는 핵심 유틸리티들만 제공하려고 해요.

### 1.1 개발 범위

#### `es-toolkit`

메인 라이브러리인 `es-toolkit`은 현대적인 JavaScript 프로젝트에서 일반적으로 사용되는 고품질 유틸리티 함수들을 담아요.

JavaScript의 내장 함수로는 만들기 어렵지만 자주 필요하고 유용한 함수들을 포함해요.

[`delay`](https://es-toolkit.dev/reference/promise/delay.html), [`windowed`](https://es-toolkit.dev/reference/array/windowed.html), [`keyBy`](https://es-toolkit.dev/reference/array/keyBy.html), [`mapValues`](https://es-toolkit.dev/reference/object/mapValues.html), [`camelCase`](https://es-toolkit.dev/reference/string/camelCase.html), [`toSnakeCaseKeys`](https://es-toolkit.dev/reference/object/toSnakeCaseKeys.html) 같은 함수를 참고해 주세요.

최신 JavaScript 내장 함수로 쉽게 대체할 수 있는 함수들은 구현하지 않아요. 예를 들어, 다음과 같은 함수들은 `es-toolkit`의 개발 범위가 아니에요.

- `isArray` (`Array.isArray`를 대신 사용)
- `isNaN` (`Number.isNaN`를 대신 사용)
- `isNumber` (`typeof value === 'number'`를 대신 사용)
- `min` (`Math.min()`를 대신 사용)

#### `es-toolkit/compat`

[`Lodash`](https://lodash.com/docs/4.17.15)를 사용하는 프로젝트가 es-toolkit로 쉽게 마이그레이션할 수 있도록 돕기 위해, `Lodash`에서 제공하는 모든 함수를 구현해요.

### 1.2 성능

es-toolkit에서 제공하는 모든 함수는 다른 유틸리티 라이브러리보다 성능이 더 좋거나 최소한 비슷한 수준이어야 해요.

함수가 수정될 때마다 [Vitest의 벤치마크 기능](https://vitest.dev/api/#bench)으로 성능을 측정해 주세요. 벤치마크 코드는 [`benchmark` 디렉토리](https://github.com/toss/es-toolkit/tree/main/benchmarks)에 모여 있으니, 참고해 주세요.

새로운 기능이 추가될 때는 벤치마크 코드도 추가해 주세요. 풀 리퀘스트를 열 때는 벤치마크 코드를 실행한 스크린샷도 함께 첨부해 주세요.

### 1.3 구현의 단순함

`es-toolkit`은 다양한 기능을 지원하기보다는, 구현과 인터페이스의 단순함을 중요하게 생각해요. 성능과 코드 가독성을 지키고, 쉽게 유지보수하기 위해서예요.

모든 요구사항이나 엣지 케이스를 만족하기 위한 복잡한 옵션을 제공하기보다, 85%에 해당하는 일반적인 사용 사례를 위한 가장 간단한 인터페이스와 구현을 제공하려고 해요.

같은 기능을 구현하기 위해서 여러 가지 코딩 스타일이 있어요. 성능 차이가 10% 미만이라면 다음 코딩 스타일 가이드라인을 따라 주세요.

<details>
<summary>
1. <code>reduce</code> 함수보다 <code>for</code> 문을 사용하세요.
</summary>

대부분의 경우 `reduce`보다 `for` 루프를 사용하세요. [immer](https://github.com/immerjs/immer)와 같은 도구 없이는 `reduce`로 불변성을 유지하는 것이 어렵고, 함수형 프로그래밍에서도 일반적으로 지역 변수 범위에서는 가변성을 허용하기 때문이에요.

예를 들어, `keyBy` 함수는 `reduce` 대신 `for ... of` 루프를 사용해서 구현되었어요.

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
2. 내장 JavaScript 함수와 연산자를 사용하세요.
</summary>

`Array.isArray()`, `typeof value === 'string'`, `Number.isNaN()`과 같은 내장 JavaScript 함수, 메서드, 연산자를 사용하세요. `es-toolkit/compat`이나 다른 라이브러리의 `isArray()`, `isString()`, `isNaN()`과 같은 커스텀 함수는 사용하지 마세요.

이렇게 하면 코드를 더 간결하게 유지하고, 불필요한 함수 호출을 제거하며, 함수 간의 결합도를 줄일 수 있어요.

</details>

### 1.4 문서화

모든 함수들은 라이브러리 사용자가 쉽게 참고할 수 있도록 자세한 문서가 필요해요. 각 함수마다 JSDoc과 함께 레퍼런스 문서가 존재해야 해요. 레퍼런스 문서는 [문서 디렉토리](https://github.com/toss/es-toolkit/tree/main/docs)에 포함해 주세요.

영어 문서를 가장 높은 우선순위로 제공하고 있지만, 한국어, 일본어, 중국어 간체 문서도 지원하고 있어요. 낯선 외국어로 문서를 작성하는 데 어려움이 있다면 라이브러리 운영진에게 풀 리퀘스트로 알려주세요. 필요한 번역을 도와드릴게요.

## 2. 코딩 스타일

다음은 `es-toolkit` 저장소에서 따르는 코딩 규칙이에요:

### 2.1 타입 매개변수에는 짧은 이름을 사용하세요

- [difference](https://es-toolkit.dev/reference/array/difference.html)처럼 elements에는 `T`를 사용해요.
- [attempt](https://es-toolkit.dev/reference/util/attempt.html)처럼 errors에는 `E`를 사용해요.
- [groupBy](https://es-toolkit.dev/reference/array/groupBy.html)처럼 keys에는 `K`를 사용해요.

## 3. 이슈 관리

es-toolkit에는 코드 말고도 다양한 방법으로 기여할 수 있어요.

- [문서](https://es-toolkit.dev)를 개선해 주세요.
- [Issues 탭에서 버그를 신고](https://github.com/toss/es-toolkit/issues/new/choose)해 주세요.
- [새로운 기능을 요청](https://github.com/toss/es-toolkit/issues/new/choose)해 주세요.
- [Issues 목록](https://github.com/toss/es-toolkit/issues)을 보고 수정할 것들을 확인해 보세요.

## 4. Pull Requests

> [Pull Requests 만들기](https://github.com/toss/es-toolkit/compare) <br/>

es-toolkit에서 수정할 점을 발견했다면 Pull Request를 올릴 수 있어요.

Pull Request의 제목은 다음 형식을 따라 주세요.

```
<타입>([함수 이름]): <설명>
```

> 모든 Pull Request는 스쿼시 머지돼요. 그래서 커밋의 숫자나 스타일은 자유롭게 해주세요. <br />
> 본인이 편한 스타일대로 커밋하시면 돼요.

### 4.1 타입

**타입은 다음 중 하나를 선택해 주세요.**

배포된 코드를 변경한 경우:

- feat - 새로운 기능 추가
- fix - 새로운 기능을 추가하지 않는 수정사항

배포된 코드를 변경하지 않은 경우:

- docs - 문서만 변경한 경우
- test - 테스트만 변경한 경우

기타:

- chore - 그 외 모든 것

### 4.2 함수 이름

변경한 함수의 이름을 포함해 주세요. (예: debounce, throttle)
<br/>
여러 함수들을 동시에 수정했다면, 수정된 함수 이름을 꼭 모두 포함할 필요는 없어요.

### 4.3 설명

Pull Request이 무엇에 관한 것인지 명확하고 간결한 설명을 담아 주세요.
