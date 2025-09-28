# inRange (Lodash 兼容性)

::: warning 请使用 `es-toolkit` 的 [inRange](../../math/inRange.md)

这个 `inRange` 函数由于复杂的类型转换和 null/undefined 处理会运行较慢。

请使用更快、更现代的 `es-toolkit` 的 [inRange](../../math/inRange.md)。

:::

检查数字是否在指定范围内。

```typescript
const result = inRange(value, minimum, maximum);
```

## 参考

### `inRange(value, minimum, maximum?)`

当您想要检查数字是否在特定范围内时，请使用 `inRange`。最小值包含在内，最大值不包含在内。

```typescript
import { inRange } from 'es-toolkit/compat';

// 基本用法
inRange(3, 2, 4);
// Returns: true (2 ≤ 3 < 4)

inRange(1, 2, 5);
// Returns: false (1 < 2)

inRange(5, 2, 5);
// Returns: false (5 不包含在内)

// 范围边界值
inRange(2, 2, 4);
// Returns: true (最小值包含在内)

inRange(4, 2, 4);
// Returns: false (最大值不包含在内)
```

### `inRange(value, maximum)`

如果只提供两个参数，则处理为从 0 到 maximum 的范围。

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5);
// Returns: true (0 ≤ 3 < 5)

inRange(-1, 5);
// Returns: false (-1 < 0)

inRange(0, 5);
// Returns: true (0 ≤ 0 < 5)

inRange(5, 5);
// Returns: false (5 不包含在内)
```

如果最小值大于最大值，会自动交换。

```typescript
import { inRange } from 'es-toolkit/compat';

inRange(3, 5, 2);
// Returns: true (范围变为 2~5，2 ≤ 3 < 5)

inRange(1, 5, 2);
// Returns: false (1 < 2)
```

无效值会被适当转换。

```typescript
import { inRange } from 'es-toolkit/compat';

// 字符串数字转换
inRange(3, '2', '4');
// Returns: true

// falsy 值被处理为 0
inRange(1, null, 5);
// Returns: true (null 被处理为 0，范围为 0~5)

inRange(3, false, 5);
// Returns: true (false 被处理为 0)
```

#### 参数

- `value` (`number`): 要检查是否在范围内的数字。
- `minimum` (`number`): 范围的最小值（包含）。如果没有 `maximum`，此值变为最大值。
- `maximum` (`number`, 可选): 范围的最大值（不包含）。

#### 返回值

(`boolean`): 如果值在指定范围内返回 `true`，否则返回 `false`。
