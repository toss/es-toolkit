# drop (Lodash 호환성)

::: warning `es-toolkit`의 `drop`을 사용하세요

이 `drop` 함수는 `null`이나 `undefined` 처리, `guard` 파라미터 처리, `toInteger` 변환 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [drop](../../array/drop.md)을 사용하세요.

:::

배열의 앞에서부터 지정된 개수만큼 요소를 제거한 새로운 배열을 반환해요.

```typescript
const result = drop(array, itemsCount);
```

## 레퍼런스

### `drop(array, itemsCount)`

배열의 처음부터 특정 개수의 요소를 제거하고 나머지 요소들로 새로운 배열을 만들고 싶을 때 `drop`을 사용하세요.

```typescript
import { drop } from 'es-toolkit/compat';

// 숫자 배열에서 앞의 2개 요소를 제거해요.
drop([1, 2, 3, 4, 5], 2);
// Returns: [3, 4, 5]

// 문자열 배열에서 앞의 1개 요소를 제거해요.
drop(['a', 'b', 'c'], 1);
// Returns: ['b', 'c']

// 제거할 개수를 지정하지 않으면 기본값 1을 사용해요.
drop([1, 2, 3]);
// Returns: [2, 3]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { drop } from 'es-toolkit/compat';

drop(null, 2); // []
drop(undefined, 2); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 제거할 배열이에요.
- `itemsCount` (`number`, 선택): 배열의 앞에서부터 제거할 요소의 개수예요. 기본값은 `1`이에요.

### 반환 값

(`T[]`): 앞에서부터 `itemsCount`개의 요소가 제거된 새로운 배열을 반환해요.