# concat (Lodash 호환성)

::: warning 스프레드 연산자를 사용하세요

이 `concat` 함수는 가변 인자 처리로 인해 복잡하게 동작해요.

대신 더 직관적이고 현대적인 스프레드 연산자 `[...arr1, ...arr2]`를 사용하세요.

:::

여러 배열과 값들을 하나의 배열로 합쳐요.

```typescript
const result = concat(...values);
```

## 레퍼런스

### `concat(...values)`

여러 값들과 배열들을 순서대로 연결해서 하나의 새 배열을 만들고 싶을 때 `concat`을 사용하세요. 배열은 펼쳐지고, 개별 값들은 그대로 추가돼요.

```typescript
import { concat } from 'es-toolkit/compat';

// 개별 값들을 연결해요
concat(1, 2, 3);
// Returns: [1, 2, 3]

// 배열들을 연결해요
concat([1, 2], [3, 4]);
// Returns: [1, 2, 3, 4]

// 값과 배열을 함께 연결해요
concat(1, [2, 3], 4);
// Returns: [1, 2, 3, 4]
```

중첩된 배열은 한 단계만 펼쳐져요.

```typescript
import { concat } from 'es-toolkit/compat';

// 중첩 배열은 한 단계만 펼쳐져요
concat([1, [2, 3]], 4);
// Returns: [1, [2, 3], 4]

// 더 깊게 중첩된 배열
concat([1, [2, [3, 4]]], 5);
// Returns: [1, [2, [3, 4]], 5]
```

빈 배열과 빈 값들도 처리해요.

```typescript
import { concat } from 'es-toolkit/compat';

// 빈 배열과 함께
concat([], [1, 2], [], [3]);
// Returns: [1, 2, 3]

// 값이 없는 경우
concat();
// Returns: []
```

#### 파라미터

- `values` (`...(T | readonly T[])`): 연결할 값들과 배열들이에요. 각 배열은 한 단계 펼쳐져요.

### 반환 값

(`T[]`): 모든 값들과 배열의 요소들이 순서대로 연결된 새 배열을 반환해요.
