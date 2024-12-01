# differenceWith

인자로 제공된 비교 함수에 따라 두 배열의 차이를 계산해요.

이 함수는 두 배열과 비교 함수를 받아요. 이 비교 함수로 요소들이 동일한지 비교해서 첫 번째 배열에 있지만 두 번째 배열에는 없는 요소들을 포함한 새로운 배열을 반환해요.

## 인터페이스

```typescript
function differenceWith<T, U>(firstArr: T[], secondArr: U[], areItemsEqual: (x: T, y: U) => boolean): T[];
```

### 파라미터

- `firstArr` (`T[]`): 차이를 계산할 배열이에요. 이 배열이 주 배열이고, 이 배열의 요소들이 비교되고 필터링돼요.
- `secondArr` (`U[]`) : 첫 번째 배열에서 제외할 요소들을 포함한 배열이에요.
- `areItemsEqual` (`(x: T, y: U) => boolean`): 두 요소가 동일한지 결정할 함수에요.

### 반환 값

(`T[]`) 비교 함수에 따라 첫 번째 배열에는 있지만 두 번째 배열에는 존재하지 않는다고 결정된 요소들이 담긴 새로운 배열이에요.

## 예시

```typescript
import { differenceWith } from 'es-toolkit/array';

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [{ id: 2 }, { id: 4 }];
const areItemsEqual = (a, b) => a.id === b.id;
const result = differenceWith(array1, array2, areItemsEqual);
// result는 [{ id: 1 }, { id: 3 }]가 돼요. id가 2인 요소들은 동일하다고 간주돼서 결과에서 제외돼요.

const array1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const array2 = [2, 4];
const areItemsEqual = (a, b) => a.id === b;
const result = differenceWith(array1, array2, areItemsEqual);
// result는 [{ id: 1 }, { id: 3 }]가 돼요. id가 2인 요소들은 동일하다고 간주돼서 결과에서 제외돼요.
```

## Lodash와 호환성

`es-toolkit/compat`에서 `differenceWith`를 가져오면 lodash와 완전히 호환돼요.

- `differenceWith`는 첫 번째 배열과 비교하기 위해 여러 배열을 받을 수 있어요.
- `differenceWith`는 유사 배열 객체를 인수로 받을 수 있어요.
- `differenceWith는` 사용자 정의 비교 함수를 생략할 수 있어요. 생략하면 기본적으로 [SameValueZero](https://tc39.es/ecma262/multipage/abstract-operations.html#sec-samevaluezero) 알고리즘이 사용돼요.

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
