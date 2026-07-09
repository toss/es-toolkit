# flatten (Lodash 호환성)

::: warning `es-toolkit`의 `flatten`을 사용하세요

이 `flatten` 함수는 `null`이나 `undefined` 처리, `ArrayLike` 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [flatten](../../../reference/array/flatten.md)을 사용하세요.

:::

배열을 한 단계 평탄화해요.

```typescript
const result = flatten(array);
```

## 사용법

### `flatten(array)`

중첩 배열을 한 단계 평탄화해요.

```typescript
import { flatten } from 'es-toolkit/compat';

// 기본 평탄화 (한 단계)
flatten([1, [2, [3, [4]], 5]]);
// 결과: [1, 2, [3, [4]], 5]

// Arguments 객체 지원
function example() {
  return flatten(arguments);
}
example(1, [2, 3], [[4]]);
// 결과: [1, 2, 3, [4]]

// Symbol.isConcatSpreadable을 가진 객체 지원
const spreadable = { 0: 'a', 1: 'b', length: 2, [Symbol.isConcatSpreadable]: true };
flatten([1, spreadable, 3]);
// 결과: [1, 'a', 'b', 3]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { flatten } from 'es-toolkit/compat';

flatten(null); // []
flatten(undefined); // []
flatten([]); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 평탄화할 배열이에요.

#### 반환 값

(`T[]`): 평탄화된 새 배열을 반환해요.
