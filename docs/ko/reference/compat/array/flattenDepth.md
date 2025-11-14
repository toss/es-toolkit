# flattenDepth (Lodash 호환성)

::: warning `es-toolkit`의 `flatten`를 사용하세요

이 `flattenDepth` 함수는 `null`이나 `undefined` 처리 등으로 인해 느리게 동작해요. `es-toolkit`의 `flatten` 함수는 이러한 추가 처리 없이 더 빠르고 간단하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatten](../../array/flatten.md)를 사용하세요.

:::

배열을 지정한 깊이까지 평탄화해요.

```typescript
const flattened = flattenDepth(array, depth);
```

## 사용법

### `flattenDepth(array, depth)`

중첩된 배열을 원하는 깊이까지 평탄화하고 싶을 때 `flattenDepth`를 사용하세요. 깊이를 지정하면 그 깊이까지만 중첩된 배열을 평탄화해요.

```typescript
import { flattenDepth } from 'es-toolkit/compat';

// 깊이 1까지 평탄화해요.
flattenDepth([1, [2, [3, [4]], 5]], 1);
// Returns: [1, 2, [3, [4]], 5]

// 깊이 2까지 평탄화해요.
flattenDepth([1, [2, [3, [4]], 5]], 2);
// Returns: [1, 2, 3, [4], 5]

// 깊이를 지정하지 않으면 기본값 1로 평탄화해요.
flattenDepth([1, [2, [3, [4]], 5]]);
// Returns: [1, 2, [3, [4]], 5]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { flattenDepth } from 'es-toolkit/compat';

flattenDepth(null, 2); // []
flattenDepth(undefined, 2); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 평탄화할 배열이에요.
- `depth` (`number`, 선택): 평탄화할 최대 깊이예요. 기본값은 `1`이에요.

#### 반환 값

(`T[]`): 지정한 깊이까지 평탄화된 새로운 배열을 반환해요.
