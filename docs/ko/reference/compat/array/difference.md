# difference (Lodash 호환성)

::: warning `es-toolkit`의 `difference`를 사용하세요

이 `difference` 함수는 `null`이나 `undefined` 처리, 여러 배열 인자 처리로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [difference](../../array/difference.md)를 사용하세요.

:::

첫 번째 배열에서 다른 배열들의 값들을 제외한 차집합을 구해요.

```typescript
const result = difference(arr, ...values);
```

## 레퍼런스

### `difference(arr, ...values)`

첫 번째 배열에서 나머지 배열들에 포함된 값들을 모두 제거하고 싶을 때 `difference`를 사용하세요. 순서는 첫 번째 배열의 순서를 유지해요.

```typescript
import { difference } from 'es-toolkit/compat';

// 기본 사용법
const array1 = [1, 2, 3, 4, 5];
const array2 = [2, 4];
const array3 = [5, 6];
difference(array1, array2, array3);
// Returns: [1, 3]

// 문자열 배열
difference(['a', 'b', 'c'], ['b'], ['c', 'd']);
// Returns: ['a']

// 중복된 값 처리
difference([1, 2, 2, 3], [2]);
// Returns: [1, 3]
```

빈 배열이나 빈 차집합도 처리해요.

```typescript
import { difference } from 'es-toolkit/compat';

// 빈 배열과의 차집합
difference([1, 2, 3], []);
// Returns: [1, 2, 3]

// 모든 값이 제외되는 경우
difference([1, 2, 3], [1, 2, 3]);
// Returns: []

// 겹치는 값이 없는 경우
difference([1, 2], [3, 4]);
// Returns: [1, 2]
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { difference } from 'es-toolkit/compat';

difference(null, [1, 2]);
// Returns: []

difference(undefined, [1, 2]);
// Returns: []

difference([1, 2, 3], null, undefined);
// Returns: [1, 2, 3] (null과 undefined는 무시됨)
```

유사 배열 객체도 지원해요.

```typescript
import { difference } from 'es-toolkit/compat';

// 유사 배열 객체
const arrayLike1 = { 0: 1, 1: 2, 2: 3, length: 3 };
const arrayLike2 = { 0: 2, 1: 4, length: 2 };
difference(arrayLike1, arrayLike2);
// Returns: [1, 3]
```

#### 파라미터

- `arr` (`ArrayLike<T> | null | undefined`): 차집합을 구할 기준 배열이에요.
- `values` (`...ArrayLike<T>[]`): 제외할 값들을 포함한 배열들이에요.

### 반환 값

(`T[]`): 첫 번째 배열에서 다른 배열들의 값들을 제외한 새 배열을 반환해요.
