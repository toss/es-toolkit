# pullAt (Lodash 호환성)

::: warning `es-toolkit`의 [pullAt](../../array/pullAt.md)을 사용하세요

이 `pullAt` 함수는 복잡한 타입 처리와 오버로딩으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [pullAt](../../array/pullAt.md)을 사용하세요.

:::

지정된 인덱스에 있는 요소들을 배열에서 제거하고 제거된 요소들을 반환해요.

```typescript
const removed = pullAt(array, ...indexes);
```

## 레퍼런스

### `pullAt(array, ...indexes)`

배열에서 지정된 인덱스에 있는 요소들을 제거하고 제거된 요소들의 배열을 반환하세요. 원본 배열이 변경돼요.

```typescript
import { pullAt } from 'es-toolkit/compat';

// 단일 인덱스로 제거해요
const array = [1, 2, 3, 4, 5];
const removed = pullAt(array, 1, 3);
console.log(array); // [1, 3, 5]
console.log(removed); // [2, 4]

// 배열 형태의 인덱스로 제거해요
const colors = ['red', 'green', 'blue', 'yellow'];
const removedColors = pullAt(colors, [0, 2]);
console.log(colors); // ['green', 'yellow']
console.log(removedColors); // ['red', 'blue']
```

존재하지 않는 인덱스는 `undefined`로 처리돼요.

```typescript
import { pullAt } from 'es-toolkit/compat';

const numbers = [10, 20, 30];
const removed = pullAt(numbers, 1, 5);
console.log(numbers); // [10, 30]
console.log(removed); // [20, undefined]
```

#### 파라미터

- `array` (`ArrayLike<T>`): 변경할 배열이에요.
- `...indexes` (`Array<number | number[]>`): 제거할 요소들의 인덱스예요. 개별 숫자나 숫자 배열로 전달할 수 있어요.

#### 반환 값

(`ArrayLike<T>`): 제거된 요소들의 배열을 반환해요.
