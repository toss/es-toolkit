# round (Lodash 兼容性)

::: warning 请使用 `Math.round()`

这个 `round` 函数由于精度处理会运行较慢。

请使用 `Math.round()` 或按所需的小数位计算。

:::

将数字四舍五入。

```typescript
const rounded = round(number, precision);
```

## 参考

### `round(number, precision?)`

将数字四舍五入到指定的小数位数。

```typescript
import { round } from 'es-toolkit/compat';

// 基本四舍五入（小数点后 0 位）
round(4.006);
// Returns: 4

round(4.6);
// Returns: 5

// 指定小数位
round(4.006, 2);
// Returns: 4.01

round(4.123456, 3);
// Returns: 4.123
```

负数精度也可以。

```typescript
import { round } from 'es-toolkit/compat';

// 十位数四舍五入
round(4060, -2);
// Returns: 4100

round(1234, -1);
// Returns: 1230

round(1234, -3);
// Returns: 1000
```

负数也能处理。

```typescript
import { round } from 'es-toolkit/compat';

round(-4.006);
// Returns: -4

round(-4.006, 2);
// Returns: -4.01

round(-1234, -2);
// Returns: -1200
```

#### 参数

- `number` (`number`): 要四舍五入的数字。
- `precision` (`number`, 可选): 要四舍五入的小数位数。默认值为 `0`。

#### 返回值

(`number`): 返回四舍五入后的数字。
