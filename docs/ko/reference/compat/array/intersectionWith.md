# intersectionWith (Lodash 호환성)

::: warning `es-toolkit`의 [intersectionWith](../../array/intersectionWith.md)를 사용하세요

이 `intersectionWith` 함수는 `null`이나 `undefined` 처리, 다양한 오버로딩 지원 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [intersectionWith](../../array/intersectionWith.md)를 사용하세요.

:::

사용자 정의 비교 함수를 사용해서 모든 배열에 포함된 공통 요소들의 배열을 만들어요.

```typescript
const result = intersectionWith(array, ...otherArrays, comparator);
```

## 사용법

### `intersectionWith(array, ...otherArrays, comparator)`

사용자 정의 비교 함수를 사용해서 첫 번째 배열과 나머지 배열들의 교집합을 구해요. 비교 함수로 각 요소가 동일한지 판단하고, 모든 배열에 포함된 요소들만 결과로 반환해요.

```typescript
import { intersectionWith } from 'es-toolkit/compat';

const objects = [
  { id: 1, name: 'john' },
  { id: 2, name: 'jane' },
];
const others = [
  { id: 1, name: 'john' },
  { id: 3, name: 'joe' },
];

intersectionWith(objects, others, (a, b) => a.id === b.id);
// => [{ id: 1, name: 'john' }]

// 여러 배열과 비교할 수도 있어요
const array1 = [{ x: 1 }, { x: 2 }];
const array2 = [{ x: 1 }, { x: 3 }];
const array3 = [{ x: 1 }, { x: 4 }];

intersectionWith(array1, array2, array3, (a, b) => a.x === b.x);
// => [{ x: 1 }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { intersectionWith } from 'es-toolkit/compat';

intersectionWith(null, [1, 2], (a, b) => a === b); // []
intersectionWith([1, 2], undefined, (a, b) => a === b); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 비교할 첫 번째 배열이에요.
- `...otherArrays` (`Array<ArrayLike<U> | ((a: T, b: T | U) => boolean)>`): 비교할 나머지 배열들과 마지막 요소로 비교 함수예요.
- `comparator` (`(a: T, b: T | U) => boolean`): 두 요소가 같은지 판단하는 함수예요.

#### 반환 값

(`T[]`): 모든 배열에서 공통으로 찾은 요소들의 새로운 배열을 반환해요.
