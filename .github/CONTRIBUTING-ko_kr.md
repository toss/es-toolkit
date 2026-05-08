# es-toolkit에 기여하기

어떤 분들의 기여도 환영해요! 이 저장소에서 모든 소통은 영어로 진행돼요. 한국어는 보조 언어로 사용돼요.

> es-toolkit에 기여할 때, [행동 강령(Code of conduct)](./CODE_OF_CONDUCT.md)을 준수해 주세요. 허용되는 행동과 허용되지 않는 행동을 준수해 주세요.

## 패키지 매니저

이 프로젝트는 **Yarn 4**를 패키지 매니저로 사용해요. `yarn install`을 실행하면 Corepack을 통해 올바른 버전이 자동으로 설치돼요.

시작하는 방법:

1. Node.js가 설치되어 있는지 확인하세요 (필요한 버전은 `.nvmrc` 파일을 참고하세요)
2. Corepack을 활성화하세요: `corepack enable`
3. 의존성을 설치하세요: `yarn install`

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

TC39 제안에 포함된 함수의 경우, Stage 3에 도달하면 구현하지 않아요. Stage 2.7 이하의 초기 제안에 대해서는 명확한 필요가 있다면 추가를 고려할 수 있지만, 제안이 Stage 3 이상으로 진행되면 해당 함수를 지원 중단할 예정이에요. 그 시점에서는 네이티브 구현을 사용하는 것이 더 나은 선택이기 때문이에요.

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

### 1.4 타입

정확한 타입을 제공하는 것은 es-toolkit의 핵심적인 목표예요.
동시에 TypeScript 자체의 타입 동작과 일관성을 유지하는 것도 중요해요.

