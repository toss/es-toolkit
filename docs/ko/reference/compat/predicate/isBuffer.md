# isBuffer (Lodash 호환성)

::: warning es-toolkit의 [isBuffer](../../predicate/isBuffer.md)를 사용하세요
이 `isBuffer` 함수는 Lodash 호환성을 위한 복잡한 처리로 인해 느리게 동작해요.

대신 더 빠르고 현대적인 `es-toolkit`의 [isBuffer](../../predicate/isBuffer.md)를 사용하세요.
:::

값이 Buffer 인스턴스인지 확인해요.

```typescript
const result = isBuffer(value);
```

## 레퍼런스

### `isBuffer(value)`

값이 Buffer 인스턴스인지 타입 안전하게 확인하고 싶을 때 `isBuffer`를 사용하세요. Node.js 환경에서 Buffer 객체를 다룰 때 유용해요. TypeScript에서 타입 가드로도 동작해요.

```typescript
import { isBuffer } from 'es-toolkit/compat';

// Buffer 인스턴스 확인
const buffer = Buffer.from('hello');
isBuffer(buffer); // true

// 다른 타입들은 false
isBuffer('hello'); // false
isBuffer([1, 2, 3]); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer({}); // false
isBuffer(null); // false
isBuffer(undefined); // false
```

#### 파라미터

- `value` (`unknown`): Buffer 인스턴스인지 확인할 값이에요.

### 반환 값

(`boolean`): 값이 Buffer 인스턴스면 `true`, 아니면 `false`를 반환해요.
