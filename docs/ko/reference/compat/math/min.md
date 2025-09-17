# min (Lodash 호환성)

::: warning `Math.min`을 사용하세요

이 `min` 함수는 추가적인 함수 호출과 null/undefined 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Math.min(...array)`를 사용하세요.

:::

배열에서 최솟값을 찾아요.

```typescript
const result = min(items);
```

## 레퍼런스

### `min(items?)`

배열에서 가장 작은 값을 찾고 싶을 때 `min`을 사용하세요.

```typescript
import { min } from 'es-toolkit/compat';

// 숫자 배열에서 최솟값
min([3, 1, 4, 1, 5, 9]);
// Returns: 1

min([10, 5, 8, 20]);
// Returns: 5

// 문자열 배열에서 최솟값 (사전순)
min(['c', 'a', 'b']);
// Returns: 'a'

min(['cherry', 'apple', 'banana']);
// Returns: 'apple'

// 빈 배열이나 null/undefined
min([]);
// Returns: undefined

min(null);
// Returns: undefined

min(undefined);
// Returns: undefined
```

음수도 올바르게 처리해요.

```typescript
import { min } from 'es-toolkit/compat';

min([0, -3, 2, 8, 7]);
// Returns: -3

min([-1, -5, -3]);
// Returns: -5
```

#### 파라미터

- `items` (`ArrayLike<T> | null | undefined`, 선택): 최솟값을 찾을 배열이에요.

### 반환 값

(`T | undefined`): 배열에서 가장 작은 값을 반환해요. 배열이 비어있거나 null/undefined면 undefined를 반환해요.