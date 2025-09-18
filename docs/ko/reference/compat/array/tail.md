# tail (Lodash 호환성)

::: warning `es-toolkit`의 `tail`을 사용하세요

이 `tail` 함수는 `null`이나 `undefined` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [tail](../../array/tail.md)을 사용하세요.

:::

배열의 첫 번째 요소를 제외한 나머지 요소들을 반환해요.

```typescript
const result = tail(array);
```

## 레퍼런스

### `tail(array)`

배열의 첫 번째 요소를 제외한 모든 요소들을 포함하는 새로운 배열을 만들고 싶을 때 `tail`을 사용하세요. 입력 배열이 비어있거나 요소가 하나만 있다면 빈 배열을 반환해요.

```typescript
import { tail } from 'es-toolkit/compat';

// 숫자 배열에서 첫 번째 요소를 제거해요.
tail([1, 2, 3]);
// Returns: [2, 3]

// 문자열 배열에서 첫 번째 요소를 제거해요.
tail(['a', 'b', 'c']);
// Returns: ['b', 'c']

// 하나의 요소만 있는 배열이에요.
tail([1]);
// Returns: []

// 빈 배열이에요.
tail([]);
// Returns: []
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { tail } from 'es-toolkit/compat';

tail(null); // []
tail(undefined); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 첫 번째 요소를 제거할 배열이에요.

### 반환 값

(`T[]`): 첫 번째 요소를 제외한 나머지 요소들을 포함하는 새로운 배열을 반환해요.
