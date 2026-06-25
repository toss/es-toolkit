# xorBy (함수형 프로그래밍)

매핑된 키를 기준으로 대칭 차집합을 반환하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, xorBy(secondArray, mapper));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`xorBy`](../../reference/array/xorBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`xorBy`는 `mapper`가 반환한 값을 비교하고, 매핑된 키가 정확히 한 배열에만 있는 값을 반환해요.

```typescript
import { pipe, xorBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  xorBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 3 }]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열과 비교할 배열이에요.
- `mapper` (`(item: T) => U`): 비교할 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 키 기준 대칭 차집합으로 변환하는 함수예요.
