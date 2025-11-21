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

## Lodash와 호환성

`es-toolkit/compat`에서 `differenceWith`를 가져오면 lodash와 완전히 호환돼요.

- `differenceWith`는 첫 번째 배열과 비교하기 위해 여러 배열을 받을 수 있어요.
- `differenceWith`는 유사 배열 객체를 인수로 받을 수 있어요.
- `differenceWith`는 사용자 정의 비교 함수를 생략할 수 있어요. 생략하면 기본적으로 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 알고리즘이 사용돼요.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 예제 1: 여러 배열과 비교하며, 비교 함수를 사용하는 경우
const array = [{ id: 1 }, { id: 2 }, { id: 3 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];
const comparator = (a, b) => a.id === b.id;

const result = differenceWith(array, values1, values2, comparator);
// 결과는 [{ id: 1 }]이에요. 이 요소는 비교 기준에 따라 첫 번째 배열에만 남아 있어요.

// 예제 2: 배열과 유사한 객체를 인수로 받고, 비교 함수를 사용하는 경우
const array = { 0: { id: 1 }, 1: { id: 2 }, 2: { id: 3 }, length: 3 };
const values = { 0: { id: 2 }, 1: { id: 3 }, length: 2 };
const comparator = (a, b) => a.id === b.id;

const result2 = differenceWith(array, values, comparator);
// 결과는 [{ id: 1 }]이에요. 이 요소는 비교 기준에 따라 첫 번째 유사 배열 객체만 남아 있어요.

// 예제 3: 사용자 정의 비교 함수 생략
const array = [1, 2, 3];
const values1 = [2];
const values2 = [3];

const result3 = differenceWith(array, values1, values2);
// 결과는 [1]이에요. 이 요소는 모든 배열에서 유일하게 존재해요.
```
