# head (Lodash 호환성)

::: warning `es-toolkit`의 `head`를 사용하세요

이 `head` 함수는 `ArrayLike` 객체 처리와 배열 변환 과정으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [head](../../array/head.md)를 사용하세요.

:::

배열의 첫 번째 요소를 반환해요.

```typescript
const firstElement = head(array);
```

## 레퍼런스

### `head(array)`

배열이나 배열 형태 객체의 첫 번째 요소를 반환해요. 배열이 비어있거나 유효하지 않으면 `undefined`를 반환해요.

```typescript
import { head } from 'es-toolkit/compat';

// 숫자 배열의 첫 번째 요소
const numbers = [1, 2, 3, 4];
const first = head(numbers);
// first는 1

// 문자열 배열의 첫 번째 요소
const strings = ['a', 'b', 'c'];
const firstChar = head(strings);
// firstChar는 'a'

// 배열 형태 객체
const arrayLike = { 0: 'x', 1: 'y', 2: 'z', length: 3 };
const firstItem = head(arrayLike);
// firstItem은 'x'
```

빈 배열이나 유효하지 않은 입력은 `undefined`를 반환해요.

```typescript
import { head } from 'es-toolkit/compat';

const emptyArray: number[] = [];
const noElement = head(emptyArray);
// noElement는 undefined

head(null); // undefined
head(undefined); // undefined
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 첫 번째 요소를 가져올 배열이나 배열 형태 객체예요.

### 반환 값

(`T | undefined`): 배열의 첫 번째 요소를 반환하고, 배열이 비어있거나 유효하지 않으면 `undefined`를 반환해요.