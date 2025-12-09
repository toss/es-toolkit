# orderBy

여러 기준과 정렬 방향에 따라 배열을 정렬한 새 배열을 반환해요.
```typescript
const sorted = orderBy(arr, criteria, orders);
```

## 사용법

### `orderBy(arr, criteria, orders)`

배열을 여러 조건으로 복합 정렬하고 싶을 때 `orderBy`를 사용하세요. 각 조건마다 오름차순이나 내림차순을 지정할 수 있고, 앞의 조건에서 같은 값이면 다음 조건으로 정렬해요.
```typescript
import { orderBy } from 'es-toolkit/array';

// 문자열 배열 정렬하기
const strings = ['banana', 'apple', 'cherry'];
orderBy(strings, [], ['desc']);
// Returns: ['cherry', 'banana', 'apple']

// 문자열을 길이로 정렬하기
const strings = ['banana', 'a', 'cherry'];
orderBy(strings, [x => x.length], ['asc']);
// Returns: ['a', 'cherry', 'banana']

// 대소문자 구분 없이 정렬하기
const strings = ['Banana', 'apple', 'Cherry'];
orderBy(strings, [x => x.toLowerCase()], ['asc']);
// Returns: ['apple', 'Banana', 'Cherry']

// 숫자 배열 정렬하기
const numbers = [3, 1, 4, 1, 5, 9];
orderBy(numbers, [], ['desc']);
// Returns: [9, 5, 4, 3, 1, 1]

// 여러 기준으로 사용자 배열을 정렬해요.
const users = [
  { user: 'fred', age: 48 },
  { user: 'barney', age: 34 },
  { user: 'fred', age: 40 },
  { user: 'barney', age: 36 },
];

orderBy(users, [obj => obj.user, 'age'], ['asc', 'desc']);
// Returns:
// [
//   { user: 'barney', age: 36 },
//   { user: 'barney', age: 34 },
//   { user: 'fred', age: 48 },
//   { user: 'fred', age: 40 }
// ]

// 속성 이름과 함수를 섞어서 사용할 수 있어요.
const products = [
  { name: 'Apple', category: 'fruit', price: 1.5 },
  { name: 'Banana', category: 'fruit', price: 0.8 },
  { name: 'Broccoli', category: 'vegetable', price: 2.0 },
];

orderBy(products, ['category', product => product.name.length], ['asc', 'desc']);
// Returns: category로 먼저 정렬하고, 같은 category 내에서는 이름 길이 내림차순으로 정렬
```

정렬 방향의 개수가 조건보다 적으면 마지막 방향을 반복 사용해요.
```typescript
import { orderBy } from 'es-toolkit/array';

const data = [
  { a: 1, b: 1, c: 1 },
  { a: 1, b: 2, c: 2 },
  { a: 2, b: 1, c: 1 },
];

orderBy(data, ['a', 'b', 'c'], ['asc', 'desc']);
// 'a'는 오름차순, 'b'와 'c'는 내림차순으로 정렬돼요.
```

#### 파라미터

- `arr` (`readonly T[]`): 정렬할 배열이에요.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`, optional): 정렬할 기준들이에요. 객체의 속성 이름이나 값을 반환하는 함수를 사용할 수 있어요. 제공하지 않거나 빈 배열이면 원시 타입을 그 자체로 정렬해요.
- `orders` (`Array<'asc' | 'desc'>`, optional): 각 기준에 대한 정렬 방향 배열이에요. `'asc'`는 오름차순, `'desc'`는 내림차순을 의미해요. 기본값은 `['asc']`예요.

#### 반환 값

(`T[]`): 지정된 기준과 방향에 따라 정렬된 새 배열이에요.