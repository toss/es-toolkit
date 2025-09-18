# take (Lodash 호환성)

::: warning `es-toolkit`의 `take`를 사용하세요

이 `take` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [take](../../array/take.md)를 사용하세요.

:::

배열의 앞에서부터 지정된 개수만큼의 요소를 가져와서 새로운 배열을 만들어요.

```typescript
const result = take([1, 2, 3, 4, 5], 3);
// result는 [1, 2, 3]이 돼요.
```

## 레퍼런스

### `take(array, count)`

배열의 앞에서부터 지정된 개수만큼의 요소를 가져와서 새로운 배열을 반환해요. `count`가 배열의 길이보다 크면 전체 배열을 반환해요.

```typescript
import { take } from 'es-toolkit/compat';

// 기본 사용법
const numbers = [1, 2, 3, 4, 5];
const result1 = take(numbers, 3);
// Returns: [1, 2, 3]

// 배열 길이보다 큰 개수 요청
const result2 = take(numbers, 10);
// Returns: [1, 2, 3, 4, 5] (전체 배열)

// 0개 요청
const result3 = take(numbers, 0);
// Returns: []

// 빈 배열 처리
const result4 = take([], 3);
// Returns: []

// 음수 처리
const result5 = take(numbers, -1);
// Returns: []
```

#### 파라미터

- `array` (`T[]`): 요소를 가져올 배열이에요.
- `count` (`number`): 가져올 요소의 개수예요. 기본값은 1이에요.

#### 반환 값

(`T[]`): 앞에서부터 지정된 개수만큼의 요소를 포함하는 새로운 배열이에요.
