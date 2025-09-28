# isBuffer (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isBuffer](../../predicate/isBuffer.md)
此 `isBuffer` 函数由于 Lodash 兼容性的复杂处理而运行较慢。

请改用更快的现代化 `es-toolkit` 的 [isBuffer](../../predicate/isBuffer.md)。
:::

检查值是否为 Buffer 实例。

```typescript
const result = isBuffer(value);
```

## 参考

### `isBuffer(value)`

当您想要类型安全地检查值是否为 Buffer 实例时，请使用 `isBuffer`。在 Node.js 环境中处理 Buffer 对象时很有用。在 TypeScript 中也作为类型守卫工作。

```typescript
import { isBuffer } from 'es-toolkit/compat';

// 检查 Buffer 实例
const buffer = Buffer.from('hello');
isBuffer(buffer); // true

// 其他类型返回 false
isBuffer('hello'); // false
isBuffer([1, 2, 3]); // false
isBuffer(new Uint8Array([1, 2, 3])); // false
isBuffer({}); // false
isBuffer(null); // false
isBuffer(undefined); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 Buffer 实例的值。

#### 返回值

(`boolean`): 如果值是 Buffer 实例则返回 `true`，否则返回 `false`。
