# unionBy (함수형 프로그래밍)

매핑된 키를 기준으로 두 배열을 중복 없이 합치는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, unionBy(secondArray, mapper));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`unionBy`](../../reference/array/unionBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`unionBy`는 `mapper`가 반환한 값을 비교해요. 파이프된 배열에서 각 매핑 키의 첫 값을 먼저 유지하고, 이어서 `secondArray`의 값을 처리해요.

```typescript
import { pipe, unionBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 2 }],
  unionBy([{ id: 2 }, { id: 3 }], item => item.id)
); // => [{ id: 1 }, { id: 2 }, { id: 3 }]
```

#### 파라미터

- `secondArray` (`readonly T[]`): 파이프된 배열 뒤에 합칠 배열이에요.
- `mapper` (`(item: T) => U`): 고유성을 판단할 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 매핑 키 기준 합집합으로 변환하는 함수예요.
