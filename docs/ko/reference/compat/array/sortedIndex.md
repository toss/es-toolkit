# sortedIndex (Lodash 호환성)

::: warning 이진 탐색을 직접 구현하세요

이 `sortedIndex` 함수는 `null`, `undefined` 처리와 다양한 타입 지원으로 인해 복잡하게 동작해요.

대신 더 빠르고 현대적인 이진 탐색을 직접 구현하거나 전용 라이브러리를 사용하세요.

:::

정렬된 배열에서 값을 삽입할 가장 낮은 인덱스를 찾아요.

```typescript
const index = sortedIndex(array, value);
```

## 레퍼런스

### `sortedIndex(array, value)`

정렬된 배열에서 값을 삽입할 위치를 찾을 때 `sortedIndex`를 사용하세요. 이진 탐색을 사용해서 빠르게 위치를 찾아요.

```typescript
import { sortedIndex } from 'es-toolkit/compat';

// 숫자 배열에서 삽입 위치 찾기
sortedIndex([30, 50], 40);
// 1을 반환해요 (40은 30과 50 사이에 위치)

// 문자열 배열에서 삽입 위치 찾기
sortedIndex(['a', 'c'], 'b');
// 1을 반환해요 ('b'는 'a'와 'c' 사이에 위치)

// 같은 값이 있는 경우 가장 앞 위치를 반환해요
sortedIndex([1, 2, 2, 3], 2);
// 1을 반환해요 (첫 번째 2의 위치)
```

`null`이나 `undefined` 배열은 0을 반환해요.

```typescript
import { sortedIndex } from 'es-toolkit/compat';

sortedIndex(null, 1); // 0
sortedIndex(undefined, 1); // 0
```

#### 파라미터

- `array` (`ArrayLike<T> | null | undefined`): 정렬된 배열이에요. 정렬되지 않은 배열을 사용하면 잘못된 결과를 얻을 수 있어요.
- `value` (`T`): 삽입할 값이에요.

### 반환 값

(`number`): 값을 삽입할 가장 낮은 인덱스를 반환해요. 배열이 `null`이나 `undefined`면 0을 반환해요.