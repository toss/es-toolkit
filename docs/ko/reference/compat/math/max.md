# max (Lodash 호환성)

::: warning `Math.max`를 사용하세요

이 `max` 함수는 추가적인 함수 호출과 `null`/`undefined` 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Math.max(...array)`를 사용하세요.

:::

배열에서 최댓값을 찾아요.

```typescript
const result = max(items);
```

## 레퍼런스

### `max(items?)`

배열에서 가장 큰 값을 찾고 싶을 때 `max`를 사용하세요.

```typescript
import { max } from 'es-toolkit/compat';

// 숫자 배열에서 최댓값
max([1, 2, 3]);
// Returns: 3

max([10, 5, 8, 20]);
// Returns: 20

// 문자열 배열에서 최댓값 (사전순)
max(['a', 'b', 'c']);
// Returns: 'c'

max(['apple', 'banana', 'cherry']);
// Returns: 'cherry'

// 빈 배열이나 null/undefined
max([]);
// Returns: undefined

max(null);
// Returns: undefined

max(undefined);
// Returns: undefined
```

음수도 올바르게 처리해요.

```typescript
import { max } from 'es-toolkit/compat';

max([-1, -5, -3]);
// Returns: -1

max([0, -2, 5, -10]);
// Returns: 5
```

#### 파라미터

- `items` (`ArrayLike<T> | null | undefined`, 선택): 최댓값을 찾을 배열이에요.

#### 반환 값

(`T | undefined`): 배열에서 가장 큰 값을 반환해요. 배열이 비어있거나 null/undefined면 undefined를 반환해요.
