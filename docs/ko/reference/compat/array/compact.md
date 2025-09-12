# compact (Lodash 호환성)

::: warning `es-toolkit`의 `compact`를 사용하세요

이 `compact` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [compact](../../array/compact.md)를 사용하세요.

:::

배열에서 거짓으로 평가되는 값들을 제거해요.

```typescript
const filtered = compact(array);
```

## 레퍼런스

### `compact(array)`

배열에서 거짓으로 평가되는 값(`false`, `null`, `0`, `0n`, `''`, `undefined`, `NaN`)을 제거하고 싶을 때 `compact`를 사용하세요. 참으로 평가되는 값만 남은 새로운 배열이 반환돼요.

```typescript
import { compact } from 'es-toolkit/compat';

// 다양한 거짓으로 평가되는 값들이 포함된 배열에서 참으로 평가되는 값만 남겨요.
compact([0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5]);
// Returns: [1, 2, 3, 4, 5]

// 문자열 배열에서 빈 문자열을 제거해요.
compact(['a', '', 'b', 'c', '', 'd']);
// Returns: ['a', 'b', 'c', 'd']

// 0과 0n은 거짓으로 평가되는 값이므로 제거돼요.
compact([0, 0n, 1, 2]);
// Returns: [1, 2]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { compact } from 'es-toolkit/compat';

compact(null); // []
compact(undefined); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 거짓으로 평가되는 값을 제거할 배열이에요.

### 반환 값

(`T[]`): 거짓으로 평가되는 값이 제거된 새로운 배열을 반환해요.