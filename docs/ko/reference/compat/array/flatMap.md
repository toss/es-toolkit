# flatMap

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

컬렉션의 각 요소에 대해 iteratee 함수를 실행하고 결과를 한 단계 평탄화해요. iteratee는 (value, index, array) 세 가지 인수로 호출돼요.

## 인터페이스

```typescript
function flatMap<T, R>(
  collection: Array<T> | Record<string, T> | null | undefined,
  iteratee?: (
    value: T,
    index: number | string,
    collection: Array<T> | Record<string, T>
  ) => R | Array<R> | null | undefined
): Array<R>;
```

### 파라미터

- `collection`: 순회할 컬렉션이에요.
- `iteratee`: 각 요소마다 호출될 함수예요. 기본값은 `identity`예요.

### 반환 값

(`Array`): 새로운 평탄화된 배열을 반환해요.

## 예시

```typescript
import { flatMap } from 'es-toolkit/compat';

// 배열을 반환하는 함수를 사용한 기본 예제
function duplicate(n) {
  return [n, n];
}

flatMap([1, 2], duplicate);
// => [1, 1, 2, 2]

// 속성 단축 표현 사용하기
const objects = [{ a: [1, 2] }, { a: [3, 4] }];
flatMap(objects, 'a');
// => [1, 2, 3, 4]

// 객체에서 사용하기
flatMap({ a: 1, b: 2 }, n => [n, n]);
// => [1, 1, 2, 2]

// 중첩 배열 처리하기
flatMap([[1], [2, [3]], 4]);
// => [1, 2, [3], 4]
```
