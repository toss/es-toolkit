# divide (Lodash 兼容性)

::: warning 请使用 `/` 运算符

这个 `divide` 函数由于额外的函数调用会运行较慢。

请使用更快、更简单的 `/` 运算符。

:::

将两个数字相除。

```typescript
const result = divide(value, other);
```

## 参考

### `divide(value, other)`

当您想要将两个数字相除时，请使用 `divide`。

```typescript
import { divide } from 'es-toolkit/compat';

// 基本除法
divide(6, 3);
// Returns: 2

divide(10, 5);
// Returns: 2

// 小数除法
divide(7, 2);
// Returns: 3.5

divide(1, 3);
// Returns: 0.3333333333333333

// 除以零
divide(6, 0);
// Returns: Infinity

divide(-6, 0);
// Returns: -Infinity

// NaN 处理
divide(2, NaN);
// Returns: NaN

divide(NaN, 3);
// Returns: NaN

divide(NaN, NaN);
// Returns: NaN
```

#### 参数

- `value` (`number`): 除法的被除数（被除的数）。
- `other` (`number`): 除法的除数（除的数）。

#### 返回值

(`number`): 返回第一个数字除以第二个数字的结果。如果其中任何一个是 NaN，则返回 NaN。
