# uniqWith (함수형 프로그래밍)

사용자 정의 동등성 함수로 중복을 제거하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, uniqWith(areItemsEqual));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`uniqWith`](../../reference/array/uniqWith.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`uniqWith`는 `areItemsEqual` 기준으로 이미 유지한 값과 일치하지 않는 첫 값을 유지해요. [`pipe`](./pipe.md) 안에서는 지연 평가가 가능해요.

```typescript
import { pipe, uniqWith } from 'es-toolkit/fp';

pipe(
  [{ id: 1 }, { id: 1 }, { id: 2 }],
  uniqWith((a, b) => a.id === b.id)
); // => [{ id: 1 }, { id: 2 }]
```

#### 파라미터

- `areItemsEqual` (`(item: T, other: T) => boolean`): 두 값이 같은지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 사용자 정의 동등성 기준 중복이 제거된 배열로 변환하는 함수예요.
