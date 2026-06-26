# flatMapDeep (함수형 프로그래밍)

각 값을 변환한 뒤 결과를 깊게 펼치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, flatMapDeep(iteratee));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`flatMapDeep`](../../reference/array/flatMapDeep.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`flatMapDeep`은 파이프된 배열의 각 값에 `iteratee`를 호출하고 반환된 배열을 재귀적으로 펼쳐요.

```typescript
import { flatMapDeep, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2],
  flatMapDeep(value => [[value, value]])
); // => [1, 1, 2, 2]
```

#### 파라미터

- `iteratee` (`(item: T, index: number) => U`): 깊게 펼치기 전에 각 값을 변환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => Array<ExtractNestedArrayType<U>>`): `readonly T[]`를 깊게 펼친 배열로 변환하는 함수예요.
