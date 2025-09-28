# ceil (Lodash 兼容性)

::: warning 请使用 `Math.ceil`

这个 `ceil` 函数由于小数位计算和内部函数调用会运行较慢。

请使用更快、更现代的 `Math.ceil`。

:::

将数字向上舍入到指定的小数位数。

```typescript
const result = ceil(number, precision);
```

## 参考

### `ceil(number, precision?)`

当您想要将数字向上舍入到特定小数位数时，请使用 `ceil`。

```typescript
import { ceil } from 'es-toolkit/compat';

// 基本向上舍入（到整数）
ceil(4.006);
// Returns: 5

ceil(4.1);
// Returns: 5

// 向上舍入到小数点后两位
ceil(6.004, 2);
// Returns: 6.01

ceil(6.001, 2);
// Returns: 6.01

// 向上舍入到负数位（十位数）
ceil(6040, -2);
// Returns: 6100

ceil(1234, -2);
// Returns: 1300

// 负数也向上舍入
ceil(-4.1);
// Returns: -4

ceil(-6.004, 2);
// Returns: -6.00
```

#### 参数

- `number` (`number`): 要向上舍入的数字。
- `precision` (`number`, 可选): 要向上舍入的小数位数。默认值为 `0`。

#### 返回值

(`number`): 返回向上舍入到指定小数位数的数字。