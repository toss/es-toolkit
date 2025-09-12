# difference (Lodash 호환성)

::: warning `es-toolkit`의 `difference`를 사용하세요

이 `difference` 함수는 `null`이나 `undefined` 처리, 여러 배열 처리, `ArrayLike` 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [difference](../../array/difference.md)를 사용하세요.

:::

첫 번째 배열에서 다른 배열들에 포함된 요소들을 제거해요.

```typescript
const result = difference(array, ...excludeArrays);
```

## 레퍼런스

### `difference(array, ...values)`

첫 번째 배열에서 나머지 배열들에 포함된 요소들을 모두 제거한 새로운 배열을 만들고 싶을 때 `difference`를 사용하세요. 여러 개의 배열을 동시에 제외할 수 있어요.

```typescript
import { difference } from 'es-toolkit/compat';

// 기본 사용법
difference([1, 2, 3, 4, 5], [2, 4]);
// Returns: [1, 3, 5]

// 여러 배열을 한 번에 제외해요.
difference([1, 2, 3, 4, 5], [2, 4], [5, 6]);
// Returns: [1, 3]

// 문자열 배열도 사용할 수 있어요.
difference(['a', 'b', 'c', 'd'], ['b', 'd'], ['e']);
// Returns: ['a', 'c']
```

배열 같은 객체(ArrayLike)도 사용할 수 있어요.

```typescript
import { difference } from 'es-toolkit/compat';

const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };

difference(arrayLike1, arrayLike2);
// Returns: [1, 3]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { difference } from 'es-toolkit/compat';

difference(null, [1, 2]); // []
difference(undefined, [1, 2]); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 차이를 구할 기준 배열이에요.
- `...values` (`Array<ArrayLike<T>>`): 제외할 요소들이 포함된 배열들이에요.

### 반환 값

(`T[]`): 첫 번째 배열에서 나머지 배열들의 요소를 제거한 새로운 배열을 반환해요.