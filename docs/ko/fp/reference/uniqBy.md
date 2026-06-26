# uniqBy (함수형 프로그래밍)

매핑된 키를 기준으로 중복을 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, uniqBy(mapper));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`uniqBy`](../../reference/array/uniqBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`uniqBy`는 `mapper`가 반환하는 각 키의 첫 값을 유지해요. 처음 나온 순서를 보존하고 [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { pipe, uniqBy } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqBy(item => item.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### 파라미터

- `mapper` (`(item: T, index: number) => U`): 고유성을 판단할 키를 반환하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 키 기준 중복이 제거된 배열로 변환하는 함수예요.
