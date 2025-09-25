# toArray (Lodash 호환성)

::: warning Object.values와 Array.from을 사용하세요

이 `toArray` 함수는 복잡한 타입 검증과 다양한 입력 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 Object.values나 Array.from을 사용하세요.

:::

값을 배열로 변환해요.

```typescript
const array = toArray(value);
```

## 레퍼런스

### `toArray(value)`

다양한 값을 배열로 변환해요. 객체는 값들의 배열로, 배열과 유사한 객체는 배열로, 그 외는 빈 배열로 변환해요.

```typescript
import { toArray } from 'es-toolkit/compat';

// 객체를 값들의 배열로 변환
toArray({ a: 1, b: 2 });
// Returns: [1, 2]

// 문자열을 문자 배열로 변환
toArray('abc');
// Returns: ['a', 'b', 'c']

// Map을 값들의 배열로 변환
const map = new Map([
  ['a', 1],
  ['b', 2],
]);
toArray(map);
// Returns: [['a', 1], ['b', 2]]
```

null이나 undefined는 빈 배열로 변환해요.

```typescript
import { toArray } from 'es-toolkit/compat';

toArray(null);
// Returns: []

toArray(undefined);
// Returns: []
```

#### 파라미터

- `value` (`unknown`): 배열로 변환할 값이에요.

#### 반환 값

(`any[]`): 변환된 배열을 반환해요.
