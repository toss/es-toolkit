# fill (Lodash 호환성)

::: warning `Array.prototype.fill` 사용하세요

이 `fill` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리, 문자열 처리 등으로 인해 느리게 동작해요.

대신 더 빠른 네이티브 JavaScript의 `Array.prototype.fill`을 사용하세요.

:::

배열의 지정된 범위를 특정 값으로 채워요.

```typescript
const result = fill(array, value, start, end);
```

## 레퍼런스

### `fill(array, value, start, end)`

배열의 특정 범위를 하나의 값으로 채우고 싶을 때 `fill`을 사용하세요. 원본 배열을 변경해요.

```typescript
import { fill } from 'es-toolkit/compat';

// 전체 배열을 하나의 값으로 채워요.
const array1 = [1, 2, 3];
fill(array1, 'a');
// Returns: ['a', 'a', 'a']

// 빈 배열을 생성하고 값으로 채워요.
const array2 = Array(3);
fill(array2, 2);
// Returns: [2, 2, 2]

// 특정 범위만 채워요.
const array3 = [4, 6, 8, 10];
fill(array3, '*', 1, 3);
// Returns: [4, '*', '*', 10]

// 음수 인덱스도 사용할 수 있어요.
const array4 = [1, 2, 3];
fill(array4, '*', -2, -1);
// Returns: [1, '*', 3]
```

배열 같은 객체(ArrayLike)도 사용할 수 있어요.

```typescript
import { fill } from 'es-toolkit/compat';

const arrayLike = { 0: 1, 1: 2, 2: 3, length: 3 };
fill(arrayLike, 'a', 1, 2);
// Returns: { 0: 1, 1: 'a', 2: 3, length: 3 }
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { fill } from 'es-toolkit/compat';

fill(null, 'a'); // []
fill(undefined, 'a'); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 값으로 채울 배열이에요.
- `value` (`U`): 배열을 채울 값이에요.
- `start` (`number`, 선택): 채우기 시작할 인덱스예요. 기본값은 `0`이에요.
- `end` (`number`, 선택): 채우기를 끝낼 인덱스예요 (포함되지 않음). 기본값은 `array.length`예요.

### 반환 값

(`ArrayLike<T | U>`): 지정된 값으로 채워진 배열을 반환해요.