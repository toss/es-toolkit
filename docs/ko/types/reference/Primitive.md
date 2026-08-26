# Primitive

자바스크립트의 모든 원시값을 모은 유니온이에요. 원시값이 아닌 건 전부 객체예요.

```typescript
type Value = Primitive;
```

## 사용법

### `Primitive`

어떤 원시값이든 올 수 있지만 객체는 안 되는 자리에 사용하세요. 직접 유니온을 쓰면 `bigint`나 `symbol`을 빠뜨리기 쉬워요.

```typescript
import type { Primitive } from 'es-toolkit/types';

function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

const a: Primitive = 'text';
const b: Primitive = 1n;
const c: Primitive = Symbol('id');

// const d: Primitive = {}; // 에러예요. 객체는 원시값이 아니에요.
```
