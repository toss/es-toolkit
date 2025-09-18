# takeRight (Lodash 호환성)

::: warning `es-toolkit`의 [takeRight](../../array/takeRight.md)를 사용하세요

이 `takeRight` 함수는 `null`이나 `undefined` 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [takeRight](../../array/takeRight.md)를 사용하세요.

:::

배열의 뒤에서부터 지정된 개수만큼의 요소를 가져와요.

```typescript
const result = takeRight(array, count);
```

## 레퍼런스

### `takeRight(array, count)`

배열의 뒤에서부터 지정된 개수만큼의 요소를 가져와서 새로운 배열을 만들고 싶을 때 `takeRight`를 사용하세요. 요청한 개수가 배열의 길이보다 크다면 전체 배열을 반환해요.

```typescript
import { takeRight } from 'es-toolkit/compat';

// 숫자 배열에서 뒤의 2개 요소를 가져와요.
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 문자열 배열에서 뒤의 3개 요소를 가져와요.
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']

// 요청한 개수가 배열 길이보다 클 때
takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]

// 0개 요청
takeRight([1, 2, 3], 0);
// Returns: []

// 음수 요청
takeRight([1, 2, 3], -1);
// Returns: []
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { takeRight } from 'es-toolkit/compat';

takeRight(null, 2); // []
takeRight(undefined, 2); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 요소를 가져올 배열이에요.
- `count` (`number`, 선택): 가져올 요소의 개수예요. 기본값은 `1`이에요.

### 반환 값

(`T[]`): 뒤에서부터 지정된 개수만큼의 요소를 포함하는 새로운 배열을 반환해요.
