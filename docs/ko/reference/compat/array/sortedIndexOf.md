# sortedIndexOf

::: info
이 함수는 호환성을 위한 `es-toolkit/compat` 에서만 가져올 수 있어요. 대체할 수 있는 네이티브 JavaScript API가 있거나, 아직 충분히 최적화되지 않았기 때문이에요.

`es-toolkit/compat`에서 이 함수를 가져오면, [lodash와 완전히 똑같이 동작](../../../compatibility.md)해요.
:::

정렬된 배열에서 두 번째 인자값이 처음으로 등장하는 위치를 찾아주는 함수이에요. 즉, 찾으려는 값이 정렬된 배열 속 몇 번째에 위치해있는지 알려주는 함수이에요. [sortedIndex](./sortedIndex.md)함수를 이용해서 비교 후에 인덱스를 반환해요.

## 인터페이스

```typescript
export function sortedIndexOf<T>(array: ArrayLike<T> | null | undefined, value: T): number;
```

### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 배열이 null 또는 undefined일 경우 -1을 리턴해요.
- `value` (`T`): 정렬된 배열 속 비교를 통해 찾으려는 값.

### 반환 값

(`number`): 정렬 순서를 유지하기 위해 값을 삽입할 인덱스이에요.

## 예시

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

const numbers = [11, 22, 33, 44, 55];
sortedIndexOf(numbers, 11); // 반환 값: 0
sortedIndexOf(numbers, 30); // 반환 값: -1

// 값이 중복된 경우, 첫 번째 값의 인덱스를 반환합니다.
const duplicateNumbers = [1, 2, 2, 3, 3, 3, 4];
sortedIndexOf(duplicateNumbers, 3); // 반환 값: 3

// 배열이 정렬되지 않은 경우, 잘못된 인덱스를 반환할 수 있습니다.
const unSortedArray = [55, 33, 22, 11, 44];
sortedIndexOf(unSortedArray, 11); // 반환 값: -1

// -0과 0은 동일하게 취급됩니다.
const mixedZeroArray = [-0, 0];
sortedIndexOf(mixedZeroArray, 0); // 반환 값: 0
sortedIndexOf(mixedZeroArray, -0); // 반환 값: 0

// 배열과 유사한 객체에서도 작동합니다.
const arrayLike = { length: 3, 0: 10, 1: 20, 2: 30 };
sortedIndexOf(arrayLike, 20); // 반환 값: 1
```
