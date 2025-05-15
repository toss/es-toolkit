# sortedLastIndexOf

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat` 에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

정렬된 배열에서 값이 마지막으로 나타나는 인덱스를 찾아요. `Array#lastIndexOf` 와 유사하게 작동하지만, 정렬된 배열에 특화되어 있어요.

::: warn 정렬된 배열을 인자로 제공하세요

이 함수는 이진 검색(Binary search)을 사용하여 인덱스를 빠르게 찾기 때문에, 정렬된 배열을 제공하지 않으면 올바르게 동작하지 않아요.

:::

## 인터페이스

```typescript
function sortedLastIndexOf<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 배열이 null 또는 undefined일 경우 `-1`을 리턴해요.
- `value` (`T`): 정렬된 배열 속 비교를 통해 찾으려는 값.

### 반환 값

( `number` ): 마지막으로 일치하는 값의 인덱스를 반환하고, 없으면 -1을 반환해요.

## 예시

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

const numbers = [1, 2, 3, 4, 5];
sortedLastIndexOf(numbers, 3); // 반환 값: 2
sortedLastIndexOf(numbers, 6); // 반환 값: -1

// 값이 중복된 경우, 마지막 값의 인덱스를 반환합니다.
const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
sortedLastIndexOf(duplicateNumbers, 3); // 반환 값: 5

// 배열이 정렬되지 않은 경우, 잘못된 인덱스를 반환할 수 있습니다.
const unSortedArray = [55, 33, 22, 11, 44];
sortedLastIndexOf(unSortedArray, 11); // 반환 값: -1

// -0과 0은 동일하게 취급됩니다.
const mixedZeroArray = [-0, 0];
sortedLastIndexOf(mixedZeroArray, 0); // 반환 값: 1
sortedLastIndexOf(mixedZeroArray, -0); // 반환 값: 1

// 배열과 유사한 객체에서도 작동합니다.
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 20 };
sortedLastIndexOf(arrayLike, 20); // 반환 값: 2
```
