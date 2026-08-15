# partition (함수형 프로그래밍)

값을 조건을 만족하는 그룹과 만족하지 않는 그룹으로 나누는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, partition(predicate));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`partition`](../../reference/array/partition.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`partition`은 배열 두 개로 이루어진 쌍을 반환해요. 첫 번째 배열에는 `predicate`가 `true`를 반환한 값이, 두 번째 배열에는 나머지 값이 들어가요.

```typescript
import { partition, pipe } from 'es-toolkit/fp';

pipe(
  [1, 2, 3, 4],
  partition(value => value % 2 === 0)
); // => [[2, 4], [1, 3]]
```

#### 파라미터

- `predicate` (`(value: T) => boolean`): 각 값이 어느 그룹에 들어갈지 판단하는 함수예요.

#### 반환 값

(`(array: readonly T[]) => [truthy: T[], falsy: T[]]`): `readonly T[]`를 조건을 만족하는 배열과 만족하지 않는 배열로 변환하는 함수예요.
