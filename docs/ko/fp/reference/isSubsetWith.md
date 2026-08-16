# isSubsetWith (함수형 프로그래밍)

사용자 정의 동등성 함수로 부분집합 여부를 확인하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, isSubsetWith(superset, areItemsEqual));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`isSubsetWith`](../../reference/array/isSubsetWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`isSubsetWith`는 파이프된 배열의 모든 값이 `areItemsEqual` 기준으로 `superset`의 값 하나 이상과 일치하면 `true`를 반환해요.

```typescript
import { isSubsetWith, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }],
  isSubsetWith([{ id: 1 }, { id: 2 }], (a, b) => a.id === b.id)
); // => true
```

#### 파라미터

- `superset` (`readonly T[]`): 파이프된 배열의 모든 값을 포함할 수 있는 배열이에요.
- `areItemsEqual` (`(item: T, other: T) => boolean`): 두 값이 같은지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => boolean`): `readonly T[]`를 부분집합 여부로 변환하는 함수예요.
