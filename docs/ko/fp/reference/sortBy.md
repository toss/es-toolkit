# sortBy (함수형 프로그래밍)

객체 배열을 하나 이상의 기준에 따라 오름차순으로 정렬하는 함수를 만들어요. 함수형 프로그래밍의 [`pipe`](./pipe.md) 와 같이 사용해요.

```typescript
const result = pipe(array, sortBy(criteria));
```

::: info

파이프라인으로 조합하지 않는 일반 코드에서는 원래 es-toolkit의 [`sortBy`](../../reference/array/sortBy.md)를 쓰는 것이 좋아요. [`pipe`](./pipe.md)로 변환을 이어 붙일 때 이 `fp` 버전을 사용하세요.

:::

## 사용법

`sortBy`는 객체 배열을 오름차순으로 정렬해요. 각 기준은 객체의 키이거나, 비교할 값을 반환하는 함수예요. 두 요소가 한 기준에서 같으면, 다음 기준으로 순서를 정해요. 정렬은 안정적이고, 입력을 변경하지 않아요.

```typescript
import { pipe, sortBy } from 'es-toolkit/fp';

const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

// 하나의 키로 정렬해요.
pipe(users, sortBy(['age']));
// => [{ user: 'bar', age: 7 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }, { user: 'bar', age: 29 }]

// 여러 기준으로 정렬하고, 같으면 다음 기준으로 순서를 정해요.
pipe(users, sortBy(['user', 'age']));
// => [{ user: 'bar', age: 7 }, { user: 'bar', age: 29 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }]

// 키 대신 셀렉터 함수를 쓸 수 있어요.
pipe(users, sortBy([item => item.age]));
```

#### 파라미터

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 비교에 사용할 객체의 키나 셀렉터 함수예요. 순서대로 적용돼요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 정렬된 새로운 `T[]`로 변환하는 함수예요.
