# subtract (Lodash 兼容性)

::: warning 请使用 `-` 运算符

这个 `subtract` 函数由于额外的函数调用会运行较慢。

请使用更快、更简单的 `-` 运算符。

:::

将两个数字相减。

```typescript
const result = subtract(value, other);
```

## 参考

### `subtract(value, other)`

当您想要将两个数字相减时，请使用 `subtract`。

```typescript
import { subtract } from 'es-toolkit/compat';

// 基本减法
subtract(6, 4);
// Returns: 2

subtract(10, 3);
// Returns: 7

// 负数处理
subtract(-6, 4);
// Returns: -10

subtract(6, -4);
// Returns: 10

// NaN 处理
subtract(NaN, 4);
// Returns: NaN

subtract(6, NaN);
// Returns: NaN

subtract(NaN, NaN);
// Returns: NaN
```

#### 参数

- `value` (`number`): 减法的基准第一个数字。
- `other` (`number`): 要减去的第二个数字。

#### 返回值

(`number`): 返回第一个数字减去第二个数字的结果。如果其中任何一个是 NaN，则返回 NaN。
