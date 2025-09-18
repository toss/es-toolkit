# pullAllWith (Lodash 호환성)

::: warning `es-toolkit`의 `differenceWith`를 사용하세요

이 `pullAllWith` 함수는 배열을 변경하고 복잡한 비교 함수 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [differenceWith](../../array/differenceWith.md)를 사용하세요.

:::

비교 함수를 사용해서 지정된 값들을 배열에서 제거해요.

```typescript
const modified = pullAllWith(array, valuesToRemove, comparator);
```

## 레퍼런스

### `pullAllWith(array, values, comparator)`

제공된 비교 함수를 사용해서 배열에서 지정된 값들을 제거하세요. 원본 배열이 변경되고 변경된 배열이 반환돼요.

```typescript
import { pullAllWith } from 'es-toolkit/compat';

// 객체 비교로 제거해요
const array = [{ x: 1, y: 2 }, { x: 3, y: 4 }, { x: 5, y: 6 }];
pullAllWith(array, [{ x: 3, y: 4 }], (a, b) => a.x === b.x && a.y === b.y);
console.log(array); // [{ x: 1, y: 2 }, { x: 5, y: 6 }]

// 문자열 길이로 비교해서 제거해요
const words = ['hello', 'world', 'test', 'code'];
pullAllWith(words, ['hi'], (a, b) => a.length === b.length);
console.log(words); // ['hello', 'world', 'code'] ('test'가 'hi'와 같은 길이라서 제거됨)
```

배열이 비어있거나 `null`, `undefined`면 원본 배열을 그대로 반환해요.

```typescript
import { pullAllWith } from 'es-toolkit/compat';

pullAllWith([], [1], (a, b) => a === b); // []
pullAllWith(null as any, [1], (a, b) => a === b); // null
```

#### 파라미터

- `array` (`T[]`): 변경할 배열이에요.
- `values` (`ArrayLike<T>`, 선택): 제거할 값들의 배열이에요.
- `comparator` (`(a: T, b: T) => boolean`, 선택): 두 요소를 비교하는 함수예요. 두 요소가 같다고 판단되면 `true`를 반환해야 해요.

### 반환 값

(`T[]`): 지정된 값들이 제거된 원본 배열을 반환해요.
