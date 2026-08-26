# Primitive

JavaScript 中所有原始值的联合。不是原始值的都是对象。

```typescript
type Value = Primitive;
```

## 用法

### `Primitive`

当某个值可以是任意原始值但不能是对象时使用。手写这个联合时经常漏掉 `bigint` 或 `symbol`。

```typescript
import type { Primitive } from 'es-toolkit/types';

function isPrimitive(value: unknown): value is Primitive {
  return value === null || (typeof value !== 'object' && typeof value !== 'function');
}

const a: Primitive = 'text';
const b: Primitive = 1n;
const c: Primitive = Symbol('id');

// const d: Primitive = {}; // 报错，对象不是原始值。
```
