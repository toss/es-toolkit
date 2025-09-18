# without

배열에서 특정 값들을 제외한 새 배열을 만들어요.

```typescript
const filtered = without(arr, ...values);
```

## 레퍼런스

### `without(arr, ...values)`

배열에서 원하지 않는 특정 값들을 제거하고 싶을 때 `without`을 사용하세요. 원본 배열은 수정되지 않고, 지정한 값들이 제거된 새 배열이 반환돼요.

```typescript
import { without } from 'es-toolkit/array';

// 숫자 배열에서 특정 값들을 제거해요.
without([1, 2, 3, 4, 5], 2, 4);
// Returns: [1, 3, 5]

// 문자열 배열에서 특정 값을 제거해요.
without(['a', 'b', 'c', 'a'], 'a');
// Returns: ['b', 'c']
```

`NaN` 값도 올바르게 처리해요.

```typescript
import { without } from 'es-toolkit/array';

without([1, NaN, 3, NaN, 5], NaN);
// Returns: [1, 3, 5]
```

#### 파라미터

- `arr` (`readonly T[]`): 값들을 제거할 배열이에요.
- `values` (`...T[]`): 배열에서 제거할 값들이에요.

#### 반환 값

(`T[]`): 지정된 값들이 제거된 새 배열을 반환해요.

## Lodash 호환성

`es-toolkit/compat`에서 `without`을 가져오면 Lodash와 완전히 호환돼요.

```typescript
import { without } from 'es-toolkit/compat';

const array = [1, 2, 3, 2];
const result = without(array, 2);
// 결과: [1, 3]
```