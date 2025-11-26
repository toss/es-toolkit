# isDate (Lodash 兼容性)

::: warning 请使用 es-toolkit 的 [isDate](../../predicate/isDate.md)
这个 `isDate` 函数由于 Lodash 兼容性的复杂处理而性能较慢。

建议使用更快、更现代的 `es-toolkit` 的 [isDate](../../predicate/isDate.md)。
:::

检查值是否为 Date 对象。

```typescript
const result = isDate(value);
```

## 用法

### `isDate(value)`

当你想要类型安全地检查值是否为 Date 对象时使用 `isDate`。在 TypeScript 中它也可以作为类型守卫使用。

```typescript
import { isDate } from 'es-toolkit/compat';

// 检查 Date 对象
const date = new Date();
isDate(date); // true

// 无效的 Date 也被识别为 Date 对象
const invalidDate = new Date('invalid');
isDate(invalidDate); // true

// 其他类型返回 false
isDate('2024-01-01'); // false
isDate(1640995200000); // false
isDate({}); // false
isDate(null); // false
isDate(undefined); // false
```

#### 参数

- `value` (`unknown`): 要检查是否为 Date 对象的值。

#### 返回值

(`boolean`): 如果值是 Date 对象则返回 `true`，否则返回 `false`。
