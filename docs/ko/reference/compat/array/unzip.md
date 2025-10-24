# unzip (Lodash 호환성)

::: warning `es-toolkit`의 [unzip](../../array/unzip.md)를 사용하세요

이 `unzip` 함수는 `null`이나 `undefined` 처리, 배열이 아닌 값 필터링 등으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [unzip](../../array/unzip.md)를 사용하세요.

:::

묶여있는 배열의 같은 위치에 있는 요소들을 모아서 새 배열로 만들어요.

```typescript
const result = unzip(array);
```

## 레퍼런스

### `unzip(array)`

중첩된 배열에서 같은 인덱스에 있는 요소들을 모아서 새로운 배열로 반환해요. `zip` 함수의 반대 동작을 수행해요. 행렬을 전치하거나 구조화된 데이터를 재정렬할 때 유용해요.

```typescript
import { unzip } from 'es-toolkit/compat';

// 문자열과 불린, 숫자가 섞인 배열 언집
const zipped = [
  ['a', true, 1],
  ['b', false, 2],
];
const result = unzip(zipped);
// Returns: [['a', 'b'], [true, false], [1, 2]]

// 숫자 배열들 언집
const numbers = [
  [1, 4],
  [2, 5],
  [3, 6],
];
unzip(numbers);
// Returns: [[1, 2, 3], [4, 5, 6]]

// 길이가 다른 배열들도 처리
const uneven = [
  ['a', 1],
  ['b', 2, true],
];
unzip(uneven);
// Returns: [['a', 'b'], [1, 2], [undefined, true]]
```

`null`이나 `undefined`, 빈 배열은 빈 배열로 처리해요.

```typescript
import { unzip } from 'es-toolkit/compat';

unzip(null); // []
unzip(undefined); // []
unzip([]); // []
```

#### 파라미터

- `array` (`T[][] | ArrayLike<ArrayLike<T>> | null | undefined`): 언집할 중첩 배열이에요. 각 내부 배열의 같은 위치 요소들이 모여요.

#### 반환 값

(`T[][]`): 같은 위치의 요소들이 모인 새로운 배열을 반환해요.
