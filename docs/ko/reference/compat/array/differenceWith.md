# differenceWith (Lodash 호환성)

::: warning `es-toolkit`의 `differenceWith`를 사용하세요

이 `differenceWith` 함수는 `null`이나 `undefined` 처리, 여러 배열 처리, `ArrayLike` 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [differenceWith](../../array/differenceWith.md)를 사용하세요.

:::

비교 함수를 사용해서 첫 번째 배열에서 다른 배열들에 포함된 요소들을 제거해요.

```typescript
const result = differenceWith(array, ...values, comparator);
```

## 사용법

### `differenceWith(array, ...values, comparator)`

각 요소를 비교 함수로 비교해서 차이를 구하고 싶을 때 `differenceWith`를 사용하세요. 마지막 인수가 비교 함수가 돼요.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 객체를 id로 비교해요.
const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];
const others = [{ id: 2 }];
const comparator = (a, b) => a.id === b.id;

differenceWith(objects, others, comparator);
// Returns: [{ id: 1 }, { id: 3 }]

// 여러 배열을 한 번에 제외해요.
const array = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
const values1 = [{ id: 2 }];
const values2 = [{ id: 3 }];

differenceWith(array, values1, values2, comparator);
// Returns: [{ id: 1 }, { id: 4 }]
```

비교 함수를 제공하지 않으면 일반적인 `difference`처럼 동작해요.

```typescript
import { differenceWith } from 'es-toolkit/compat';

// 비교 함수 없이 사용하면 일반적인 비교를 해요.
differenceWith([1, 2, 3], [2], [3]);
// Returns: [1]
```

복잡한 비교 로직도 사용할 수 있어요.

```typescript
import { differenceWith } from 'es-toolkit/compat';

const users = [
  { name: 'alice', age: 25 },
  { name: 'bob', age: 30 },
  { name: 'charlie', age: 35 },
];
const excludeUsers = [{ name: 'bob', age: 25 }]; // 다른 나이

// 이름만으로 비교해요.
const compareByName = (a, b) => a.name === b.name;
differenceWith(users, excludeUsers, compareByName);
// Returns: [{ name: 'alice', age: 25 }, { name: 'charlie', age: 35 }]
// bob이 제외돼요 (나이는 달라도 이름이 같아서)
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 차이를 구할 기준 배열이에요.
- `...values` (`Array<ArrayLike<T>>` + `(a: T, b: T) => boolean`): 제외할 요소들이 포함된 배열들과 마지막에 비교 함수예요.

#### 반환 값

(`T[]`): 비교 함수를 사용해서 첫 번째 배열에서 나머지 배열들의 요소를 제거한 새로운 배열을 반환해요.
