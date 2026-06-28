# xor (함수형 프로그래밍)

두 배열 중 정확히 하나에만 있는 값을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, xor(secondArray));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`xor`](../../reference/array/xor.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`xor`는 파이프된 배열과 `secondArray`의 대칭 차집합을 중복 없이 반환해요.

```typescript
import { pipe, xor } from 'es-toolkit/fp';

pipe([1, 2, 3], xor([2, 3, 4])); // => [1, 4]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열과 비교할 배열이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 대칭 차집합으로 변환하는 함수예요.
