# xor

두 배열 중 하나에만 있는 요소들로 새 배열을 만들어요.

```typescript
const result = xor(arr1, arr2);
```

## 사용법

### `xor(arr1, arr2)`

두 배열의 대칭 차집합을 구하고 싶을 때 `xor`를 사용하세요. 두 배열 중 하나에만 있고 교집합에는 없는 요소들로 구성된 새 배열을 반환해요.

```typescript
import { xor } from 'es-toolkit/array';

// 숫자 배열의 대칭 차집합을 구해요.
xor([1, 2, 3, 4], [3, 4, 5, 6]);
// Returns: [1, 2, 5, 6]

// 문자열 배열의 대칭 차집합을 구해요.
xor(['a', 'b'], ['b', 'c']);
// Returns: ['a', 'c']
```

중복된 요소는 자동으로 제거돼요.

```typescript
import { xor } from 'es-toolkit/array';

xor([1, 2, 2, 3], [3, 4, 4, 5]);
// Returns: [1, 2, 4, 5]
```

#### 파라미터

- `arr1` (`readonly T[]`): 비교할 첫 번째 배열이에요.
- `arr2` (`readonly T[]`): 비교할 두 번째 배열이에요.

#### 반환 값

(`T[]`): 두 배열의 대칭 차집합을 나타내는 새 배열을 반환해요.
