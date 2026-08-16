# differenceWith

사용자 정의 비교 함수를 사용해서 두 배열의 차집합을 구해 새 배열을 반환해요.

```typescript
const result = differenceWith(firstArr, secondArr, areItemsEqual);
```

## 사용법

### `differenceWith(firstArr, secondArr, areItemsEqual)`

두 배열의 요소를 사용자 정의 함수로 비교해서 차집합을 구하고 싶을 때 `differenceWith`를 사용하세요. 비교 함수를 통해 두 요소가 같은지 판단하고, 첫 번째 배열에만 있는 요소들을 반환해요.

```typescript
import { differenceWith } from 'es-toolkit/array';

// 객체 배열에서 id를 기준으로 차집합을 구해요.
const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
differenceWith(array1, array2, areItemsEqual);
// Returns: [{ id: 1 }, { id: 3 }]
// id가 2인 요소는 같다고 판단되어 제외돼요.

// 서로 다른 타입의 배열도 비교할 수 있어요.
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const numbers = [2, 4];
const areItemsEqual2 = (a, b) => a.id === b;
differenceWith(objects, numbers, areItemsEqual2);
// Returns: [{ id: 1 }, { id: 3 }]
```

복잡한 조건으로 요소를 비교할 수 있어요.

```typescript
import { differenceWith } from 'es-toolkit/array';

const users1 = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 },
];
const users2 = [
  { name: 'Alice', age: 31 }, // 나이가 달라도 이름이 같으면 같은 사용자
  { name: 'David', age: 25 },
];

const areUsersEqual = (a, b) => a.name === b.name;
differenceWith(users1, users2, areUsersEqual);
// Returns: [{ name: 'Bob', age: 25 }, { name: 'Charlie', age: 35 }]
```

#### 파라미터

- `firstArr` (`T[]`): 차집합을 구할 기준 배열이에요.
- `secondArr` (`U[]`): 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요.
- `areItemsEqual` (`(x: T, y: U) => boolean`): 두 요소가 같은지 판단하는 함수예요.

#### 반환 값

(`T[]`): 비교 함수에 따라 첫 번째 배열에만 있다고 판단된 요소들로 이루어진 새 배열이에요.
