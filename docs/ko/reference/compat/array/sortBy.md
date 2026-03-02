# sortBy (Lodash 호환성)

::: warning `Array.prototype.sort` 메서드를 사용하세요

이 `sortBy` 함수는 다양한 타입의 조건 처리와 객체 지원으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `Array.prototype.sort` 메서드를 사용하세요.

:::

여러 기준에 따라 배열을 오름차순으로 정렬해요.

```typescript
const sorted = sortBy(collection, ...iteratees);
```

## 사용법

### `sortBy(collection, ...iteratees)`

여러 기준을 사용해서 배열이나 객체를 오름차순으로 정렬할 때 `sortBy`를 사용하세요. 각 요소에 대해 정렬 기준 함수들을 실행하고, 그 결과값을 기준으로 정렬해요.

```typescript
import { sortBy } from 'es-toolkit/compat';

// 사용자들을 이름으로 정렬해요.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

sortBy(users, ['user']);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]

// 함수를 사용해서 정렬해요.
sortBy(users, [
  function (o) {
    return o.user;
  },
]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 },
// ]
```

여러 기준을 동시에 사용할 수도 있어요.

```typescript
import { sortBy } from 'es-toolkit/compat';

const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

// 이름으로 먼저 정렬하고, 그 다음 나이로 정렬해요.
sortBy(users, ['user', item => item.age]);
// Returns: [
//   { user: 'barney', age: 34 },
//   { user: 'barney', age: 36 },
//   { user: 'fred', age: 40 },
//   { user: 'fred', age: 48 },
// ]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { sortBy } from 'es-toolkit/compat';

sortBy(null, ['key']); // []
sortBy(undefined, ['key']); // []
```

#### 파라미터

- `collection` (`ArrayLike<T> | object | null | undefined`): 정렬할 배열이나 객체예요.
- `...iteratees` (`Array<Many<ListIteratee<T> | ObjectIteratee<T>>>`): 정렬 기준을 정하는 함수들이나 속성 이름들이에요.

#### 반환 값

(`T[]`): 오름차순으로 정렬된 새로운 배열을 반환해요.
