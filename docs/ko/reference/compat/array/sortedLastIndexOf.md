# sortedLastIndexOf (Lodash 호환성)

::: warning 이진 탐색을 직접 구현하세요

이 `sortedLastIndexOf` 함수는 복잡한 이진 탐색 처리와 타입 검증으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 이진 탐색을 직접 구현하거나 `Array.prototype.lastIndexOf()`를 사용하세요.

:::

정렬된 배열에서 값이 마지막으로 나타나는 인덱스를 찾아요.

```typescript
const index = sortedLastIndexOf(array, value);
```

## 레퍼런스

### `sortedLastIndexOf(array, value)`

정렬된 배열에서 특정 값이 마지막으로 나타나는 인덱스를 찾을 때 `sortedLastIndexOf`를 사용하세요. 이진 탐색을 사용해서 빠르게 값을 찾아요.

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

// 숫자 배열에서 값 찾기
sortedLastIndexOf([1, 2, 3, 4, 5], 3);
// 2를 반환해요

// 값이 없는 경우
sortedLastIndexOf([1, 2, 3, 4, 5], 6);
// -1을 반환해요

// 중복된 값이 있는 경우 마지막 인덱스 반환
sortedLastIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// 5를 반환해요 (마지막 3의 위치)

// 0과 -0은 같게 처리해요
sortedLastIndexOf([-0, 0], 0);
// 1을 반환해요
```

빈 배열이나 `null`, `undefined`는 -1을 반환해요.

```typescript
import { sortedLastIndexOf } from 'es-toolkit/compat';

sortedLastIndexOf([], 1); // -1
sortedLastIndexOf(null, 1); // -1
sortedLastIndexOf(undefined, 1); // -1
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 정렬되지 않은 배열을 사용하면 잘못된 결과를 얻을 수 있어요.
- `value` (`T`): 찾을 값이에요.

### 반환 값

(`number`): 값이 마지막으로 나타나는 인덱스를 반환해요. 값이 없으면 -1을 반환해요.
