# fill (Lodash 호환성)

::: warning `es-toolkit`의 `fill`을 사용하세요

이 `fill` 함수는 `null`이나 `undefined` 처리, 유사 배열 객체 지원 등으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [fill](../../array/fill.md)을 사용하세요.

:::

배열의 요소들을 지정된 값으로 채워요.

```typescript
const result = fill(array, value, start, end);
```

## 사용법

### `fill(array, value, start?, end?)`

배열의 특정 범위나 전체를 동일한 값으로 채우고 싶을 때 `fill`을 사용하세요. 원본 배열을 직접 수정해요.

```typescript
import { fill } from 'es-toolkit/compat';

// 전체 배열 채우기
const arr1 = [1, 2, 3];
fill(arr1, 'a');
// Returns: ['a', 'a', 'a']

// 특정 범위 채우기
const arr2 = [1, 2, 3, 4, 5];
fill(arr2, '*', 1, 4);
// Returns: [1, '*', '*', '*', 5]

// 음수 인덱스 사용
const arr3 = [1, 2, 3, 4, 5];
fill(arr3, 'x', -3, -1);
// Returns: [1, 2, 'x', 'x', 5]
```

유사 배열 객체도 지원해요.

```typescript
import { fill } from 'es-toolkit/compat';

const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
fill(arrayLike, 'a', 1, 2);
// Returns: { 0: 1, 1: 'a', 2: 3, length: 3 }
```

`null`이나 `undefined` 배열은 빈 배열로 처리해요.

```typescript
import { fill } from 'es-toolkit/compat';

fill(null, 'a');
// Returns: []

fill(undefined, 'a');
// Returns: []
```

문자열은 읽기 전용이므로 그대로 반환해요.

```typescript
import { fill } from 'es-toolkit/compat';

fill('abc', 'x');
// Returns: 'abc' (변경되지 않음)
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 채울 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number`, 선택): 시작 위치예요. 기본값은 `0`이에요.
- `end` (`number`, 선택): 끝 위치예요 (포함되지 않음). 기본값은 `array.length`예요.

#### 반환 값

(`ArrayLike<T | U>`): 값으로 채워진 배열을 반환해요.
