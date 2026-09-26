# Primitive

문자열이나 숫자처럼 더 쪼갤 수 없는 값들이에요. 객체가 아닌 값은 전부 여기에 들어가요.

```typescript
type Value = Primitive;
```

## 사용법

### `Primitive`

객체는 받지 않고 원시값만 받고 싶을 때 사용하세요. 직접 나열하다 보면 `bigint`나 `symbol`을 빼먹기 쉬워요.

```typescript
import type { Primitive } from 'es-toolkit/types';

function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

const a: Primitive = 'text';
const b: Primitive = 1n;
const c: Primitive = Symbol('id');

// const d: Primitive = {}; // 객체는 원시값이 아니라 에러가 나요.
```
