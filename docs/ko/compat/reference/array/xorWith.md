# xorWith (Lodash 호환성)

::: warning `es-toolkit`의 [xorWith](../../array/xorWith.md)을 사용하세요

이 `xorWith` 함수는 `null`이나 `undefined` 처리, 복잡한 중복 계산 로직 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [xorWith](../../array/xorWith.md)를 사용하세요.

:::

여러 배열들에서 비교 함수를 사용하여 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 만들어요.

```typescript
const result = xorWith(...arrays, comparator);
```

## 사용법

### `xorWith(...arrays, comparator)`

여러 배열의 대칭 차집합을 비교 함수를 사용하여 계산해요. 비교 함수가 `true`를 반환하면 두 요소를 같다고 판단하고, 정확히 하나의 배열에만 존재하는 요소들을 반환해요. 복잡한 객체나 사용자 정의 비교 로직이 필요할 때 유용해요.

```typescript
import { xorWith } from 'es-toolkit/compat';

// 간단한 숫자 비교
xorWith([1, 2], [2, 3], (a, b) => a === b);
// Returns: [1, 3]

// 객체의 속성 비교
const objects = [
  { x: 1, y: 2 },
  { x: 2, y: 1 },
];
const others = [
  { x: 1, y: 1 },
  { x: 1, y: 2 },
];
xorWith(objects, others, (a, b) => a.x === b.x && a.y === b.y);
// Returns: [{ x: 2, y: 1 }, { x: 1, y: 1 }]

// 세 배열의 대칭 차집합
xorWith([1], [2], [3], (a, b) => a === b);
// Returns: [1, 2, 3]

// 문자열 길이로 비교
xorWith(['hello'], ['world', 'hi'], (a, b) => a.length === b.length);
// Returns: ['hi']
```

비교 함수를 제공하지 않으면 기본적으로 얕은 동등성 비교를 사용해요.

```typescript
import { xorWith } from 'es-toolkit/compat';

xorWith([1, 2], [2, 3]);
// Returns: [1, 3]
```

#### 파라미터

- `...arrays` (`Array<ArrayLike<T> | null | undefined | ((a: T, b: T) => boolean)>`): 대칭 차집합을 계산할 배열들과 마지막에 비교 함수예요. 비교 함수는 두 요소가 같으면 `true`를 반환해야 해요.

#### 반환 값

(`T[]`): 비교 함수 결과를 기준으로 정확히 하나의 배열에만 존재하는 요소들로 구성된 새 배열을 반환해요.
