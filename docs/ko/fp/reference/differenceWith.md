# differenceWith (함수형 프로그래밍)

사용자 정의 동등성 함수로 값을 제외하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, differenceWith(secondArray, areItemsEqual));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`differenceWith`](../../reference/array/differenceWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`differenceWith`는 `secondArray`의 모든 값에 대해 `areItemsEqual`이 `false`를 반환할 때만 파이프된 배열의 값을 유지해요.

```typescript
import { differenceWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  differenceWith([{ id: 2 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }]
```

#### 파라미터

- `secondArray` (`readonly U[]`): 비교할 값을 담은 배열이에요.
- `areItemsEqual` (`(item: T, other: U) => boolean`): 두 값이 같은지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 비교 함수와 일치하지 않는 값 배열로 변환하는 함수예요.
