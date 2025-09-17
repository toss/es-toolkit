# without (Lodash 호환성)

::: warning `es-toolkit`의 `without`을 사용하세요

이 `without` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [without](../../array/without.md)을 사용하세요.

:::

배열에서 지정된 값들을 제외한 새로운 배열을 만들어요.

```typescript
const result = without([1, 2, 3, 4, 5], 2, 4);
// result는 [1, 3, 5]가 돼요.
```

## 레퍼런스

### `without(array, ...values)`

배열에서 지정된 값들을 제거한 새로운 배열을 반환해요. 원본 배열은 변경되지 않아요.

```typescript
import { without } from 'es-toolkit/compat';

// 숫자 배열에서 여러 값 제거
const numbers = [1, 2, 3, 4, 5, 2, 4];
const result1 = without(numbers, 2, 4);
// Returns: [1, 3, 5]

// 문자열 배열에서 값 제거
const fruits = ['apple', 'banana', 'cherry', 'banana'];
const result2 = without(fruits, 'banana');
// Returns: ['apple', 'cherry']

// 빈 배열 처리
const result3 = without([], 1, 2, 3);
// Returns: []
```

#### 파라미터

- `array` (`T[]`): 처리할 원본 배열이에요.
- `...values` (`T[]`): 제거할 값들이에요.

#### 반환 값

(`T[]`): 지정된 값들을 제거한 새로운 배열이에요.
