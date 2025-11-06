# isArrayBuffer (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isArrayBuffer](../../predicate/isArrayBuffer.md)
此 `isArrayBuffer` 函数由于 Lodash 兼容性的复杂处理而运行较慢。

请改用更快的现代化 `es-toolkit` 的 [isArrayBuffer](../../predicate/isArrayBuffer.md)。
:::

检查值是否为 ArrayBuffer。

```typescript
const result = isArrayBuffer(value);
```

## 用法

### `isArrayBuffer(value)`

当您想要类型安全地检查值是否为 ArrayBuffer 时，请使用 `isArrayBuffer`。在 TypeScript 中也作为类型守卫工作。

```typescript
import { isArrayBuffer } from 'es-toolkit/compat';

// 检查 ArrayBuffer
const buffer = new ArrayBuffer(16);
isArrayBuffer(buffer); // true

// 其他类型返回 false
isArrayBuffer(new Array()); // false
isArrayBuffer(new Map()); // false
isArrayBuffer({}); // false
isArrayBuffer('hello'); // false
isArrayBuffer(123); // false
isArrayBuffer(null); // false
isArrayBuffer(undefined); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 ArrayBuffer 的值。

#### 返回值

(`value is ArrayBuffer`): 如果值是 ArrayBuffer 则返回 `true`，否则返回 `false`。
