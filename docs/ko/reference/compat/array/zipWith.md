# zipWith (Lodash 호환성)

::: warning `es-toolkit`의 [zipWith](../../array/zipWith.md)을 사용하세요

이 `zipWith` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [zipWith](../../array/zipWith.md)을 사용하세요.

:::

여러 배열의 요소를 결합 함수를 사용해서 새로운 배열로 결합해요.

```typescript
const result = zipWith([1, 2], [3, 4], (a, b) => a + b);
// result는 [4, 6]이 돼요.
```

## 레퍼런스

### `zipWith(...arrs, iteratee)`

여러 배열을 받아서 각 인덱스의 요소들을 제공된 함수로 결합하여 새로운 배열을 만들어요. 배열의 길이가 다를 경우, 가장 긴 배열의 길이까지 처리하며 누락된 값은 `undefined`로 전달돼요.

```typescript
import { zipWith } from 'es-toolkit/compat';

// 두 배열의 요소를 더하기
const result1 = zipWith([1, 2, 3], [4, 5, 6], (a, b) => a + b);
// Returns: [5, 7, 9]

// 세 배열의 요소를 결합
const result2 = zipWith([1, 2], [3, 4], [5, 6], (a, b, c) => a + b + c);
// Returns: [9, 12]

// 길이가 다른 배열들
const result3 = zipWith([1, 2, 3], [4, 5], (a, b) => (a || 0) + (b || 0));
// Returns: [5, 7, 3]
```

#### 파라미터

- `...arrs` (`any[][]`): 결합할 배열들이에요.
- `iteratee` (`Function`): 각 인덱스의 요소들을 결합하는 함수예요.

#### 반환 값

(`any[]`): 결합 함수를 적용한 결과로 이루어진 새로운 배열이에요.
