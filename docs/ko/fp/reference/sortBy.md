# sortBy

하나 이상의 기준으로 객체 배열을 오름차순으로 정렬하는, 데이터를 마지막에 받는 연산자를 만들어요.

```typescript
const result = pipe(array, sortBy(criteria));
```

## 사용법

`sortBy`는 객체 배열을 오름차순으로 정렬해요. 각 기준은 객체의 키이거나, 비교할 값을 반환하는 함수예요. 두 요소가 어떤 기준에서 동점이면, 다음 기준이 순서를 결정해요. 정렬은 안정적이고, 입력을 변경하지 않아요.

```typescript
import { pipe, sortBy } from 'es-toolkit/fp';

const users = [
  { user: 'foo', age: 24 },
  { user: 'bar', age: 7 },
  { user: 'foo', age: 8 },
  { user: 'bar', age: 29 },
];

// 키 하나로 정렬해요.
pipe(users, sortBy(['age']));
// => [{ user: 'bar', age: 7 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }, { user: 'bar', age: 29 }]

// 여러 기준으로 정렬하고, 동점일 때는 다음 기준으로 순서를 정해요.
pipe(users, sortBy(['user', 'age']));
// => [{ user: 'bar', age: 7 }, { user: 'bar', age: 29 }, { user: 'foo', age: 8 }, { user: 'foo', age: 24 }]

// 키 대신 셀렉터 함수를 사용할 수 있어요.
pipe(users, sortBy([item => item.age]));
```

#### 파라미터

- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 비교에 사용하는 객체 키나 셀렉터 함수예요. 순서대로 적용돼요.

#### 반환 값

(`(array: readonly T[]) => T[]`): `readonly T[]`를 정렬된 새로운 `T[]`로 변환하는, 데이터를 마지막에 받는 연산자예요.
