# isError (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isError](../../predicate/isError.md)
这个 `isError` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isError](../../predicate/isError.md)。
:::

检查值是否为 Error 对象。

```typescript
const result = isError(value);
```

## 用法

### `isError(value)`

当需要类型安全地检查值是否为 Error 对象时使用 `isError`。在 TypeScript 中它也可以作为类型守卫使用。

```typescript
import { isError } from 'es-toolkit/compat';

// 检查 Error 对象
isError(new Error()); // true
isError(new TypeError('Type error')); // true
isError(new ReferenceError('Reference error')); // true

// 继承 Error 的自定义错误
class CustomError extends Error {}
isError(new CustomError()); // true

// 其他类型返回 false
isError('Error'); // false
isError({ name: 'Error', message: 'Something went wrong' }); // false
isError({}); // false
isError(null); // false
isError(undefined); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 Error 对象的值。

#### 返回值

(`boolean`): 如果值是 Error 对象则返回 `true`，否则返回 `false`。
