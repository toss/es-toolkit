# last (Lodash 호환성)

::: warning `es-toolkit`의 [last](../../array/last.md)를 사용하세요

이 `last` 함수는 `null`이나 `undefined` 처리로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [last](../../array/last.md)를 사용하세요.

:::

배열의 마지막 요소를 반환해요.

```typescript
const lastElement = last(array);
```

## 사용법

### `last(array)`

배열의 맨 뒤 요소를 가져오고 싶을 때 `last`를 사용하세요. 배열이 비어있으면 `undefined`를 반환해요.

```typescript
import { last } from 'es-toolkit/compat';

// 숫자 배열의 마지막 요소
last([1, 2, 3, 4, 5]);
// Returns: 5

// 문자열 배열의 마지막 요소
last(['a', 'b', 'c']);
// Returns: 'c'

// 객체 배열의 마지막 요소
const users = [{ name: 'Alice' }, { name: 'Bob' }];
last(users);
// Returns: { name: 'Bob' }
```

빈 배열이나 `null`, `undefined`는 `undefined`를 반환해요.

```typescript
import { last } from 'es-toolkit/compat';

// 빈 배열
last([]);
// Returns: undefined

// null 배열
last(null);
// Returns: undefined

// undefined 배열
last(undefined);
// Returns: undefined
```

유사 배열 객체도 지원해요.

```typescript
import { last } from 'es-toolkit/compat';

// 유사 배열 객체
const arrayLike = { 0: 'first', 1: 'second', length: 2 };
last(arrayLike);
// Returns: 'second'

// 문자열도 유사 배열 객체
last('hello');
// Returns: 'o'
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 마지막 요소를 가져올 배열이에요.

#### 반환 값

(`T | undefined`): 배열의 마지막 요소를 반환하고, 배열이 비어있거나 `null`, `undefined`이면 `undefined`를 반환해요.
