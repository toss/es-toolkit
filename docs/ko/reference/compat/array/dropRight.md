# dropRight (Lodash 호환성)

::: warning `es-toolkit`의 `dropRight`를 사용하세요

이 `dropRight` 함수는 `null`이나 `undefined` 처리, `guard` 파라미터 처리, `toInteger` 변환 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [dropRight](../../array/dropRight.md)를 사용하세요.

:::

배열의 끝에서부터 지정된 개수만큼 요소를 제거한 새로운 배열을 반환해요.

```typescript
const result = dropRight(array, itemsCount);
```

## 레퍼런스

### `dropRight(array, itemsCount)`

배열의 끝부터 특정 개수의 요소를 제거하고 나머지 요소들로 새로운 배열을 만들고 싶을 때 `dropRight`를 사용하세요.

```typescript
import { dropRight } from 'es-toolkit/compat';

// 숫자 배열에서 끝의 2개 요소를 제거해요.
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// 문자열 배열에서 끝의 1개 요소를 제거해요.
dropRight(['a', 'b', 'c'], 1);
// Returns: ['a', 'b']

// 제거할 개수를 지정하지 않으면 기본값 1을 사용해요.
dropRight([1, 2, 3]);
// Returns: [1, 2]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { dropRight } from 'es-toolkit/compat';

dropRight(null, 2); // []
dropRight(undefined, 2); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 제거할 배열이에요.
- `itemsCount` (`number`, 선택): 배열의 끝에서부터 제거할 요소의 개수예요. 기본값은 `1`이에요.

### 반환 값

(`T[]`): 끝에서부터 `itemsCount`개의 요소가 제거된 새로운 배열을 반환해요.