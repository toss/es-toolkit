# range（Lodash 兼容性）

::: warning 请使用 es-toolkit 的 [range](../../math/range.md)

这个 `range` 函数由于复杂的参数处理和类型转换而运行缓慢。

请使用更快更现代的 `es-toolkit` 的 [range](../../math/range.md)。

:::

创建数字范围数组。

```typescript
const numbers = range(start, end, step);
```

## 用法

### `range(end)`

创建从 0 到 end 以 1 递增的数组。

```typescript
import { range } from 'es-toolkit/compat';

range(4);
// Returns: [0, 1, 2, 3]

range(0);
// Returns: []

range(-4);
// Returns: [0, -1, -2, -3]
```

### `range(start, end)`

创建从 start 到 end 以 1 递增的数组。

```typescript
import { range } from 'es-toolkit/compat';

range(1, 5);
// Returns: [1, 2, 3, 4]

range(5, 1);
// Returns: [5, 4, 3, 2] (自动以 -1 递减)

range(-2, 3);
// Returns: [-2, -1, 0, 1, 2]
```

### `range(start, end, step)`

创建从 start 到 end 以 step 递增的数组。

```typescript
import { range } from 'es-toolkit/compat';

range(0, 20, 5);
// Returns: [0, 5, 10, 15]

range(0, -4, -1);
// Returns: [0, -1, -2, -3]

range(1, 4, 0);
// Returns: [1, 1, 1]
```

小数 step 也可以使用。

```typescript
import { range } from 'es-toolkit/compat';

range(0, 1, 0.2);
// Returns: [0, 0.2, 0.4, 0.6, 0.8]

range(1, 0, -0.25);
// Returns: [1, 0.75, 0.5, 0.25]
```

用作 iteratee 时通过 guard 对象处理。

```typescript
import { range } from 'es-toolkit/compat';

[1, 2, 3].map(range);
// Returns: [[0], [0, 1], [0, 1, 2]]
```

#### 参数

- `start` (`number`): 范围的起始值（包含）。如果没有 `end`，此值将成为 end。
- `end` (`number`, 可选): 范围的结束值（不包含）。
- `step` (`number`, 可选): 递增幅度。默认值为 1 或 -1。

#### 返回值

(`number[]`): 返回指定范围的数字数组。
