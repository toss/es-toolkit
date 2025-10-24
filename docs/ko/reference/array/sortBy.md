# sortBy

주어진 기준에 따라 객체 배열을 오름차순으로 정렬한 새 배열을 반환해요.

```typescript
const sorted = sortBy(arr, criteria);
```

## 레퍼런스

### `sortBy(arr, criteria)`

객체 배열을 여러 속성이나 계산된 값을 기준으로 정렬하고 싶을 때 `sortBy`를 사용하세요. 속성 이름이나 변환 함수를 배열로 제공하면, 해당 순서대로 우선순위를 두고 오름차순으로 정렬해요. 테이블 데이터를 정렬하거나 복잡한 정렬 로직이 필요할 때 유용해요.

```typescript
import { sortBy } from 'es-toolkit/array';

// 단일 속성으로 정렬해요.
const users = [
  { name: 'john', age: 30 },
  { name: 'jane', age: 25 },
  { name: 'bob', age: 35 },
];
const byAge = sortBy(users, ['age']);
// Returns: [{ name: 'jane', age: 25 }, { name: 'john', age: 30 }, { name: 'bob', age: 35 }]

// 여러 속성으로 정렬해요.
const employees = [
  { name: 'john', department: 'engineering', age: 30 },
  { name: 'jane', department: 'hr', age: 25 },
  { name: 'bob', department: 'engineering', age: 35 },
  { name: 'alice', department: 'engineering', age: 25 },
];
const sorted = sortBy(employees, ['department', 'age']);
// Returns: 부서 먼저, 그 다음 나이 순으로 정렬
// [
//   { name: 'alice', department: 'engineering', age: 25 },
//   { name: 'john', department: 'engineering', age: 30 },
//   { name: 'bob', department: 'engineering', age: 35 },
//   { name: 'jane', department: 'hr', age: 25 }
// ]
```

함수를 사용해서 복잡한 정렬 기준을 만들 수 있어요.

```typescript
import { sortBy } from 'es-toolkit/array';

// 함수와 속성을 섞어서 사용해요.
const products = [
  { name: 'laptop', price: 1000, category: 'electronics' },
  { name: 'shirt', price: 50, category: 'clothing' },
  { name: 'phone', price: 800, category: 'electronics' },
];

const sorted = sortBy(products, [
  'category',
  item => -item.price, // 가격은 내림차순으로
]);
// Returns: 카테고리 먼저, 그 다음 가격 높은 순으로 정렬

// 계산된 값으로 정렬해요.
const words = ['hello', 'a', 'wonderful', 'world'];
const byLength = sortBy(
  words.map(word => ({ word, length: word.length })),
  ['length']
);
// Returns: 문자열 길이 순으로 정렬된 객체 배열
```

#### 파라미터

- `arr` (`readonly T[]`): 정렬할 객체 배열이에요.
- `criteria` (`Array<((item: T) => unknown) | keyof T>`): 정렬 기준이에요. 객체 속성 이름이나 변환 함수의 배열로, 앞에 있는 기준이 우선순위가 높아요.

#### 반환 값

(`T[]`): 지정된 기준에 따라 오름차순으로 정렬된 새 배열을 반환해요.
