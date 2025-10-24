# take

배열의 처음부터 지정한 개수만큼 요소를 가져와 새 배열을 만들어요.

```typescript
const taken = take(arr, count);
```

## 레퍼런스

### `take(arr, count?)`

배열의 앞에서 몇 개의 요소만 필요할 때 `take`를 사용하세요. 요청한 개수가 배열 길이보다 크면 전체 배열을 반환해요.

```typescript
import { take } from 'es-toolkit/array';

// 처음 3개의 요소를 가져와요.
take([1, 2, 3, 4, 5], 3);
// Returns: [1, 2, 3]

// 처음 2개의 요소를 가져와요.
take(['a', 'b', 'c'], 2);
// Returns: ['a', 'b']
```

배열보다 많은 개수를 요청하면 전체 배열을 반환해요.

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3], 5);
// Returns: [1, 2, 3]
```

`count`를 생략하면 첫 번째 요소만 가져와요.

```typescript
import { take } from 'es-toolkit/array';

take([1, 2, 3]);
// Returns: [1]
```

#### 파라미터

- `arr` (`T[]`): 요소를 가져올 배열이에요.
- `count` (`number`, 선택): 가져올 요소의 개수예요. 기본값은 `1`이에요.

#### 반환 값

(`T[]`): 배열의 처음부터 `count`개의 요소를 포함한 새 배열을 반환해요.
