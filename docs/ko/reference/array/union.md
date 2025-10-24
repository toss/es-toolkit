# union

두 배열의 모든 고유한 요소를 포함하는 새 배열을 만들어요.

```typescript
const unified = union(arr1, arr2);
```

## 레퍼런스

### `union(arr1, arr2)`

여러 배열에서 중복 없이 모든 요소를 하나로 합치고 싶을 때 `union`을 사용하세요. 두 배열을 합친 후 중복된 값을 제거한 새 배열을 반환해요.

```typescript
import { union } from 'es-toolkit/array';

// 숫자 배열의 합집합을 구해요.
const array1 = [1, 2, 3];
const array2 = [3, 4, 5];
union(array1, array2);
// Returns: [1, 2, 3, 4, 5]

// 문자열 배열의 합집합을 구해요.
const fruits1 = ['apple', 'banana'];
const fruits2 = ['banana', 'orange'];
union(fruits1, fruits2);
// Returns: ['apple', 'banana', 'orange']
```

첫 번째 배열의 요소가 먼저 나오고, 그 다음에 두 번째 배열의 고유한 요소가 추가돼요.

```typescript
import { union } from 'es-toolkit/array';

const arr1 = [1, 2, 3];
const arr2 = [2, 3, 4, 5];
union(arr1, arr2);
// Returns: [1, 2, 3, 4, 5]
// 1, 2, 3은 arr1에서, 4, 5는 arr2에서 온 요소에요.
```

#### 파라미터

- `arr1` (`T[]`): 합칠 첫 번째 배열이에요.
- `arr2` (`T[]`): 합칠 두 번째 배열이에요.

#### 반환 값

(`T[]`): 두 배열의 모든 고유한 요소를 포함한 새 배열을 반환해요.
