# uniqBy (Lodash 호환성)

::: warning `es-toolkit`의 [uniqBy](../../array/uniqBy.md)를 사용하세요

이 `uniqBy` 함수는 `null`이나 `undefined` 처리, 복잡한 인자 타입 처리 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [uniqBy](../../array/uniqBy.md)를 사용하세요.

:::

배열에서 변환 함수가 반환하는 값으로 중복을 제거하여 유일한 요소들로 구성된 새 배열을 만들어요.

```typescript
const result = uniqBy(array, iteratee);
```

## 레퍼런스

### `uniqBy(array, iteratee)`

배열의 각 요소에 변환 함수를 적용하여, 변환 결과가 같은 요소들 중에서 첫 번째 요소만 유지해요. 객체 배열에서 특정 속성을 기준으로 중복을 제거하거나, 숫자 배열에서 특정 계산 결과를 기준으로 중복을 제거할 때 유용해요.

```typescript
import { uniqBy } from 'es-toolkit/compat';

// 숫자 배열에서 Math.floor 결과로 중복 제거
uniqBy([2.1, 1.2, 2.3], Math.floor);
// Returns: [2.1, 1.2]

// 객체 배열에서 속성으로 중복 제거
uniqBy([{ x: 1 }, { x: 2 }, { x: 1 }], 'x');
// Returns: [{ x: 1 }, { x: 2 }]

// 함수로 중복 제거
uniqBy([{ name: 'John' }, { name: 'Jane' }, { name: 'John' }], obj => obj.name);
// Returns: [{ name: 'John' }, { name: 'Jane' }]
```

`null`이나 `undefined`는 빈 배열로 처리해요.

```typescript
import { uniqBy } from 'es-toolkit/compat';

uniqBy(null, Math.floor); // []
uniqBy(undefined, 'x'); // []
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 중복을 제거할 배열이에요.
- `iteratee` (`ValueIteratee<T>`): 각 요소에 적용할 변환 함수예요. 함수, 속성 이름, 부분 객체 등을 사용할 수 있어요.

### 반환 값

(`T[]`): 변환 함수 결과를 기준으로 중복이 제거된 새 배열을 반환해요.
