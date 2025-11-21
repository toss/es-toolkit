# uniq (Lodash 호환성)

::: warning `es-toolkit`의 [uniq](../../array/uniq.md)를 사용하세요

이 `uniq` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [uniq](../../array/uniq.md)를 사용하세요.

:::

배열에서 중복된 요소를 제거하여 고유한 요소만 남긴 새로운 배열을 만들어요.

```typescript
const result = uniq([1, 2, 2, 3, 3, 4]);
// result는 [1, 2, 3, 4]가 돼요.
```

## 사용법

### `uniq(array)`

배열에서 중복된 요소를 제거하고 고유한 요소만 포함하는 새로운 배열을 반환해요. 첫 번째로 나타나는 요소만 유지되고 순서는 보존돼요.

```typescript
import { uniq } from 'es-toolkit/compat';

// 숫자 배열에서 중복 제거
const numbers = [1, 2, 2, 3, 3, 4, 1];
const result1 = uniq(numbers);
// Returns: [1, 2, 3, 4]

// 문자열 배열에서 중복 제거
const strings = ['a', 'b', 'b', 'c', 'a'];
const result2 = uniq(strings);
// Returns: ['a', 'b', 'c']

// 객체 배열에서 중복 제거 (참조값 비교)
const obj1 = { id: 1 };
const obj2 = { id: 2 };
const objects = [obj1, obj2, obj1];
const result3 = uniq(objects);
// Returns: [{ id: 1 }, { id: 2 }]
```

#### 파라미터

- `array` (`T[]`): 처리할 배열이에요.

#### 반환 값

(`T[]`): 중복이 제거된 새로운 배열이에요.
