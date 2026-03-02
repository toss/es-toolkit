# uniqWith (Lodash 호환성)

::: warning `es-toolkit`의 [uniqWith](../../array/uniqWith.md)를 사용하세요

이 `uniqWith` 함수는 `null`이나 `undefined` 처리, 복잡한 인자 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [uniqWith](../../array/uniqWith.md)를 사용하세요.

:::

배열에서 비교 함수를 사용하여 중복을 제거하고 유일한 요소들로 구성된 새 배열을 만들어요.

```typescript
const result = uniqWith(array, comparator);
```

## 사용법

### `uniqWith(array, comparator)`

배열의 각 요소를 비교 함수로 비교하여 중복을 제거해요. 비교 함수가 `true`를 반환하면 두 요소를 같다고 판단하고, 첫 번째로 나타나는 요소만 유지해요. 비교 함수를 제공하지 않으면 기본적으로 얕은 동등성 비교를 사용해요.

```typescript
import { uniqWith } from 'es-toolkit/compat';

// 비교 함수 없이 사용 (얕은 동등성 비교)
uniqWith([1, 2, 2, 3]);
// Returns: [1, 2, 3]

// 사용자 정의 비교 함수로 홀수/짝수 기준 중복 제거
uniqWith([1, 2, 3, 4], (a, b) => a % 2 === b % 2);
// Returns: [1, 2]

// 객체 배열에서 속성 기준 중복 제거
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 1, y: 2 },
];
uniqWith(objects, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 1, y: 2 }, { x: 2, y: 1 }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { uniqWith } from 'es-toolkit/compat';

uniqWith(null); // []
uniqWith(undefined); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 중복을 제거할 배열이에요.
- `comparator` (`(a: T, b: T) => boolean`, 선택): 두 요소가 같은지 비교할 함수예요. `true`를 반환하면 같다고 판단해요. 기본값은 얕은 동등성 비교예요.

#### 반환 값

(`T[]`): 비교 함수 결과를 기준으로 중복이 제거된 새 배열을 반환해요.
