# isSubsetWith

사용자 정의 비교 함수를 기준으로 한 배열이 다른 배열의 부분집합인지 확인해요.

```typescript
const result = isSubsetWith(superset, subset, areItemsEqual);
```

## 사용법

### `isSubsetWith(superset, subset, areItemsEqual)`

사용자가 정의한 비교 함수로 부분집합 관계를 확인하고 싶을 때 `isSubsetWith`를 사용하세요. 객체를 비교하거나 특별한 비교 로직이 필요한 경우에 유용해요.

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// 객체의 id로 부분집합 확인
const users = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
  { id: 3, name: 'bob' },
];
const targetUsers = [
  { id: 2, name: 'jane' },
  { id: 1, name: 'john' },
];
isSubsetWith(users, targetUsers, (a, b) => a.id === b.id);
// Returns: true

// 부분집합이 아닌 경우
const allUsers = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const someUsers = [{ id: 3, name: 'bob' }];
isSubsetWith(allUsers, someUsers, (a, b) => a.id === b.id);
// Returns: false
```

복잡한 비교 로직도 사용할 수 있어요.

```typescript
import { isSubsetWith } from 'es-toolkit/array';

// 대소문자를 구분하지 않는 문자열 비교
const validNames = ['Alice', 'Bob', 'Charlie'];
const userNames = ['alice', 'BOB'];
isSubsetWith(validNames, userNames, (a, b) => a.toLowerCase() === b.toLowerCase());
// Returns: true

// 범위 내 숫자 비교
const validRanges = [1, 2, 3, 4, 5];
const testNumbers = [1.1, 2.8];
isSubsetWith(validRanges, testNumbers, (a, b) => Math.abs(a - b) < 0.5);
// Returns: true (1.1은 1과, 2.8은 3과 충분히 가까움)
```

#### 파라미터

- `superset` (`readonly T[]`): 부분집합의 모든 요소를 포함할 수 있는 상위 집합 배열이에요.
- `subset` (`readonly T[]`): 상위 집합에 포함되는지 확인할 부분집합 배열이에요.
- `areItemsEqual` (`(x: T, y: T) => boolean`): 두 요소가 같은지 판단하는 함수예요. 같으면 `true`, 다르면 `false`를 반환해야 해요.

#### 반환 값

(`boolean`): 사용자 정의 비교 함수를 기준으로 부분집합의 모든 요소가 상위 집합에 포함되면 `true`, 그렇지 않으면 `false`를 반환해요.
