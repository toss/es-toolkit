# castArray (Lodash 호환성)

::: warning `Array.from()` 또는 배열 리터럴(`[value]`)을 사용하세요

이 `castArray` 함수는 인자가 없을 때와 `undefined` 처리 등으로 인해 복잡하게 동작해요.

대신 더 명확하고 현대적인 `Array.from()`이나 조건부 배열 생성(`Array.isArray(value) ? value : [value]`)을 사용하세요.

:::

값이 배열이 아닌 경우 배열로 변환해서 반환해요.

```typescript
const result = castArray(value);
```

## 레퍼런스

### `castArray(value?)`

어떤 값이든 배열로 만들고 싶을 때 `castArray`를 사용하세요. 값이 이미 배열이면 그대로 반환하고, 배열이 아니면 그 값을 포함하는 새 배열을 만들어요.

```typescript
import { castArray } from 'es-toolkit/compat';

// 숫자를 배열로 변환해요
castArray(1);
// Returns: [1]

// 문자열을 배열로 변환해요
castArray('hello');
// Returns: ['hello']

// 객체를 배열로 변환해요
castArray({ a: 1 });
// Returns: [{ a: 1 }]
```

이미 배열인 값은 그대로 반환해요.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray([1, 2, 3]);
// Returns: [1, 2, 3]

castArray(['a', 'b']);
// Returns: ['a', 'b']
```

`null`이나 `undefined`도 배열로 변환해요.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray(null);
// Returns: [null]

castArray(undefined);
// Returns: [undefined]
```

인자가 없으면 빈 배열을 반환해요.

```typescript
import { castArray } from 'es-toolkit/compat';

castArray();
// Returns: []
```

#### 파라미터

- `value` (`T | readonly T[]`, 선택): 배열로 변환할 값이에요. 인자가 없으면 빈 배열을 반환해요.

### 반환 값

(`T[]`): 입력값이 배열이면 그 배열을, 아니면 입력값을 포함하는 새 배열을 반환해요.
