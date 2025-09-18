# compact (Lodash 호환성)

::: warning 배열 필터링을 사용하세요

이 `compact` 함수는 복잡한 거짓으로 평가되는 값 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `array.filter(Boolean)`을 사용하세요.

:::

배열에서 거짓으로 평가되는 값들을 제거해요.

```typescript
const compacted = compact(arr);
```

## 레퍼런스

### `compact(arr)`

배열에서 `false`, `null`, `0`, `""`, `undefined`, `NaN` 같은 거짓으로 평가되는 값들을 제거하고 싶을 때 `compact`를 사용하세요.

```typescript
import { compact } from 'es-toolkit/compat';

// 거짓으로 평가되는 값들 제거
compact([0, 1, false, 2, '', 3]);
// Returns: [1, 2, 3]

compact(['a', null, 'b', undefined, 'c', NaN]);
// Returns: ['a', 'b', 'c']

// 빅인트 0도 제거
compact([0n, 1n, false, 2n]);
// Returns: [1n, 2n]

// 빈 배열도 처리
compact([]);
// Returns: []

// 모든 값이 거짓으로 평가되는 경우
compact([false, null, 0, '', undefined, NaN]);
// Returns: []
```

참으로 평가되는 값들은 그대로 유지돼요.

```typescript
import { compact } from 'es-toolkit/compat';

compact([1, 'hello', true, {}, []]);
// Returns: [1, 'hello', true, {}, []]

// 0이 아닌 숫자들
compact([0, -1, 2, -3]);
// Returns: [-1, 2, -3]
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { compact } from 'es-toolkit/compat';

compact(null);
// Returns: []

compact(undefined);
// Returns: []
```

#### 파라미터

- `arr` (`ArrayLike<T> | null | undefined`): 압축할 배열이에요.

### 반환 값

(`T[]`): 거짓으로 평가되는 값들이 제거된 새로운 배열을 반환해요.
