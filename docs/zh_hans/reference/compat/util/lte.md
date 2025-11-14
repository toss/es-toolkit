# lte (Lodash 兼容性)

::: warning 请使用 `<=` 运算符

由于额外的处理，如 `toNumber` 函数调用和字符串类型检查，这个 `lte` 函数运行缓慢。

请使用更快、更现代的 `<=` 运算符。

:::

检查值是否小于或等于另一个值。

```typescript
const result = lte(value, other);
```

## 用法

### `lte(value, other)`

当您想要比较两个值并检查第一个值是否小于或等于第二个值时，请使用 `lte`。字符串之间按字典顺序比较，其他类型转换为数字后比较。

```typescript
import { lte } from 'es-toolkit/compat';

lte(1, 3);
// Returns: true

lte(3, 3);
// Returns: true

lte(3, 1);
// Returns: false

// 字符串比较 (字典顺序)
lte('abc', 'def');
// Returns: true

lte('def', 'abc');
// Returns: false

// 其他类型转换为数字后比较
lte('10', 5);
// Returns: false (10 <= 5)

lte(null, 0);
// Returns: true (0 <= 0)
```

#### 参数

- `value` (`unknown`): 要比较的第一个值。
- `other` (`unknown`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果第一个值小于或等于第二个值则返回 `true`，否则返回 `false`。
