# unionBy

특정 함수로 바꾼 값을 기준으로 두 배열의 고유한 요소를 포함하는 새 배열을 만들어요.

```typescript
const unified = unionBy(arr1, arr2, mapper);
```

## 레퍼런스

### `unionBy(arr1, arr2, mapper)`

객체 배열에서 특정 속성을 기준으로 중복을 제거하고 싶을 때 `unionBy`를 사용하세요. `mapper` 함수가 반환하는 값이 같으면 동일한 요소로 처리돼요.

```typescript
import { unionBy } from 'es-toolkit/array';

// id를 기준으로 객체들의 합집합을 구해요.
const users1 = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];
const users2 = [
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];
unionBy(users1, users2, user => user.id);
// Returns: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]

// 숫자를 3으로 나눈 나머지를 기준으로 합집합을 구해요.
const nums1 = [1, 2, 3];
const nums2 = [4, 5, 6];
unionBy(nums1, nums2, x => x % 3);
// Returns: [1, 2, 3]
// 1 % 3 = 1, 2 % 3 = 2, 3 % 3 = 0이고,
// 4 % 3 = 1, 5 % 3 = 2, 6 % 3 = 0이므로 모두 중복돼요.
```

사용자 정의 비교 함수를 사용해서 복잡한 기준으로도 합집합을 구할 수 있어요.

```typescript
import { unionBy } from 'es-toolkit/array';

const products1 = [
  { category: 'electronics', price: 100 },
  { category: 'books', price: 20 },
];
const products2 = [
  { category: 'electronics', price: 150 },
  { category: 'toys', price: 30 },
];

// 카테고리를 기준으로 합집합을 구해요.
unionBy(products1, products2, product => product.category);
// Returns: [
//   { category: 'electronics', price: 100 },
//   { category: 'books', price: 20 },
//   { category: 'toys', price: 30 }
// ]
```

#### 파라미터

- `arr1` (`T[]`): 합칠 첫 번째 배열이에요.
- `arr2` (`T[]`): 합칠 두 번째 배열이에요.
- `mapper` (`(item: T) => U`): 각 요소를 비교할 값으로 바꾸는 함수예요.

#### 반환 값

(`T[]`): `mapper` 함수가 반환한 값을 기준으로 중복이 제거된 두 배열의 합집합을 반환해요.
