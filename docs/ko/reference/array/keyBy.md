# keyBy

키 생성 함수를 사용해 배열 요소들을 키-값 쌍의 객체로 바꾼 새 객체를 반환해요.

```typescript
const result = keyBy(arr, getKeyFromItem);
```

## 사용법

### `keyBy(arr, getKeyFromItem)`

배열의 각 요소를 빠르게 찾을 수 있도록 키로 인덱싱된 객체를 만들고 싶을 때 `keyBy`를 사용하세요. 각 요소에서 고유한 키를 생성하는 함수를 제공하면, 그 키를 사용해서 요소에 접근할 수 있는 객체를 만들어줘요. 같은 키를 생성하는 요소가 여러 개 있다면 마지막 요소가 사용돼요.

```typescript
import { keyBy } from 'es-toolkit/array';

// 객체의 id 속성을 키로 사용해요.
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
keyBy(users, user => user.id);
// Returns: {
//   1: { id: 1, name: 'john' },
//   2: { id: 2, name: 'jane' },
//   3: { id: 3, name: 'bob' }
// }

// 문자열 속성을 키로 사용해요.
const products = [
  { category: 'fruit', name: 'apple' },
  { category: 'fruit', name: 'banana' },
  { category: 'vegetable', name: 'carrot' },
];
keyBy(products, item => item.category);
// Returns: {
//   fruit: { category: 'fruit', name: 'banana' }, // 마지막 fruit 요소
//   vegetable: { category: 'vegetable', name: 'carrot' }
// }
```

복잡한 키 생성 로직도 사용할 수 있어요.

```typescript
import { keyBy } from 'es-toolkit/array';

// 여러 속성을 조합해서 키를 만들어요.
const orders = [
  { date: '2023-01-01', customerId: 1, amount: 100 },
  { date: '2023-01-01', customerId: 2, amount: 200 },
  { date: '2023-01-02', customerId: 1, amount: 150 },
];
keyBy(orders, order => `${order.date}-${order.customerId}`);
// Returns: {
//   '2023-01-01-1': { date: '2023-01-01', customerId: 1, amount: 100 },
//   '2023-01-01-2': { date: '2023-01-01', customerId: 2, amount: 200 },
//   '2023-01-02-1': { date: '2023-01-02', customerId: 1, amount: 150 }
// }
```

#### 파라미터

- `arr` (`readonly T[]`): 객체로 변환할 배열이에요.
- `getKeyFromItem` (`(item: T) => K`): 각 요소에서 키를 생성하는 함수예요.

#### 반환 값

(`Record<K, T>`): 생성된 키를 속성명으로, 해당 요소를 값으로 하는 객체를 반환해요. 동일한 키를 생성하는 요소가 여러 개 있으면 마지막 요소가 값으로 사용돼요.
