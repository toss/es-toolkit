# clamp (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [clamp](../../math/clamp.md)

这个 `clamp` 函数由于 NaN 验证和处理会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [clamp](../../math/clamp.md)。

:::

将数字限制在指定范围内。

```typescript
const clamped = clamp(number, lower, upper);
```

## 用法

### `clamp(number, lower, upper)`

当您想要将数字限制在指定的最小值和最大值之间时，请使用 `clamp`。

```typescript
import { clamp } from 'es-toolkit/compat';

// 基本用法
clamp(3, 2, 4);
// Returns: 3 (在范围内)

clamp(0, 5, 10);
// Returns: 5 (限制为最小值)

clamp(15, 5, 10);
// Returns: 10 (限制为最大值)

// 处理负数
clamp(-5, -10, -1);
// Returns: -5

clamp(-15, -10, -1);
// Returns: -10 (限制为最小值)
```

### `clamp(number, upper)`

如果只提供一个参数，该值将用作最大值。

```typescript
import { clamp } from 'es-toolkit/compat';

// 只指定最大值
clamp(5, 3);
// Returns: 3 (限制为最大值)

clamp(2, 3);
// Returns: 2 (在范围内)

clamp(1, 5);
// Returns: 1
```

NaN 值被处理为 0。

```typescript
import { clamp } from 'es-toolkit/compat';

clamp(5, NaN, 10);
// Returns: 5 (NaN 被处理为 0，范围是 0~10)

clamp(5, 2, NaN);
// Returns: 2 (NaN 被处理为 0，范围是 0~2)
```

#### 参数

- `number` (`number`): 要限制的数字。
- `lower` (`number`): 最小值。如果只有第二个参数，则为最大值。
- `upper` (`number`, 可选): 最大值。

#### 返回值

(`number`): 返回限制在指定范围内的数字。
