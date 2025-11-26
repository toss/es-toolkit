# isFunction (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isFunction](../../predicate/isFunction.md)
这个 `isFunction` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isFunction](../../predicate/isFunction.md)。
:::

检查值是否为函数。

```typescript
const result = isFunction(value);
```

## 用法

### `isFunction(value)`

当需要类型安全地检查值是否为函数时使用 `isFunction`。在 TypeScript 中它也可以作为类型守卫使用。

```typescript
import { isFunction } from 'es-toolkit/compat';

// 普通函数
isFunction(function () {}); // true
isFunction(() => {}); // true

// 内置函数和构造函数
isFunction(Array.prototype.slice); // true
isFunction(Proxy); // true
isFunction(Int8Array); // true

// 异步函数和生成器函数
isFunction(async function () {}); // true
isFunction(function* () {}); // true

// 其他类型返回 false
isFunction('function'); // false
isFunction({}); // false
isFunction([]); // false
isFunction(null); // false
isFunction(undefined); // false
isFunction(123); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为函数的值。

#### 返回值

(`boolean`): 如果值是函数则返回 `true`，否则返回 `false`。
