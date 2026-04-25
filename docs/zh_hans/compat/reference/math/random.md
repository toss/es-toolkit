# random（Lodash 兼容性）

::: warning 请使用 `Math.random()`

这个 `random` 函数由于复杂的参数处理和类型转换而运行缓慢。

请使用更快的 `Math.random()`。

:::

在范围内生成随机数字。

```typescript
const result = random(min, max, floating);
```

## 用法

### `random(floating?)`

生成 0 和 1 之间的随机数字。

```typescript
import { random } from 'es-toolkit/compat';

random();
// Returns: 0.123456789 (0~1 之间的小数)

random(true);
// Returns: 0.987654321 (返回小数)

random(false);
// Returns: 0 或 1 (返回整数)
```

### `random(max, floating?)`

生成从 0 到 max 的随机数字。

```typescript
import { random } from 'es-toolkit/compat';

random(5);
// Returns: 3.456789 (0~5 之间的小数)

random(10, true);
// Returns: 7.123456 (0~10 之间的小数)

random(3, false);
// Returns: 2 (0~3 之间的整数)
```

### `random(min, max, floating?)`

生成从 min 到 max 的随机数字。

```typescript
import { random } from 'es-toolkit/compat';

random(1, 5);
// Returns: 3.456789 (1~5 之间的小数)

random(0, 10, true);
// Returns: 6.789012 (0~10 之间的小数)

random(1, 6, false);
// Returns: 4 (1~6 之间的整数)
```

范围颠倒时会自动交换。

```typescript
import { random } from 'es-toolkit/compat';

random(5, 1);
// Returns: 3.456789 (范围变为 1~5)
```

使用 guard 对象处理特殊情况。

```typescript
import { random } from 'es-toolkit/compat';

const guard = { 5: 5 };
random(5, 5, guard);
// Returns: 2.345678 (0~5 之间的小数)
```

#### 参数

- `floating` (`boolean`, 可选): 决定是否返回小数。默认值为 `true`。
- `max` (`number`): 范围的最大值（不包含）。
- `min` (`number`): 范围的最小值（包含）。
- `index` (`string | number`): 在 guard 对象中要检查的键。
- `guard` (`object`): 验证参数的 guard 对象。

#### 返回值

(`number`): 返回指定范围内的随机数字。
