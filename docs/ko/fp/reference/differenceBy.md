# differenceBy (함수형 프로그래밍)

매핑된 키를 기준으로 값을 제외하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, differenceBy(secondArray, mapper));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`differenceBy`](../../reference/array/differenceBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`differenceBy`는 `mapper`가 반환한 값을 비교해요. 파이프된 배열의 값은 매핑된 키가 `secondArray`에 없을 때만 유지돼요.

```typescript
import { differenceBy, pipe } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  differenceBy([2], value => (typeof value === 'number' ? value : value.id))
); // => [{ id: 1 }]
```

#### 파라미터

- `secondArray` (`readonly U[]`): 매핑된 키를 제외 기준으로 사용할 값 배열이에요.
- `mapper` (`(item: T | U) => unknown`): 비교할 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 `secondArray`에 키가 없는 값 배열로 변환하는 함수예요.
