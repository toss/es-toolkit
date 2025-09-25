# sortedIndexOf (Lodash 호환성)

::: warning 이진 탐색을 직접 구현하세요

이 `sortedIndexOf` 함수는 복잡한 이진 탐색 처리와 타입 검증으로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 이진 탐색을 직접 구현하거나 `Array.prototype.indexOf()`를 사용하세요.

:::

정렬된 배열에서 값이 처음으로 나타나는 인덱스를 찾아요.

```typescript
const index = sortedIndexOf(array, value);
```

## 레퍼런스

### `sortedIndexOf(array, value)`

정렬된 배열에서 특정 값이 처음으로 나타나는 인덱스를 찾을 때 `sortedIndexOf`를 사용하세요. 이진 탐색을 사용해서 빠르게 값을 찾아요.

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

// 숫자 배열에서 값 찾기
sortedIndexOf([11, 22, 33, 44, 55], 33);
// 2를 반환해요

// 값이 없는 경우
sortedIndexOf([11, 22, 33, 44, 55], 30);
// -1을 반환해요

// 중복된 값이 있는 경우 첫 번째 인덱스 반환
sortedIndexOf([1, 2, 2, 3, 3, 3, 4], 3);
// 3을 반환해요 (첫 번째 3의 위치)

// 0과 -0은 같게 처리해요
sortedIndexOf([-0, 0], 0);
// 0을 반환해요
```

빈 배열이나 `null`, `undefined`는 -1을 반환해요.

```typescript
import { sortedIndexOf } from 'es-toolkit/compat';

sortedIndexOf([], 1); // -1
sortedIndexOf(null, 1); // -1
sortedIndexOf(undefined, 1); // -1
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 정렬되지 않은 배열을 사용하면 잘못된 결과를 얻을 수 있어요.
- `value` (`T`): 찾을 값이에요.

#### 반환 값

(`number`): 값이 처음 나타나는 인덱스를 반환해요. 값이 없으면 -1을 반환해요.
