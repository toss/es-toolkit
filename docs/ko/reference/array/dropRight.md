# dropRight

배열의 끝에서부터 지정된 개수만큼 요소를 제거한 새 배열을 반환해요.

```typescript
const dropped = dropRight(arr, itemsCount);
```

## 레퍼런스

### `dropRight(arr, itemsCount)`

배열의 뒷부분에서 일부 요소를 제거하고 싶을 때 `dropRight`를 사용하세요. 지정한 개수만큼 마지막 요소들을 제거하고, 나머지 요소들로 이루어진 새 배열을 반환해요.

```typescript
import { dropRight } from 'es-toolkit/array';

// 배열의 마지막 2개 요소를 제거해요.
dropRight([1, 2, 3, 4, 5], 2);
// Returns: [1, 2, 3]

// 제거할 개수가 배열 길이보다 크면 빈 배열을 반환해요.
dropRight([1, 2, 3], 5);
// Returns: []
```

음수나 0을 전달하면 원본 배열과 같은 요소를 가진 새 배열을 반환해요.

```typescript
import { dropRight } from 'es-toolkit/array';

dropRight([1, 2, 3], 0); // [1, 2, 3]
dropRight([1, 2, 3], -2); // [1, 2, 3]
```

#### 파라미터

- `arr` (`T[]`): 요소를 제거할 배열이에요.
- `itemsCount` (`number`): 배열의 끝에서부터 제거할 요소의 개수예요.

#### 반환 값

(`T[]`): 끝에서부터 지정된 개수만큼 요소가 제거된 새 배열이에요.
