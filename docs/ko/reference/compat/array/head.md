# head (Lodash 호환성)

::: warning `es-toolkit`의 `head`를 사용하세요

이 `head` 함수는 `null`이나 `undefined` 처리로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [head](../../array/head.md)를 사용하세요.

:::

배열의 첫 번째 요소를 반환해요.

```typescript
const firstElement = head(array);
```

## 레퍼런스

### `head(array)`

배열의 맨 앞 요소를 가져오고 싶을 때 `head`를 사용하세요. 배열이 비어있으면 `undefined`를 반환해요.

```typescript
import { head } from 'es-toolkit/compat';

// 숫자 배열의 첫 번째 요소
head([1, 2, 3, 4, 5]);
// Returns: 1

// 문자열 배열의 첫 번째 요소
head(['a', 'b', 'c']);
// Returns: 'a'

// 객체 배열의 첫 번째 요소
const users = [{ name: 'Alice' }, { name: 'Bob' }];
head(users);
// Returns: { name: 'Alice' }
```

빈 배열이나 `null`, `undefined`는 `undefined`를 반환해요.

```typescript
import { head } from 'es-toolkit/compat';

// 빈 배열
head([]);
// Returns: undefined

// null 배열
head(null);
// Returns: undefined

// undefined 배열
head(undefined);
// Returns: undefined
```

유사 배열 객체도 지원해요.

```typescript
import { head } from 'es-toolkit/compat';

// 유사 배열 객체
const arrayLike = { 0: 'first', 1: 'second', length: 2 };
head(arrayLike);
// Returns: 'first'

// 문자열도 유사 배열 객체
head('hello');
// Returns: 'h'
```

단일 요소 배열도 처리해요.

```typescript
import { head } from 'es-toolkit/compat';

// 단일 요소 배열
head([42]);
// Returns: 42

// 중첩 배열
head([[1, 2], [3, 4]]);
// Returns: [1, 2]
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 첫 번째 요소를 가져올 배열이에요.

### 반환 값

(`T | undefined`): 배열의 첫 번째 요소를 반환하고, 배열이 비어있거나 `null`, `undefined`이면 `undefined`를 반환해요.
