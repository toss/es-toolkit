# isArrayBuffer (Lodash 호환성)

::: warning `value instanceof ArrayBuffer`를 사용하세요
이 `isArrayBuffer` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `value instanceof ArrayBuffer` 또는 `es-toolkit`의 [isArrayBuffer](../../predicate/isArrayBuffer.md)를 사용하세요.
:::

값이 ArrayBuffer인지 확인해요.

```typescript
const result = isArrayBuffer(value);
```

## 레퍼런스

### `isArrayBuffer(value)`

값이 ArrayBuffer인지 타입 안전하게 확인하고 싶을 때 `isArrayBuffer`를 사용하세요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isArrayBuffer } from 'es-toolkit/compat';

// ArrayBuffer 확인
const buffer = new ArrayBuffer(16);
isArrayBuffer(buffer); // true

// 다른 타입들은 false
isArrayBuffer(new Array()); // false
isArrayBuffer(new Map()); // false
isArrayBuffer({}); // false
isArrayBuffer('hello'); // false
isArrayBuffer(123); // false
isArrayBuffer(null); // false
isArrayBuffer(undefined); // false
```

#### 파라미터

- `value` (`unknown`): ArrayBuffer인지 확인할 값이에요.

### 반환 값

(`value is ArrayBuffer`): 값이 ArrayBuffer이면 `true`, 아니면 `false`를 반환해요.
