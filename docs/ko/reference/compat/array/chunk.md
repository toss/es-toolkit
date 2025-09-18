# chunk (Lodash 호환성)

::: warning `es-toolkit`의 `chunk`를 사용하세요

이 `chunk` 함수는 `null`이나 `undefined` 처리, `size` 기본값 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [chunk](../../array/chunk.md)를 사용하세요.

:::

배열을 정해진 크기의 작은 배열들로 나눠요.

```typescript
const chunked = chunk(arr, size);
```

## 레퍼런스

### `chunk(arr, size?)`

긴 배열을 같은 크기의 여러 작은 배열로 나누고 싶을 때 `chunk`를 사용하세요. 배열을 똑같이 나눌 수 없다면, 마지막 배열이 남은 요소들을 포함해요.

```typescript
import { chunk } from 'es-toolkit/compat';

// 숫자 배열을 크기 2로 나눠요.
chunk([1, 2, 3, 4], 2);
// Returns: [[1, 2], [3, 4]]

// 문자열 배열을 크기 3으로 나눠요.
chunk(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 3);
// Returns: [['a', 'b', 'c'], ['d', 'e', 'f'], ['g']]

// 나누어떨어지지 않는 경우
chunk([1, 2, 3, 4, 5], 2);
// Returns: [[1, 2], [3, 4], [5]]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk(null, 2);
// Returns: []

chunk(undefined, 2);
// Returns: []
```

크기가 0이거나 음수면 빈 배열을 반환해요.

```typescript
import { chunk } from 'es-toolkit/compat';

chunk([1, 2, 3], 0);
// Returns: []

chunk([1, 2, 3], -1);
// Returns: []
```

#### 파라미터

- `arr` (`ArrayLike<T> | null | undefined`): 나눌 배열이에요.
- `size` (`number`, 선택): 각 작은 배열의 크기예요. 기본값은 `1`이에요.

### 반환 값

(`T[][]`): 크기 `size`로 나눠진 2차원 배열을 반환해요.
