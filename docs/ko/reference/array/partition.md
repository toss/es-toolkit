# partition

조건에 따라 배열을 두 그룹으로 나눈 튜플을 반환해요.

```typescript
const [truthy, falsy] = partition(arr, isInTruthy);
```

## 레퍼런스

### `partition(arr, isInTruthy)`

배열의 요소들을 특정 조건에 따라 두 그룹으로 분리하고 싶을 때 `partition`을 사용하세요. 조건 함수가 `true`를 반환하는 요소들과 `false`를 반환하는 요소들을 각각 다른 배열로 분리해요.

```typescript
import { partition } from 'es-toolkit/array';

// 숫자 배열을 짝수와 홀수로 나눠요.
const numbers = [1, 2, 3, 4, 5, 6];
const [evens, odds] = partition(numbers, x => x % 2 === 0);
// evens: [2, 4, 6]
// odds: [1, 3, 5]

// 객체 배열을 특정 조건으로 나눠요.
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob', active: false },
  { name: 'Charlie', active: true }
];
const [activeUsers, inactiveUsers] = partition(users, user => user.active);
// activeUsers: [{ name: 'Alice', active: true }, { name: 'Charlie', active: true }]
// inactiveUsers: [{ name: 'Bob', active: false }]
```

빈 배열에서는 두 개의 빈 배열을 반환해요.

```typescript
import { partition } from 'es-toolkit/array';

const [truthy, falsy] = partition([], x => x > 0);
// truthy: []
// falsy: []
```

#### 파라미터

- `arr` (`T[]`): 두 그룹으로 나눌 배열이에요.
- `isInTruthy` (`(value: T) => boolean`): 각 요소가 첫 번째 배열(truthy)에 포함될지, 두 번째 배열(falsy)에 포함될지를 결정하는 조건 함수예요.

#### 반환 값

(`[truthy: T[], falsy: T[]]`): 두 배열로 구성된 튜플이에요. 첫 번째 배열은 조건이 `true`인 요소들, 두 번째 배열은 조건이 `false`인 요소들을 담고 있어요.