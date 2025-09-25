# isArray (Lodash 호환성)

::: warning `Array.isArray`를 사용하세요

이 `isArray` 함수는 추가적인 함수 호출로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `Array.isArray`를 사용하세요.

:::

값이 배열인지 확인해요.

```typescript
const result = isArray(value);
```

## 레퍼런스

### `isArray(value)`

값이 배열인지 확인하고 싶을 때 `isArray`를 사용하세요. 이 함수는 TypeScript에서 타입 가드로도 사용할 수 있어요.

```typescript
import { isArray } from 'es-toolkit/compat';

// 배열 확인
isArray([1, 2, 3]);
// Returns: true

isArray('abc');
// Returns: false

isArray(() => {});
// Returns: false

// 객체와 구분
isArray({ 0: 'a', 1: 'b', length: 2 });
// Returns: false

isArray(null);
// Returns: false
```

#### 파라미터

- `value` (`unknown`): 배열인지 확인할 값이에요.

#### 반환 값

(`value is any[]`): 값이 배열이면 `true`, 아니면 `false`를 반환해요.
