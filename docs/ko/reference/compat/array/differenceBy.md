# differenceBy (Lodash 호환성)

::: warning `es-toolkit`의 `differenceBy`를 사용하세요

이 `differenceBy` 함수는 `null`이나 `undefined` 처리, 여러 배열 처리, `ArrayLike` 타입 처리, `iteratee` 유연한 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [differenceBy](../../array/differenceBy.md)를 사용하세요.

:::

변환 함수를 사용해서 첫 번째 배열에서 다른 배열들에 포함된 요소들을 제거해요.

```typescript
const result = differenceBy(array, ...excludeArrays, iteratee);
```

## 레퍼런스

### `differenceBy(array, ...values, iteratee)`

각 요소를 변환 함수에 적용한 후, 변환된 값을 기준으로 차이를 구하고 싶을 때 `differenceBy`를 사용하세요. 마지막 인수가 변환 함수가 돼요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

// 소수점을 버린 값으로 비교해요.
differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
// Returns: [1.2]
// 설명: Math.floor(2.1) = 2, Math.floor(1.2) = 1
//      Math.floor(2.3) = 2, Math.floor(3.4) = 3
//      첫 번째 배열에서 2는 제외되고 1만 남아요.

// 객체의 속성으로 비교해요.
const objects = [{ x: 1 }, { x: 2 }];
const others = [{ x: 1 }];
differenceBy(objects, others, 'x');
// Returns: [{ x: 2 }]

// 여러 배열을 한 번에 제외해요.
differenceBy([2.1, 1.2, 3.5], [2.3], [1.4], [3.2], Math.floor);
// Returns: []
```

문자열로 속성 이름을 지정할 수도 있어요.

```typescript
import { differenceBy } from 'es-toolkit/compat';

const users = [
  { name: 'alice', age: 25 },
  { name: 'bob', age: 30 },
  { name: 'charlie', age: 25 }
];
const excludeUsers = [{ name: 'other', age: 25 }];

differenceBy(users, excludeUsers, 'age');
// Returns: [{ name: 'bob', age: 30 }]
// 나이가 25인 사용자들이 제외돼요.
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 차이를 구할 기준 배열이에요.
- `...values` (`Array<ArrayLike<T>>` + `ValueIteratee<T>`): 제외할 요소들이 포함된 배열들과 마지막에 변환 함수예요.

### 반환 값

(`T[]`): 변환 함수를 적용한 결과를 기준으로 첫 번째 배열에서 나머지 배열들의 요소를 제거한 새로운 배열을 반환해요.