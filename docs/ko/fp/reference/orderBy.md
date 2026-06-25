# orderBy (함수형 프로그래밍)

기준과 정렬 방향에 따라 객체를 정렬하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, orderBy(criteria, orders));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`orderBy`](../../reference/array/orderBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`orderBy`는 파이프된 배열을 각 기준 순서대로 정렬해요. 각 정렬 방향은 대응하는 기준을 오름차순이나 내림차순으로 정렬할지 정해요.

```typescript
import { orderBy, pipe } from 'es-toolkit/fp';

const users = [
  { name: 'a', age: 2 },
  { name: 'b', age: 1 },
];

pipe(users, orderBy(['age'], ['asc'])); // => [{ name: 'b', age: 1 }, { name: 'a', age: 2 }]
```

#### 파라미터

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 비교에 사용할 객체 키나 선택 함수들이에요.
- `orders` (`Array<'asc' | 'desc'>`): 각 기준의 정렬 방향이에요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 새 정렬 배열로 변환하는 함수예요.
