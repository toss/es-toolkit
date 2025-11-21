# orderBy (Lodash 호환성)

::: warning `es-toolkit`의 [orderBy](../../array/orderBy.md)를 사용하세요

이 `orderBy` 함수는 `null`이나 `undefined` 처리, 복잡한 경로 탐색, 다양한 정렬 기준 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [orderBy](../../array/orderBy.md)를 사용하세요.

:::

여러 기준으로 컬렉션의 요소들을 정렬해요.

```typescript
const result = orderBy(collection, criteria, orders);
```

## 사용법

### `orderBy(collection, criteria, orders)`

배열이나 객체의 요소들을 지정된 기준과 정렬 순서에 따라 정렬해요. 여러 기준을 사용할 수 있고, 각 기준마다 오름차순(`'asc'`) 또는 내림차순(`'desc'`) 정렬을 지정할 수 있어요.

```typescript
import { orderBy } from 'es-toolkit/compat';

const users = [
  { name: 'fred', age: 48 },
  { name: 'barney', age: 34 },
  { name: 'fred', age: 40 },
  { name: 'barney', age: 36 },
];

// 이름 오름차순, 나이 내림차순으로 정렬
orderBy(users, ['name', 'age'], ['asc', 'desc']);
// => [
//   { name: 'barney', age: 36 },
//   { name: 'barney', age: 34 },
//   { name: 'fred', age: 48 },
//   { name: 'fred', age: 40 }
// ]

// 함수로 정렬 기준 지정하기
orderBy(users, [user => user.name, user => user.age], ['asc', 'desc']);
// => 위와 동일한 결과

// 단일 기준으로 정렬
orderBy(users, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'fred', age: 40 }, ...]
```

객체의 경우 값들을 정렬해요.

```typescript
import { orderBy } from 'es-toolkit/compat';

const obj = {
  a: { name: 'fred', age: 48 },
  b: { name: 'barney', age: 34 },
};

orderBy(obj, 'age', 'desc');
// => [{ name: 'fred', age: 48 }, { name: 'barney', age: 34 }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { orderBy } from 'es-toolkit/compat';

orderBy(null, 'name'); // []
orderBy(undefined, 'age'); // []
```

#### 파라미터

- `collection` (`ArrayLike<T> | object | null | undefined`): 정렬할 배열이나 객체예요.
- `criteria` (`Criterion<T> | Array<Criterion<T>>`, 선택): 정렬 기준이에요. 속성 이름, 속성 경로, 함수 등을 사용할 수 있어요. 기본값은 `[null]`이에요.
- `orders` (`unknown | unknown[]`, 선택): 각 기준의 정렬 순서예요. `'asc'`(오름차순), `'desc'`(내림차순), `true`(오름차순), `false`(내림차순)를 사용할 수 있어요. 기본값은 `[]`이에요.

#### 반환 값

(`T[]`): 정렬된 새로운 배열을 반환해요.
