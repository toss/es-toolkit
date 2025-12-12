# takeRight

배열의 끝에서 지정한 개수만큼 요소를 가져와 새 배열을 만들어요.

```typescript
const taken = takeRight(arr, count);
```

## 사용법

### `takeRight(arr, count?)`

배열의 끝에서 몇 개의 요소만 필요할 때 `takeRight`를 사용하세요. 요청한 개수가 배열 길이보다 크면 전체 배열을 반환해요.

```typescript
import { takeRight } from 'es-toolkit/array';

// 마지막 2개의 요소를 가져와요.
takeRight([1, 2, 3, 4, 5], 2);
// Returns: [4, 5]

// 마지막 2개의 요소를 가져와요.
takeRight(['a', 'b', 'c'], 2);
// Returns: ['b', 'c']
```

배열보다 많은 개수를 요청하면 전체 배열을 반환해요.

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

`count`를 생략하면 마지막 요소만 가져와요.

```typescript
import { takeRight } from 'es-toolkit/array';

takeRight([1, 2, 3]);
// Returns: [3]
```

#### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `count` (`number`, 선택): 가져올 요소의 개수예요. 기본값은 `1`이에요.

#### 반환 값

(`T[]`): 배열의 끝에서 `count`개의 요소를 포함한 새 배열을 반환해요.
