# lt (Lodash 兼容性)

::: warning 请使用 `<` 运算符

由于额外的处理，如 `toNumber` 函数调用和字符串类型检查，这个 `lt` 函数运行缓慢。

请使用更快、更现代的 `<` 运算符。

:::

检查值是否小于另一个值。

```typescript
const result = lt(value, other);
```

## 参考

### `lt(value, other)`

当您想要比较两个值并检查第一个值是否小于第二个值时，请使用 `lt`。字符串之间按字典顺序比较，其他类型转换为数字后比较。

```typescript
import { lt } from 'es-toolkit/compat';

lt(1, 3);
// Returns: true

lt(3, 3);
// Returns: false

lt(3, 1);
// Returns: false

// 字符串比较 (字典顺序)
lt('abc', 'def');
// Returns: true

lt('def', 'abc');
// Returns: false

// 其他类型转换为数字后比较
lt('5', 10);
// Returns: true (5 < 10)

lt(null, 1);
// Returns: true (0 < 1)
```

#### 参数

- `value` (`unknown`): 要比较的第一个值。
- `other` (`unknown`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果第一个值小于第二个值则返回 `true`，否则返回 `false`。