es-toolkit은 가장 널리 사용되는 설정인 TypeScript [`strict` 모드](https://www.typescriptlang.org/tsconfig/#strict)와 동일한 타입을 반환하는 것을 목표로 해요.

예를 들어, 아래의 `result1`과 `result2`는 같은 타입을 가져야 해요. `result2`는 본질적으로 `result1`이 직접 수행하는 동작을 감싼 래퍼에 불과하기 때문이에요.

```typescript
import { sample } from 'es-toolkit';

const arr = [1, 2, 3];

const result1 = arr[Math.floor(Math.random() * arr.length)]; // TypeScript strict 모드에서 `number`로 추론
const result2 = sample(arr); // 마찬가지로 `number`로 추론되어야 함
```

[noUncheckedIndexedAccess](https://www.typescriptlang.org/tsconfig/noUncheckedIndexedAccess.html)처럼 strict 모드 내에서도 기본값이 `false`인 옵션은 es-toolkit의 타입 호환성을 결정할 때 고려하지 않아요.

### 1.5 문서화

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

## 5. 문서 작성 가이드

es-toolkit 함수의 레퍼런스 문서는 정해진 템플릿을 따라요. 함수의 동작을 정확하게 설명하고, 사용자가 올바르게 쓸 수 있을 만큼의 맥락을 제공하는 것이 목표예요.

### 5.1 템플릿

`docs/**/reference/{category}/{fn}.md` 파일은 아래 골격을 사용해요.

````markdown
# {함수 이름}

{함수 짧은 설명}

```typescript
{짧은 예시 코드}
```

## 레퍼런스

### `{레퍼런스 1}`

{레퍼런스 1에 대한 설명}

#### 파라미터

{레퍼런스 1에 대한 파라미터}

### 반환 값

{레퍼런스 1에 대한 반환 값}
````

### 5.2 자리표시자 채우는 법

- **`{함수 이름}`**: 소스 파일과 같은 `funcName` 형식으로 적어요. (예: `chunk`)
- **`{함수 짧은 설명}`**: 소스 코드를 읽고 함수의 동작을 한 문장으로 적어요. ~해요체로 써요.
  > 예시: "배열을 정해진 크기의 작은 배열들로 나눠요."
- **`{짧은 예시 코드}`**: 함수를 처음 보는 사람이 인터페이스를 추측할 수 있는 짧은 예시예요. 구체적인 값이 아니라 값을 설명하는 변수 이름을 써요.
  > 예시: `const chunked = chunk(arr, size);`
- **`{레퍼런스 n}`**: 각 오버로드별로 짧은 함수 시그니처를 적어요 (예: `chunk(arr, size)`). 가능하면 하나로 합치고, 도저히 합칠 수 없을 때만 두 개로 쪼개요. (예: 배열과 객체에 대해 동작이 다른 경우)
- **`{레퍼런스 n에 대한 설명}`**: 언제 유용한지를 포함해서 자세히 설명해요. 중간중간에 짧은 예시 코드를 넣어 읽는 사람이 이해하기 쉽게 해요. "설명: ~" 처럼 콜론을 쓰지 말고, 자연스러운 문장으로 ~해요체로 써요.
- **`{레퍼런스 n에 대한 파라미터}`**: 파라미터 이름과 타입, 설명을 같이 적어요. 선택 값이라면 "선택"이라고 쓰고 기본값도 적어요.
  > 예시: `` - `arr` (`ArrayLike<T>`): 나눌 배열이에요. ``
  > 예시: `` - `size` (`number`, 선택): 각 작은 배열의 크기예요. 1보다 큰 정수여야 해요. 기본값은 `1`이에요. ``
- **`{레퍼런스 n에 대한 반환 값}`**: 맨 앞에 괄호로 타입을 적고, 뒤에 자세한 설명을 이어서 적어요.
  > 예시: `` (`T[][]`): 크기 `size`로 나눠진 2차원 배열을 반환해요. ``

### 5.3 Compat 함수 문서의 추가 규칙

`es-toolkit/compat` 함수(`docs/**/reference/compat/{category}/{fn}.md`)는 위 템플릿에 두 가지를 더해요.

1. **제목 뒤에 `(Lodash 호환성)` 접미사를 붙여요.**
   ```markdown
   # chunk (Lodash 호환성)
   ```
2. **제목 바로 아래에 `::: warning` 블록을 추가해서 더 빠른 대체 API로 안내해요.**
   ```markdown
   ::: warning {대체 API 짧은 설명}

   {대체 API 긴 설명}

   대신 더 빠르고 현대적인 {대체 API}를 사용하세요.

   :::
   ```

warning 블록의 자리표시자는 다음과 같이 채워요.

- **`{대체 API 짧은 설명}` / `{대체 API 긴 설명}` / `{대체 API}`**: 대체 API를 추천해요.
  - `es-toolkit` 메인 라이브러리(`src/` 아래에서 `src/compat/`을 제외한 곳)에 같은 이름의 함수가 있다면 그 함수를 추천해요. 예: "`es-toolkit`의 [chunk](../../array/chunk.md)를 사용하세요".
  - 메인 라이브러리에 일치하는 함수가 없다면 현대적인 JavaScript 내장 API를 추천해요. 예: `isString` → "`typeof` 연산자를 사용하세요 (`typeof value === 'string'`)".
  - 긴 설명에는 *왜* 대체 API가 더 좋은지를 자세히 적어요. compat 소스와 메인 `es-toolkit` 구현을 비교해서 더 간단하거나 빠른 이유를 찾아내요. (느린 엣지 케이스 처리, 기본값 처리, `null`/`undefined` 체크 등을 비교해요.) 현대적인 JavaScript API의 경우 동작을 직접 비교해서 적어요.
    > 예시: "이 `chunk` 함수는 `null`이나 `undefined` 처리, `size` 기본값 처리 등으로 인해 느리게 동작해요."

### 5.4 글쓰기 가이드

- 쉬운 단어를 써요. (예: "균등한 배열" → "같은 길이의 배열")
- JavaScript에서 더 익숙한 단어로 바꿔 써요. (예: "컬렉션" → "배열이나 객체")
- 영어 단어를 한국어로 풀어 써요. (예: "truthy" → "참으로 평가되는", "falsey" → "거짓으로 평가되는")

### 5.5 완성된 예시

기본 템플릿과 compat 추가 규칙을 모두 적용한 compat 문서 예시예요.

````markdown
# chunk (Lodash 호환성)

::: warning `es-toolkit`의 `chunk`를 사용하세요

이 `chunk` 함수는 `null`이나 `undefined` 처리, `size` 기본값 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [chunk](../../array/chunk.md)를 사용하세요.

:::

배열을 정해진 크기의 작은 배열들로 나눠요.

```typescript
const chunked = chunk(arr, size);
```

## 레퍼런스

### `chunk(arr, size)`

긴 배열을 같은 크기의 여러 작은 배열로 나누고 싶을 때 `chunk`를 사용하세요. 배열을 똑같이 나눌 수 없다면, 마지막 배열이 남은 요소들을 포함해요.

```typescript
import { chunk } from 'es-toolkit/compat';

// 숫자 배열을 크기 2로 나눠요.
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// 문자열 배열을 크기 3으로 나눠요.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2); // []
chunk(undefined, 2); // []
```

#### 파라미터

- `arr` (`ArrayLike<T>`): 나눌 배열이에요.
- `size` (`number`, 선택): 각 작은 배열의 크기예요. 1보다 큰 정수여야 해요. 기본값은 `1`이에요.

### 반환 값

(`T[][]`): 크기 `size`로 나눠진 2차원 배열을 반환해요.
````
