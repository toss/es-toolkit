# intersectionBy

변환 함수의 결과를 기준으로 두 배열의 교집합을 구한 새 배열을 반환해요.

```typescript
const result = intersectionBy(firstArr, secondArr, mapper);
```

## 레퍼런스

### `intersectionBy(firstArr, secondArr, mapper)`

두 배열에서 특정 속성이나 변환된 값을 기준으로 공통 요소를 찾고 싶을 때 `intersectionBy`를 사용하세요. 각 요소를 변환 함수로 처리한 결과를 비교해서 교집합을 구해요. 객체 배열에서 특정 속성으로 비교하거나 복잡한 변환 로직이 필요할 때 유용해요.

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 객체의 id 속성을 기준으로 교집합을 구해요.
const users1 = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const users2 = [
  { id: 2, name: 'jane' },
  { id: 4, name: 'alice' },
];
intersectionBy(users1, users2, user => user.id);
// Returns: [{ id: 2, name: 'jane' }]

// 서로 다른 타입의 배열도 비교할 수 있어요.
const objects = [
  { id: 1, name: 'apple' },
  { id: 2, name: 'banana' },
];
const ids = [2, 3, 4];
intersectionBy(objects, ids, item => (typeof item === 'object' ? item.id : item));
// Returns: [{ id: 2, name: 'banana' }]
```

복잡한 변환 로직도 적용할 수 있어요.

```typescript
import { intersectionBy } from 'es-toolkit/array';

// 문자열을 소문자로 변환해서 비교해요.
const words1 = ['Apple', 'Banana', 'Cherry'];
const words2 = ['apple', 'DATE', 'elderberry'];
intersectionBy(words1, words2, word => word.toLowerCase());
// Returns: ['Apple']

// 숫자를 절댓값으로 변환해서 비교해요.
const numbers1 = [1, -2, 3, -4];
const numbers2 = [2, -3, 4, 5];
intersectionBy(numbers1, numbers2, num => Math.abs(num));
// Returns: [-2, 3, -4]
```

#### 파라미터

- `firstArr` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `secondArr` (`readonly U[]`): 비교할 두 번째 배열이에요.
- `mapper` (`(item: T | U) => unknown`): 각 요소를 변환해서 비교 기준을 만드는 함수예요.

#### 반환 값

(`T[]`): 변환 함수의 결과를 기준으로 두 배열에 공통으로 포함된 요소들로 이루어진 새 배열을 반환해요. 결과는 첫 번째 배열의 요소들로 구성돼요.
