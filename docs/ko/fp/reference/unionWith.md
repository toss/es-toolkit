# unionWith (함수형 프로그래밍)

사용자 정의 동등성 함수로 두 배열을 합치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, unionWith(secondArray, areItemsEqual));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`unionWith`](../../reference/array/unionWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`unionWith`는 합친 배열을 순서대로 보면서 `areItemsEqual` 기준으로 이미 유지한 값과 일치하지 않는 첫 값을 유지해요.

```typescript
import { pipe, unionWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  unionWith([{ id: 2 }, { id: 3 }], (a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열 뒤에 합칠 배열이에요.
- `areItemsEqual` (`(item: T, other: T) => boolean`): 두 값이 같은지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 사용자 정의 동등성 기준 합집합으로 변환하는 함수예요.
