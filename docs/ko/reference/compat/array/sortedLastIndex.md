# sortedLastIndex (Lodash 호환성)

::: warning 이진 탐색을 직접 구현하세요

이 `sortedLastIndex` 함수는 복잡한 이진 탐색 처리와 타입 검증으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 이진 탐색을 직접 구현하세요.

:::

정렬된 배열에서 값을 삽입할 가장 높은 인덱스를 찾아요.

```typescript
const index = sortedLastIndex(array, value);
```

## 사용법

### `sortedLastIndex(array, value)`

정렬된 배열에서 값을 삽입할 가장 높은 위치를 찾을 때 `sortedLastIndex`를 사용하세요. 중복된 값이 있을 때 마지막 위치 뒤의 인덱스를 반환해요.

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

// 중복된 값이 있는 배열에서 마지막 삽입 위치 찾기
sortedLastIndex([4, 5, 5, 5, 6], 5);
// 4를 반환해요 (마지막 5 뒤의 위치)

// 새로운 값의 삽입 위치 찾기
sortedLastIndex([10, 20, 30], 25);
// 2을 반환해요 (25는 30 앞에 위치)

// 값이 없는 경우
sortedLastIndex([1, 2, 3], 0);
// 0을 반환해요 (맨 앞에 위치)
```

`null`이나 `undefined` 배열은 0을 반환해요.

```typescript
import { sortedLastIndex } from 'es-toolkit/compat';

sortedLastIndex(null, 1); // 0
sortedLastIndex(undefined, 1); // 0
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 정렬되지 않은 배열을 사용하면 잘못된 결과를 얻을 수 있어요.
- `value` (`T`): 삽입할 값이에요.

#### 반환 값

(`number`): 값을 삽입할 가장 높은 인덱스를 반환해요. 배열이 `null`이나 `undefined`면 0을 반환해요.
