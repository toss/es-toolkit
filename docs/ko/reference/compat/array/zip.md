# zip (Lodash 호환성)

::: warning `es-toolkit`의 `zip`을 사용하세요

이 `zip` 함수는 Lodash와의 호환성을 위해 추가적인 처리가 포함되어 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [zip](../../array/zip.md)을 사용하세요.

:::

여러 배열을 튜플의 단일 배열로 결합해요.

```typescript
const result = zip([1, 2], ['a', 'b']);
// result는 [[1, 'a'], [2, 'b']]가 돼요.
```

## 레퍼런스

### `zip(...arrs)`

여러 배열을 받아서 각 인덱스의 요소들을 하나의 튜플로 묶어 새로운 배열을 만들어요. 입력 배열의 길이가 다를 경우, 결과 배열의 길이는 가장 긴 입력 배열의 길이를 가지며, 누락된 요소는 `undefined`로 채워져요.

```typescript
import { zip } from 'es-toolkit/compat';

const arr1 = [1, 2, 3];
const arr2 = ['a', 'b', 'c'];
const result = zip(arr1, arr2);
// Returns: [[1, 'a'], [2, 'b'], [3, 'c']]

// 길이가 다른 배열들
const arr3 = [true, false];
const result2 = zip(arr1, arr2, arr3);
// Returns: [[1, 'a', true], [2, 'b', false], [3, 'c', undefined]]

// 빈 배열이 포함된 경우
zip([1, 2], [], ['a', 'b']);
// Returns: [[1, undefined, 'a'], [2, undefined, 'b']]
```

#### 파라미터

- `...arrs` (`any[][]`): 결합할 배열들이에요.

#### 반환 값

(`any[][]`): 입력 배열들의 각 인덱스 요소들을 포함하는 튜플로 이루어진 새로운 배열이에요.
