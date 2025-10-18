# gte (Lodash 兼容性)

::: warning 请使用 `>=` 运算符

由于额外的处理，如 `toNumber` 函数调用和字符串类型检查，这个 `gte` 函数运行缓慢。

请使用更快、更现代的 `>=` 运算符。

:::

检查值是否大于或等于另一个值。

```typescript
const result = gte(value, other);
```

## 参考

### `gte(value, other)`

当您想要比较两个值并检查第一个值是否大于或等于第二个值时，请使用 `gte`。字符串之间按字典顺序比较，其他类型转换为数字后比较。

```typescript
import { gte } from 'es-toolkit/compat';

gte(3, 1);
// Returns: true

gte(3, 3);
// Returns: true

gte(1, 3);
// Returns: false

// 字符串比较 (字典顺序)
gte('def', 'abc');
// Returns: true

gte('abc', 'def');
// Returns: false

// 其他类型转换为数字后比较
gte('10', 5);
// Returns: true (10 >= 5)

gte(1, null);
// Returns: true (1 >= 0)
```

#### 参数

- `value` (`unknown`): 要比较的第一个值。
- `other` (`unknown`): 要比较的第二个值。

#### 返回值

(`boolean`): 如果第一个值大于或等于第二个值则返回 `true`，否则返回 `false`。
