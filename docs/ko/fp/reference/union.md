# union (함수형 프로그래밍)

두 배열을 중복 값 없이 합치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, union(secondArray));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`union`](../../reference/array/union.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`union`은 파이프된 배열의 고유 값을 먼저 반환하고, 이어서 `secondArray`에서 아직 나오지 않은 값을 반환해요.

```typescript
import { pipe, union } from 'es-toolkit/fp';

pipe([1, 2, 2], union([2, 3])); // => [1, 2, 3]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열 뒤에 합칠 배열이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 두 배열의 합집합으로 변환하는 함수예요.
