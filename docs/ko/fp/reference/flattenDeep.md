# flattenDeep (함수형 프로그래밍)

중첩 배열을 재귀적으로 펼치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, flattenDeep());
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`flattenDeep`](../../reference/array/flattenDeep.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`flattenDeep`은 파이프된 배열의 모든 중첩 배열 층을 재귀적으로 제거해요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { flattenDeep, pipe } from 'es-toolkit/fp';

pipe([1, [2, [3, [4]]]], flattenDeep()); // => [1, 2, 3, 4]
```

#### 파라미터

이 함수는 인자를 받지 않아요. `flattenDeep()`처럼 호출하세요.

#### 반환 값

(`(array: readonly T[]) => Array<ExtractNestedArrayType<T>>`): 중첩 배열을 깊게 펼친 배열로 변환하는 함수예요.
