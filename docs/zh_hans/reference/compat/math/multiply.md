# multiply (Lodash 兼容性)

::: warning 请使用 `*` 运算符

这个 `multiply` 函数由于额外的函数调用会运行较慢。

请使用更快、更简单的 `*` 运算符。

:::

将两个数字相乘。

```typescript
const result = multiply(value, other);
```

## 用法

### `multiply(value, other)`

当您想要将两个数字相乘时，请使用 `multiply`。

```typescript
import { multiply } from 'es-toolkit/compat';

// 基本乘法
multiply(2, 3);
// Returns: 6

multiply(4, 5);
// Returns: 20

// 负数处理
multiply(2, -3);
// Returns: -6

multiply(-4, -5);
// Returns: 20

// 小数处理
multiply(2.5, 4);
// Returns: 10

// NaN 处理
multiply(NaN, 3);
// Returns: NaN

multiply(2, NaN);
// Returns: NaN

multiply(NaN, NaN);
// Returns: NaN
```

#### 参数

- `value` (`number`): 乘法的第一个数字。
- `other` (`number`): 乘法的第二个数字。

#### 返回值

(`number`): 返回两个数字相乘的结果。如果其中任何一个是 NaN，则返回 NaN。
